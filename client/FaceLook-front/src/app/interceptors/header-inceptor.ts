import { Injectable } from '@angular/core';
import {
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest
} from '@angular/common/http';

import { Observable } from 'rxjs'
import { StorageService } from '../common/service/storage.service';



//@injectable
@Injectable()
export class HeaderInterceptor implements HttpInterceptor {


  constructor(private storage: StorageService) {
  }
  //this function intercepts the request
  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

    //get token from local storage
    let token = this.storage.getToken()
    //cloning the request and adding Authorization header to it
    if (token) {
      req = req.clone({
        headers: req.headers.set("Authorization", "JWT " + token)
      });
    }
    //passing the request
    return next.handle(req);
  }

}
