import { Component, OnInit } from "@angular/core";
import { registrationApiService } from "../../service/api-service.service";
import { UserService } from "../../service/user-service.service";
import { ToastrService } from "ngx-toastr";
import { Router, ActivatedRoute } from "@angular/router";
import { NavigatorService } from "../../../common/service/navigator.service";

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
    private route: ActivatedRoute,
    private NavigatorService: NavigatorService
  ) {
    this.userService.resetData()
  }

  ngOnInit() { }

  private confirmPassword() {
    if (
      this.userService.userData.newPassword ===
      this.userService.userData.confirmPassword
    )
      return true;
    return false;
  }

  forgetPassword() {
    console.log("forgetPassword call()");

    if (this.confirmPassword() && this.route.snapshot.routeConfig.path === "forgetpassword/:id") {
      this.route.params.subscribe(params => {
        let result = {
          ...params,
          user: this.userService.userData
        }
        this.ApiService.updatePassword(result).subscribe(res => {
          this.toastr.success("success to update your password");
          this.NavigatorService.goToLogin();
        })
      })
    }

  }
}
