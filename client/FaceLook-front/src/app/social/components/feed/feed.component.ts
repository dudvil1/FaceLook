import { Component, OnInit } from "@angular/core";
import { postsFilterService } from "../models/postsFilter.model";
import { postApiService } from '../../service/postApi.service';
import { LocationService } from '../../service/locationService.service';

@Component({
  selector: "app-feed",
  templateUrl: "./feed.component.html",
  styleUrls: ["./feed.component.css"]
})
export class FeedComponent implements OnInit {
  constructor(public postsFilterService: postsFilterService,
    private _postApiService: postApiService,
    private locationService: LocationService) { }

  ngOnInit() { }

  async search() {
    if (Object.keys(this.postsFilterService.postsData).length > 0) {
      //on radius query we need the current location to comper by
      if (this.postsFilterService.postsData.radiusFrom) {
        const location = await this.locationService.getLocation();
        this.postsFilterService.postsData.location = {
          latitude: location.lat,
          longitude: location.lng
        };
      }

      this._postApiService.getFilterPosts(this.postsFilterService.postsData).subscribe();
    }
  }
}
