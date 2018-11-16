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

  private drawnItems;

  ngOnInit() {
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
}

