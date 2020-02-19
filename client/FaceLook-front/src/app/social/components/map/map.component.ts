import { Component, OnInit, Inject, AfterViewInit } from '@angular/core';
import { GoogleMapsModule } from '@angular/google-maps';

import { LocationService } from "../../service/locationService.service";
import { PostCollectionService } from "../../service/post-collection.service";
import { ToastInjector } from 'ngx-toastr';

@Component({
  selector: "app-map",
  templateUrl: "./map.component.html",
  styleUrls: ["./map.component.css"]
})

export class MapComponent implements OnInit {

  // userCurrentLocation = this.location.getLocation();

  // googleMap: any;
  userCurrentLocation: any;

  constructor(
    public locationService: LocationService, 
    public postCollection: PostCollectionService,
    public mapsModule: GoogleMapsModule,
  ) {}

  ngOnInit() {   
    this.getUserCurrentLocation();
  }

  async getUserCurrentLocation(){
    this.userCurrentLocation = await this.locationService.getLocation();    
    // this.myMap(this.postCollection.postCollections);
    this.myMap();
  }

  // myMap(postCollections) {
  myMap() {
    console.log(this.postCollection.postCollections);
    
    //////// first on the map
    //user current location
    let myCenter = {lat: this.userCurrentLocation.lat, lng: this.userCurrentLocation.lng} ;
    // gen center prop of the map
    let mapProp = {
      center: new google.maps.LatLng(this.userCurrentLocation.lat, this.userCurrentLocation.lng),
      zoom: 13,
    };
    //init the map and props
    let googleMap = new google.maps.Map(document.getElementById("googleMap"), mapProp);

    //user PIN marker on current location on the map
    var marker = new google.maps.Marker(
      {
        position: myCenter,
        animation: google.maps.Animation.DROP,
        title: 'YOU!',
      }
    );
    //add the marker of user curr location
    marker.setMap(googleMap);

    //////// second on the map: iterate of all posts
    this.postCollection.postCollections.forEach(elm => {
      //create post coordinates
      //post location
      let postLocation = {lat: +elm.lat, lng: +elm.lng};
      
      //create post props 
      let postMarker = new google.maps.Marker(
        {
          position: postLocation,
          animation: google.maps.Animation.DROP,
          icon: 'http://localhost:3000/public/uploads/img/' + elm.image,
          title: elm.title,
        }
      );
      //add props to map
      postMarker.setMap(googleMap);

      let contentString = `<div class="info_content" id="content">
        <div id="bodyContent">
        <p><b>${elm.title}</b>,
        Heritage Site.</p>
        <p>${elm.text}</p>
        </div>
      </div>`;

      //add bubbles to the map
      let infowindow = new google.maps.InfoWindow({
          content: contentString,
          maxWidth: 200,
      });

      // OPEN infoWindow
      postMarker.addListener('mouseover', function() {
        infowindow.open(googleMap, postMarker);
      });

      // CLOSE infoWindow ==> no need, Close btn exists on the bubble
      // postMarker.addListener('mouseout', function() {
      //   infowindow.close();
      // });
      
    });

  }

} 
