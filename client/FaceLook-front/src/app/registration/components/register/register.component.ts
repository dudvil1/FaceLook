import { Component, OnInit } from "@angular/core";
import { ToastrService } from "ngx-toastr";
import { registrationApiService } from "../../service/api-service.service";
import { UserService } from "../../service/user-service.service";
import { NavigatorService } from "../../../common/service/navigator.service";

@Component({
  selector: "app-register",
  templateUrl: "./register.component.html",
  styleUrls: ["./register.component.css"]
})
export class RegisterComponent implements OnInit {
  constructor(
    private navigateService: NavigatorService,
    private api: registrationApiService,
    public userService: UserService,
    private toastr: ToastrService
  ) {}

  ngOnInit() {
    this.userService.resetData();
  }

  register() {

    this.api.register(this.userService.userData).subscribe(
      res => {
        this.toastr.success(res["message"], "Success");
      },
      error => {
        this.toastr.error(error.error.message, "Error in register");
      }
    );
  }

  goToLoginPage() {
    this.navigateService.goToLogin();
  }
}
