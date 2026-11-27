import { Component, inject, OnInit } from '@angular/core';
import { Router, NavigationStart, NavigationEnd, RouterOutlet } from '@angular/router';
import { CustomCursor } from './shared/custom-cursor/custom-cursor';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, CustomCursor],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App implements OnInit {
  title = 'Portfolio';
  private router = inject(Router);
  private isPopState = false;

  ngOnInit() {
    this.router.events.subscribe((event) => {
      if (event instanceof NavigationStart) {
        this.isPopState = event.navigationTrigger === 'popstate';
      } else if (event instanceof NavigationEnd) {
        if (!this.isPopState && !event.urlAfterRedirects.includes('#')) {
          setTimeout(() => {
            window.scrollTo({ top: 0, left: 0, behavior: 'instant' });
          }, 50);
        }
      }
    });
  }
}