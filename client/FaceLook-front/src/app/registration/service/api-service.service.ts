import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { ApiConfigService } from '../../common/service/api-config.service';
import { Observable } from 'rxjs';
import { ISuccessResponse } from 'src/app/common/model/successResponse';
export interface IRegistrationApiService {
  login(user: any): Observable<ISuccessResponse>,
  verifyAccount(params): Observable<ISuccessResponse>,
  register(user: any): Observable<ISuccessResponse>,
  updatePassword(params): Observable<ISuccessResponse>,
  getResetCodePassword(userMail: any): Observable<ISuccessResponse>
}


@Injectable({
  providedIn: "root"
})
export class registrationApiService implements IRegistrationApiService {

  constructor(
    private httpClient: HttpClient,
    private apiConfig: ApiConfigService) { }

  login(user: any): Observable<ISuccessResponse> {
    const { registrationUrl, login } = this.apiConfig.registrationApi
    const url = registrationUrl + login

    return this.httpClient.post<ISuccessResponse>(url, user);
  }

  verifyAccount(params): Observable<ISuccessResponse> {
    const { registrationUrl, verifyAccount } = this.apiConfig.registrationApi
    const url = registrationUrl + verifyAccount

    return this.httpClient.patch<ISuccessResponse>(url, params);
  }

  register(user: any): Observable<ISuccessResponse> {
    const { registrationUrl, register } = this.apiConfig.registrationApi
    const url = registrationUrl + register

    return this.httpClient.post<ISuccessResponse>(url, user);
  }

  updatePassword(params): Observable<ISuccessResponse> {
    const { registrationUrl, forgetPassword } = this.apiConfig.registrationApi
    const url = registrationUrl + forgetPassword

    return this.httpClient.patch<ISuccessResponse>(url, params);
  }

  getResetCodePassword(userMail: any): Observable<ISuccessResponse> {
    const { registrationUrl, getResetCodePassword } = this.apiConfig.registrationApi
    const url = registrationUrl + getResetCodePassword

    return this.httpClient.patch<ISuccessResponse>(url, { userMail });
  }
}
