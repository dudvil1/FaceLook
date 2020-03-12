import { IFriendApi } from '../../service/friendApi.service';
import { Observable, of } from 'rxjs';
import { IUser } from 'src/app/common/model/user';

export class FriendApiMockService implements IFriendApi {
    users: IUser[] = [
        { active: true, email: 'guykem@gmail.com', name: 'guy', _id: '1', role: 'user' },
        { active: true, email: 'nirkem@gmail.com', name: 'nir', _id: '2', role: 'user' },
        { active: true, email: 'dudukem@gmail.com', name: 'guykem', _id: '3', role: 'user' },
        { active: true, email: 'sharonkem@gmail.com', name: 'sharon', _id: '4', role: 'user' },
        { active: true, email: 'amnonkem@gmail.com', name: 'amnon', _id: '5', role: 'user' },
    ]

    addFriend(userId: string, friendId: string): Observable<IUser> {
        return of(this.users.find(user => user._id == friendId))
    }
    getAllUsers(filter?: string): Observable<IUser[]> {
        if (filter) {
            //return Observable of all the users that thier email or name contain 
            return of(this.users.filter(user => (user.name.includes(filter) || user.email.includes(filter))))
        }
        else {
            of(this.users)
        }
    }
    updateFollow(userId: string, friendId: string): Observable<IUser> {
        return of(this.users.find(user => user._id == friendId))
    }

    constructor() {
    }

} 