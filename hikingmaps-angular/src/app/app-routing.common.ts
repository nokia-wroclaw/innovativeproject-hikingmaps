import { RegisterComponent } from './register/register.component';
import {LoginComponent} from './login/login.component';
import { Routes } from '@angular/router';
import { BrowseAnnouncementComponent} from './browse-announcement/browse-announcement.component';


export const componentDeclarations: any[] = [
];

export const providerDeclarations: any[] = [
];

export const routes: Routes = [
  {
    path: '',
    component: BrowseAnnouncementComponent,
    pathMatch: 'full',
  },
  {
    path: 'login',
    component: LoginComponent,
    pathMatch: 'full',
  }
];
