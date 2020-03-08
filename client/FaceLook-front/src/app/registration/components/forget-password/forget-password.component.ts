import { Component, OnInit } from "@angular/core";
import { registrationApiService } from "../../service/api-service.service";
import { UserService } from "../../models/user-service.service";
import { ToastrService } from "ngx-toastr";
import { Router, ActivatedRoute } from "@angular/router";

@Component({
  selector: "app-forget-password",
  templateUrl: "./forget-password.component.html",
  styleUrls: ["./forget-password.component.css"]
})

export class ForgetPasswordComponent implements OnInit {
  constructor(
    private ApiService: registrationApiService,
    public userService: UserService,
    private toastr: ToastrService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit() {}

  confirmPassword() {
    if (
      this.userService.userData.newPassword ===
      this.userService.userData.confirmPassword
    )
      return true;
    return false;
  }

  forgetPassword() {
    console.log("forgetPassword call()");
    if (this.confirmPassword()) {
      this.ApiService.updatePassword(this.userService).subscribe(res => {
        this.toastr.success("success to update your password");
        this.router.navigate(["/login"]);
      });
    }
  }
}
