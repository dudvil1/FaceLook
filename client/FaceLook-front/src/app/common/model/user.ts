export interface IUser {
    _id: string,
    name: string,
    role: string,
    email: string,
    active: boolean,
    userId?:string,
    friendId?:string,
    isFollowed?:boolean,
}

