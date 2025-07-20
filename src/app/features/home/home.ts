import { Component } from '@angular/core';
import { Nav } from '../nav/nav';
import { About } from '../about/about';
import { Technologies } from '../technologies/technologies';
import { Contact } from '../contact/contact';
import { Projects } from "../projects/projects";

@Component({
  selector: 'app-home',
  imports: [Nav, About, Technologies, Projects,  Contact],
  templateUrl: './home.html',
  styleUrl: './home.css'
})
export class Home {

}
