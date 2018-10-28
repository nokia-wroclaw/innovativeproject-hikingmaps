import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import * as $ from 'node_modules/jquery/src/jquery.js';

const L = require('leaflet');
const Routing = require('leaflet-routing-machine');

@Component({
  selector: 'app-maps',
  templateUrl: './maps.component.html',
  styleUrls: ['./maps.component.css']
})
export class MapsComponent implements OnInit {

  ngOnInit() {
  }

  constructor(
    private http: HttpClient
  ) {
    $(window).on('load', function () {
      const map = L.map('mapid').setView([49.6563, 18.8902], 14);
      L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png').addTo(map);
      /*
      L.Routing.control({
        waypoints: [
          L.latLng(49.6617, 18.8560),
          L.latLng(49.6506, 18.8811)
        ]
      }).addTo(map);
      */
    });

    }
}

