import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { NavigatorService } from './navigator.service';

@Injectable({
  providedIn: 'root'
})
export class GuardService implements CanActivate{

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean | UrlTree | Observable<boolean | UrlTree> | Promise<boolean | UrlTree> {

    const isJwtNeeded = route.data["jwtNeeded"]
    const token = localStorage.getItem("token")
    const isTokenExist = token == null ? false:true;

    
    //reRoute if cant access
    if(isJwtNeeded && !isTokenExist){
      this.navigateService.goToLogin();
    }
    if(!isJwtNeeded && isTokenExist){
      this.navigateService.goToHomePage();
    }

    return isJwtNeeded ? isTokenExist:!isTokenExist
  }

  constructor(private navigateService: NavigatorService) { }
}
