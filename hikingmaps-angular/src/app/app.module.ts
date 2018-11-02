import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { AppComponent } from './app.component';
import { HelloComponent } from './hello/hello.component';
<<<<<<< HEAD
import { RegisterComponent } from './register/register.component';
=======
import {MapsComponent} from './maps/maps.component';
>>>>>>> d5924416e6f6d6cf72d6ec8bea695a41e923b0ba

@NgModule({
  declarations: [
    AppComponent,
    HelloComponent,
<<<<<<< HEAD
    RegisterComponent,
=======
    MapsComponent
>>>>>>> d5924416e6f6d6cf72d6ec8bea695a41e923b0ba
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
