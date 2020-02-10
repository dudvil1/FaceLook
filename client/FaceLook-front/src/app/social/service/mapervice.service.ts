import { Injectable } from "@angular/core";

@Injectable({
  providedIn: "root"
})
export class MapService {
  constructor() {
    this.getLocation();
  }
  location:any =  { lat: 0 , lng: 0 } ;

  public getLocation() {
      navigator.geolocation.getCurrentPosition(Location => {
      this.location.lat = Location.coords.latitude;
      this.location.lng = Location.coords.longitude;
    });
  }
}
