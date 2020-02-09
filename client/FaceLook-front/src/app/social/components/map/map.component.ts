import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.css']
})
export class MapComponent implements OnInit {
  public coords = {
    x: 51.673858,
    y: 7.815982
  }

  constructor() { }

  ngOnInit() {
  }



}
