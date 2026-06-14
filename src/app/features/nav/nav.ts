import { Component, inject, OnInit, OnDestroy, PLATFORM_ID, HostListener } from '@angular/core';
import { RouterLink } from '@angular/router';
import { isPlatformBrowser } from '@angular/common';
import { TranslationService } from '../../core/services/translation.service';

@Component({
  selector: 'app-nav',
  imports: [RouterLink],
  templateUrl: './nav.html',
  styleUrl: './nav.css'
})
export class Nav implements OnInit, OnDestroy {
  ts = inject(TranslationService);
  private platformId = inject(PLATFORM_ID);

  isScrolled = false;
  mobileMenuOpen = false;
  isDarkTheme = true;
  activeSection = 'about';

  private scrollListener: (() => void) | null = null;

  ngOnInit() {
    if (isPlatformBrowser(this.platformId)) {
      const saved = localStorage.getItem('theme');
      if (saved === 'light') {
        this.isDarkTheme = false;
        document.documentElement.setAttribute('data-theme', 'light');
      }
    }
  }

  @HostListener('window:scroll')
  onScroll() {
    if (isPlatformBrowser(this.platformId)) {
      this.isScrolled = window.scrollY > 80;

      const sections = ['about', 'technologies', 'projects', 'contact'];
      for (const id of sections) {
        const el = document.getElementById(id);
        if (el) {
          const rect = el.getBoundingClientRect();
          if (rect.top <= 200 && rect.bottom >= 200) {
            this.activeSection = id;
            break;
          }
        }
      }
    }
  }

  toggleTheme() {
    this.isDarkTheme = !this.isDarkTheme;
    const theme = this.isDarkTheme ? 'dark' : 'light';
    document.documentElement.setAttribute('data-theme', theme);
    if (isPlatformBrowser(this.platformId)) {
      localStorage.setItem('theme', theme);
    }
  }

  toggleMobileMenu() {
    this.mobileMenuOpen = !this.mobileMenuOpen;
    if (isPlatformBrowser(this.platformId)) {
      document.body.style.overflow = this.mobileMenuOpen ? 'hidden' : '';
    }
  }

  closeMobileMenu() {
    this.mobileMenuOpen = false;
    if (isPlatformBrowser(this.platformId)) {
      document.body.style.overflow = '';
    }
  }

  ngOnDestroy() {
    if (this.scrollListener) this.scrollListener();
  }
}
