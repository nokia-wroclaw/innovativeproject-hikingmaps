import { RegisterComponent } from './register/register.component';
import { Routes } from '@angular/router';
import {AddComponent} from './announcement/add/add.component';

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
    component: AddComponent,
    pathMatch: 'full',
  }
];
