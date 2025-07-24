import { Component } from '@angular/core';
import { Input } from '@angular/core';

@Component({
  selector: 'app-more-button',
  imports: [],
  templateUrl: './more-button.html',
  styleUrl: './more-button.css'
})
export class MoreButton {
  @Input() text: string = 'Click';
  @Input() type: string = 'button';
  @Input() disabled: boolean = false;
}
