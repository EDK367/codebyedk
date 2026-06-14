import { Component, OnInit, OnDestroy, Renderer2, inject, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';

@Component({
  selector: 'app-custom-cursor',
  standalone: true,
  templateUrl: './custom-cursor.html',
  styleUrl: './custom-cursor.css'
})
export class CustomCursor implements OnInit, OnDestroy {
  private platformId = inject(PLATFORM_ID);
  private renderer = inject(Renderer2);

  cursorX = 0;
  cursorY = 0;
  ringX = 0;
  ringY = 0;
  cursorLabel = '';
  isHovering = false;
  isClicking = false;
  isHidden = false;
  private animationId = 0;
  private listeners: (() => void)[] = [];

  ngOnInit() {
    if (!isPlatformBrowser(this.platformId)) return;
    if ('ontouchstart' in window || navigator.maxTouchPoints > 0) {
      this.isHidden = true;
      return;
    }

    const onMouseMove = this.renderer.listen('document', 'mousemove', (e: MouseEvent) => {
      this.cursorX = e.clientX;
      this.cursorY = e.clientY;
    });
    this.listeners.push(onMouseMove);

    const onMouseDown = this.renderer.listen('document', 'mousedown', () => {
      this.isClicking = true;
    });
    this.listeners.push(onMouseDown);

    const onMouseUp = this.renderer.listen('document', 'mouseup', () => {
      this.isClicking = false;
    });
    this.listeners.push(onMouseUp);

    const onMouseOver = this.renderer.listen('document', 'mouseover', (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      const interactive = target.closest('a, button, [data-cursor]');
      if (interactive) {
        this.isHovering = true;
        const label = interactive.getAttribute('data-cursor') || '';
        this.cursorLabel = label;
      }
    });
    this.listeners.push(onMouseOver);

    const onMouseOut = this.renderer.listen('document', 'mouseout', (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      const interactive = target.closest('a, button, [data-cursor]');
      if (interactive) {
        this.isHovering = false;
        this.cursorLabel = '';
      }
    });
    this.listeners.push(onMouseOut);

    this.animate();
  }

  private animate() {
    const lerp = (a: number, b: number, t: number) => a + (b - a) * t;
    this.ringX = lerp(this.ringX, this.cursorX, 0.12);
    this.ringY = lerp(this.ringY, this.cursorY, 0.12);
    this.animationId = requestAnimationFrame(() => this.animate());
  }

  ngOnDestroy() {
    this.listeners.forEach(fn => fn());
    if (this.animationId) cancelAnimationFrame(this.animationId);
  }
}
