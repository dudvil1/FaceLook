import { Component, OnInit } from "@angular/core";
import { sharePostService } from "../models/sharePost.model";
import { feedApiService} from "../../service/feedApi.service"

@Component({
  selector: "app-share-post",
  templateUrl: "./share-post.component.html",
  styleUrls: ["./share-post.component.css"]
})
export class SharePostComponent implements OnInit {
  imageUrl: string = "../../../../assets/default-img.png";
  fileToUpload: File = null;
  constructor(
    public shareModel: sharePostService,
    private feedApi: feedApiService
    ) {}

  ngOnInit() {}

  handleFileInput(file: FileList) {
    this.fileToUpload = file.item(0);
    console.log("file" , this.fileToUpload);

    //Show image preview
    var reader = new FileReader();
    reader.onload = (event: any) => {
      this.imageUrl = event.target.result;
    };
    reader.readAsDataURL(this.fileToUpload);
  }

  createPost() {
    const formData: FormData = new FormData();
    formData.append("image", this.fileToUpload);
    formData.append("text", this.shareModel.sharePostsModel.text);
    console.log(this.fileToUpload);



    this.feedApi.addPost(formData).subscribe(res => {
       console.log("success");
    });
  }
}
