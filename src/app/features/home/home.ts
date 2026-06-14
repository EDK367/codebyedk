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
  private particles: HeroParticle[] = [];
  private energyTrails: EnergyTrail[] = [];
  private nebulaClouds: NebulaCloud[] = [];
  private lightWaves: LightWave[] = [];
  private mouse = { x: -1000, y: -1000, prevX: -1000, prevY: -1000, speed: 0 };
  private animationId = 0;
  private observer!: IntersectionObserver;
  private time = 0;
  heroVisible = true;
  heroLoaded = false;

  ngOnInit() {}

  ngAfterViewInit() {
    if (!isPlatformBrowser(this.platformId)) return;
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

    const w = canvas.width, h = canvas.height;

    // Create multi-layer particles (deep, mid, near)
    const count = Math.min(150, Math.floor(window.innerWidth * 0.16));
    this.particles = [];
    for (let i = 0; i < count; i++) {
      const depth = Math.random();
      this.particles.push({
        x: Math.random() * w, y: Math.random() * h,
        vx: (Math.random() - 0.5) * 0.3 * (0.3 + depth * 0.7),
        vy: (Math.random() - 0.5) * 0.3 * (0.3 + depth * 0.7),
        radius: (Math.random() * 2 + 0.3) * (0.4 + depth * 0.8),
        opacity: (Math.random() * 0.4 + 0.1) * (0.5 + depth * 0.5),
        depth, color: this.getNebulaColor(),
        pulsePhase: Math.random() * Math.PI * 2,
        trailHistory: []
      });
    }

    // Create nebula clouds
    this.nebulaClouds = [];
    const nebulaColors = ['0,229,255', '255,45,85', '191,90,242', '10,132,255', '0,255,135'];
    for (let i = 0; i < 6; i++) {
      this.nebulaClouds.push({
        x: Math.random() * w, y: Math.random() * h,
        radius: 150 + Math.random() * 250,
        color: nebulaColors[i % nebulaColors.length],
        opacity: 0.015 + Math.random() * 0.02,
        phase: Math.random() * Math.PI * 2,
        speed: 0.002 + Math.random() * 0.003,
        drift: { x: (Math.random() - 0.5) * 0.15, y: (Math.random() - 0.5) * 0.15 }
      });
    }

    // Create light waves
    this.lightWaves = [];
    for (let i = 0; i < 3; i++) {
      this.lightWaves.push({
        y: h * (0.3 + Math.random() * 0.4),
        amplitude: 30 + Math.random() * 50,
        frequency: 0.003 + Math.random() * 0.004,
        speed: 0.01 + Math.random() * 0.02,
        color: nebulaColors[i],
        opacity: 0.03 + Math.random() * 0.03,
        phase: Math.random() * Math.PI * 2
      });
    }

    this.animateHero();
  }

  private getNebulaColor(): string {
    const colors = ['0,229,255', '255,45,85', '10,132,255', '0,255,135', '191,90,242', '255,180,50'];
    return colors[Math.floor(Math.random() * colors.length)];
  }

  private animateHero = () => {
    if (!this.ctx) return;
    const canvas = this.canvasRef?.nativeElement;
    if (!canvas) return;

    this.time += 0.016;
    const w = canvas.width, h = canvas.height;

    // Clear with subtle trail
    this.ctx.fillStyle = 'rgba(5, 5, 5, 0.15)';
    this.ctx.fillRect(0, 0, w, h);

    if (!this.heroVisible) {
      this.animationId = requestAnimationFrame(this.animateHero);
      return;
    }

    // Draw nebula clouds
    for (const cloud of this.nebulaClouds) {
      cloud.x += cloud.drift.x;
      cloud.y += cloud.drift.y;
      cloud.phase += cloud.speed;

      // Wrap
      if (cloud.x < -cloud.radius) cloud.x = w + cloud.radius;
      if (cloud.x > w + cloud.radius) cloud.x = -cloud.radius;
      if (cloud.y < -cloud.radius) cloud.y = h + cloud.radius;
      if (cloud.y > h + cloud.radius) cloud.y = -cloud.radius;

      const pulsedRadius = cloud.radius * (1 + Math.sin(cloud.phase) * 0.15);
      const pulsedOpacity = cloud.opacity * (0.7 + Math.sin(cloud.phase * 1.3) * 0.3);

      // Mouse influence on clouds
      const cdx = this.mouse.x - cloud.x;
      const cdy = this.mouse.y - cloud.y;
      const cdist = Math.sqrt(cdx * cdx + cdy * cdy);
      const mouseBoost = Math.max(0, 1 - cdist / 400) * 0.03;

      const grad = this.ctx.createRadialGradient(cloud.x, cloud.y, 0, cloud.x, cloud.y, pulsedRadius);
      grad.addColorStop(0, `rgba(${cloud.color}, ${pulsedOpacity + mouseBoost})`);
      grad.addColorStop(0.5, `rgba(${cloud.color}, ${(pulsedOpacity + mouseBoost) * 0.4})`);
      grad.addColorStop(1, `rgba(${cloud.color}, 0)`);
      this.ctx.fillStyle = grad;
      this.ctx.fillRect(cloud.x - pulsedRadius, cloud.y - pulsedRadius, pulsedRadius * 2, pulsedRadius * 2);
    }

    // Draw light waves (energy flow)
    for (const wave of this.lightWaves) {
      wave.phase += wave.speed;
      this.ctx.beginPath();
      this.ctx.moveTo(0, wave.y);
      for (let x = 0; x <= w; x += 4) {
        const y = wave.y + Math.sin(x * wave.frequency + wave.phase) * wave.amplitude
                        + Math.sin(x * wave.frequency * 2.7 + wave.phase * 0.7) * wave.amplitude * 0.3;
        this.ctx.lineTo(x, y);
      }
      this.ctx.strokeStyle = `rgba(${wave.color}, ${wave.opacity})`;
      this.ctx.lineWidth = 1.5;
      this.ctx.stroke();

      // Glow version
      this.ctx.strokeStyle = `rgba(${wave.color}, ${wave.opacity * 0.3})`;
      this.ctx.lineWidth = 6;
      this.ctx.stroke();
    }



    // Update & draw particles
    for (const p of this.particles) {
      const dx = this.mouse.x - p.x;
      const dy = this.mouse.y - p.y;
      const dist = Math.sqrt(dx * dx + dy * dy);

      // Attraction / repulsion based on depth
      const attractRadius = 250 + p.depth * 100;
      const repelRadius = 60;
      if (dist < attractRadius && dist > repelRadius) {
        const force = (1 - dist / attractRadius) * p.depth * 0.008;
        p.vx += dx * force;
        p.vy += dy * force;
      } else if (dist < repelRadius && dist > 0) {
        const force = (1 - dist / repelRadius) * 0.15;
        p.vx -= (dx / dist) * force;
        p.vy -= (dy / dist) * force;
      }

      // Damping
      p.vx *= 0.985;
      p.vy *= 0.985;

      // Add slight drift
      p.vx += Math.sin(this.time * 0.5 + p.pulsePhase) * 0.005;
      p.vy += Math.cos(this.time * 0.3 + p.pulsePhase) * 0.005;

      p.x += p.vx;
      p.y += p.vy;

      // Wrap
      if (p.x < -10) p.x = w + 10;
      if (p.x > w + 10) p.x = -10;
      if (p.y < -10) p.y = h + 10;
      if (p.y > h + 10) p.y = -10;

      // Store trail (for energy stela)
      p.trailHistory.push({ x: p.x, y: p.y });
      if (p.trailHistory.length > 6) p.trailHistory.shift();

      // Pulsation
      const pulse = 0.7 + Math.sin(this.time * 2 + p.pulsePhase) * 0.3;
      const influence = Math.max(0, 1 - dist / 300);
      const finalOpacity = p.opacity * pulse * (0.6 + influence * 1.5);
      const finalRadius = p.radius * (0.8 + influence * 0.6);

      // Draw trail
      if (p.trailHistory.length > 2 && p.depth > 0.5) {
        this.ctx.beginPath();
        this.ctx.moveTo(p.trailHistory[0].x, p.trailHistory[0].y);
        for (let i = 1; i < p.trailHistory.length; i++) {
          this.ctx.lineTo(p.trailHistory[i].x, p.trailHistory[i].y);
        }
        this.ctx.strokeStyle = `rgba(${p.color}, ${finalOpacity * 0.15})`;
        this.ctx.lineWidth = finalRadius * 0.8;
        this.ctx.stroke();
      }

      // Draw glow
      if (finalRadius > 1) {
        const glow = this.ctx.createRadialGradient(p.x, p.y, 0, p.x, p.y, finalRadius * 4);
        glow.addColorStop(0, `rgba(${p.color}, ${finalOpacity * 0.3})`);
        glow.addColorStop(1, `rgba(${p.color}, 0)`);
        this.ctx.fillStyle = glow;
        this.ctx.fillRect(p.x - finalRadius * 4, p.y - finalRadius * 4, finalRadius * 8, finalRadius * 8);
      }

      // Draw particle core
      this.ctx.beginPath();
      this.ctx.arc(p.x, p.y, finalRadius, 0, Math.PI * 2);
      this.ctx.fillStyle = `rgba(${p.color}, ${finalOpacity})`;
      this.ctx.fill();
    }

    // Connect nearby particles (neural network feel)
    for (let i = 0; i < this.particles.length; i++) {
      for (let j = i + 1; j < this.particles.length; j++) {
        const a = this.particles[i], b = this.particles[j];
        if (Math.abs(a.depth - b.depth) > 0.4) continue;
        const ddx = a.x - b.x, ddy = a.y - b.y;
        const dist = Math.sqrt(ddx * ddx + ddy * ddy);
        const maxDist = 100 + a.depth * 40;
        if (dist < maxDist) {
          const alpha = (1 - dist / maxDist) * 0.08 * Math.min(a.depth, b.depth);
          this.ctx.beginPath();
          this.ctx.moveTo(a.x, a.y);
          this.ctx.lineTo(b.x, b.y);
          this.ctx.strokeStyle = `rgba(0, 229, 255, ${alpha})`;
          this.ctx.lineWidth = 0.4 + (1 - dist / maxDist) * 0.6;
          this.ctx.stroke();
        }
      }
    }

    // Mouse speed energy burst
   

    // Draw energy trails
    for (let i = this.energyTrails.length - 1; i >= 0; i--) {
      const t = this.energyTrails[i];
      t.life -= 0.025;
      t.radius *= 1.02;
      if (t.life <= 0) { this.energyTrails.splice(i, 1); continue; }
      const grad = this.ctx.createRadialGradient(t.x, t.y, 0, t.x, t.y, t.radius);
      grad.addColorStop(0, `rgba(${t.color}, ${t.opacity * t.life})`);
      grad.addColorStop(1, `rgba(${t.color}, 0)`);
      this.ctx.fillStyle = grad;
      this.ctx.fillRect(t.x - t.radius, t.y - t.radius, t.radius * 2, t.radius * 2);
    }

    this.animationId = requestAnimationFrame(this.animateHero);
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

    setTimeout(() => {
      document.querySelectorAll('.reveal, .reveal-left, .reveal-right, .reveal-scale').forEach(el => {
        this.observer.observe(el);
      });
    }, 500);
  }

  private onMouseMove = (e: MouseEvent) => {
    const dx = e.clientX - this.mouse.x;
    const dy = e.clientY - this.mouse.y;
    this.mouse.speed = Math.sqrt(dx * dx + dy * dy);
    this.mouse.prevX = this.mouse.x;
    this.mouse.prevY = this.mouse.y;
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

interface HeroParticle {
  x: number; y: number; vx: number; vy: number;
  radius: number; opacity: number; depth: number;
  color: string; pulsePhase: number;
  trailHistory: { x: number; y: number }[];
}

interface NebulaCloud {
  x: number; y: number; radius: number;
  color: string; opacity: number; phase: number; speed: number;
  drift: { x: number; y: number };
}

interface LightWave {
  y: number; amplitude: number; frequency: number;
  speed: number; color: string; opacity: number; phase: number;
}

interface EnergyTrail {
  x: number; y: number; radius: number;
  opacity: number; color: string; life: number;
}
