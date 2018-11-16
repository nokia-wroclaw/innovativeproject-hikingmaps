import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import * as Leaflet from 'leaflet';
import 'leaflet-draw';

@Component({
  selector: 'app-edit-routes',
  templateUrl: './edit-routes.component.html',
  styleUrls: ['./edit-routes.component.css']
})
export class EditRoutesComponent implements OnInit {

  constructor(private http: HttpClient) {}

  ngOnInit() {
    let paths = [[]];
    const map = Leaflet.map('mapid').setView([49.6563, 18.8902], 14);
    Leaflet.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png').addTo(map);

    const drawnItems = new Leaflet.FeatureGroup();
    map.addLayer(drawnItems);

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
        featureGroup: drawnItems
      }
    });

    drawControl.addTo(map);

    map.on('draw:created', function (e: any) {
      const layer = e.layer;
      paths.push(layer.getLatLngs());
      drawnItems.addLayer(layer);
    });

    map.on('draw:edited', function () {
      paths = [[]];
      drawnItems.eachLayer(function (layer: any) {
        paths.push(layer.getLatLngs());
      });
    });

    map.on('draw:deleted', function () {
      paths = [[]];
      drawnItems.eachLayer(function (layer: any) {
        paths.push(layer.getLatLngs());
      });
    });
  }
}

