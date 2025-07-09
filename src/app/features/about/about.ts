import { Component } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-about',
  standalone: true,
  imports: [MatButtonModule, MatIconModule],
  templateUrl: './about.html',
  styleUrls: ['./about.css']
})
export class About {
  hover = false;
}