import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import * as Leaflet from 'leaflet';
import 'leaflet-routing-machine';


@Component({
  selector: 'app-maps',
  templateUrl: './maps.component.html',
  styleUrls: ['./maps.component.css']
})
export class MapsComponent implements OnInit {

  ngOnInit() {
    const map = Leaflet.map('mapid').setView([49.6563, 18.8902], 14);
    Leaflet.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png').addTo(map);
    Leaflet.Routing.control({
      waypoints: [
        Leaflet.latLng(49.6617, 18.8560),
        Leaflet.latLng(49.6506, 18.8811)
      ]
    })
    .addTo(map);
  }

  constructor(
    private http: HttpClient
  ) {}
}

