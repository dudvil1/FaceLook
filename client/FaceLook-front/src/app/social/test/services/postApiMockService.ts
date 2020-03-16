
import { Observable, of } from 'rxjs';
import { IPost } from '../../../common/model/post';
import { IPostApi } from '../../service/postApi.service';
import { ISuccessResponse } from '../../../common/model/successResponse';

export class PostsApiMockService implements IPostApi {
    posts: IPost[] = [
        { date: '2020-03-03', image: 'img.jpg', latitude: '35', likes: 10, longitude: '32.1', post_id: '1', publisher_id: '1', text: 'img', title: 'img1' },
        { date: '2020-01-03', image: 'img1.jpg', latitude: '34.5', likes: 31, longitude: '32.2', post_id: '2', publisher_id: '1', text: 'img 2', title: 'img2' },
        { date: '2020-02-03', image: 'img2.jpg', latitude: '34.9', likes: 78, longitude: '32.1', post_id: '3', publisher_id: '1', text: 'img 3', title: 'img3' },
        { date: '2020-04-03', image: 'img3.jpg', latitude: '35.1', likes: 34, longitude: '32.12', post_id: '4', publisher_id: '1', text: 'img 4', title: 'img4' },
        { date: '2020-05-03', image: 'img4.jpg', latitude: '35.8', likes: 11, longitude: '32.6', post_id: '5', publisher_id: '1', text: 'img 5', title: 'img5' }
    ]

    addPost(post: any): Observable<ISuccessResponse> {
        const response: ISuccessResponse = {
            message: `Action 
        ${this.posts.find(p => p.post_id = post.post_id) ? 'Fail' : "Success"}`
        }
        return of(response)
    }
    getAllPosts(notifyMarkers?: boolean): Observable<IPost[]> {
        return of(this.posts)
    }
    getFilterPosts(filters: any): Observable<IPost[]> {
        throw new Error("Method not implemented.");
    }
    updateLikes(post: any): Observable<ISuccessResponse> {
        const response: ISuccessResponse = { message: `Action ${this.posts.find(p => p.post_id = post.post_id) ? "Success" : "Fail"}` }
        return of(response)
    }

} 