import { Component, OnInit } from "@angular/core";
import { ToastrService } from "ngx-toastr";
import { Router, ActivatedRoute } from "@angular/router";
import { NgForm } from "@angular/forms";
import { registrationApiService } from "../../service/api-service.service";
import { UserService } from "../../service/user-service.service";
import { NavigatorService } from '../../../common/service/navigator.service';
import { StorageService} from '../../../common/service/storage.service';
import { from } from 'rxjs';

@Component({
  selector: "app-log-in",
  templateUrl: "./log-in.component.html",
  styleUrls: ["./log-in.component.css"]
})

export class LogInComponent implements OnInit {
  response: any = {};

  constructor(
    private navigateService:NavigatorService,
    private api: registrationApiService,
    public userService: UserService,
    private toastr: ToastrService,
    private StorageService:StorageService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit() {
      this.verifyAccountIfNecessary();
      this.userService.resetData();
  }

  login() {
    console.log("login.component.ts: sign() called");
    //api call
    this.api.login(this.userService.userData).subscribe(
      data => {
        console.log("Successfull", data);
        this.response = data;
        console.log("Response: ", this.response.message);

        //check the response message
        if (this.response.message === "Auth successful") {
          this.userService.userData = data["user"];

          this.StorageService.setToken(data["token"]);
          /* localStorage.setItem("token", data["token"]); */

          //give client message
          this.toastr.success(data["message"], "Success");

          //route to the feed
          this.navigateService.goToHomePage()
        }
      },
      error => {
        this.toastr.error("problam with your account, please try again");
      }
    );
  }

  verifyAccountIfNecessary() {
    console.log("verifyAccount Call()");

    if (this.route.snapshot.routeConfig.path === "login/:id") {
      this.route.params.subscribe(params =>
        this.api.verifyAccount(params).subscribe(
          res => {
            if (res["message"] === "active account Successfully , you can log in now") {
              this.toastr.success(res["message"]);
            }
          },
          err => {
            this.toastr.error("problam with your account, please try again");
          }
        )
      );
    }
  }

  onforgotPassword() {
    if (!this.userService.userData.email) alert("enter Your Email First");
    else {
      console.log("getResetCodePassword call()");
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

  goToRegisterPage(){
    this.navigateService.goToRegister();
  }
}
