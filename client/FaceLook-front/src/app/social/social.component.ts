import { Component, OnInit } from '@angular/core';
import { markerCollectionsService } from './service/marker-collection.service';

@Component({
  selector: 'app-social',
  templateUrl: './social.component.html',
  styleUrls: ['./social.component.css']
})
export class socialComponent implements OnInit {
  public markers;

  constructor(private markerCollection: markerCollectionsService) { }

  ngOnInit() {
    this.markers = this.markerCollection.markerCollections;
  }

}
