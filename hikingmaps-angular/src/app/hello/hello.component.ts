import { environment } from './../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-hello',
  templateUrl: './hello.component.html',
  styleUrls: ['./hello.component.css']
})
export class HelloComponent implements OnInit {

  name = '';
  hello = '';

  ngOnInit() {
  }

  constructor(
    private http: HttpClient
  ) { }
  handleSubmit() {
    this.http.get<HelloWorld>(`${environment.apiUrl}/hello?name=${this.name}`).subscribe((hello) => {
      this.hello = hello.name;
    });
  }

}
