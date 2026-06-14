import { Component, inject, OnInit } from '@angular/core';
import { Nav } from '../../nav/nav';
import { TranslationService } from '../../../core/services/translation.service';

@Component({
  selector: 'app-more-technologies',
  standalone: true,
  imports: [Nav],
  templateUrl: './more-technologies.html',
  styleUrls: ['./more-technologies.css']
})
export class MoreTechnologies implements OnInit {
  ts = inject(TranslationService);

  ngOnInit() {
    setTimeout(() => {
      document.querySelectorAll('.reveal, .reveal-scale, .reveal-up').forEach(el => {
        el.classList.add('revealed');
      });
    }, 100);
  }
}