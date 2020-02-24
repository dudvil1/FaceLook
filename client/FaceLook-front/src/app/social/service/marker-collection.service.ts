import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class markerCollectionsService {

  public markerCollections: any = [
    {
      id: '1234',
      title: 'Title of post',
      text: 'text of the post whatever text',
      image: 'mai.png',
      lat: '32.092855',
      lng: '34.811656',
      likes: '12'
    },
    {
      id: '1235',
      title: 'bbbbbb Title of post',
      text: 'bbbbbbb text of the post whatever text',
      image: 'shahar.png',
      lat: '32.094328',
      lng: '34.825681',
      likes: '28'
    },
]

  constructor() { }
}
