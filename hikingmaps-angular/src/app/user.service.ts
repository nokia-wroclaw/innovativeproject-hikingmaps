import { environment } from './../environments/environment';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';


@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(
    private http: HttpClient
  ) {}

  public addUser(login: string, email: string, password: string) {
    return this.http.post(`${environment.apiUrl}/user/register`, { login, email, password});
  }
}
