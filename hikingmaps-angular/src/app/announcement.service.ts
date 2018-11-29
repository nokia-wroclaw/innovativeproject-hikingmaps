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
    const key = this.auth.getKey();

    return this.http.get<Announcement[]>(`${environment.apiUrl}/sec/ann/all`, { headers: {'authorization': key}});
  }
  public addAnnouncement( title: string,  start: string, destination: string, description: string, date: string) {
    const key = this.auth.getKey();
    return this.http.post(`${environment.apiUrl}/sec/ann/add`, { title, date, description, start, destination}, { observe: 'response', headers: {'authorization': key} });
  }
  addInterest(id: String) {
    const key = this.auth.getKey();
    console.log(id);
    console.log(key);
    return this.http.post(`${environment.apiUrl}/sec/ann/interest`,  {params: {annId: id},  observe: 'response', headers: {'authorization': key} });
  }
  }
}
