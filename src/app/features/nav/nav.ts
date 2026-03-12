import { Component, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { TranslationService } from '../../core/services/translation.service';
import { MoreButton } from '../../shared/more-button/more-button';

@Component({
  selector: 'app-nav',
  imports: [RouterLink, MoreButton],
  templateUrl: './nav.html',
  styleUrl: './nav.css'
})
export class Nav {
  ts = inject(TranslationService);
}
