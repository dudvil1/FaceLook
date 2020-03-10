import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { markerCollectionsService } from "../service/marker-collection.service"
import { tap, map } from 'rxjs/operators';
import { ApiConfigService } from '../../common/service/api-config.service';

@Injectable()
export class postApiService {
  constructor(
    private markersService: markerCollectionsService,
    private httpClient: HttpClient,
    private apiConfig: ApiConfigService
  ) { }

  addPost(post: any) {
    const { socialUrl, addPost } = this.apiConfig.socialApi
    const url = socialUrl + addPost

    return this.httpClient.post(url, post);
  }

  getAllPosts() {
    const { socialUrl, getPosts } = this.apiConfig.socialApi
    const url = socialUrl + getPosts

    return this.httpClient.get(url).pipe(
      tap((res) => {
        const markers = this.setPostsToMarkers(res);
        console.log("res", markers);
        this.markersService.markers$.next(markers);
      })
    );
  }

  getFilterPosts(filters) {
    const { socialUrl, filterPosts } = this.apiConfig.socialApi
    const url = socialUrl + filterPosts(JSON.stringify(filters))

    return this.httpClient.get(url).pipe(
      tap((res) => {
        const markers = this.setPostsToMarkers(res);

        this.markersService.markers$.next(markers);
      })
    );
  }
  updateLikes(post) {
    const { socialUrl, updateLikes } = this.apiConfig.socialApi
    const url = socialUrl + updateLikes

    return this.httpClient.patch(url, { post });
  }

  getAllPostsAsPosts() {
    const { socialUrl, getPosts } = this.apiConfig.socialApi
    const url = socialUrl + getPosts

    return this.httpClient.get(url).pipe(
      map((res) => {
        return this.setPostsToMarkers(res);
      })
    );
  }
  private setPostsToMarkers(res: Object) {
    return (<any>res).map(post => ({
      postId: post.post_id,
      title: post.title,
      publisherId: post.publisher_id,
      text: post.text,
      image: post.image,
      lat: post.latitude,
      lng: post.longitude,
      likes: post.likes,
      date: post.date,
    }));
  }


}
