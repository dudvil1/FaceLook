import { Injectable } from "@angular/core";

@Injectable({
  providedIn: "root"
})
export class LocationService {
  constructor() {
    this.getLocation();
  }

  async getLocation(): Promise<{ lat: number; lng: number }> {
    return new Promise(
      resolve => navigator.geolocation.getCurrentPosition((location) => {
        if(resolve){
          resolve({
            lat: location.coords.latitude,
            lng: location.coords.longitude
          });
        }
      },
      err =>{
        alert(err);
      })
    );
  }
}
