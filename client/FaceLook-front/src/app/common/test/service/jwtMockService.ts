import { IJwtService } from '../../service/jwt.service';
import { IUser } from '../../model/user';

export class JwtMockService implements IJwtService {

    user: IUser
    constructor() { }

    getUserId(): string | null {
        return this.user ? this.user._id : "1"
    }

    getUser(): IUser | null {
        return this.user || { _id: '1', active: true, email: '', name: "guy", role: '' }
    }

    setUser(user: IUser) {
        this.user = user
    }
}