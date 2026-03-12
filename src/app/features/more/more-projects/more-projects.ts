import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { MatCardModule } from '@angular/material/card';
import { TranslationService } from '../../../core/services/translation.service';
import { Nav } from '../../nav/nav';
import { MoreButton } from '../../../shared/more-button/more-button';

interface Project {
  id: string;
  title: string;
  img: string;
  descKey: any;
  github: string;
  category: string;
  tech: { name: string; icon: string }[];
}

@Component({
  selector: 'app-more-projects',
  standalone: true,
  imports: [CommonModule, RouterLink, MatCardModule, Nav, MoreButton],
  templateUrl: './more-projects.html',
  styleUrls: ['./more-projects.css']
})
export class MoreProjects {
  ts = inject(TranslationService);
  filter: string = 'All';

  projects: Project[] = [
    {
      id: 'comp-script',
      title: 'Comp-Script',
      category: 'Backend',
      img: 'assets/img/comp-script.png',
      descKey: 'PROJECT_COMP_DESC',
      github: 'https://github.com/EDK367/CompScript',
      tech: [
        { name: 'Java', icon: 'fab fa-java' },
        { name: 'JFlex', icon: 'fas fa-circle-check' },
        { name: 'JCup', icon: 'fas fa-circle-check' },
        { name: 'Swing', icon: 'fas fa-circle-check' }
      ]
    },
    {
      id: 'campus-league',
      title: 'Campus League',
      category: 'Fullstack',
      img: 'assets/img/logo-campus-league.png',
      descKey: 'PROJECT_CAMPUS_DESC',
      github: 'https://github.com/EDK367/Campus_League',
      tech: [
        { name: 'Java', icon: 'fab fa-java' },
        { name: 'SpringBoot', icon: 'fab fa-envira' },
        { name: 'MySQL', icon: 'fas fa-database' },
        { name: 'Angular', icon: 'fab fa-angular' }
      ]
    },
    {
      id: 'vigilant-eye',
      title: 'Vigilant Eye',
      category: 'Frontend',
      img: 'assets/img/ojo-vigilante.png',
      descKey: 'PROJECT_OJO_DESC',
      github: 'https://github.com/EDK367/Ojo_Vigilante',
      tech: [
        { name: 'Python', icon: 'fab fa-python' },
        { name: 'Kivy', icon: 'fas fa-circle-check' },
        { name: 'Mediapipe', icon: 'fas fa-circle-check' }
      ]
    }
  ];

  get filteredProjects() {
    if (this.filter === 'All') return this.projects;
    return this.projects.filter(p => 
      p.category === this.filter || p.tech.some(t => t.name === this.filter)
    );
  }

  setFilter(filter: string) {
    this.filter = filter;
  }
}