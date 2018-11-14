import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { AppComponent } from './app.component';
import { HelloComponent } from './hello/hello.component';
import { RegisterComponent } from './register/register.component';
import { AppRoutingModule } from './app-routing.module';
import { MapsComponent } from './maps/maps.component';
import { BrowseAnnouncementComponent } from './browse-announcement/browse-announcement.component';
import { DataViewModule } from 'primeng/dataview';

@NgModule({
  declarations: [
    AppComponent,
    HelloComponent,
    RegisterComponent,
    MapsComponent,
    BrowseAnnouncementComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule,
    AppRoutingModule,
    DataViewModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
