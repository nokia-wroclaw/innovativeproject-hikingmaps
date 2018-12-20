import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SessionService {

  private auth = false;
  private key: string;

  constructor() { }

  setKey(key: string) {
    this.key = key;
    this.auth = true;
  }

  getKey(): string {
    return this.key;
  }
  dropKey() {
    this.key = '';
    this.auth = false;
  }

  isAuth(): boolean {
    return this.auth;
  }

}
