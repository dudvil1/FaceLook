import { Injectable } from "@angular/core";
import {HttpClient} from "@angular/common/http";
import { ApiConfigService } from '../../common/service/api-config.service';

@Injectable({
  providedIn: "root"
})
export class registrationApiService {

  constructor(
    private httpClient: HttpClient,
    private apiConfig: ApiConfigService)
     { }

  login(user: any) {
    const { registrationUrl, login } = this.apiConfig.registrationApi
    const url = registrationUrl + login

    return this.httpClient.post(url, user);
  }

  verifyAccount(params) {
    const { registrationUrl, verifyAccount } = this.apiConfig.registrationApi
    const url = registrationUrl + verifyAccount
    
    return this.httpClient.patch(url, params);
  }

  register(user: any) {
    const { registrationUrl, register } = this.apiConfig.registrationApi
    const url = registrationUrl + register
    
    return this.httpClient.post(url, user);
  }

  updatePassword(params) {
    const { registrationUrl, forgetPassword } = this.apiConfig.registrationApi
    const url = registrationUrl + forgetPassword

    return this.httpClient.patch(url, params);
  }

  getResetCodePassword(userMail: any) {
    const { registrationUrl, getResetCodePassword } = this.apiConfig.registrationApi
    const url = registrationUrl + getResetCodePassword

    return this.httpClient.patch(url, { userMail });
  }
}
