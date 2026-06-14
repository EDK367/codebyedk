import { Component, inject, OnInit } from '@angular/core';
import { Nav } from '../../nav/nav';
import { TranslationService } from '../../../core/services/translation.service';

@Component({
  selector: 'app-more-about',
  standalone: true,
  imports: [Nav],
  templateUrl: './more-about.html',
  styleUrls: ['./more-about.css']
})
export class MoreAbout implements OnInit {
  ts = inject(TranslationService);

  ngOnInit() {
    setTimeout(() => {
      document.querySelectorAll('.reveal, .reveal-left, .reveal-right, .reveal-scale').forEach(el => {
        el.classList.add('revealed');
      });
    }, 100);
  }
}