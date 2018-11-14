import { BrowserModule } from '@angular/platform-browser';
import { NgModule} from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { AppComponent } from './app.component';
import { HelloComponent } from './hello/hello.component';
import { RegisterComponent } from './register/register.component';
import { AppRoutingModule } from './app-routing.module';
import { MapsComponent } from './maps/maps.component';
import { AddAnnouncementComponent } from './add-announcement/add-announcement.component';
import { CalendarModule} from 'primeng/calendar';
import { BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {InputTextareaModule} from 'primeng/inputtextarea';

@NgModule({
  declarations: [
    AppComponent,
    HelloComponent,
    RegisterComponent,
    MapsComponent,
    AddAnnouncementComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule,
    AppRoutingModule,
    CalendarModule,
    BrowserAnimationsModule,
    InputTextareaModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
