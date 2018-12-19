import { Component, OnInit } from '@angular/core';
import { AnnouncementService } from '../announcement.service';
import {MenuItem, MessageService} from 'primeng/api';
import { Router } from '@angular/router';
import * as Leaflet from 'leaflet';
import {RouteService} from '../route.service';
import {Route} from '../route';
import {UserService} from '../user.service';

@Component({
  selector: 'app-add',
  templateUrl: './add-announcement.component.html',
  styleUrls: ['./add-announcement.component.css']
})
export class AddAnnouncementComponent implements OnInit {

  public title = '';
  public description = '';
  public date = '';
  public start = '';
  public destination = '';
  public route = '';
  displayMap: boolean;
  private map;
  routes: Route[];
  private polylines;
  private markers;
  items: MenuItem[];



  constructor(
    private announcementService: AnnouncementService,
    private messageService: MessageService,
    private routeService: RouteService,
    private userService: UserService,
    private router: Router
  ) { }

  ngOnInit() {
    this.getAllRoutes();
    this.initNavbar();
  }

  handleSubmit() {

    this.announcementService.addAnnouncement( this.title, this.start, this.destination, this.route, this.date, this.description)
      .subscribe(() => {
        this.messageService.add({ severity: 'success', summary: 'Succes', detail: 'Announcement added succesfully' });
        this.router.navigate(['/browse']);
        // send message about succes and reroute
      }, (error) => {
        // send message about error
        this.messageService.add({ severity: 'error', summary: 'Error',
          detail: (error.error.message) ? error.error.message : error.statusText });
      });
  }

  displayRoutes() {
    this.initMap();
    this.drawRoutes();
  }

  clearMap() {
    for (let i = 0; i < this.polylines.length; i++) {
      this.map.removeLayer(this.polylines[i].poly);
    }
    for (let i = 0; i < this.markers.length; i++) {
      this.map.removeLayer(this.markers[i]);
    }
    this.polylines = [];
    this.markers = [];
  }

  initMap() {
    if (this.map == null) {
      this.polylines = [];
      this.markers = [];
      this.map = Leaflet.map('mapid').setView([49.6563, 18.8902], 14);
      Leaflet.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png').addTo(this.map);
    }
  }

  drawRoutes() {
    for (let i = 0; i < this.routes.length; i++) {
      const pointsString = this.routes[i].points.toString().split(',');
      console.log(pointsString);
      const pointsList = [];
      for (let j = 0; j < pointsString.length - 1; j++) {
        pointsList.push(new Leaflet.LatLng(parseFloat(pointsString[j]), parseFloat(pointsString[j + 1])));
        j++;
      }
      this.addPoly(pointsList, this.routes[i].id, this.routes[i].distance);
      this.addMarker(pointsList[0]);
      this.addMarker(pointsList[pointsList.length - 1]);
    }
  }

  addMarker(point) {
    const marker = new Leaflet.Marker(point, {opacity: 0.5}).addTo(this.map);
    this.markers.push(marker);
  }

  addPoly(pointsList, id, distance) {
    const poly = new Leaflet.Polyline(pointsList, {
      color: 'blue',
      weight: 7,
      opacity: 0.5,
      smoothFactor: 1
    });
    poly.on('click', () => {
      for (let i = 0; i < this.polylines.length; i++) {
        if (this.polylines[i].poly === poly) {
          this.route = this.polylines[i].id;
          break;
        }
      }
      this.displayMap = false;
    });
    poly.bindTooltip('Distance: ' + distance + ' meters');
    poly.on('mouseover', () => {
      const index = this.polylines.indexOf(poly);
      for (let k = 0; k < this.polylines.length; k++) {
          this.polylines[k].poly.setStyle({
            opacity: 0.1
          });
      }
      poly.setStyle({
        opacity: 0.75
      });
      const points = poly.getLatLngs();
      for (let l = 0; l < this.markers.length; l++) {
        this.markers[l].setOpacity(0.1);
        for (let m = 0; m < points.length; m++) {
          if (this.markers[l].getLatLng() === points[m]) {
            this.markers[l].setOpacity(0.75);
          }
        }
      }
    });
    poly.on('mouseout', () => {
      for (let k = 0; k < this.polylines.length; k++) {
        this.polylines[k].poly.setStyle({
          opacity: 0.5
        });
      }
      for (let k = 0; k < this.markers.length; k++) {
        this.markers[k].setOpacity(0.5);
      }
    });
    this.polylines.push({id: id, poly: poly});
    poly.addTo(this.map);
  }

  routeFocus() {
    this.displayMap = true;
  }

  getAllRoutes() {
    this.routeService.getAllRoutes()
      .subscribe( data => {
        this.routes = data;
      });
  }

  initNavbar() {
    this.items = [
      {
        label: 'User',
        icon: 'pi pi-fw pi-user',
        items: [
          {label: 'Logout', icon: 'pi pi-fw pi-user', command: (onclick) => {this.userService.logoutUser(); this.router.navigate(['/login']); } },
        ]
      },
      {
        label: 'Announcement',
        icon: 'pi pi-fw pi-pencil',
        items: [
          {label: 'Browse', icon: 'pi pi-fw pi-plus', command: (onclick) => {this.router.navigate(['/browse']); }},
          {label: 'Add', icon: 'pi pi-fw pi-plus', command: (onclick) => {this.router.navigate(['/add']); } },
        ]
      }
    ];
    if (this.userService.isAdmin()) {
      this.items.push({
        label: 'Admin',
        icon: 'pi pi-fw pi-key',
        items: [
          {label: 'Add route', icon: 'pi pi-fw pi-plus', command: (onclick) => {this.router.navigate(['/routes']); }}
        ]
      });
    }
  }
}
