import { Component, OnInit } from '@angular/core';
import { Router , ActivatedRoute} from '@angular/router';
import { NgForm } from '@angular/forms';
import {ToastrService} from 'ngx-toastr';
import { registrationApiService } from "../../service/api-service.service";
import { UserService } from "../../models/user-service.service";


@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private api: registrationApiService,
    public userService: UserService,
    private toastr: ToastrService
  ) { }

  ngOnInit() {
    this.userService.resetData();
  }

  register(){
    console.log("register call()");

    //api call
   this.api.register(this.userService.userData).subscribe(
     res => {
       //give client message
      this.toastr.success(res["message"], "Success")
     },
     error => {
      this.toastr.error(error.error.message, "Error in register");
    }
   )
  }
}
