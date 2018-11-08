import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class GmapsService {

  readonly SCRIPT_ID = 'gmaps-api-js';
  readonly API_URL = 'https://maps.googleapis.com/maps/api/js';
  readonly API_KEY = 'AIzaSyC2ubbPFF7TxraCbYXD1rIWC_xn4i3AkFg';

  private gmaps: google.maps.Map;

  constructor() { }

  load(mapDiv: Element | null, opts?: google.maps.MapOptions): Observable<google.maps.Map> {
    return new Observable(subscriber => {
      if (this.gmaps) {
        subscriber.next(this.gmaps);
      } else {
        const script = document.createElement('script');
        script.id = this.SCRIPT_ID;
        script.async = true;
        script.defer = true;
        script.src = `${this.API_URL}?key=${this.API_KEY}`;
        script.onload = () => {
          this.gmaps = new google.maps.Map(mapDiv, opts);
          subscriber.next(this.gmaps);
        };
        script.onerror = (reason) => subscriber.error(reason);
        document.body.appendChild(script);
      }
    });
  }

}
