import { Routes } from '@angular/router';

import { RegisterComponent } from './register/register.component';
import {LoginComponent} from './login/login.component';
import { BrowseAnnouncementComponent} from './browse-announcement/browse-announcement.component';
import {AddAnnouncementComponent} from './add-announcement/add-announcement.component';
import {EditRoutesComponent} from './edit-routes/edit-routes.component';


export const componentDeclarations: any[] = [
];

export const providerDeclarations: any[] = [
];

export const routes: Routes = [
  {
    path: '',
    redirectTo: '/login',
    pathMatch: 'full',
  },
  {
    path: 'login',
    component: LoginComponent,
  },
  {
    path: 'register',
    component: RegisterComponent,
  },
  {
    path: 'add',
    component: AddAnnouncementComponent,
  },
  {
    path: 'browse',
    component: BrowseAnnouncementComponent,
  },
  {
    path: 'routes',
    component: EditRoutesComponent
  }
];
