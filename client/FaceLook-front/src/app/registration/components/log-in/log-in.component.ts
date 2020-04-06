import { Component, OnInit, OnDestroy } from "@angular/core";
import { ToastrService } from "ngx-toastr";
import { ActivatedRoute } from "@angular/router";
import { registrationApiService } from "../../service/api-service.service";
import { UserService } from "../../service/user-service.service";
import { NavigatorService } from '../../../common/service/navigator.service';
import { StorageService } from '../../../common/service/storage.service';
import { Subscription } from 'rxjs';

@Component({
  selector: "app-log-in",
  templateUrl: "./log-in.component.html",
  styleUrls: ["./log-in.component.css"]
})

export class LogInComponent implements OnInit, OnDestroy {

  subscriptionParams: Subscription;
  constructor(
    private navigateService: NavigatorService,
    private api: registrationApiService,
    public userService: UserService,
    private toastr: ToastrService,
    private storageService: StorageService,
    private route: ActivatedRoute
  ) { }
  ngOnDestroy(): void {
    this.subscriptionParams ? this.subscriptionParams.unsubscribe() : () => { }
  }

  ngOnInit() {
    this.verifyAccountIfNecessary();
    this.userService.resetData();
  }

  login() {
    //api call
    this.api.login(this.userService.userData).subscribe(
      data => {
        this.storageService.setToken(data.token);
        this.toastr.success(data.message, "Success");
        this.navigateService.goToHomePage()
      },
      error => {
        this.toastr.error("problam with your account, please try again");
      }
    );
  }

  verifyAccountIfNecessary() {
    this.subscriptionParams = this.route.params.subscribe(params => {
      if (params && Object.keys(params).length) {
        this.api.verifyAccount(params).subscribe(
          res => {
            this.toastr.success(res.message);
          },
          err => {
            this.toastr.error("problam with your account, please try again");
          }
        )
      }
    });
  }

  onForgotPassword() {
    if (!this.userService.userData.email)
      alert("Enter Your Email First");
    else {
      //api call
      this.api.getResetCodePassword(this.userService.userData.email).subscribe(
        res => {
          //give client message
          this.toastr.success("Reset Code just send to your email");
        },
        err => {
          this.toastr.error("please try again");
        }
      );
    }
  }

  goToRegisterPage() {
    this.navigateService.goToRegister();
  }
}
