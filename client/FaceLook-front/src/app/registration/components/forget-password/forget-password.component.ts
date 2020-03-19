import { Component, OnInit, OnDestroy } from "@angular/core";
import { registrationApiService } from "../../service/api-service.service";
import { UserService } from "../../service/user-service.service";
import { ToastrService } from "ngx-toastr";
import { Router, ActivatedRoute } from "@angular/router";
import { NavigatorService } from "../../../common/service/navigator.service";
import { Subscription } from 'rxjs';

@Component({
  selector: "app-forget-password",
  templateUrl: "./forget-password.component.html",
  styleUrls: ["./forget-password.component.css"]
})
export class ForgetPasswordComponent implements OnInit, OnDestroy {
  subscriptionParams: Subscription;

  constructor(
    private ApiService: registrationApiService,
    public userService: UserService,
    private toastr: ToastrService,
    private route: ActivatedRoute,
    private navigatorService: NavigatorService
  ) {
    this.userService.resetData()
  }
  ngOnDestroy(): void {
    this.subscriptionParams ? this.subscriptionParams.unsubscribe() : () => { }
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
    this.subscriptionParams = this.route.params.subscribe(params => {
      if (this.confirmPassword() && Object.keys(params).length) {
        let result = {
          ...params,
          user: this.userService.userData
        }
        this.ApiService.updatePassword(result).subscribe(res => {
          this.toastr.success("success to update your password");
          this.navigatorService.goToLogin();
        })
      }
    })

  }
}
