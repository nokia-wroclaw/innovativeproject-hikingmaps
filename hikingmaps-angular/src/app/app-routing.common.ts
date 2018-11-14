import { RegisterComponent } from './register/register.component';
import { Routes } from '@angular/router';
import {AddAnnouncementComponent} from './add-announcement/add-announcement.component';

export const componentDeclarations: any[] = [
];

export const providerDeclarations: any[] = [
];

export const routes: Routes = [
  /*
  {
    path: '',
    component: RegisterComponent,
    pathMatch: 'full',
  },
  */
  {
    path: '',
    component: AddAnnouncementComponent,
    pathMatch: 'full',
  }
];
