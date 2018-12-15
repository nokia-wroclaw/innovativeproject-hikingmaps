import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import * as Leaflet from 'leaflet';
import 'leaflet-draw';
import { Router } from '@angular/router';
import {MenuItem} from 'primeng/api';


@Component({
  selector: 'app-edit-routes',
  templateUrl: './edit-routes.component.html',
  styleUrls: ['./edit-routes.component.css']
})
export class EditRoutesComponent implements OnInit {

  constructor(private http: HttpClient) {}

  private drawnItems;
  items: MenuItem[];
  private router: Router;

  ngOnInit() {

    this.items = [
      {
        label: 'User',
        icon: 'pi pi-fw pi-user',
        items: [
          {label: 'Login', icon: 'pi pi-fw pi-user', command: (onclick) => {this.router.navigate(['/login']); } },
          {label: 'Register', icon: 'pi pi-fw pi-user-plus', command: (onclick) => {this.router.navigate(['/register']); } }
        ]
      },
      {
        label: 'Announcement',
        icon: 'pi pi-fw pi-pencil',
        items: [
          {label: 'Add', icon: 'pi pi-fw pi-plus', command: (onclick) => {this.router.navigate(['/add']); } },
        ]
      },
      {
        label: 'Admin',
        icon: 'pi pi-fw pi-key',
        items: [
          {label: 'Add route', icon: 'pi pi-fw pi-plus', command: (onclick) => {this.router.navigate(['/routes']); }}
        ]
      }
    ];

    const map = Leaflet.map('mapid').setView([49.6563, 18.8902], 14);
    Leaflet.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png').addTo(map);

    this.drawnItems = new Leaflet.FeatureGroup();
    map.addLayer(this.drawnItems);

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

    drawControl.addTo(map);

    map.on('draw:created', (e: any) => {
      const layer = e.layer;
      this.drawnItems.addLayer(layer);
    });
  }

  public getPaths() {
    const paths = [[]];
    this.drawnItems.eachLayer(function (layer: any) {
      paths.push(layer.getLatLngs());
    });
    return paths;
  }

  /*sendRoute() {
    this.RouteService.addRoute(this.modifiedAnnouncement.id, this.modifiedAnnouncement.title, this.modifiedAnnouncement.start, this.modifiedAnnouncement.destination, this.modifiedAnnouncement.description, mod)
      .subscribe(() => {
        this.messageService.add({ severity: 'success', summary: 'Succes', detail: 'Route added succesfully' });
      }, (error) => {
        // send message about error
        this.messageService.add({ severity: 'error', summary: 'Error',
          detail: (error.error.message) ? error.error.message : error.statusText });
      });

  }*/
}

