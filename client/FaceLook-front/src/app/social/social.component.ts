import { Component, OnInit } from "@angular/core";
import { markerCollectionsService } from "./service/marker-collection.service";
import { PostApiService } from "./service/postApi.service";

@Component({
  selector: "app-social",
  templateUrl: "./social.component.html",
  styleUrls: ["./social.component.css"]
})
export class socialComponent implements OnInit {
  public markers;

  constructor(
    private _markerCollection: markerCollectionsService,
    private _postApiService: PostApiService
  ) {}

  ngOnInit() {
    this._postApiService.getAllPosts(true).subscribe(res => {
      console.log("POSTS-->", res);
    });

    this.markers = this._markerCollection.markers$
  }
}
