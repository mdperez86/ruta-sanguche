import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { switchMap } from 'rxjs/operators';

import { GmapsService } from './services/gmaps.service';
import { getCurrentPosition } from './utils/geo.util';
import { SanguchesService } from './services/sanguches.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  @ViewChild('gMapsContainer') gMapsRef: ElementRef;

  private marker: google.maps.Marker;

  constructor(
    private gmapsService: GmapsService,
    private sanguchesService: SanguchesService,
  ) { }

  ngOnInit() {
    getCurrentPosition().pipe(
      switchMap(position => this.gmapsService.load(this.gMapsRef.nativeElement, {
        center: {
          lat: position.coords.latitude,
          lng: position.coords.longitude,
        },
        zoom: 13,
      })),
    ).subscribe(gmaps => {
      this.marker = new google.maps.Marker({
        position: gmaps.getCenter(),
        title: 'Here Im',
        map: gmaps,
      });
      this.sanguchesService.findBy(gmaps.getBounds()).subscribe(markers => new MarkerClusterer(gmaps, markers, {
        imagePath: 'https://developers.google.com/maps/documentation/javascript/examples/markerclusterer/m',
      }));
    });
  }

}
