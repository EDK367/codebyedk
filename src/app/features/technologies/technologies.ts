import { Component, inject, OnInit, OnDestroy, AfterViewInit, ElementRef, ViewChild, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser, CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { TranslationService } from '../../core/services/translation.service';

@Component({
  selector: 'app-technologies',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './technologies.html',
  styleUrls: ['./technologies.css']
})
export class Technologies implements OnInit, AfterViewInit, OnDestroy {
  ts = inject(TranslationService);
  private platformId = inject(PLATFORM_ID);

  @ViewChild('orbitSystem', { static: false }) orbitRef!: ElementRef<HTMLElement>;
  @ViewChild('techCanvas', { static: false }) canvasRef!: ElementRef<HTMLCanvasElement>;
  @ViewChild('techSection', { static: false }) sectionRef!: ElementRef<HTMLElement>;

  tech = [
    { name: "Java", icon: "fab fa-java", orbit: 1, angle: 0, color: "#f89820" },
    { name: "SpringBoot", icon: "fab fa-envira", orbit: 1, angle: 120, color: "#6db33f" },
    { name: "MySQL", icon: "fas fa-database", orbit: 1, angle: 240, color: "#00758f" },
    { name: "Python", icon: "fab fa-python", orbit: 2, angle: 45, color: "#3776ab" },
    { name: "Go", icon: "fab fa-golang", orbit: 2, angle: 135, color: "#00add8" },
    { name: "Git", icon: "fab fa-square-git", orbit: 2, angle: 225, color: "#f1502f" },
    { name: "Docker", icon: "fab fa-docker", orbit: 2, angle: 315, color: "#2496ed" },
    { name: "MongoDB", icon: "fas fa-leaf", orbit: 3, angle: 60, color: "#47a248" },
    { name: "JavaScript", icon: "fab fa-js", orbit: 3, angle: 180, color: "#f7df1e" },
    { name: "Vue.js", icon: "fab fa-vuejs", orbit: 3, angle: 300, color: "#4fc08d" },
  ];

  isHovering = false;
  hoveredTech: string | null = null;
  private animationId: number = 0;
  private rotation = 0;

  // Canvas
  private ctx!: CanvasRenderingContext2D;
  private canvasAnimId = 0;
  private time = 0;
  private mouse = { x: -1000, y: -1000 };
  private circuitNodes: CircuitNode[] = [];
  private dataPulses: DataPulse[] = [];
  private sectionVisible = false;

  ngOnInit() {}

  ngAfterViewInit() {
    if (!isPlatformBrowser(this.platformId)) return;
    this.animate();
    this.initCanvas();
    window.addEventListener('mousemove', this.onGlobalMouse);
  }

  private animate = () => {
    if (!this.isHovering && this.orbitRef) {
      this.rotation += 0.1;
      this.orbitRef.nativeElement.style.setProperty('--global-rotation', `${this.rotation}deg`);
    }
    this.animationId = requestAnimationFrame(this.animate);
  }

  private initCanvas() {
    const canvas = this.canvasRef?.nativeElement;
    if (!canvas) return;
    this.ctx = canvas.getContext('2d')!;
    this.resizeCanvas();
    window.addEventListener('resize', this.resizeCanvas);

    const w = canvas.width, h = canvas.height;

    // Create circuit board nodes
    const gridSize = 50;
    for (let x = gridSize; x < w; x += gridSize) {
      for (let y = gridSize; y < h; y += gridSize) {
        if (Math.random() > 0.35) continue;
        const node: CircuitNode = {
          x: x + (Math.random() - 0.5) * 20,
          y: y + (Math.random() - 0.5) * 20,
          radius: 1.5 + Math.random() * 2,
          connections: [],
          active: false,
          activePower: 0,
          type: Math.random() > 0.7 ? 'junction' : 'node'
        };
        this.circuitNodes.push(node);
      }
    }

    // Create connections (circuit traces)
    for (let i = 0; i < this.circuitNodes.length; i++) {
      const node = this.circuitNodes[i];
      for (let j = i + 1; j < this.circuitNodes.length; j++) {
        const other = this.circuitNodes[j];
        const dx = node.x - other.x;
        const dy = node.y - other.y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        if (dist < 80 && Math.random() > 0.4) {
          node.connections.push(j);
          other.connections.push(i);
        }
      }
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

    // Activate nodes near mouse
    for (const node of this.circuitNodes) {
      const dx = this.mouse.x - node.x;
      const dy = this.mouse.y - node.y;
      const dist = Math.sqrt(dx * dx + dy * dy);
      const mouseInfluence = Math.max(0, 1 - dist / 250);

      node.active = mouseInfluence > 0.1;
      node.activePower = node.activePower * 0.92 + mouseInfluence * 0.08;
    }

    // Spawn data pulses periodically
    if (Math.random() < 0.03) {
      const startNode = this.circuitNodes[Math.floor(Math.random() * this.circuitNodes.length)];
      if (startNode.connections.length > 0) {
        const targetIdx = startNode.connections[Math.floor(Math.random() * startNode.connections.length)];
        this.dataPulses.push({
          fromIdx: this.circuitNodes.indexOf(startNode),
          toIdx: targetIdx,
          progress: 0,
          speed: 0.02 + Math.random() * 0.03,
          color: ['10,132,255', '0,229,255', '0,255,135'][Math.floor(Math.random() * 3)]
        });
      }
    }

    // Draw connections (circuit traces)
    for (let i = 0; i < this.circuitNodes.length; i++) {
      const node = this.circuitNodes[i];
      for (const j of node.connections) {
        if (j <= i) continue; // avoid double draw
        const other = this.circuitNodes[j];
        const avgPower = (node.activePower + other.activePower) / 2;
        const alpha = 0.03 + avgPower * 0.15;

        // Draw circuit trace (orthogonal or diagonal)
        this.ctx.beginPath();
        this.ctx.moveTo(node.x, node.y);

        // Create right-angle traces for circuit feel
        const midX = (node.x + other.x) / 2;
        if (Math.abs(node.x - other.x) > Math.abs(node.y - other.y)) {
          this.ctx.lineTo(midX, node.y);
          this.ctx.lineTo(midX, other.y);
        } else {
          const midY = (node.y + other.y) / 2;
          this.ctx.lineTo(node.x, midY);
          this.ctx.lineTo(other.x, midY);
        }
        this.ctx.lineTo(other.x, other.y);

        this.ctx.strokeStyle = `rgba(10, 132, 255, ${alpha})`;
        this.ctx.lineWidth = 0.6 + avgPower * 1.2;
        this.ctx.stroke();

        // Glow on active traces
        if (avgPower > 0.2) {
          this.ctx.strokeStyle = `rgba(10, 132, 255, ${avgPower * 0.06})`;
          this.ctx.lineWidth = 4;
          this.ctx.stroke();
        }
      }
    }

    // Draw nodes
    for (const node of this.circuitNodes) {
      const r = node.radius * (1 + node.activePower * 0.8);
      const alpha = 0.15 + node.activePower * 0.7;

      // Glow
      if (node.activePower > 0.1) {
        const glow = this.ctx.createRadialGradient(node.x, node.y, 0, node.x, node.y, r * 6);
        glow.addColorStop(0, `rgba(10, 132, 255, ${node.activePower * 0.2})`);
        glow.addColorStop(1, 'rgba(10, 132, 255, 0)');
        this.ctx.fillStyle = glow;
        this.ctx.fillRect(node.x - r * 6, node.y - r * 6, r * 12, r * 12);
      }

      // Draw node
      if (node.type === 'junction') {
        // Square junctions
        this.ctx.fillStyle = `rgba(10, 132, 255, ${alpha})`;
        this.ctx.fillRect(node.x - r, node.y - r, r * 2, r * 2);
      } else {
        this.ctx.beginPath();
        this.ctx.arc(node.x, node.y, r, 0, Math.PI * 2);
        this.ctx.fillStyle = `rgba(10, 132, 255, ${alpha})`;
        this.ctx.fill();
      }
    }

    // Draw data pulses
    for (let i = this.dataPulses.length - 1; i >= 0; i--) {
      const pulse = this.dataPulses[i];
      pulse.progress += pulse.speed;
      if (pulse.progress >= 1) { this.dataPulses.splice(i, 1); continue; }

      const from = this.circuitNodes[pulse.fromIdx];
      const to = this.circuitNodes[pulse.toIdx];
      if (!from || !to) { this.dataPulses.splice(i, 1); continue; }

      const px = from.x + (to.x - from.x) * pulse.progress;
      const py = from.y + (to.y - from.y) * pulse.progress;

      const pGlow = this.ctx.createRadialGradient(px, py, 0, px, py, 8);
      pGlow.addColorStop(0, `rgba(${pulse.color}, 0.7)`);
      pGlow.addColorStop(1, `rgba(${pulse.color}, 0)`);
      this.ctx.fillStyle = pGlow;
      this.ctx.fillRect(px - 8, py - 8, 16, 16);

      this.ctx.beginPath();
      this.ctx.arc(px, py, 2, 0, Math.PI * 2);
      this.ctx.fillStyle = `rgba(${pulse.color}, 0.9)`;
      this.ctx.fill();
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

  setHover(name: string | null) {
    this.isHovering = !!name;
    this.hoveredTech = name;
  }

  ngOnDestroy() {
    if (isPlatformBrowser(this.platformId)) {
      if (this.animationId) cancelAnimationFrame(this.animationId);
      if (this.canvasAnimId) cancelAnimationFrame(this.canvasAnimId);
      window.removeEventListener('mousemove', this.onGlobalMouse);
      window.removeEventListener('resize', this.resizeCanvas);
    }
  }
}

interface CircuitNode {
  x: number; y: number; radius: number;
  connections: number[]; active: boolean;
  activePower: number; type: 'node' | 'junction';
}

interface DataPulse {
  fromIdx: number; toIdx: number;
  progress: number; speed: number; color: string;
}
