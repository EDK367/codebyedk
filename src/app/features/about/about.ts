import { Component, inject, OnInit, OnDestroy, ElementRef, ViewChild, PLATFORM_ID } from '@angular/core';
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
export class About implements OnInit, OnDestroy {
  ts = inject(TranslationService);
  private platformId = inject(PLATFORM_ID);

  @ViewChild('cardContainer', { static: false }) cardRef!: ElementRef<HTMLElement>;

  private onMouseMove = (e: MouseEvent) => {
    if (!this.cardRef) return;
    const card = this.cardRef.nativeElement;
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    
    // Calculate rotation (-10 to 10 degrees)
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    const rotateX = ((y - centerY) / centerY) * -10;
    const rotateY = ((x - centerX) / centerX) * 10;
    
    card.style.setProperty('--rotateX', `${rotateX}deg`);
    card.style.setProperty('--rotateY', `${rotateY}deg`);
    card.style.setProperty('--mouseX', `${x}px`);
    card.style.setProperty('--mouseY', `${y}px`);
  };

  private onMouseLeave = () => {
    if (!this.cardRef) return;
    const card = this.cardRef.nativeElement;
    card.style.setProperty('--rotateX', `0deg`);
    card.style.setProperty('--rotateY', `0deg`);
  };

  ngOnInit() {
    if (isPlatformBrowser(this.platformId)) {
      setTimeout(() => {
        if (this.cardRef) {
          this.cardRef.nativeElement.addEventListener('mousemove', this.onMouseMove);
          this.cardRef.nativeElement.addEventListener('mouseleave', this.onMouseLeave);
        }
      }, 500);
    }
  }

  ngOnDestroy() {
    if (isPlatformBrowser(this.platformId) && this.cardRef) {
      this.cardRef.nativeElement.removeEventListener('mousemove', this.onMouseMove);
      this.cardRef.nativeElement.removeEventListener('mouseleave', this.onMouseLeave);
    }
  }
}