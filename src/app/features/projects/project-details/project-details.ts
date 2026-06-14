import { Component, inject, OnInit } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { PROJECTS, Project } from '../../../core/data/projects-data';
import { CommonModule } from '@angular/common';
import { Nav } from '../../nav/nav';

@Component({
  selector: 'app-project-details',
  standalone: true,
  imports: [CommonModule, RouterLink, Nav],
  templateUrl: './project-details.html',
  styleUrls: ['./project-details.css']
})
export class ProjectDetails implements OnInit {
  private route = inject(ActivatedRoute);
  
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
}
