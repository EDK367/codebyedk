import { Component, inject, ElementRef, QueryList, ViewChildren, ViewChild, AfterViewInit, OnDestroy, PLATFORM_ID } from '@angular/core';
import { CommonModule, isPlatformBrowser } from '@angular/common';
import { RouterLink } from '@angular/router';
import { TranslationService } from '../../core/services/translation.service';

@Component({
  selector: 'app-projects',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './projects.html',
  styleUrls: ['./projects.css']
})
export class Projects implements AfterViewInit, OnDestroy {
  ts = inject(TranslationService);
  private platformId = inject(PLATFORM_ID);

  @ViewChildren('projectCard') cards!: QueryList<ElementRef<HTMLElement>>;
  @ViewChild('projCanvas', { static: false }) canvasRef!: ElementRef<HTMLCanvasElement>;
  @ViewChild('projSection', { static: false }) sectionRef!: ElementRef<HTMLElement>;

  private ctx!: CanvasRenderingContext2D;
  private canvasAnimId = 0;
  private time = 0;
  private mouse = { x: -1000, y: -1000 };
  private wireframes: Wireframe[] = [];
  private gridLines: GridLine[] = [];
  private floatingWindows: FloatingWindow[] = [];
  private sectionVisible = false;

  // 3D card tilt
  private onMouseMove = (e: MouseEvent, card: HTMLElement) => {
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    const rotateX = ((y - centerY) / centerY) * -8;
    const rotateY = ((x - centerX) / centerX) * 8;
    card.style.setProperty('--rotateX', `${rotateX}deg`);
    card.style.setProperty('--rotateY', `${rotateY}deg`);
    card.style.setProperty('--mouseX', `${x}px`);
    card.style.setProperty('--mouseY', `${y}px`);
  };

  private onMouseLeave = (card: HTMLElement) => {
    card.style.setProperty('--rotateX', `0deg`);
    card.style.setProperty('--rotateY', `0deg`);
  };

  private listeners = new Map<HTMLElement, { move: (e: MouseEvent) => void, leave: () => void }>();

  ngAfterViewInit() {
    if (!isPlatformBrowser(this.platformId)) return;

    setTimeout(() => {
      this.cards.forEach(cardRef => {
        const card = cardRef.nativeElement;
        const moveHandler = (e: MouseEvent) => this.onMouseMove(e, card);
        const leaveHandler = () => this.onMouseLeave(card);
        card.addEventListener('mousemove', moveHandler);
        card.addEventListener('mouseleave', leaveHandler);
        this.listeners.set(card, { move: moveHandler, leave: leaveHandler });
      });
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

    // Create wireframe rectangles (floating UI components)
    for (let i = 0; i < 12; i++) {
      this.wireframes.push({
        x: Math.random() * w,
        y: Math.random() * h,
        width: 40 + Math.random() * 120,
        height: 25 + Math.random() * 80,
        opacity: 0.02 + Math.random() * 0.04,
        vx: (Math.random() - 0.5) * 0.15,
        vy: (Math.random() - 0.5) * 0.1,
        rotation: (Math.random() - 0.5) * 0.1,
        phase: Math.random() * Math.PI * 2,
        hasHeader: Math.random() > 0.3,
        hasContent: Math.random() > 0.4
      });
    }

    // Smart grid lines
    for (let i = 0; i < 20; i++) {
      const isHorizontal = Math.random() > 0.5;
      this.gridLines.push({
        x: isHorizontal ? 0 : Math.random() * w,
        y: isHorizontal ? Math.random() * h : 0,
        length: isHorizontal ? w : h,
        isHorizontal,
        opacity: 0.015 + Math.random() * 0.02,
        dashPhase: Math.random() * 100
      });
    }

    // Floating windows (abstract UI)
    for (let i = 0; i < 5; i++) {
      this.floatingWindows.push({
        x: Math.random() * w,
        y: Math.random() * h,
        width: 80 + Math.random() * 150,
        height: 50 + Math.random() * 100,
        opacity: 0,
        targetOpacity: 0.04 + Math.random() * 0.06,
        assembleProgress: 0,
        phase: Math.random() * Math.PI * 2
      });
    }

    const obs = new IntersectionObserver(entries => {
      this.sectionVisible = entries[0]?.isIntersecting ?? false;
    }, { threshold: 0.1 });
    if (this.sectionRef) obs.observe(this.sectionRef.nativeElement);

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

    // Draw perspective grid floor (vanishing point at mouse)
    const vpx = this.mouse.x > 0 ? this.mouse.x : w / 2;
    const vpy = this.mouse.y > 0 ? this.mouse.y : h / 2;

    for (let i = 0; i < 15; i++) {
      const y = h * (0.3 + i * 0.05);
      const spread = (y / h) * 2;
      const x1 = vpx - (w * spread) / 2;
      const x2 = vpx + (w * spread) / 2;
      this.ctx.beginPath();
      this.ctx.moveTo(x1, y);
      this.ctx.lineTo(x2, y);
      this.ctx.strokeStyle = `rgba(191, 90, 242, ${0.02 - i * 0.001})`;
      this.ctx.lineWidth = 0.4;
      this.ctx.stroke();
    }

    // Draw smart grid lines with dashes
    for (const line of this.gridLines) {
      line.dashPhase += 0.3;
      this.ctx.beginPath();
      this.ctx.setLineDash([3, 8]);
      this.ctx.lineDashOffset = -line.dashPhase;
      if (line.isHorizontal) {
        this.ctx.moveTo(0, line.y);
        this.ctx.lineTo(w, line.y);
      } else {
        this.ctx.moveTo(line.x, 0);
        this.ctx.lineTo(line.x, h);
      }
      this.ctx.strokeStyle = `rgba(191, 90, 242, ${line.opacity})`;
      this.ctx.lineWidth = 0.3;
      this.ctx.stroke();
      this.ctx.setLineDash([]);
    }

    // Draw wireframe components
    for (const wf of this.wireframes) {
      wf.x += wf.vx;
      wf.y += wf.vy + Math.sin(this.time + wf.phase) * 0.1;

      // Wrap
      if (wf.x < -wf.width) wf.x = w;
      if (wf.x > w) wf.x = -wf.width;
      if (wf.y < -wf.height) wf.y = h;
      if (wf.y > h) wf.y = -wf.height;

      // Mouse proximity boost
      const dx = this.mouse.x - (wf.x + wf.width / 2);
      const dy = this.mouse.y - (wf.y + wf.height / 2);
      const dist = Math.sqrt(dx * dx + dy * dy);
      const boost = Math.max(0, 1 - dist / 300) * 0.08;
      const alpha = wf.opacity + boost;

      this.ctx.save();
      this.ctx.translate(wf.x + wf.width / 2, wf.y + wf.height / 2);
      this.ctx.rotate(wf.rotation * Math.sin(this.time * 0.3 + wf.phase));
      this.ctx.translate(-wf.width / 2, -wf.height / 2);

      // Wireframe border
      this.ctx.strokeStyle = `rgba(191, 90, 242, ${alpha})`;
      this.ctx.lineWidth = 0.8;
      this.ctx.strokeRect(0, 0, wf.width, wf.height);

      // Header bar
      if (wf.hasHeader) {
        this.ctx.fillStyle = `rgba(191, 90, 242, ${alpha * 0.4})`;
        this.ctx.fillRect(0, 0, wf.width, 8);
        // Dots
        for (let d = 0; d < 3; d++) {
          this.ctx.beginPath();
          this.ctx.arc(6 + d * 8, 4, 1.5, 0, Math.PI * 2);
          this.ctx.fillStyle = `rgba(191, 90, 242, ${alpha * 0.6})`;
          this.ctx.fill();
        }
      }

      // Content lines
      if (wf.hasContent) {
        const startY = wf.hasHeader ? 15 : 8;
        for (let l = 0; l < 3; l++) {
          const lineW = wf.width * (0.4 + Math.random() * 0.4);
          this.ctx.fillStyle = `rgba(191, 90, 242, ${alpha * 0.25})`;
          this.ctx.fillRect(6, startY + l * 10, lineW, 3);
        }
      }

      this.ctx.restore();

      // Convergence lines to mouse on hover
      if (boost > 0.02) {
        this.ctx.beginPath();
        this.ctx.moveTo(wf.x + wf.width / 2, wf.y + wf.height / 2);
        this.ctx.lineTo(this.mouse.x, this.mouse.y);
        this.ctx.strokeStyle = `rgba(191, 90, 242, ${boost * 0.3})`;
        this.ctx.lineWidth = 0.3;
        this.ctx.stroke();
      }
    }

    // Draw floating windows assembling
    for (const fw of this.floatingWindows) {
      fw.assembleProgress = Math.min(1, fw.assembleProgress + 0.003);
      fw.opacity = fw.targetOpacity * fw.assembleProgress;

      const fx = fw.x + Math.sin(this.time * 0.4 + fw.phase) * 10;
      const fy = fw.y + Math.cos(this.time * 0.3 + fw.phase) * 8;

      // Assembled border with clip
      const clipW = fw.width * fw.assembleProgress;
      const clipH = fw.height * fw.assembleProgress;

      this.ctx.strokeStyle = `rgba(191, 90, 242, ${fw.opacity})`;
      this.ctx.lineWidth = 1;
      this.ctx.strokeRect(fx, fy, clipW, clipH);

      // Corner brackets
      const bracketSize = 6;
      this.ctx.lineWidth = 1.5;
      this.ctx.strokeStyle = `rgba(191, 90, 242, ${fw.opacity * 2})`;
      // Top-left
      this.ctx.beginPath();
      this.ctx.moveTo(fx, fy + bracketSize); this.ctx.lineTo(fx, fy); this.ctx.lineTo(fx + bracketSize, fy);
      this.ctx.stroke();
      // Top-right
      this.ctx.beginPath();
      this.ctx.moveTo(fx + clipW - bracketSize, fy); this.ctx.lineTo(fx + clipW, fy); this.ctx.lineTo(fx + clipW, fy + bracketSize);
      this.ctx.stroke();
      // Bottom-left
      this.ctx.beginPath();
      this.ctx.moveTo(fx, fy + clipH - bracketSize); this.ctx.lineTo(fx, fy + clipH); this.ctx.lineTo(fx + bracketSize, fy + clipH);
      this.ctx.stroke();
      // Bottom-right
      this.ctx.beginPath();
      this.ctx.moveTo(fx + clipW - bracketSize, fy + clipH); this.ctx.lineTo(fx + clipW, fy + clipH); this.ctx.lineTo(fx + clipW, fy + clipH - bracketSize);
      this.ctx.stroke();
    }

    this.canvasAnimId = requestAnimationFrame(this.animateCanvas);
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
      if (this.canvasAnimId) cancelAnimationFrame(this.canvasAnimId);
      window.removeEventListener('mousemove', this.onGlobalMouse);
      window.removeEventListener('resize', this.resizeCanvas);
      this.listeners.forEach((handlers, card) => {
        card.removeEventListener('mousemove', handlers.move);
        card.removeEventListener('mouseleave', handlers.leave);
      });
      this.listeners.clear();
    }
  }
}

interface Wireframe {
  x: number; y: number; width: number; height: number;
  opacity: number; vx: number; vy: number; rotation: number;
  phase: number; hasHeader: boolean; hasContent: boolean;
}

interface GridLine {
  x: number; y: number; length: number; isHorizontal: boolean;
  opacity: number; dashPhase: number;
}

interface FloatingWindow {
  x: number; y: number; width: number; height: number;
  opacity: number; targetOpacity: number;
  assembleProgress: number; phase: number;
}
