import { SessionService } from './session.service';
import { environment } from './../environments/environment';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(
    private http: HttpClient,
    private auth: SessionService
  ) { }

  public addUser(login: string, email: string, password: string) {
    return this.http.post(`${environment.apiUrl}/user/register`, { login, email, password });
  }
  public loginUser(login: string, password: string) {
    let observer = null;
    const newObservable = new Observable((obs) => {
      observer = obs;
      return { unsubscribe() { observer = null; } };
    });
    this.http.post(`${environment.apiUrl}/user/login`, { login, password }, { observe: 'response' })
      .subscribe((response) => {
        this.auth.setKey(response.headers.get('authorization'));
        if (observer) {
          observer.next();
        }
      }, (error) => {
        if (observer) {
          observer.error(error);
        }
      }, () => {
        if (observer) {
          observer.complete();
        }
      });
    return newObservable;
  }
  public logoutUser() {
    this.auth.dropKey();
  }
}
