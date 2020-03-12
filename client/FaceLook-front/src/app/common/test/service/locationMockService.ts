import { ILocationService } from '../../service/locationService.service';

export class LocationService implements ILocationService {
  constructor() {
    this.getLocation();
  }

  getLocation(): Promise<{ lat: number; lng: number }> {
    return new Promise(resolve => { resolve({ lat: 32, lng: 35 }) });
  }
}
