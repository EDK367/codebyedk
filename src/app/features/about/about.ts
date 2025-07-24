import { Component } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { MoreButton } from '../../shared/more-button/more-button';

@Component({
  selector: 'app-about',
  standalone: true,
  imports: [CommonModule, RouterLink, MatButtonModule, MatIconModule, MoreButton],
  templateUrl: './about.html',
  styleUrls: ['./about.css']
})
export class About {
}