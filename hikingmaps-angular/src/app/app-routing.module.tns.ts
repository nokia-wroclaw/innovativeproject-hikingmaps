import { HelloComponent } from './hello/hello.component';
import { NgModule } from '@angular/core';
import { NativeScriptRouterModule } from 'nativescript-angular/router';
import { Routes } from '@angular/router';


export const routes: Routes = [
  {
      path: '',
      redirectTo: '/auto-generated',
      pathMatch: 'full',
  },
  {
      path: 'auto-generated',
      component: HelloComponent,
  },
];

@NgModule({
  imports: [NativeScriptRouterModule.forRoot(routes)],
  exports: [NativeScriptRouterModule]
})
export class AppRoutingModule { }
