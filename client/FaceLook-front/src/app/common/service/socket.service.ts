import { Injectable } from '@angular/core';
import { Socket } from 'ngx-socket-io';
import { markerCollectionsService } from 'src/app/social/service/marker-collection.service';
import { postsFilterService } from 'src/app/social/service/postsFilter.model';
import { IPost } from '../model/post';
import { environment } from 'src/environments/environment';


@Injectable({
  providedIn: 'root'
})
export class SocketService extends Socket {
  constructor(
    private markerCollection: markerCollectionsService,
    private postsFilter: postsFilterService,
  ) {
    super({ url: environment.baseUrl })
    this.connect()
    this.listening()
  }

  addPost() {
    this.emit('addPost')
  }

  updateLike(post: IPost) {
    this.emit('updateLike', post)
  }

  private listening() {
    this.on('addPostChange', (posts) => {
      let allPosts = posts
      if (Object.keys(this.postsFilter.postsData)) {
        allPosts = posts.filter(post => this.postsFilter.isPostMatch(post))
      }
      const markers = this.markerCollection.markers$.getValue()
      if ((markers) != (allPosts)) {
        this.markerCollection.markers$.next(allPosts)
      }
    })

    this.on('updateLikeChange', (post) => {
      const markers = this.markerCollection.markers$.getValue()
      const oldPost = markers.find(p => p.post_id = post.post_id).likes
      if (oldPost) {
        const newMarkers = markers.filter(p => p != oldPost)
        this.markerCollection.markers$.next([...newMarkers, post])
      }
    })
  }
}