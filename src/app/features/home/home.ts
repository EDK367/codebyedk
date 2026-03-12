import { Component, inject } from '@angular/core';
import { Nav } from '../nav/nav';
import { About } from '../about/about';
import { Technologies } from '../technologies/technologies';
import { Contact } from '../contact/contact';
import { Projects } from "../projects/projects";
import { TranslationService } from '../../core/services/translation.service';

@Component({
  selector: 'app-home',
  imports: [Nav, About, Technologies, Projects,  Contact],
  templateUrl: './home.html',
  styleUrl: './home.css'
})
export class Home {
  ts = inject(TranslationService);
}
