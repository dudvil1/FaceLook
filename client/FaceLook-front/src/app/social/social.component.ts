import { Component, OnInit } from '@angular/core';
import { PostCollectionService } from './service/post-collection.service';

@Component({
  selector: 'app-social',
  templateUrl: './social.component.html',
  styleUrls: ['./social.component.css']
})
export class socialComponent implements OnInit {
  public markers;

  constructor(private postCollection: PostCollectionService) { }

  ngOnInit() {
    this.markers = this.postCollection.postCollections;
  }

}
