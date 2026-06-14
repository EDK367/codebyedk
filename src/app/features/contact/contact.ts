import { Component, inject, ElementRef, ViewChild, OnInit, OnDestroy, PLATFORM_ID } from '@angular/core';
import { CommonModule, isPlatformBrowser } from '@angular/common';
import { TranslationService } from '../../core/services/translation.service';

@Component({
  selector: 'app-contact',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './contact.html',
  styleUrls: ['./contact.css']
})
export class Contact implements OnInit, OnDestroy {
  ts = inject(TranslationService);
  private platformId = inject(PLATFORM_ID);

  @ViewChild('contactContainer', { static: false }) containerRef!: ElementRef<HTMLElement>;

  private onMouseMove = (e: MouseEvent) => {
    if (!this.containerRef) return;
    const container = this.containerRef.nativeElement;
    const rect = container.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    
    container.style.setProperty('--mouseX', `${x}px`);
    container.style.setProperty('--mouseY', `${y}px`);
  };

  ngOnInit() {
    if (isPlatformBrowser(this.platformId)) {
      setTimeout(() => {
        if (this.containerRef) {
          this.containerRef.nativeElement.addEventListener('mousemove', this.onMouseMove);
        }
      }, 500);
    }
  }

  ngOnDestroy() {
    if (isPlatformBrowser(this.platformId) && this.containerRef) {
      this.containerRef.nativeElement.removeEventListener('mousemove', this.onMouseMove);
    }
  }
}
