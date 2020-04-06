
import { Observable, of } from 'rxjs';
import { IPost } from '../../../common/model/post';
import { IPostApi } from '../../service/postApi.service';
import { ISuccessResponse } from '../../../common/model/successResponse';

export const postsMock: IPost[] = [
    { publishDate: new Date('2020-03-03'), image: { url: 'anonym.png', tags: [] }, likes: { amount: 1, users: ['123'] }, postId: '1', tags: [], text: 'img', title: 'img1', location: { lat: '31', lon: '33' } },
    { publishDate: new Date('2020-01-03'), image: { url: 'anonym.png', tags: [] }, likes: { amount: 1, users: ['123'] }, postId: '2', tags: [], text: 'img 2', title: 'img2', location: { lat: '32', lon: '34' } },
    { publishDate: new Date('2020-02-03'), image: { url: 'anonym.png', tags: [] }, likes: { amount: 1, users: ['123'] }, postId: '3', tags: [], text: 'img 3', title: 'img3', location: { lat: '33', lon: '35' } },
    { publishDate: new Date('2020-04-03'), image: { url: 'anonym.png', tags: [] }, likes: { amount: 1, users: ['123'] }, postId: '4', tags: [], text: 'img 4', title: 'img4', location: { lat: '34', lon: '36' } },
    { publishDate: new Date('2020-05-03'), image: { url: 'anonym.png', tags: [] }, likes: { amount: 1, users: ['123'] }, postId: '5', tags: [], text: 'img 5', title: 'img5', location: { lat: '35', lon: '37' } }
]

export class PostsApiMockService implements IPostApi {
    constructor() {
        this.posts = postsMock;
    }
    posts: IPost[]
    addPost(post: any): Observable<ISuccessResponse> {
        const response: ISuccessResponse = {
            message: `Action 
        ${this.posts.find(p => p.postId = post.postId) ? 'Fail' : "Success"}`
        }
        return of(response)
    }
    getAllPosts(notifyMarkers?: boolean): Observable<IPost[]> {
        return of(this.posts)
    }
    getFilterPosts(filters: any): Observable<IPost[]> {
        return of(this.posts)
    }
    updateLikes(post: any): Observable<ISuccessResponse> {
        const response: ISuccessResponse = { message: `Action ${this.posts.find(p => p.postId = post.postId) ? "Success" : "Fail"}` }
        return of(response)
    }

} 