import { Component, OnInit } from "@angular/core";
import { Router } from '@angular/router';
import { sharePostService } from "../models/sharePost.model";
import { postApiService } from "../../service/postApi.service";
import { LocationService } from "../../service/locationService.service";

@Component({
  selector: "app-share-post",
  templateUrl: "./share-post.component.html",
  styleUrls: ["./share-post.component.css"]
})
export class SharePostComponent implements OnInit {
  imageUrl: string = "./assets/img/anonym.png";
  fileToUpload: File = null;
  postCreated: boolean = false;

  constructor(
    public postApi: postApiService,
    public shareModel: sharePostService,
    private location: LocationService,
    private router: Router
  ) {}

  ngOnInit() {}

  handleFileInput(file: FileList) {
    this.fileToUpload = file.item(0);
    console.log("file", this.fileToUpload);

    //Show image preview
    var reader = new FileReader();
    reader.onload = (event: any) => {
      this.imageUrl = event.target.result;
    };
    reader.readAsDataURL(this.fileToUpload);
  }

  async createPost() {
    const postLocation = await this.location.getLocation();
    const formData: FormData = new FormData();
    formData.append("image", this.fileToUpload);
    formData.append("title", this.shareModel.sharePostsModel.title)
    formData.append("text", this.shareModel.sharePostsModel.text);
    formData.append("tags", this.shareModel.sharePostsModel.tags);
    formData.append("locationLocationLat", postLocation.lat.toString());
    formData.append("locationLocationLng", postLocation.lng.toString());
    formData.append("date", new Date().toString());

    this.postApi.addPost(formData).subscribe(res => {
      this.postCreated = true;
      this.shareModel.resetdata();
      setTimeout(() => {
        this.router.navigateByUrl('/posts');
      }, 2000);
    });
  }

}
