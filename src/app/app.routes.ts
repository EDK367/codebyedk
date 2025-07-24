import { Routes } from '@angular/router';
import { Home } from './features/home/home';
import { MoreAbout} from './features/more/more-about/more-about';

export const routes: Routes = [
    { path: '', component: Home },
    { path: 'more-about', component: MoreAbout },
    
];
