import { RegisterComponent } from './register/register.component';
import { Routes } from '@angular/router';
import {EditRoutesComponent} from './edit-routes/edit-routes.component';

export const componentDeclarations: any[] = [
];

export const providerDeclarations: any[] = [
];

export const routes: Routes = [
  {
    path: '',
    component: EditRoutesComponent,
    pathMatch: 'full',
  }
];
