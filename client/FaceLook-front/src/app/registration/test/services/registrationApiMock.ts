
import { Observable, of } from 'rxjs';
import { ISuccessResponse } from 'src/app/common/model/successResponse';
import { IRegistrationApiService } from '../../service/api-service.service';

export class RegistrationApiMockService implements IRegistrationApiService {

  register(user: any): Observable<ISuccessResponse> {
    return this.responseSuccess('User Created Successfully , Please check Your Mail To Verify Your Account')
  }

  login(user: any): Observable<ISuccessResponse> {
    return this.responseSuccess('Authorize successful', 'n4nyb9fmiwefhbbBJHG6gyv6vyuBUH8guiBuoguiBiubIv')
  }

  verifyAccount(params): Observable<ISuccessResponse> {
    return this.responseSuccess('Account Verify successfuly')
  }

  updatePassword(params): Observable<ISuccessResponse> {
    return this.responseSuccess('password change successfuly')
  }

  getResetCodePassword(userMail: any): Observable<ISuccessResponse> {
    return this.responseSuccess('ok')
  }

  private responseSuccess(message: string, token?: string): Observable<ISuccessResponse> {
    return of({ message: message, token: token })
  }
}
