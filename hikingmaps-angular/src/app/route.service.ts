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
    return this.http.get<Route[]>(`${environment.apiUrl}/admin/route/all`, { headers: { 'authorization': key } });
  }

  public addRoute(points: string, distance: string) {
    const key = this.auth.getKey();
    return this.http.post(`${environment.apiUrl}/admin/route/add`,
      { points, distance }, { headers: { 'authorization': key } });
  }

  editRoute(id: string, points: string, distance: string) {
    const key = this.auth.getKey();
    return this.http.patch(`${environment.apiUrl}/admin/route/edit`,
      { id, points, distance }, { headers: { 'authorization': key } });
  }

  deleteRoute(id: string) {
    const key = this.auth.getKey();
    return this.http.delete(`${environment.apiUrl}/admin/route/delete?routeId=${id}`, { headers: { 'authorization': key } });
  }
}
