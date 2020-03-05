import { Component, OnInit } from "@angular/core";
import { postsFilterService } from "../models/postsFilter.model";
import { postApiService } from '../../service/postApi.service';

@Component({
  selector: "app-feed",
  templateUrl: "./feed.component.html",
  styleUrls: ["./feed.component.css"]
})
export class FeedComponent implements OnInit {
  constructor(public postsFilterService: postsFilterService,
    private _postApiService: postApiService) { }

  ngOnInit() { }

  search() {
    if (Object.keys(this.postsFilterService.postsData).length > 0) {
      if(this.postsFilterService.postsData.radiusFrom){
        navigator.geolocation.getCurrentPosition((location) => {

          this.postsFilterService.postsData.location = {
            latitude: location.coords.latitude,
            longitude: location.coords.longitude
          };

          this._postApiService.getFilterPosts(this.postsFilterService.postsData).subscribe();
        },
        err =>{
          alert(err);
        })
      }
      else{
      this._postApiService.getFilterPosts(this.postsFilterService.postsData).subscribe();
      }
    }
  }
}
