import { Component, inject, OnInit } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';
import { TranslationService } from '../../../core/services/translation.service';
import { Nav } from '../../nav/nav';
import { MoreButton } from '../../../shared/more-button/more-button';

@Component({
  selector: 'app-project-details',
  standalone: true,
  imports: [CommonModule, RouterLink, Nav, MoreButton],
  templateUrl: './project-details.html',
  styleUrls: ['./project-details.css']
})
export class ProjectDetails implements OnInit {
  ts = inject(TranslationService);
  route = inject(ActivatedRoute);

  projectId: string | null = null;

  ngOnInit() {
    this.projectId = this.route.snapshot.paramMap.get('id');
  }

  getProjectData() {
    if (this.projectId === 'comp-script') {
      return {
        title: 'Comp-Script',
        img: 'assets/img/comp-script.png',
        descKey: 'PROJECT_COMP_DESC' as const,
        github: 'https://github.com/EDK367/CompScript',
        tech: [
          { name: 'Java', icon: 'fab fa-java' },
          { name: 'JFlex', icon: 'fas fa-circle-check' },
          { name: 'JCup', icon: 'fas fa-circle-check' },
          { name: 'Swing', icon: 'fas fa-circle-check' }
        ]
      };
    } else if (this.projectId === 'campus-league') {
      return {
        title: 'Campus League',
        img: 'assets/img/logo-campus-league.png',
        descKey: 'PROJECT_CAMPUS_DESC' as const,
        github: 'https://github.com/EDK367/Campus_League',
        tech: [
          { name: 'Java', icon: 'fab fa-java' },
          { name: 'SpringBoot', icon: 'fab fa-envira' },
          { name: 'MySQL', icon: 'fas fa-database' },
          { name: 'Angular', icon: 'fab fa-angular' }
        ]
      };
    } else if (this.projectId === 'vigilant-eye') {
      return {
        title: 'Vigilant Eye',
        img: 'assets/img/ojo-vigilante.png',
        descKey: 'PROJECT_OJO_DESC' as const,
        github: 'https://github.com/EDK367/Ojo_Vigilante',
        tech: [
          { name: 'Python', icon: 'fab fa-python' },
          { name: 'Kivy', icon: 'fas fa-circle-check' },
          { name: 'Mediapipe', icon: 'fas fa-circle-check' }
        ]
      };
    }
    return null;
  }
}
