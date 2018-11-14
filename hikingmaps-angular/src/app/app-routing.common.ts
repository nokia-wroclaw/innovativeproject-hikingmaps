import { RegisterComponent } from './register/register.component';
import {LoginComponent} from './login/login.component';
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
  },
  {
    path: 'login',
    component: LoginComponent,
    pathMatch: 'full',
  }
];
