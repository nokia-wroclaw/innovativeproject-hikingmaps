import { Component, OnInit } from '@angular/core';
import { RouteService } from '../route.service';
import { Route } from '../route';
import {MenuItem, MessageService} from 'primeng/api';
import { Router } from '@angular/router';
import * as Leaflet from 'leaflet';
import {HttpClient} from '@angular/common/http';
import {UserService} from '../user.service';

@Component({
  selector: 'app-add-route',
  templateUrl: './route.component.html',
  styleUrls: ['./route.component.css']
})
export class RouteComponent implements OnInit {

  constructor(
    private http: HttpClient,
    private routeService: RouteService,
    private messageService: MessageService,
    private userService: UserService,
    private router: Router
  ) { }

  private map;
  private drawnItems;
  items: MenuItem[];
  routes: Route[];

  ngOnInit() {
    this.initNavbar();
    this.getAllRoutes();
    this.initMap();
  }

  public getPoints() {
    const paths = [];
    this.drawnItems.eachLayer(function (layer: any) {
      const latLngs = layer.getLatLngs();
      for (let i = 0; i < latLngs.length; i++) {
        paths.push(latLngs[i].lat);
        paths.push(latLngs[i].lng);
      }
    });
    console.log(paths.toString());
    return paths.toString();
  }

  public getDistance() {
    let distance = 0.0;
    this.drawnItems.eachLayer(function (layer: any) {
      const latLngs = layer.getLatLngs();
      console.log(latLngs);
      for (let i = 0; i < latLngs.length - 1; i++) {
        distance += latLngs[i].distanceTo(latLngs[i + 1]);
      }
    });
    return Math.floor(distance).toString();
  }

  getAllRoutes() {
    this.routeService.getAllRoutes()
      .subscribe( data => {
        this.routes = data;
      });
  }

  printInConsole() {
    if (this.routes.length > 0) {
      console.log('----- IN ROUTES: ----------------------------------------------------------------------------------------------');
      for (let i = 0; i < this.routes.length; i++) {
        console.log(this.routes[i]);
        // if you want to print just a specified column, use
        // console.log(this.routes[i].distance);
      }
    } else {
      console.log('Empty!');
    }
  }

  handleSubmit() {
    if (this.drawnItems.getLayers().length === 0) {
      this.messageService.add({
        severity: 'error', summary: 'Error',
        detail: 'First draw a path and click "Finish"'
      });
    } else {
      this.routeService.addRoute(this.getPoints(), this.getDistance())
        .subscribe(() => {
          this.messageService.add({
            severity: 'success', summary: 'Succes',
            detail: 'Route added succesfully'
          });
          this.router.navigate(['/browse']);
          // send message about succes and reroute
        }, (error) => {
          // send message about error
          this.messageService.add({
            severity: 'error', summary: 'Error',
            detail: (error.error.message) ? error.error.message : error.statusText
          });
        });
    }

    //this.printInConsole();
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
  
  initMap() {
    this.map = Leaflet.map('mapid').setView([49.6563, 18.8902], 14);
    Leaflet.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png').addTo(this.map);

    this.drawnItems = new Leaflet.FeatureGroup();
    this.map.addLayer(this.drawnItems);

    const drawControl = new Leaflet.Control.Draw({
      draw: {
        polyline: {
          shapeOptions: {
            color: '#ff0000'
          }
        },
        polygon: false,
        rectangle: false,
        circle: false,
        marker: false,
        circlemarker: false
      },
      edit: {
        featureGroup: this.drawnItems
      }
    });

    drawControl.addTo(this.map);

    this.map.on('draw:created', (e: any) => {
      const layer = e.layer;
      this.drawnItems.addLayer(layer);
    });
  }
}
