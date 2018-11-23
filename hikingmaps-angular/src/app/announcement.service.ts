import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Announcement } from 'src/app/announcement';

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
      date: '10/11/2017'
    },
    {
      name: 'Ogłoszenie na wycieczke 2',
      description: 'Tez szukam chetnych na wycieczke',
      start: 'Wrocław',
      destination: 'Kraków',
      date: '24/11/2018'
    },
    {
      name: 'Ogłoszenie na wycieczke 3',
      description: 'Tez szukam chetnych na wycieczke',
      start: 'Wrocław',
      destination: 'Kraków',
      date: '10/11/2018'
    },
    {
      name: 'Ogłoszenie na wycieczke 4',
      description: 'Tez szukam chetnych na wycieczke',
      start: 'Wrocław',
      destination: 'Kraków',
      date: '22/12/2018'
    },
    {
      name: 'Ogłoszenie na wycieczke 5',
      description: 'Tez szukam chetnych na wycieczke',
      start: 'Wrocław',
      destination: 'Kraków',
      date: '22/5/2018'
    },
    {
      name: 'Ogłoszenie na wycieczke 6',
      description: 'Tez szukam chetnych na wycieczke',
      start: 'Wrocław',
      destination: 'Kraków',
      date: '22/9/2018'
    }
  ];
  constructor(
    private http: HttpClient
  ) { }

  getAnnouncements()  {
    return this.announcements;
  }
}
