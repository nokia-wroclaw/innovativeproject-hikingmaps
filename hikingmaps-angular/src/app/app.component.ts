import { environment } from './../environments/environment';
import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  name = '';
  hello = '';
  constructor(
    private http: HttpClient
  ) { }
  handleSubmit() {
    console.log(this.name);
    this.http.get(`${environment.apiUrl}/hello?name=${this.name}`, { responseType: 'text' }).subscribe((hello) => {
      this.hello = hello;
    });
  }
}
