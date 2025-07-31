
import { Component } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { CommonModule } from '@angular/common';
import { MoreButton } from '../../shared/more-button/more-button';

@Component({
  selector: 'app-projects',
  imports: [MatCardModule, MatButtonModule, CommonModule, MoreButton],
  templateUrl: './projects.html',
  styleUrl: './projects.css'
})
export class Projects {
  showMoreProjectsPopup = false;

  openMoreProjectsPopup() {
    this.showMoreProjectsPopup = true;
  }

  closeMoreProjectsPopup() {
    this.showMoreProjectsPopup = false;
  }
}
