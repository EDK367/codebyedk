import { Component } from '@angular/core';
import { MoreButton } from '../../shared/more-button/more-button';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-technologies',
  imports: [MoreButton, RouterLink],
  templateUrl: './technologies.html',
  styleUrl: './technologies.css'
})
export class Technologies {

  tech = [
    { name: "Java", icon: "fab fa-java" },
    { name: "SpringBoot", icon: "fab fa-envira" },   
    { name: "MySQL", icon: "fas fa-database" },          
    { name: "Python", icon: "fab fa-python" },
    { name: "Go", icon: "fab fa-golang" },     
    { name: "Git", icon: "fab fa-square-git" },  
    { name: "Docker", icon: "fab fa-docker" },
    { name: "MongoDB", icon: "fas fa-leaf" },            
    { name: "JavaScript", icon: "fab fa-js" },
    { name: "Vue.js", icon: "fab fa-vuejs" },
  ];

}
