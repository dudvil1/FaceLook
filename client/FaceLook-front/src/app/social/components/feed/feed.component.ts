import { Component, OnInit } from "@angular/core";
import { postsFilterService } from "../../service/postsFilter.model";
import { PostApiService } from '../../service/postApi.service';
import { LocationService } from '../../../common/service/locationService.service';

@Component({
  selector: "app-feed",
  templateUrl: "./feed.component.html",
  styleUrls: ["./feed.component.css"]
})
export class FeedComponent implements OnInit {
  constructor(
    public postsFilterService: postsFilterService,
    private _postApiService: PostApiService,
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
