import { Component, OnInit } from "@angular/core";
import { sharePostService } from "../models/sharePost.model";

@Component({
  selector: "app-share-post",
  templateUrl: "./share-post.component.html",
  styleUrls: ["./share-post.component.css"]
})
export class SharePostComponent implements OnInit {
  imageUrl: string = "../../../../assets/default-img.png";
  fileToUpload: File = null;
  constructor(public shareModel: sharePostService) {}

  ngOnInit() {}

  handleFileInput(file: FileList) {
    this.fileToUpload = file.item(0);

    //Show image preview
    var reader = new FileReader();
    reader.onload = (event: any) => {
      this.imageUrl = event.target.result;
    };
    reader.readAsDataURL(this.fileToUpload);
    console.log("img reader", reader);
  }

  createPost() {
    const formData: FormData = new FormData();
    formData.append("Image", this.fileToUpload);
    this.shareModel.sharePostsModel.image = formData;
    console.log("call obj", this.shareModel.sharePostsModel);
  }
}
