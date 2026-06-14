import { Component, inject, OnInit, AfterViewInit, OnDestroy, ViewChild, ElementRef, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { Nav } from '../nav/nav';
import { About } from '../about/about';
import { Technologies } from '../technologies/technologies';
import { Contact } from '../contact/contact';
import { Projects } from "../projects/projects";
import { TranslationService } from '../../core/services/translation.service';

@Component({
  selector: 'app-home',
  imports: [Nav, About, Technologies, Projects, Contact],
  templateUrl: './home.html',
  styleUrl: './home.css'
})
export class Home implements OnInit, AfterViewInit, OnDestroy {
  ts = inject(TranslationService);
  private platformId = inject(PLATFORM_ID);

  @ViewChild('heroCanvas', { static: false }) canvasRef!: ElementRef<HTMLCanvasElement>;
  @ViewChild('heroSection', { static: false }) heroRef!: ElementRef<HTMLElement>;

  private ctx!: CanvasRenderingContext2D;
  private particles: Particle[] = [];
  private mouse = { x: 0, y: 0 };
  private animationId = 0;
  private observer!: IntersectionObserver;
  heroVisible = true;
  heroLoaded = false;

  ngOnInit() {}

  ngAfterViewInit() {
    if (!isPlatformBrowser(this.platformId)) return;

    // Cinematic entrance delay
    setTimeout(() => { this.heroLoaded = true; }, 100);

    this.initParticles();
    this.initScrollObserver();

    window.addEventListener('mousemove', this.onMouseMove);
    window.addEventListener('resize', this.onResize);
  }

  private initParticles() {
    const canvas = this.canvasRef?.nativeElement;
    if (!canvas) return;

    this.ctx = canvas.getContext('2d')!;
    this.onResize();

    const count = Math.min(180, Math.floor(window.innerWidth * 0.12));
    this.particles = [];
    for (let i = 0; i < count; i++) {
      this.particles.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        vx: (Math.random() - 0.5) * 0.4,
        vy: (Math.random() - 0.5) * 0.4,
        radius: Math.random() * 2.5 + 0.5,
        opacity: Math.random() * 0.5 + 0.15,
        depth: Math.random(),
        color: this.getParticleColor()
      });
    }

    this.animateParticles();
  }

  private getParticleColor(): string {
    const colors = [
      '0, 229, 255',   // cyan
      '255, 45, 85',   // red
      '10, 132, 255',  // blue
      '0, 255, 135',   // green
      '191, 90, 242',  // purple
    ];
    return colors[Math.floor(Math.random() * colors.length)];
  }

  private animateParticles = () => {
    if (!this.ctx || !this.heroVisible) {
      this.animationId = requestAnimationFrame(this.animateParticles);
      return;
    }

    const canvas = this.canvasRef?.nativeElement;
    if (!canvas) return;

    this.ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Ambient glow at cursor
    const gradient = this.ctx.createRadialGradient(
      this.mouse.x, this.mouse.y, 0,
      this.mouse.x, this.mouse.y, 250
    );
    gradient.addColorStop(0, 'rgba(0, 229, 255, 0.03)');
    gradient.addColorStop(1, 'rgba(0, 229, 255, 0)');
    this.ctx.fillStyle = gradient;
    this.ctx.fillRect(0, 0, canvas.width, canvas.height);

    for (const p of this.particles) {
      // Mouse influence
      const dx = this.mouse.x - p.x;
      const dy = this.mouse.y - p.y;
      const dist = Math.sqrt(dx * dx + dy * dy);
      const influence = Math.max(0, 1 - dist / 300) * p.depth;

      p.x += p.vx + dx * influence * 0.003;
      p.y += p.vy + dy * influence * 0.003;

      // Wrap edges
      if (p.x < 0) p.x = canvas.width;
      if (p.x > canvas.width) p.x = 0;
      if (p.y < 0) p.y = canvas.height;
      if (p.y > canvas.height) p.y = 0;

      // Draw particle
      this.ctx.beginPath();
      this.ctx.arc(p.x, p.y, p.radius * (0.5 + p.depth * 0.7), 0, Math.PI * 2);
      this.ctx.fillStyle = `rgba(${p.color}, ${p.opacity * (0.5 + influence * 2)})`;
      this.ctx.fill();

      // Glow for brighter particles
      if (p.radius > 1.5) {
        this.ctx.beginPath();
        this.ctx.arc(p.x, p.y, p.radius * 3, 0, Math.PI * 2);
        this.ctx.fillStyle = `rgba(${p.color}, ${p.opacity * 0.1})`;
        this.ctx.fill();
      }
    }

    // Connect nearby particles
    for (let i = 0; i < this.particles.length; i++) {
      for (let j = i + 1; j < this.particles.length; j++) {
        const a = this.particles[i];
        const b = this.particles[j];
        const dx = a.x - b.x;
        const dy = a.y - b.y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        if (dist < 120) {
          this.ctx.beginPath();
          this.ctx.moveTo(a.x, a.y);
          this.ctx.lineTo(b.x, b.y);
          this.ctx.strokeStyle = `rgba(0, 229, 255, ${0.06 * (1 - dist / 120)})`;
          this.ctx.lineWidth = 0.5;
          this.ctx.stroke();
        }
      }
    }

    this.animationId = requestAnimationFrame(this.animateParticles);
  }

  private initScrollObserver() {
    this.observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.target.classList.contains('reveal') ||
            entry.target.classList.contains('reveal-left') ||
            entry.target.classList.contains('reveal-right') ||
            entry.target.classList.contains('reveal-scale')) {
          if (entry.isIntersecting) {
            entry.target.classList.add('revealed');
          }
        }
      });
    }, { threshold: 0.1, rootMargin: '0px 0px -50px 0px' });

    // Observe all reveal elements after a short delay
    setTimeout(() => {
      document.querySelectorAll('.reveal, .reveal-left, .reveal-right, .reveal-scale').forEach(el => {
        this.observer.observe(el);
      });
    }, 500);
  }

  private onMouseMove = (e: MouseEvent) => {
    this.mouse.x = e.clientX;
    this.mouse.y = e.clientY;
  }

  private onResize = () => {
    const canvas = this.canvasRef?.nativeElement;
    if (!canvas) return;
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
  }

  ngOnDestroy() {
    if (this.animationId) cancelAnimationFrame(this.animationId);
    if (this.observer) this.observer.disconnect();
    if (isPlatformBrowser(this.platformId)) {
      window.removeEventListener('mousemove', this.onMouseMove);
      window.removeEventListener('resize', this.onResize);
    }
  }
}

interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  radius: number;
  opacity: number;
  depth: number;
  color: string;
}
