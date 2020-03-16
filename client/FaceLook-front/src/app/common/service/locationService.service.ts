import { Injectable } from "@angular/core";

export interface ILocationService {
  getLocation(): Promise<{ lat: number; lng: number }>
}


@Injectable({
  providedIn: "root"
})
export class LocationService implements ILocationService {
  constructor() {
    this.getLocation();
  }
  
  getLocation(): Promise<{ lat: number; lng: number }> {
    return new Promise(
      resolve => navigator.geolocation.getCurrentPosition((location) => {
        if (resolve) {
          resolve({
            lat: location.coords.latitude,
            lng: location.coords.longitude
          });
        }
      },
        err => {

        })
    );
  }
}
