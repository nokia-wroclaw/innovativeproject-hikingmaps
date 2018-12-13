import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Announcement } from 'src/app/announcement';
import { environment } from '../environments/environment';
import { SessionService } from './session.service';

@Injectable({
  providedIn: 'root'
})
export class AnnouncementService {

  constructor(
    private http: HttpClient,
    private auth: SessionService
  ) { }

  getAllAnnouncements() {
    const key = this.auth.getKey();
    return this.http.get<Announcement[]>(`${environment.apiUrl}/sec/ann/all`, { headers: { 'authorization': key } });
  }
  getMyAnnouncements() {
    const key = this.auth.getKey();
    return this.http.get<Array<any>>(`${environment.apiUrl}/sec/ann/my`, { headers: { 'authorization': key } });
  }
  getInterestingAnnouncements() {
    const key = this.auth.getKey();
    return this.http.get<Array<any>>(`${environment.apiUrl}/sec/ann/interest/my`, { headers: { 'authorization': key } });
  }
  public addAnnouncement(title: string, start: string, destination: string, description: string, date: string) {
    const key = this.auth.getKey();
    return this.http.post(`${environment.apiUrl}/sec/ann/add`,
      { title, date, description, start, destination }, { headers: { 'authorization': key } });
  }
  addInterest(id: String) {
    const key = this.auth.getKey();
    return this.http.post(`${environment.apiUrl}/sec/ann/interest?annId=${id}`, {}, { headers: { 'authorization': key } });
  }

}
