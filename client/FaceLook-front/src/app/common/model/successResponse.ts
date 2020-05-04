import { IPost } from './post';

export interface ISuccessResponse {
    message: string,
    token?: string,
    post?: IPost
}