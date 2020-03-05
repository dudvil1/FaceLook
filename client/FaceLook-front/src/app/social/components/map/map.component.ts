import { Component, OnInit, Inject, AfterViewInit, Input } from "@angular/core";
import { GoogleMapsModule } from "@angular/google-maps";

import { LocationService } from "../../service/locationService.service";
import { postApiService } from "../../service/postApi.service";
import { markerCollectionsService } from "../../service/marker-collection.service";
import { ToastInjector } from "ngx-toastr";

@Component({
  selector: "app-map",
  templateUrl: "./map.component.html",
  styleUrls: ["./map.component.css"]
})
export class MapComponent implements AfterViewInit {
  userCurrentLocation: any;

  constructor(
    public locationService: LocationService,
    public mapsModule: GoogleMapsModule,
    private postApiService: postApiService
  ) { }

  @Input() markers: any;

  ngAfterViewInit() {
    this.getUserCurrentLocation();
  }

  async getUserCurrentLocation() {
    this.userCurrentLocation = await this.locationService.getLocation();
    this.markers.subscribe(
<<<<<<< HEAD
      markers => {
        this.myMap(markers)
      });
  }

  myMap(postMarkers) {
    let mapProp = GoogleMapHandler.createMapProp(this.userCurrentLocation)

=======
      markers=>{
        this.myMap(markers)
      }
    )

  }

  myMap(markers) {
    let myCenter = {
      lat: this.userCurrentLocation.lat,
      lng: this.userCurrentLocation.lng
    };
    // gen center prop of the map
    let mapProp: google.maps.MapOptions = {
      center: new google.maps.LatLng(
        this.userCurrentLocation.lat,
        this.userCurrentLocation.lng
      ),
      zoom: 13,
      streetViewControl: false
    };
>>>>>>> e6537073a2596f85a16000746f1d54e9d9ebc96c
    //init the map and props
    let googleMap = new google.maps.Map(
      document.getElementById("googleMap"),
      mapProp
    );

    let currentPositionMarker = GoogleMapHandler.createMapMarker(this.userCurrentLocation, "YOU!");
    //add the marker of user curr location
    currentPositionMarker.setMap(googleMap);

<<<<<<< HEAD

    postMarkers.forEach(post => {
=======
    let wiredMarkers = {};

    //////// second on the map: all posts
    markers.forEach(elm => {
>>>>>>> e6537073a2596f85a16000746f1d54e9d9ebc96c
      //create post location coordinates
      let postLocation = { lat: +post.lat, lng: +post.lng };

      //create post props
<<<<<<< HEAD
      let postMarker = GoogleMapHandler.createMapMarker(postLocation,
        post.title,
        {
          url: "http://localhost:3000/public/uploads/images/" + post.image,
=======
      let postMarker = new google.maps.Marker({
        position: postLocation,
        animation: google.maps.Animation.DROP,
        icon: {

          url: "http://localhost:3000/public/uploads/images/" + elm.image,
>>>>>>> e6537073a2596f85a16000746f1d54e9d9ebc96c
          scaledSize: new google.maps.Size(50, 50, "px", "px")
        })
      //add props to map
      postMarker.setMap(googleMap);
      let bubbleDiv = GoogleMapHandler.createBubbleContent(post.title,post.text,post.post_id,post.likes)

      //add bubbles to the map
      let infowindow = new google.maps.InfoWindow({
        content: bubbleDiv,
        maxWidth: 400
      });

      // OPEN infoWindow
      postMarker.addListener("mouseover", () => {
        infowindow.open(googleMap, postMarker);
      });
    });
  }

}

class GoogleMapHandler {
  static createMapProp(myCenter): google.maps.MapOptions {
    let mapProp: google.maps.MapOptions = {
      center: new google.maps.LatLng(
        myCenter.lat,
        myCenter.lng
      ),
      zoom: 13,
      streetViewControl: false
    };

    return mapProp;
  }

  static createMapMarker(position?, title?, icon?, zIndex?): google.maps.Marker {
    return new google.maps.Marker({
      position: position || { lat: 0, lng: 0 },
      animation: google.maps.Animation.DROP,
      title: title || "",
      icon: icon,
      zIndex: zIndex || 100
    });
  }

  static createBubbleContent(title, text, id, likes): string {
     let content =   
       `<div class="info_content">
          <div class="header">
             <h1>${title}</h1>
          </div>
          <p>${text}</p>
          <div class="likes_div likes_div_SELECTOR" id=${id}>
            <span id="like_${id}">${likes}</span> Likes 
            <img src="./assets/img/like.png" class="like_icon" />
          </div>
        </div>`

        return this.setBody(content);
  }

  private static getStyle():string{
    return  `
     <style>
       .info_content {
         background-color: powderblue;
       }
       h1 {
         color: red;
         padding:10px;
       }
       p {
         color: blue;
       }
    </style>`
  }
  
  private static setBody(content){
    return `
    <html>
      <head>
        ${this.getStyle()}
      </head>  
      <body>
      ${content}
    </body>
    </html>`
  }
}
