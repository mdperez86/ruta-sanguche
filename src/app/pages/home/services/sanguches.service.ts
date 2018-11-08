import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SanguchesService {

  readonly MAX_LAT = Math.atan(Math.sinh(Math.PI)) * 180 / Math.PI;
  readonly MAX_LNG = 180;

  constructor() { }

  private sign() {
    const angle = Math.random() * 360;
    const rad = angle * Math.PI / 180;
    return Math.sin(rad) >= 0 ? 1 : -1;
  }

  findBy(bounds: google.maps.LatLngBounds): Observable<google.maps.Marker[]> {
    return of(Array.from({ length: 10000 }, (_, i) => new google.maps.Marker({
      position: {
        lat: this.sign() * Math.random() * this.MAX_LAT,
        lng: this.sign() * Math.random() * this.MAX_LNG,
      },
      label: `Sanguche ${i}`,
    })));
  }
}
