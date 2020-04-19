import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { sharePostService } from "../../service/sharePost.model";
import { PostApiService } from "../../service/postApi.service";
import { LocationService } from "../../../common/service/locationService.service";
import { NavigatorService } from "../../../common/service/navigator.service";
import { ToastrService } from "ngx-toastr";
import { SocketService } from 'src/app/common/service/socket.service';

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
    public postApi: PostApiService,
    public shareModel: sharePostService,
    private location: LocationService,
    private navigateService: NavigatorService,
    private toastr: ToastrService,
    private socket: SocketService
  ) {

  }

  ngOnInit() { }

  handleFileInput(file: FileList) {
    this.fileToUpload = file.item(0);

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
    formData.append("title", this.shareModel.sharePostsModel.title);
    formData.append("text", this.shareModel.sharePostsModel.text);
    formData.append("tags", (<any>this.shareModel.sharePostsModel.tags));
    formData.append("imageTags", (<any>this.shareModel.sharePostsModel.imageTags));
    formData.append("locationLocationLat", postLocation.lat.toString());
    formData.append("locationLocationLng", postLocation.lng.toString());
    formData.append("date", new Date().toString());

    this.postApi.addPost(formData).subscribe(res => {
      this.socket.addPost(res.post)
      this.postCreated = true;
      this.shareModel.resetdata();
      this.toastr.success(res.message);
      setTimeout(() => {
        this.navigateService.goToPostsPage();
      }, 2000);
    });
  }
}
