import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { markerCollectionsService } from "../service/marker-collection.service"
import { tap, map } from 'rxjs/operators';
import { ApiConfigService } from '../../common/service/api-config.service';
import { Observable } from 'rxjs';
import { IPost } from '../../common/model/post';
import { ReturnStatement } from '@angular/compiler';
import { ISuccessResponse } from '../../common/model/successResponse';

export interface IPostApi {
  addPost(post: any): Observable<ISuccessResponse>,
  getAllPosts(notifyMarkers?: boolean): Observable<IPost[]>,
  getFilterPosts(filters): Observable<IPost[]>,
  updateLikes(post): Observable<ISuccessResponse>
}

@Injectable()
export class PostApiService implements IPostApi {
  constructor(
    private markersService: markerCollectionsService,
    private httpClient: HttpClient,
    private apiConfig: ApiConfigService
  ) { }

  addPost(post: any): Observable<ISuccessResponse> {
    const { socialUrl, addPost } = this.apiConfig.socialApi
    const url = socialUrl + addPost

    return this.httpClient.post<ISuccessResponse>(url, post).pipe();
  }

  getAllPosts(notifyMarkers?: boolean): Observable<IPost[]> {
    const { socialUrl, getPosts } = this.apiConfig.socialApi
    const url = socialUrl + getPosts

    return this.httpClient.get<IPost[]>(url).pipe(
      tap((posts) => {
        if (notifyMarkers)
          this.markersService.markers$.next(posts);
        else
          this.markersService.allPost$.next(posts);
      })
    );
  }

  getFilterPosts(filters): Observable<IPost[]> {
    const { socialUrl, filterPosts } = this.apiConfig.socialApi
    const url = socialUrl + filterPosts(JSON.stringify(filters))

    return this.httpClient.get<IPost[]>(url).pipe(
      tap((posts) => {
        this.markersService.markers$.next(posts);
      })
    );
  }
  updateLikes(data: { post: IPost, userId: string }): Observable<ISuccessResponse> {
    const { socialUrl, addLike } = this.apiConfig.socialApi
    const url = socialUrl + addLike

    return this.httpClient.patch<ISuccessResponse>(url, data);
  }

  removeLikes(data: { post: IPost, userId: string }): Observable<ISuccessResponse> {
    const { socialUrl, removeLike } = this.apiConfig.socialApi
    const url = socialUrl + removeLike

    return this.httpClient.patch<ISuccessResponse>(url, data);
  }

}
