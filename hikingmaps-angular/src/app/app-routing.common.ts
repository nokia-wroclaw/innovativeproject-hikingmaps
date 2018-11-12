import { RegisterComponent } from './register/register.component';
import { Routes } from '@angular/router';

export const componentDeclarations: any[] = [
];

export const providerDeclarations: any[] = [
];

export const routes: Routes = [
  {
    path: '',
    component: RegisterComponent,
    pathMatch: 'full',
  }
];
