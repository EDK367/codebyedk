
import { Component, inject } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { MoreButton } from '../../shared/more-button/more-button';
import { TranslationService } from '../../core/services/translation.service';

@Component({
  selector: 'app-projects',
  imports: [MatCardModule, MatButtonModule, CommonModule, MoreButton, RouterLink],
  templateUrl: './projects.html',
  styleUrl: './projects.css'
})
export class Projects {
  ts = inject(TranslationService);
}
