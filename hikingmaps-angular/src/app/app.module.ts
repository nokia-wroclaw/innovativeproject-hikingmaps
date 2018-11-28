import { MessageService } from 'primeng/api';

import { BrowserModule } from '@angular/platform-browser';
import { NgModule} from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { ToastModule } from 'primeng/toast';
import { CalendarModule } from 'primeng/calendar';
import { InputTextareaModule } from 'primeng/inputtextarea';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppRoutingModule } from './app-routing.module';
import { DataViewModule } from 'primeng/dataview';
import {MenubarModule} from 'primeng/menubar';

import { AppComponent } from './app.component';
import { HelloComponent } from './hello/hello.component';
import { RegisterComponent } from './register/register.component';
import { MapsComponent } from './maps/maps.component';
import { LoginComponent } from './login/login.component';
import { BrowseAnnouncementComponent } from './browse-announcement/browse-announcement.component';
import { DropdownModule} from 'primeng/primeng';
import { PanelModule} from 'primeng/primeng';
import { DialogModule} from 'primeng/primeng';
import { ButtonModule} from 'primeng/primeng';
import { AddAnnouncementComponent } from './add-announcement/add-announcement.component';



@NgModule({
  declarations: [
    AppComponent,
    HelloComponent,
    RegisterComponent,
    MapsComponent,
    LoginComponent,
    BrowseAnnouncementComponent,
    AddAnnouncementComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule,
    AppRoutingModule,
    ToastModule,
    BrowserAnimationsModule,
    DataViewModule,
    CalendarModule,
    BrowserAnimationsModule,
    InputTextareaModule,
    ToastModule,
    MenubarModule,
    DropdownModule,
    PanelModule,
    DialogModule,
    BrowserAnimationsModule,
    ButtonModule
  ],
  providers: [MessageService],
  bootstrap: [AppComponent]
})
export class AppModule { }
