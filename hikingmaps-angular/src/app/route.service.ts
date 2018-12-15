import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { SessionService } from './session.service';
import { Route } from './route';
import { environment } from '../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class RouteService {

  constructor(
    private http: HttpClient,
    private auth: SessionService
  ) { }

  getAllRoutes() {
    const key = this.auth.getKey();
    return this.http.get<Route[]>(`${environment.apiUrl}/sec/route/all`, { headers: { 'authorization': key } });
  }

  public addRoute(points: string) {
    const key = this.auth.getKey();
    return this.http.post(`${environment.apiUrl}/sec/route/add`,
      { points }, { headers: { 'authorization': key } });
  }

  deleteRoute(id: String) {
    const key = this.auth.getKey();
    return this.http.delete(`${environment.apiUrl}/sec/route/delete?routeId=${id}`, { headers: { 'authorization': key } });
  }
}
