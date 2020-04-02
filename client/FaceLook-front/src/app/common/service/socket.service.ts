import { Injectable } from '@angular/core';
import { Socket } from 'ngx-socket-io';
import { markerCollectionsService } from 'src/app/social/service/marker-collection.service';
import { postsFilterService } from 'src/app/social/service/postsFilter.model';
import { IPost } from '../model/post';
import { environment } from 'src/environments/environment';


export interface ISocketService {
  addPost(post: IPost),
  updateLike(post: IPost)
}

@Injectable({
  providedIn: 'root'
})

export class SocketService extends Socket implements ISocketService {
  constructor(
    private markerCollection: markerCollectionsService,
    private postsFilter: postsFilterService,
  ) {
    super({ url: environment.baseUrl })
    this.connect()
    this.listening()
  }

  addPost(post) {
    this.emit('addPost', post)
  }

  updateLike(post: IPost) {
    this.emit('updateLike', post)
  }

  private listening() {
    this.on('addPostChange', (post: IPost) => {
      const markers = this.markerCollection.markers$.getValue()
      if (!Object.keys(this.postsFilter.postsData)) {
        this.markerCollection.markers$.next([...markers, post])
      }
      else if (this.postsFilter.isPostMatch(post)) {
        this.markerCollection.markers$.next([...markers, post])
      }

      const allPosts = this.markerCollection.allPost$.getValue()
      this.markerCollection.allPost$.next([...allPosts, post])
    })
    this.on('updateLikeChange', (post: IPost) => {
      const markers = this.markerCollection.markers$.getValue()
      const oldPost = markers.find(p => p.postId = post.postId)
      if (oldPost) {
        const newMarkers = markers.filter(p => p != oldPost)
        this.markerCollection.markers$.next([...newMarkers, post])
      }

      const allPosts = this.markerCollection.allPost$.getValue()
      console.log(...allPosts.filter(p => p.postId != post.postId))
      this.markerCollection.allPost$.next([...allPosts.filter(p => p.postId != post.postId), post])
    })
  }
}
