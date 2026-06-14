import { Component, inject, OnInit } from '@angular/core';
import { Nav } from '../../nav/nav';
import { TranslationService } from '../../../core/services/translation.service';
import { PROJECTS } from '../../../core/data/projects-data';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-more-projects',
  standalone: true,
  imports: [Nav, CommonModule, RouterLink],
  templateUrl: './more-projects.html',
  styleUrls: ['./more-projects.css']
})
export class MoreProjects implements OnInit {
  ts = inject(TranslationService);
  allProjects = PROJECTS;
  filteredProjects = this.allProjects;
  activeFilter = 'All';

  filters = ['All', 'Java', 'Python', 'Go', 'Web'];

  ngOnInit() {
    setTimeout(() => {
      document.querySelectorAll('.reveal, .reveal-scale, .reveal-up').forEach(el => {
        el.classList.add('revealed');
      });
    }, 100);
  }

  setFilter(filter: string) {
    this.activeFilter = filter;
    if (filter === 'All') {
      this.filteredProjects = this.allProjects;
    } else {
      this.filteredProjects = this.allProjects.filter(p => p.tags.includes(filter));
    }
    
    // Re-trigger animation
    setTimeout(() => {
      document.querySelectorAll('.project-card-wrapper').forEach((el, index) => {
        el.classList.remove('revealed');
        setTimeout(() => {
          el.classList.add('revealed');
        }, 50 * index);
      });
    }, 10);
  }
}