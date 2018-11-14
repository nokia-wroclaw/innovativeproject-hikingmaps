import { environment } from '../environments/environment';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class AnnouncementService {

  constructor(
    private http: HttpClient
  ) {}

  public addAnnouncement(name: string, date: string, description: string, start: string, destination: string) {
    return this.http.post(`${environment.apiUrl}/announcement/add`, { name, date, description, start, destination});
  }
}
