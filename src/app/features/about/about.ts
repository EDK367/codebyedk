import { Component, inject, OnInit, OnDestroy, AfterViewInit, ElementRef, ViewChild, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser, CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { TranslationService } from '../../core/services/translation.service';

@Component({
  selector: 'app-about',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './about.html',
  styleUrls: ['./about.css']
})
export class About implements OnInit, AfterViewInit, OnDestroy {
  ts = inject(TranslationService);
  private platformId = inject(PLATFORM_ID);

  @ViewChild('cardContainer', { static: false }) cardRef!: ElementRef<HTMLElement>;
  @ViewChild('aboutCanvas', { static: false }) canvasRef!: ElementRef<HTMLCanvasElement>;
  @ViewChild('aboutSection', { static: false }) sectionRef!: ElementRef<HTMLElement>;

  private ctx!: CanvasRenderingContext2D;
  private animId = 0;
  private time = 0;
  private mouse = { x: -1000, y: -1000 };
  private timelineNodes: TimelineNode[] = [];
  private dataFragments: DataFragment[] = [];
  private sectionVisible = false;

  // 3D card tilt
  private onCardMouseMove = (e: MouseEvent) => {
    if (!this.cardRef) return;
    const card = this.cardRef.nativeElement;
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    const rotateX = ((y - centerY) / centerY) * -10;
    const rotateY = ((x - centerX) / centerX) * 10;
    card.style.setProperty('--rotateX', `${rotateX}deg`);
    card.style.setProperty('--rotateY', `${rotateY}deg`);
    card.style.setProperty('--mouseX', `${x}px`);
    card.style.setProperty('--mouseY', `${y}px`);
  };

  private onCardMouseLeave = () => {
    if (!this.cardRef) return;
    const card = this.cardRef.nativeElement;
    card.style.setProperty('--rotateX', `0deg`);
    card.style.setProperty('--rotateY', `0deg`);
  };

  ngOnInit() {}

  ngAfterViewInit() {
    if (!isPlatformBrowser(this.platformId)) return;

    setTimeout(() => {
      if (this.cardRef) {
        this.cardRef.nativeElement.addEventListener('mousemove', this.onCardMouseMove);
        this.cardRef.nativeElement.addEventListener('mouseleave', this.onCardMouseLeave);
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

    // Create floating timeline nodes (vertical axis)
    for (let i = 0; i < 8; i++) {
      this.timelineNodes.push({
        baseX: 40 + Math.random() * (w - 80),
        baseY: (h / 9) * (i + 0.5),
        x: 0, y: 0,
        radius: 3 + Math.random() * 4,
        opacity: 0.3 + Math.random() * 0.4,
        phase: Math.random() * Math.PI * 2,
        connections: [],
        labelWidth: 40 + Math.random() * 80,
        assembled: false,
        assembleProgress: 0
      });
    }

    // Link them
    for (let i = 0; i < this.timelineNodes.length - 1; i++) {
      this.timelineNodes[i].connections.push(i + 1);
    }

    // Data fragments (digital coordinates, hex values)
    const fragments = ['0x4A', '0xFF', 'SYS', 'API', 'JVM', '::1', 'TCP', 'PKG', 'GIT', 'SQL', 'ACK', 'RST', 'OOP', 'DNS', 'SSH'];
    for (let i = 0; i < 30; i++) {
      this.dataFragments.push({
        x: Math.random() * w,
        y: Math.random() * h,
        vx: (Math.random() - 0.5) * 0.3,
        vy: -0.2 - Math.random() * 0.4,
        text: fragments[Math.floor(Math.random() * fragments.length)],
        opacity: 0,
        targetOpacity: 0.08 + Math.random() * 0.12,
        size: 9 + Math.random() * 5,
        fadeIn: Math.random() * 3
      });
    }

    // Intersection observer for this section
    const obs = new IntersectionObserver(entries => {
      this.sectionVisible = entries[0]?.isIntersecting ?? false;
    }, { threshold: 0.1 });
    if (this.sectionRef) obs.observe(this.sectionRef.nativeElement);

    this.animateAbout();
  }

  private animateAbout = () => {
    if (!this.ctx) return;
    const canvas = this.canvasRef?.nativeElement;
    if (!canvas) return;

    this.time += 0.016;
    const w = canvas.width, h = canvas.height;

    this.ctx.clearRect(0, 0, w, h);

    if (!this.sectionVisible) {
      this.animId = requestAnimationFrame(this.animateAbout);
      return;
    }

    // Draw vertical scan beam (evolving timeline)
    const scanX = w * 0.15 + Math.sin(this.time * 0.2) * 30;
    const scanGrad = this.ctx.createLinearGradient(scanX - 1, 0, scanX + 1, 0);
    scanGrad.addColorStop(0, 'rgba(0, 229, 255, 0)');
    scanGrad.addColorStop(0.5, 'rgba(0, 229, 255, 0.06)');
    scanGrad.addColorStop(1, 'rgba(0, 229, 255, 0)');
    this.ctx.fillStyle = scanGrad;
    this.ctx.fillRect(scanX - 30, 0, 60, h);

    // Draw timeline nodes & connections
    for (let i = 0; i < this.timelineNodes.length; i++) {
      const node = this.timelineNodes[i];
      node.x = node.baseX + Math.sin(this.time * 0.5 + node.phase) * 15;
      node.y = node.baseY + Math.cos(this.time * 0.3 + node.phase) * 8;

      // Progressive assembly effect
      if (node.assembleProgress < 1) {
        node.assembleProgress = Math.min(1, node.assembleProgress + 0.008);
      }

      // Mouse influence
      const mdx = this.mouse.x - node.x;
      const mdy = this.mouse.y - node.y;
      const mdist = Math.sqrt(mdx * mdx + mdy * mdy);
      const mouseInfluence = Math.max(0, 1 - mdist / 200);

      // Draw connections
      for (const ci of node.connections) {
        const target = this.timelineNodes[ci];
        if (!target) continue;
        const tx = target.baseX + Math.sin(this.time * 0.5 + target.phase) * 15;
        const ty = target.baseY + Math.cos(this.time * 0.3 + target.phase) * 8;

        // Draw connection line with energy pulse
        this.ctx.beginPath();
        this.ctx.moveTo(node.x, node.y);
        // Bezier curve for organic feel
        const cpx = (node.x + tx) / 2 + Math.sin(this.time + i) * 20;
        const cpy = (node.y + ty) / 2;
        this.ctx.quadraticCurveTo(cpx, cpy, tx, ty);
        this.ctx.strokeStyle = `rgba(0, 229, 255, ${0.08 * node.assembleProgress + mouseInfluence * 0.15})`;
        this.ctx.lineWidth = 0.8;
        this.ctx.stroke();

        // Energy pulse traveling along connection
        const pulseT = (this.time * 0.3 + i * 0.5) % 1;
        const px = node.x + (tx - node.x) * pulseT;
        const py = node.y + (ty - node.y) * pulseT;
        this.ctx.beginPath();
        this.ctx.arc(px, py, 2, 0, Math.PI * 2);
        this.ctx.fillStyle = `rgba(0, 229, 255, ${0.3 * node.assembleProgress})`;
        this.ctx.fill();
      }

      // Draw node
      const finalRadius = node.radius * node.assembleProgress * (1 + mouseInfluence * 0.5);
      const nodeGlow = this.ctx.createRadialGradient(node.x, node.y, 0, node.x, node.y, finalRadius * 5);
      nodeGlow.addColorStop(0, `rgba(0, 229, 255, ${0.2 * node.assembleProgress + mouseInfluence * 0.3})`);
      nodeGlow.addColorStop(1, 'rgba(0, 229, 255, 0)');
      this.ctx.fillStyle = nodeGlow;
      this.ctx.fillRect(node.x - finalRadius * 5, node.y - finalRadius * 5, finalRadius * 10, finalRadius * 10);

      this.ctx.beginPath();
      this.ctx.arc(node.x, node.y, finalRadius, 0, Math.PI * 2);
      this.ctx.fillStyle = `rgba(0, 229, 255, ${0.5 * node.assembleProgress + mouseInfluence * 0.5})`;
      this.ctx.fill();

      // Draw holographic info label near node
      if (node.assembleProgress > 0.5) {
        const labelX = node.x + finalRadius + 12;
        const labelAlpha = (node.assembleProgress - 0.5) * 2 * 0.15;
        this.ctx.fillStyle = `rgba(0, 229, 255, ${labelAlpha + mouseInfluence * 0.2})`;
        this.ctx.fillRect(labelX, node.y - 1, node.labelWidth * node.assembleProgress, 2);
        // Small data indicator
        this.ctx.fillRect(labelX + node.labelWidth * node.assembleProgress, node.y - 3, 1, 6);
      }
    }

    // Draw floating data fragments
    for (const frag of this.dataFragments) {
      frag.x += frag.vx;
      frag.y += frag.vy;

      // Fade in over time
      if (this.time > frag.fadeIn && frag.opacity < frag.targetOpacity) {
        frag.opacity += 0.001;
      }

      // Wrap
      if (frag.y < -20) { frag.y = h + 20; frag.x = Math.random() * w; }
      if (frag.x < -30) frag.x = w + 30;
      if (frag.x > w + 30) frag.x = -30;

      this.ctx.font = `${frag.size}px 'Space Grotesk', monospace`;
      this.ctx.fillStyle = `rgba(0, 229, 255, ${frag.opacity})`;
      this.ctx.fillText(frag.text, frag.x, frag.y);
    }

    // Horizontal grid lines (digital coordinates feel)
    for (let y = 0; y < h; y += 60) {
      const lineAlpha = 0.015 + Math.sin(this.time * 0.5 + y * 0.01) * 0.01;
      this.ctx.beginPath();
      this.ctx.moveTo(0, y);
      this.ctx.lineTo(w, y);
      this.ctx.strokeStyle = `rgba(0, 229, 255, ${lineAlpha})`;
      this.ctx.lineWidth = 0.3;
      this.ctx.stroke();
    }

    this.animId = requestAnimationFrame(this.animateAbout);
  }

  private onGlobalMouse = (e: MouseEvent) => {
    if (!this.sectionRef) return;
    const rect = this.sectionRef.nativeElement.getBoundingClientRect();
    this.mouse.x = e.clientX - rect.left;
    this.mouse.y = e.clientY - rect.top;
  }

  private resizeCanvas = () => {
    const canvas = this.canvasRef?.nativeElement;
    const section = this.sectionRef?.nativeElement;
    if (!canvas || !section) return;
    canvas.width = section.offsetWidth;
    canvas.height = section.offsetHeight;
  }

  ngOnDestroy() {
    if (isPlatformBrowser(this.platformId)) {
      if (this.animId) cancelAnimationFrame(this.animId);
      window.removeEventListener('mousemove', this.onGlobalMouse);
      window.removeEventListener('resize', this.resizeCanvas);
      if (this.cardRef) {
        this.cardRef.nativeElement.removeEventListener('mousemove', this.onCardMouseMove);
        this.cardRef.nativeElement.removeEventListener('mouseleave', this.onCardMouseLeave);
      }
    }
  }
}

interface TimelineNode {
  baseX: number; baseY: number; x: number; y: number;
  radius: number; opacity: number; phase: number;
  connections: number[]; labelWidth: number;
  assembled: boolean; assembleProgress: number;
}

interface DataFragment {
  x: number; y: number; vx: number; vy: number;
  text: string; opacity: number; targetOpacity: number;
  size: number; fadeIn: number;
}