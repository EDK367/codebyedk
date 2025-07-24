import { Routes } from '@angular/router';
import { Home } from './features/home/home';
import { MoreAbout} from './features/more/more-about/more-about';
import { MoreTechnologies } from './features/more/more-technologies/more-technologies';

export const routes: Routes = [
    { path: '', component: Home },
    { path: 'more-about', component: MoreAbout },
    { path: 'more-technologies', component: MoreTechnologies },

];
