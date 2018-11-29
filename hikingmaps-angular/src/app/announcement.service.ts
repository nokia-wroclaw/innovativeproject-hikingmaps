import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Announcement } from 'src/app/announcement';
import { environment } from '../environments/environment';
import {SessionService} from './session.service';

@Injectable({
  providedIn: 'root'
})
export class AnnouncementService {

  constructor(
    private http: HttpClient,
    private auth: SessionService
  ) { }

  getAnnouncements()  {
    return this.http.get<Announcement[]>(`${environment.apiUrl}/sec/ann/all`);
  }
  public addAnnouncement(id: string, title: string,  start: string, destination: string, description: string, date: string) {
    return this.http.post(`${environment.apiUrl}/sec/ann/add`, { id, title, start, destination, description, date});

  }
  addInterest(announcement: Announcement) {
    // return this.http.post(`${environment.apiUrl}/announcement/interest`, { announcement.name});
  }
}
