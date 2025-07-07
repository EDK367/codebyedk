import { Component } from '@angular/core';
import { About } from '../about/about';
import { Technologies } from '../technologies/technologies';

@Component({
  selector: 'app-home',
  imports: [About, Technologies],
  templateUrl: './home.html',
  styleUrl: './home.css'
})
export class Home {

}
