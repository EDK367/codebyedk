import { Component, inject, ElementRef, ViewChild, AfterViewInit, OnDestroy, PLATFORM_ID } from '@angular/core';
import { CommonModule, isPlatformBrowser } from '@angular/common';
import { TranslationService } from '../../core/services/translation.service';

@Component({
  selector: 'app-contact',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './contact.html',
  styleUrls: ['./contact.css']
})
export class Contact implements AfterViewInit, OnDestroy {
  ts = inject(TranslationService);
  private platformId = inject(PLATFORM_ID);

  @ViewChild('contactContainer', { static: false }) containerRef!: ElementRef<HTMLElement>;
  @ViewChild('contactCanvas', { static: false }) canvasRef!: ElementRef<HTMLCanvasElement>;

  private ctx!: CanvasRenderingContext2D;
  private canvasAnimId = 0;
  private time = 0;
  private mouse = { x: -1000, y: -1000 };
  private signals: Signal[] = [];
  private connectionNodes: ConnectionNode[] = [];
  private sectionVisible = false;

  private onMouseMove = (e: MouseEvent) => {
    if (!this.containerRef) return;
    const container = this.containerRef.nativeElement;
    const rect = container.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    
    container.style.setProperty('--mouseX', `${x}px`);
    container.style.setProperty('--mouseY', `${y}px`);
  };

  ngAfterViewInit() {
    if (!isPlatformBrowser(this.platformId)) return;
    
    setTimeout(() => {
      if (this.containerRef) {
        this.containerRef.nativeElement.addEventListener('mousemove', this.onMouseMove);
      }
    }, 500);

    this.initCanvas();
    window.addEventListener('mousemove', this.onGlobalMouse);
  }

  private initCanvas() {
    const canvas = this.canvasRef?.nativeElement;
    if (!canvas) return;
    this.ctx = canvas.getContext('2d')!;
    this.resizeCanvas();
    window.addEventListener('resize', this.resizeCanvas);

    const w = canvas.width, h = canvas.height;

    // Create signal waves
    for (let i = 0; i < 5; i++) {
      this.signals.push({
        y: h * (0.2 + i * 0.15),
        amplitude: 20 + Math.random() * 40,
        frequency: 0.002 + Math.random() * 0.003,
        speed: 0.01 + Math.random() * 0.02,
        phase: Math.random() * Math.PI * 2,
        opacity: 0.05 + Math.random() * 0.1
      });
    }

    // Create connection nodes (satellites)
    for (let i = 0; i < 15; i++) {
      this.connectionNodes.push({
        x: Math.random() * w,
        y: Math.random() * h,
        vx: (Math.random() - 0.5) * 0.2,
        vy: (Math.random() - 0.5) * 0.2,
        radius: 2 + Math.random() * 3,
        phase: Math.random() * Math.PI * 2,
        pulseRadius: 0
      });
    }

    const obs = new IntersectionObserver(entries => {
      this.sectionVisible = entries[0]?.isIntersecting ?? false;
    }, { threshold: 0.1 });
    if (this.containerRef) obs.observe(this.containerRef.nativeElement);

    this.animateCanvas();
  }

  private animateCanvas = () => {
    if (!this.ctx) return;
    const canvas = this.canvasRef?.nativeElement;
    if (!canvas) return;

    this.time += 0.016;
    const w = canvas.width, h = canvas.height;
    this.ctx.clearRect(0, 0, w, h);

    if (!this.sectionVisible) {
      this.canvasAnimId = requestAnimationFrame(this.animateCanvas);
      return;
    }

    // Draw signals (waves of communication)
    for (const sig of this.signals) {
      sig.phase += sig.speed;
      this.ctx.beginPath();
      this.ctx.moveTo(0, sig.y);
      for (let x = 0; x <= w; x += 10) {
        // Mouse distortion
        const dist = Math.abs(x - this.mouse.x);
        let distAmp = 0;
        if (dist < 300) {
          distAmp = Math.sin((1 - dist / 300) * Math.PI) * 50;
        }

        const y = sig.y + Math.sin(x * sig.frequency + sig.phase) * sig.amplitude
                        + Math.cos(x * sig.frequency * 1.5 - sig.phase) * (sig.amplitude * 0.5)
                        - distAmp * (this.mouse.y < sig.y ? 1 : -1) * 0.5;
        this.ctx.lineTo(x, y);
      }
      this.ctx.strokeStyle = `rgba(255, 45, 85, ${sig.opacity})`;
      this.ctx.lineWidth = 1.5;
      this.ctx.stroke();

      // Glow
      this.ctx.strokeStyle = `rgba(255, 45, 85, ${sig.opacity * 0.3})`;
      this.ctx.lineWidth = 6;
      this.ctx.stroke();
    }

    // Draw connection nodes
    for (let i = 0; i < this.connectionNodes.length; i++) {
      const node = this.connectionNodes[i];
      node.x += node.vx;
      node.y += node.vy;

      // Wrap
      if (node.x < -10) node.x = w + 10;
      if (node.x > w + 10) node.x = -10;
      if (node.y < -10) node.y = h + 10;
      if (node.y > h + 10) node.y = -10;

      // Mouse connection
      const dx = this.mouse.x - node.x;
      const dy = this.mouse.y - node.y;
      const dist = Math.sqrt(dx * dx + dy * dy);

      if (dist < 250) {
        const pull = (1 - dist / 250) * 0.05;
        node.vx += dx * pull * 0.01;
        node.vy += dy * pull * 0.01;

        // Draw line to mouse
        this.ctx.beginPath();
        this.ctx.moveTo(node.x, node.y);
        this.ctx.lineTo(this.mouse.x, this.mouse.y);
        this.ctx.strokeStyle = `rgba(255, 45, 85, ${(1 - dist / 250) * 0.3})`;
        this.ctx.lineWidth = 0.5;
        this.ctx.stroke();

        // Trigger pulse
        if (Math.random() < 0.02 && node.pulseRadius === 0) {
          node.pulseRadius = node.radius;
        }
      }

      // Draw pulse
      if (node.pulseRadius > 0) {
        node.pulseRadius += 2;
        this.ctx.beginPath();
        this.ctx.arc(node.x, node.y, node.pulseRadius, 0, Math.PI * 2);
        this.ctx.strokeStyle = `rgba(255, 45, 85, ${Math.max(0, 0.4 - node.pulseRadius / 150)})`;
        this.ctx.stroke();
        if (node.pulseRadius > 100) node.pulseRadius = 0;
      }

      // Draw node
      const pulseOp = 0.5 + Math.sin(this.time * 2 + node.phase) * 0.5;
      this.ctx.beginPath();
      this.ctx.arc(node.x, node.y, node.radius, 0, Math.PI * 2);
      this.ctx.fillStyle = `rgba(255, 45, 85, ${0.4 + pulseOp * 0.6})`;
      this.ctx.fill();

      // Connect to other nodes
      for (let j = i + 1; j < this.connectionNodes.length; j++) {
        const other = this.connectionNodes[j];
        const ndx = node.x - other.x;
        const ndy = node.y - other.y;
        const ndist = Math.sqrt(ndx * ndx + ndy * ndy);
        if (ndist < 150) {
          this.ctx.beginPath();
          this.ctx.moveTo(node.x, node.y);
          this.ctx.lineTo(other.x, other.y);
          this.ctx.strokeStyle = `rgba(255, 45, 85, ${(1 - ndist / 150) * 0.15})`;
          this.ctx.lineWidth = 0.5;
          this.ctx.stroke();
        }
      }
    }

    this.canvasAnimId = requestAnimationFrame(this.animateCanvas);
  }

  private onGlobalMouse = (e: MouseEvent) => {
    if (!this.containerRef) return;
    const rect = this.containerRef.nativeElement.getBoundingClientRect();
    this.mouse.x = e.clientX - rect.left;
    this.mouse.y = e.clientY - rect.top;
  }

  private resizeCanvas = () => {
    const canvas = this.canvasRef?.nativeElement;
    const section = this.containerRef?.nativeElement;
    if (!canvas || !section) return;
    canvas.width = section.offsetWidth;
    canvas.height = section.offsetHeight;
  }

  ngOnDestroy() {
    if (isPlatformBrowser(this.platformId)) {
      if (this.canvasAnimId) cancelAnimationFrame(this.canvasAnimId);
      window.removeEventListener('mousemove', this.onGlobalMouse);
      window.removeEventListener('resize', this.resizeCanvas);
      if (this.containerRef) {
        this.containerRef.nativeElement.removeEventListener('mousemove', this.onMouseMove);
      }
    }
  }
}

interface Signal {
  y: number; amplitude: number; frequency: number;
  speed: number; phase: number; opacity: number;
}

interface ConnectionNode {
  x: number; y: number; vx: number; vy: number;
  radius: number; phase: number; pulseRadius: number;
}
