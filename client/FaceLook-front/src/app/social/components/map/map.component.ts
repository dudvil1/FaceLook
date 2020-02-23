import { Component, OnInit, Inject, AfterViewInit } from '@angular/core';
import { GoogleMapsModule } from '@angular/google-maps';

import { LocationService } from "../../service/locationService.service";
import { markerCollectionsService } from "../../service/marker-collection.service";
import { ToastInjector } from 'ngx-toastr';


@Component({
  selector: "app-map",
  templateUrl: "./map.component.html",
  styleUrls: ["./map.component.css"]
})

export class MapComponent implements AfterViewInit {
  userCurrentLocation: any;

  constructor(
    public locationService: LocationService,
    public markersCollection: markerCollectionsService,
    public mapsModule: GoogleMapsModule,
  ) { }

  ngAfterViewInit() {
    this.getUserCurrentLocation();
  }

  async getUserCurrentLocation() {
    this.userCurrentLocation = await this.locationService.getLocation();
    this.myMap();
  }

  // myMap(postCollections) {
  myMap() {
    console.log(this.markersCollection.markerCollections);

    //////// first on the map
    //user current location
    let myCenter = { lat: this.userCurrentLocation.lat, lng: this.userCurrentLocation.lng };
    // gen center prop of the map
    let mapProp: google.maps.MapOptions = {
      center: new google.maps.LatLng(this.userCurrentLocation.lat, this.userCurrentLocation.lng),
      zoom: 13,
      streetViewControl: false
    };
    //init the map and props
    let googleMap = new google.maps.Map(document.getElementById("googleMap"), mapProp);

    //user PIN marker on current location on the map
    var marker = new google.maps.Marker(
      {
        position: myCenter,
        animation: google.maps.Animation.DROP,
        title: 'YOU!',
        zIndex: 100,
      }
    );
    //add the marker of user curr location
    marker.setMap(googleMap);

    //////// second on the map: all posts
    this.markersCollection.markerCollections.forEach(elm => {
      console.log("POST element");

      console.log(elm);

      //create post location coordinates
      let postLocation = { lat: +elm.lat, lng: +elm.lng };

      //create post props
      let postMarker = new google.maps.Marker(
        {
          position: postLocation,
          animation: google.maps.Animation.DROP,
          icon: {
            url: 'http://localhost:3000/public/uploads/img/' + elm.image,
            scaledSize: new google.maps.Size(50, 50, 'px', 'px')
          },
          title: elm.title,
        }
      );
      //add props to map
      postMarker.setMap(googleMap);

      let bubbleDiv = `
        <div class="info_content" id="content">
          <div id="bodyContent">
            <p>
              <b>${elm.title}</b>,
              Heritage Site.
            </p>
            <p>${elm.text}</p>
            <div class="likesDiv_SELECTOR">
              ${elm.likes} Liks <img src="./assets/img/like.png" style="margin-top: -8px; width: 25px; vertical-align: middle;" title="Like me or die" />
            </div>
          </div>
        </div>`;

      //add bubbles to the map
      let infowindow = new google.maps.InfoWindow({
        content: bubbleDiv,
        maxWidth: 200,
      });

      // OPEN infoWindow
      postMarker.addListener('mouseover', () => {
        infowindow.open(googleMap, postMarker);

        setTimeout(() => {
          let singleLike = document.querySelectorAll('.likesDiv_SELECTOR');
          singleLike.forEach(elm => {
            const likeFn = () => this.likesClicked();
            elm.addEventListener('click', () => {
              likeFn()
              elm.removeEventListener('click', likeFn);
            })
          });
          console.log("TEST ME");
          console.log(singleLike);
        }, 0);

      });

      // // CLOSE infoWindow ==> no need, Close btn exists on the bubble
      // postMarker.addListener('mouseout', function() {
      //   infowindow.close();
      // });

    });
  }

  likesClicked() {
    console.log('TEST LIKES CLICKED');
  }

}
