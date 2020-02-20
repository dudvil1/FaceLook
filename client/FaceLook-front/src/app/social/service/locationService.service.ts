import { Injectable } from "@angular/core";

@Injectable({
  providedIn: "root"
})
export class LocationService {
  constructor() {
    this.getLocation();
  }

  async getLocation(): Promise<{ lat: number; lng: number }> {
    return new Promise(resolve =>
      navigator.geolocation.getCurrentPosition(Location => {
        resolve({
          lat: Location.coords.latitude,
          lng: Location.coords.longitude
        });
      })
    );
  }
}       
