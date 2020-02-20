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
      navigator.geolocation.getCurrentPosition((loc) => {
        if(resolve){
          resolve({
            lat: loc.coords.latitude,
            lng: loc.coords.longitude
          });
        }
      }, 
      err =>{
        alert(err);
        console.log("An ERROR occured:");
        console.log(err);
        console.log('===>>> PLEASE ALLOW LOCATION ON YOUR BROWSER');
      })
    );
  }
}       
