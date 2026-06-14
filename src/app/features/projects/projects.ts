import { Component, inject, ElementRef, QueryList, ViewChildren, AfterViewInit, OnDestroy, PLATFORM_ID } from '@angular/core';
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
    if (isPlatformBrowser(this.platformId)) {
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
    }
  }

  ngOnDestroy() {
    if (isPlatformBrowser(this.platformId)) {
      this.listeners.forEach((handlers, card) => {
        card.removeEventListener('mousemove', handlers.move);
        card.removeEventListener('mouseleave', handlers.leave);
      });
      this.listeners.clear();
    }
  }
}
