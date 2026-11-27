import { Component, inject, OnInit, PLATFORM_ID } from '@angular/core';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { PROJECTS, Project } from '../../../core/data/projects-data';
import { CommonModule, Location, isPlatformBrowser } from '@angular/common';
import { Nav } from '../../nav/nav';
import { TranslationService } from '../../../core/services/translation.service';

@Component({
  selector: 'app-project-details',
  standalone: true,
  imports: [CommonModule, RouterLink, Nav],
  templateUrl: './project-details.html',
  styleUrls: ['./project-details.css']
})
export class ProjectDetails implements OnInit {
  private route = inject(ActivatedRoute);
  private router = inject(Router);
  private location = inject(Location);
  private platformId = inject(PLATFORM_ID);
  ts = inject(TranslationService);
  
  project: Project | undefined;
  projectId: string | null = null;

  ngOnInit() {
    this.route.paramMap.subscribe(params => {
      this.projectId = params.get('id');
      if (this.projectId) {
        this.project = PROJECTS.find(p => p.id === this.projectId);
      }
      
      // Trigger animations
      setTimeout(() => {
        document.querySelectorAll('.reveal, .reveal-up, .reveal-scale, .reveal-left, .reveal-right').forEach(el => {
          el.classList.add('revealed');
        });
      }, 100);
    });
  }

  goBack(): void {
    if (isPlatformBrowser(this.platformId) && (window.history.state?.navigationId ?? 0) > 1) {
      this.location.back();
    } else {
      this.router.navigate(['/more-projects']);
    }
  }
}
