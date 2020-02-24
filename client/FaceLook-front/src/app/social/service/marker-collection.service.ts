import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
// import { postApiService } from "../service/postApi.service";

@Injectable({
  providedIn: 'root'
})
export class markerCollectionsService {
  markers$ = new Subject<any[]>();

  constructor() { }

}
