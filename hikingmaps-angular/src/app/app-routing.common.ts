import { Routes } from '@angular/router';

import { RegisterComponent } from './register/register.component';
import {LoginComponent} from './login/login.component';
import { BrowseAnnouncementComponent} from './browse-announcement/browse-announcement.component';
import {AddAnnouncementComponent} from './add-announcement/add-announcement.component';


export const componentDeclarations: any[] = [
];

export const providerDeclarations: any[] = [
];

export const routes: Routes = [
  {
    path: 'register',
    component: RegisterComponent,
    pathMatch: 'full',
  },
  {
    path: '',
    component: BrowseAnnouncementComponent,
    pathMatch: 'full',
  },
  {
    path: 'login',
    component: LoginComponent,
    pathMatch: 'full',
  },
  {
    path: 'announcement/add',
    component: AddAnnouncementComponent,
    pathMatch: 'full',
  }
];
