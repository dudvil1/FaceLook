import { Component, OnInit } from "@angular/core";
import { postsFilterService } from "../models/postsFilter.model";

@Component({
  selector: "app-feed",
  templateUrl: "./feed.component.html",
  styleUrls: ["./feed.component.css"]
})
export class FeedComponent implements OnInit {
  constructor(public postsFilterService: postsFilterService) {}

  ngOnInit() {}
}
