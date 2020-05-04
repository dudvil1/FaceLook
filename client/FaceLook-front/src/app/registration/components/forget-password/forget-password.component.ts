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
    private apiService: registrationApiService,
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

  confirmPassword() {
    return this.userService.userData.newPassword === this.userService.userData.confirmPassword
  }

  forgetPassword() {
    this.subscriptionParams = this.route.params.subscribe(params => {
      if (this.confirmPassword() && Object.keys(params).length) {
        let result = {
          ...params,
          user: this.userService.userData
        }
        this.apiService.updatePassword(result).subscribe(res => {
          this.toastr.success("success to update your password");
          this.navigatorService.goToLogin();
        })
      }
    })

  }
}
