import { Component, OnInit } from '@angular/core';
import { Router, NavigationEnd, RouterOutlet } from '@angular/router';
import { filter } from 'rxjs/operators';
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

  constructor(private router: Router) {}

  ngOnInit() {
    this.router.events.pipe(
      filter((event): event is NavigationEnd => event instanceof NavigationEnd)
    ).subscribe(() => {
      setTimeout(() => {
        window.scrollTo({ top: 0, left: 0, behavior: 'instant' });
      }, 50);
    });
  }
}