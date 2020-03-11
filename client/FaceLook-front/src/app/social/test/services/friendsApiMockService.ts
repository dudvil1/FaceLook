import { IFriendApi } from '../../service/friendApi.service';
import { Observable, of } from 'rxjs';
import { IUser } from 'src/app/common/model/user';

export class FriendApiService implements IFriendApi {
    users: IUser[]

    addFriend(userId: string, friendId: string): Observable<IUser> {
        throw new Error("Method not implemented.");
    }
    getAllUsers(filter?: string): Observable<IUser[]> {
        if (filter) {
            //return Observable of all the users that thier email or name contain 
            return of(this.users.filter(user => (user.name.includes(filter) || user.email.includes(filter))))
        }
        else{
            of(this.users)
        }
    }
    updateFollow(userId: string, friendId: string): Observable<IUser> {
        throw new Error("Method not implemented.");
    }

    constructor(){
        this.users = [
            // {},
        ]
    }

} 