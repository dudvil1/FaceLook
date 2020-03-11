import { IJwtService } from '../../service/jwt.service';
import { IUser } from '../../model/user';

export class JwtMockService implements IJwtService {

    user: IUser
    constructor() { }

    getUserId(): string | null {
       return this.user._id
    }

    getUser(): IUser | null {
        return this.user
    }

    setUser(user: IUser) {
        this.user = user
    }
}