import { Injectable } from '@angular/core';
import { Subject, BehaviorSubject } from 'rxjs';
// import { postApiService } from "../service/postApi.service";

@Injectable({
  providedIn: 'root'
})
export class markerCollectionsService {
  markers$ = new BehaviorSubject<any[]>([]);

  constructor() { }

}
