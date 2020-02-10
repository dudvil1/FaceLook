import { Component, OnInit } from "@angular/core";
import { MapService } from "../../service/mapervice.service";

@Component({
  selector: "app-map",
  templateUrl: "./map.component.html",
  styleUrls: ["./map.component.css"]
})
export class MapComponent implements OnInit {

  constructor(public mapService: MapService) {}

  ngOnInit() {
  }
}
