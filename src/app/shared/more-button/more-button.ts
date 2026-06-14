import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-more-button',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './more-button.html',
  styleUrls: ['./more-button.css']
})
export class MoreButton {
  @Input() text: string = 'Click';
  @Input() type: string = 'button';
  @Input() disabled: boolean = false;
  @Input() icon: string = '';
}
