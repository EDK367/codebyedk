import { Component, inject, OnInit, OnDestroy, ElementRef, ViewChild, PLATFORM_ID } from '@angular/core';
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
export class Technologies implements OnInit, OnDestroy {
  ts = inject(TranslationService);
  private platformId = inject(PLATFORM_ID);
  
  @ViewChild('orbitSystem', { static: false }) orbitRef!: ElementRef<HTMLElement>;

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

  ngOnInit() {
    if (isPlatformBrowser(this.platformId)) {
      this.animate();
    }
  }

  private animate = () => {
    if (!this.isHovering && this.orbitRef) {
      this.rotation += 0.1;
      this.orbitRef.nativeElement.style.setProperty('--global-rotation', `${this.rotation}deg`);
    }
    this.animationId = requestAnimationFrame(this.animate);
  }

  setHover(name: string | null) {
    this.isHovering = !!name;
    this.hoveredTech = name;
  }

  ngOnDestroy() {
    if (isPlatformBrowser(this.platformId) && this.animationId) {
      cancelAnimationFrame(this.animationId);
    }
  }
}
