import { Injectable } from "@angular/core";

export interface ILocationService {
  getLocation(): Promise<GeoLocation>
}

export interface GeoLocation {
  lat: number;
  lng: number;
}


@Injectable({
  providedIn: "root"
})
export class LocationService implements ILocationService {
  navigator: any
  constructor() {
    this.navigator = navigator
  }
  getLocation(): Promise<GeoLocation> {
    return new Promise(this.GetLocationCallback);
  }

  private GetLocationCallback = (resolve, reject) => {
    if (this.navigator && this.navigator.geolocation) {
      this.navigator.geolocation.getCurrentPosition(
        onSuccessGetLocation(resolve, reject),
        onErrorGetLocation(resolve, reject),
        options
      );
    }
    else {
      reject(new Error("navigator geolocation is not exist"))
    }
  }

}
//get location options
const options = {
  enableHighAccuracy: true,
  timeout: 5000,
  maximumAge: 0
};
//error callback
const onErrorGetLocation = (resolve, reject): PositionErrorCallback => {
  return (err) => {
    reject(err)
  };
}
//success callback
const onSuccessGetLocation = (resolve, reject): PositionCallback => {
  return (location) => {
    resolve({
      lat: location.coords.latitude,
      lng: location.coords.longitude
    });
  };
}




