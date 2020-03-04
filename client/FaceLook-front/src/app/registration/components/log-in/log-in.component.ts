import { Component, OnInit } from "@angular/core";
import { ToastrService } from "ngx-toastr";
import { Router, ActivatedRoute } from "@angular/router";
import { NgForm } from "@angular/forms";
import { registrationApiService } from "../../service/api-service.service";
import { UserService } from "../../models/user-service.service";

@Component({
  selector: "app-log-in",
  templateUrl: "./log-in.component.html",
  styleUrls: ["./log-in.component.css"]
})
export class LogInComponent implements OnInit {
  response: any = {};

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private api: registrationApiService,
    public userService: UserService,
    private toastr: ToastrService
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

          localStorage.setItem("token", data["token"]);

          //give client message
          this.toastr.success(data["message"], "Success");

          //route to the feed
          this.router.navigate(["/social"]);
        }
      },
      error => {
        this.toastr.error("problam with your account, please try again");
      }
    );
  }

  verifyAccountIfNecessary() {
    console.log("verifyAccount Call()");
    //api call
    if (this.route.snapshot.routeConfig.path === "login/:id") {
      this.route.params.subscribe(params =>
        this.api.verifyAccount(params).subscribe(
          res => {
            if (res["message"] === "active account Successfully , you can log in now") {
              //give client message
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
      console.log("forgot password call()");
      //api call
      this.api.forgotPassword(this.userService.userData).subscribe(
        res => {
          //give client message
          this.toastr.success("Please Check Your Email");
        },
        err => {
          this.toastr.error("please try again");
        }
      );
    }
  }
}
