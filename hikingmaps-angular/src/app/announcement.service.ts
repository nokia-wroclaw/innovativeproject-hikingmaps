
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Announcement } from 'src/app/announcement';
import { environment } from '../environments/environment';



@Injectable({
  providedIn: 'root'
})
export class AnnouncementService {

  announcements: Announcement[] = [
    {
      name: 'Ogłoszenie na wycieczke 1',
      description: 'Szukam chetnych na wycieczke',
      start: 'Warszawa',
      destination: 'Gdańsk',
      date: '10/11/2018'
    },
    {
      name: 'Ogłoszenie na wycieczke 2',
      description: 'Tez szukam chetnych na wycieczke',
      start: 'Wrocław',
      destination: 'Kraków',
      date: '22/11/2018'
    }
  ];
  constructor(
    private http: HttpClient
  ) { }

  getAnnouncements() {
    return this.announcements;
  }

  public addAnnouncement(name: string, date: string, description: string, start: string, destination: string) {
    return this.http.post(`${environment.apiUrl}/announcement/add`, { name, date, description, start, destination});

  }
}
