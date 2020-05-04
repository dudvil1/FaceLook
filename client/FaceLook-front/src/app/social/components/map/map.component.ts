import { Component, OnInit, Inject, AfterViewInit, Input } from "@angular/core";
import { GoogleMapsModule } from "@angular/google-maps";

import { LocationService } from "../../../common/service/locationService.service";
import { IPost } from '../../../common/model/post';

@Component({
  selector: "app-map",
  templateUrl: "./map.component.html",
  styleUrls: ["./map.component.css"]
})
export class MapComponent implements AfterViewInit {
  userCurrentLocation: any;

  constructor(
    public locationService: LocationService,
    public mapsModule: GoogleMapsModule
  ) { }

  @Input() markers: any;

  ngAfterViewInit() {
    this.getUserCurrentLocation();
  }

  async getUserCurrentLocation() {
    this.userCurrentLocation = await this.locationService.getLocation();
    this.markers.subscribe(
      markers => {
        this.myMap(markers)
      });
  }

  myMap(postMarkers: IPost[]) {
    let mapProp = GoogleMapHandler.createMapProp(this.userCurrentLocation)

    //init the map and props
    let googleMap = new google.maps.Map(
      document.getElementById("googleMap"),
      mapProp
    );
    let currentPositionMarker = GoogleMapHandler.createMapMarker(this.userCurrentLocation, "YOU!");
    //add the marker of user curr location
    currentPositionMarker.setMap(googleMap);


    postMarkers.forEach(post => {
      //create post location coordinates
      let postLocation = { lat: +post.location.lat, lng: +post.location.lon };
      //create post props
      let postMarker = GoogleMapHandler.createMapMarker(postLocation,
        post.title,
        {
          url: "http://localhost:3000/public/uploads/images/" + post.image.url,
          scaledSize: new google.maps.Size(50, 50, "px", "px")
        })
      //add props to map
      postMarker.setMap(googleMap);
      let bubbleDiv = GoogleMapHandler.createBubbleContent(post)

      //add bubbles to the map
      let infowindow = new google.maps.InfoWindow({
        content: bubbleDiv,
        maxWidth: 400
      });

      let isOpen = false;
      // OPEN infoWindow
      postMarker.addListener("click", () => {
        if (isOpen) {
          infowindow.close();
          isOpen = false;
        }
        else {
          infowindow.open(googleMap, postMarker);
          isOpen = true;
        }
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

  static createBubbleContent(post: IPost): string {
    let content =
      `<div class="info-content">
           <div class="date info-content-child">
               <span>Date: ${post.username}</span>
            </div>
            <div class="date info-content-child">
               <span>Date: ${post.publishDate}</span>
            </div>
          <div class="content-body">
            <div class="header">
               <h3 class="header-content">${post.title}</h1>
            </div>
            <div>
               <p>${post.text}</p>
               ${post.tags.map(tag=>``)}
            </div>
            <div>
            Tags:${post.tags.map(tag=>`<span>#${tag}</span>`)}
            </div>
            <div class="likes" onclick="myFunction()">
               <span id="demo">${post.likes.amount}</span> Likes <img src="./assets/img/like.png" class="like_icon" title="Like me or die" />
            </div>
          </div>
        </div>`

    return this.setBody(content);
  }
  private static getStyle(): string {
    return `
     <style>
       .info-content {
        background-color: antiquewhite;
        padding:10px
       }
       .info-content-child{
         text-decoration: underline;
         margin:10px
       }
       .header-content {
         color: red;
       }
       p {
         color: blue;
         text-align:center;
         word-break: break-all;
       }
       .content-body{
         margin:10px;
         border:solid 2px black;
       }
       .content-body > div{
         margin:5px
       }
       .likes{
         margin-top: 20px;
         float: right;
         color: blue;
         margin-right: 20px;
       }
    </style>`
  }

  private static setBody(content) {
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
