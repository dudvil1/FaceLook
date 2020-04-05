import { Injectable } from '@angular/core';
import { Subject, BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class markerCollectionsService {
  markers$ = new BehaviorSubject<any[]>([]);
  allPost$ = new BehaviorSubject<any[]>([]);

  constructor() { }

}
