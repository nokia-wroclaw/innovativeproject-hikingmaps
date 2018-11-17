import { MessageService } from 'primeng/api';
import { NgModule, NO_ERRORS_SCHEMA } from '@angular/core';
import { NativeScriptModule } from 'nativescript-angular/nativescript.module';
import { ToastModule } from 'primeng/toast';
import { AppRoutingModule } from './app-routing.module.tns';
import { NativeScriptHttpClientModule } from 'nativescript-angular/http-client';
import { NativeScriptFormsModule } from 'nativescript-angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { DataViewModule } from 'primeng/dataview';

import { AppComponent } from './app.component';
import { HelloComponent } from './hello/hello.component';
import { RegisterComponent } from './register/register.component';
import { LoginComponent } from './login/login.component';
import { MapsComponent } from './maps/maps.component';
import { BrowseAnnouncementComponent } from './browse-announcement/browse-announcement.component';




@NgModule({
  declarations: [
    AppComponent,
    HelloComponent,
    RegisterComponent,
    MapsComponent,
    LoginComponent,
    BrowseAnnouncementComponent
  ],
  imports: [
    NativeScriptModule,
    AppRoutingModule,
    NativeScriptHttpClientModule,
    NativeScriptFormsModule,
    BrowserAnimationsModule,
    ToastModule,
    DataViewModule
  ],
  providers: [MessageService],
  bootstrap: [AppComponent],
  schemas: [NO_ERRORS_SCHEMA]
})
/*
Pass your application module to the bootstrapModule function located in main.ts to start your app
*/
export class AppModule { }
