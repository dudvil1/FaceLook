import { Component, OnInit, Inject, AfterViewInit, Input } from '@angular/core';
import { GoogleMapsModule } from '@angular/google-maps';

import { LocationService } from "../../service/locationService.service";
import { PostCollectionService } from "../../service/post-collection.service";
import { ToastInjector } from 'ngx-toastr';


@Component({
  selector: "app-map",
  templateUrl: "./map.component.html",
  styleUrls: ["./map.component.css"]
})

export class MapComponent implements AfterViewInit {

  // userCurrentLocation = this.location.getLocation();

  // googleMap: any;
  userCurrentLocation: any;

  constructor(
    public locationService: LocationService,
    // public postCollection: PostCollectionService,
    public mapsModule: GoogleMapsModule,
    // private _document: Document
  ) { }

  @Input() markers;

  ngAfterViewInit() {
    this.getUserCurrentLocation();
    console.log('ngAfterViewInit');
  }

  async getUserCurrentLocation() {
    this.userCurrentLocation = await this.locationService.getLocation();
    this.myMap();
  }

  // myMap(postCollections) {
  myMap() {
    console.log("ALL MARKERS");
    console.log(this.markers);

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

    let wiredMarkers={};

    //////// second on the map: all posts
    this.markers.forEach(elm => {
    // this.postCollection.postCollections.forEach(elm => {
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
            url: 'http://localhost:3000/public/uploads/images/' + elm.image,
            scaledSize: new google.maps.Size(50, 50, 'px', 'px'),
          },
          title: elm.title,
        }
      );
      //add props to map
      postMarker.setMap(googleMap);

      let bubbleDiv = `
        <div class="info_content">
          <p>
            <b>${elm.title}</b>,
            Heritage Site.
          </p>
          <p>${elm.text}</p>
          <div class="likes_div likes_div_SELECTOR" id=${elm.id}>
            <span id="like_${elm.id}">${elm.likes}</span> Liks <img src="./assets/img/like.png" class="like_icon" title="Like me or die" />
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
          let singleLike = document.querySelectorAll('.likes_div_SELECTOR');
          singleLike.forEach(elm => {
            // if value undefined - add event listener
            if(!wiredMarkers[elm.id]){ 
              wiredMarkers[elm.id] = true;
              const likeFn = () => {
                // catch the Likes value from the DATA
                const _markerElm = this.markers.find(marker => marker.id === elm.id);
                _markerElm.likes++;
                _markerElm.likes = _markerElm.likes.toString();
                
                // change the Likes value on the ELM
                document.getElementById('like_'+elm.id).textContent = _markerElm.likes;
                
                // change the Likes to the SERVER and DB
                this.likesClicked(_markerElm);
              }
              elm.addEventListener('click', () => {
                likeFn();
                elm.removeEventListener('click', likeFn);
              })
            }
          });
        }, 0);

      });

      // // CLOSE infoWindow ==> no need, Close btn exists on the bubble
      // postMarker.addListener('mouseout', function() {
      //   infowindow.close();
      // });

    });
  }

  likesClicked(markerElm) {
    // change likes value in bubble
    // console.log(document.querySelectorAll('#' + bubbleId));
    // this.markers.id[bubbleId].likes = 30;
    // this.markers
    console.log("markerElm");
    console.log(markerElm);

    
    // document.querySelectorAll('#bubbleId');

    // send new value of likes to server and DB
    
  }

}
