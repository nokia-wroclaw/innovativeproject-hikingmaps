import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Announcement } from 'src/app/announcement';
import {environment} from '../environments/environment';

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
      date: '2017.11.10'
    },
    {
      name: 'Ogłoszenie na wycieczke 2',
      description: 'Tez szukam chetnych na wycieczke',
      start: 'Wrocław',
      destination: 'Kraków',
      date: '2018.11.24'
    },
    {
      name: 'Ogłoszenie na wycieczke 3',
      description: 'Tez szukam chetnych na wycieczke',
      start: 'Wrocław',
      destination: 'Kraków',
      date: '2018.11.10'
    },
    {
      name: 'Ogłoszenie na wycieczke 4',
      description: 'Tez szukam chetnych na wycieczke',
      start: 'Wrocław',
      destination: 'Kraków',
      date: '2018.12.02'
    },
    {
      name: 'Ogłoszenie na wycieczke 5',
      description: 'Tez szukam chetnych na wycieczke',
      start: 'Wrocław',
      destination: 'Kraków',
      date: '2018.05.22'
    },
    {
      name: 'Ogłoszenie na wycieczke 6',
      description: 'Tez szukam chetnych na wycieczke',
      start: 'Wrocław',
      destination: 'Kraków',
      date: '2018.09.22'
    }
  ];
  constructor(
    private http: HttpClient
  ) { }

  getAnnouncements()  {
    return this.announcements;
  }

  addInterest(announcement: Announcement) {
    // return this.http.post(`${environment.apiUrl}/announcement/interest`, { announcement.name});
  }
}
