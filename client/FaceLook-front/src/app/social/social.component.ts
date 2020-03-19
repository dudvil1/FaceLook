import { Component, OnInit } from "@angular/core";
import { markerCollectionsService } from "./service/marker-collection.service";
import { PostApiService } from "./service/postApi.service";
import { SocketService } from "../common/service/socket.service";

@Component({
  selector: "app-social",
  templateUrl: "./social.component.html",
  styleUrls: ["./social.component.css"]
})
export class socialComponent implements OnInit {
  public markers;

  constructor(
    private _markerCollection: markerCollectionsService,
    private _postApiService: PostApiService,
    private socket: SocketService
  ) {}

  ngOnInit() {
    this._postApiService.getAllPosts(true).subscribe();
    this.markers = this._markerCollection.markers$;
  }
}
