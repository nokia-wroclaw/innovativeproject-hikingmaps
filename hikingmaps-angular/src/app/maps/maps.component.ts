import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import * as Leaflet from 'leaflet';


@Component({
  selector: 'app-maps',
  templateUrl: './maps.component.html',
  styleUrls: ['./maps.component.css']
})
export class MapsComponent implements OnInit {

  ngOnInit() {
    const map = Leaflet.map('mapid').setView([49.6563, 18.8902], 14);
    Leaflet.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png').addTo(map);

    const cords = [
      new Leaflet.LatLng(49.6391, 18.8814),
      new Leaflet.LatLng(49.6394, 18.8833),
      new Leaflet.LatLng(49.6429, 18.8868),
      new Leaflet.LatLng(49.6450, 18.8890),
      new Leaflet.LatLng(49.6473, 18.8930),
      new Leaflet.LatLng(49.6491, 18.8938),
      new Leaflet.LatLng(49.6514, 18.8967),
      new Leaflet.LatLng(49.6529, 18.8979),
      new Leaflet.LatLng(49.6550, 18.9021),
      new Leaflet.LatLng(49.6557, 18.9030),
      new Leaflet.LatLng(49.6570, 18.9083),
      new Leaflet.LatLng(49.6558, 18.9150),
      new Leaflet.LatLng(49.6548, 18.9184),
      new Leaflet.LatLng(49.6556, 18.9221)
    ];
    Leaflet.polyline(cords, {
      color: 'red'
    }).addTo(map);

    /*
    Leaflet.Routing.control({
      waypoints: [
        Leaflet.latLng(49.6617, 18.8560),
        Leaflet.latLng(49.6523, 18.9245)
      ],
      router: new Leaflet.Routing.OSRMv1({
        serviceUrl: '//router.project-osrm.org/route/v1',
        profile: 'feet'
      })
    })
    .addTo(map);
    */
  }
  constructor(
    private http: HttpClient
  ) {}
}

