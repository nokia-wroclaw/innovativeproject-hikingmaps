import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Announcement } from '../app/announcement';
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
  public addAnnouncement(title: string, start: string, destination: string, route: string, date: string, description: string) {
    const key = this.auth.getKey();
    return this.http.post(`${environment.apiUrl}/sec/ann/add`,
      { title, start, destination, route, date, description}, { headers: { 'authorization': key } });
  }
  addInterest(id: String) {
    const key = this.auth.getKey();
    return this.http.post(`${environment.apiUrl}/sec/ann/interest?annId=${id}`, {}, { headers: { 'authorization': key } });
  }
  changeMyAnnouncement(id: string, title: string, start: string, destination: string, route: string, date: string, description: string) {
    const key = this.auth.getKey();
    return this.http.patch(`${environment.apiUrl}/sec/ann/edit`,
      {id, title, start, destination, route, date, description }, { headers: { 'authorization': key } });
  }
  deleteMyAnnouncement(id: String) {
    const key = this.auth.getKey();
    return this.http.delete(`${environment.apiUrl}/sec/ann/delete?annId=${id}`, { headers: { 'authorization': key } });
  }
  confirmUser(username: string, id: String) {
    const key = this.auth.getKey();
    return this.http.post(`${environment.apiUrl}/sec/ann/interest/accept?annId=${id}&username=${username}`, {}, { headers: { 'authorization': key } });
  }
}
