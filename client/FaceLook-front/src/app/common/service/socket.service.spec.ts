import { TestBed } from '@angular/core/testing';

import { SocketService } from './socket.service';
import { markerCollectionsService } from 'src/app/social/service/marker-collection.service';
import { postsFilterService } from 'src/app/social/service/postsFilter.model';
import { IPost } from '../model/post';
import { postsMock } from 'src/app/social/test/services/postApiMockService';

describe('SocketService', () => {
  let service: SocketService;
  let markerCollections: markerCollectionsService;
  let postsFilter: postsFilterService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        SocketService,
        markerCollectionsService,
        postsFilterService,
      ]
    });
    markerCollections = TestBed.get(markerCollectionsService)
    postsFilter = TestBed.get(postsFilterService)
    service = TestBed.inject(SocketService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('onCreation - should try to connect and start listening', () => {
    let listening_Spy = spyOn(SocketService.prototype, 'listening');
    let connect_Spy = spyOn(SocketService.prototype, 'connect');

    service = new SocketService(markerCollections, postsFilter);

    expect(listening_Spy).toHaveBeenCalled();
    expect(connect_Spy).toHaveBeenCalled();
  });

  it('addPost() - should send notification to the server that a new post has been emitted', () => {
    const post: IPost = postsMock[0]
    let emit_Spy = spyOn(service, 'emit').withArgs('addPost', post).and.returnValue(null);
    service.addPost(post)
    expect(emit_Spy).toHaveBeenCalled();
  });

  it('updateLike() - should send notification to the server that a post has been updated', () => {
    const post: IPost = postsMock[0]
    let emit_Spy = spyOn(service, 'emit').withArgs('updateLike', post).and.returnValue(null);
    service.updateLike(post)
    expect(emit_Spy).toHaveBeenCalled();
  });

  it('listening() - check all listening methods as been called', () => {
    let listeningToPostAdded_Spy = spyOn(service, 'listeningToPostAdded');
    let listeningToPostUpdated_Spy = spyOn(service, 'listeningToPostUpdated');

    service.listening()
    expect(listeningToPostAdded_Spy).toHaveBeenCalled();
    expect(listeningToPostUpdated_Spy).toHaveBeenCalled();
  });

  it('listeningToPostAdded() - check call on() function', () => {
    let on_Spy = spyOn(service, 'on');
    service.listeningToPostAdded()
    expect(on_Spy).toHaveBeenCalled();
  });

  it('listeningToPostUpdated() - check call on() function', () => {
    let on_Spy = spyOn(service, 'on')
    service.listeningToPostUpdated()
    expect(on_Spy).toHaveBeenCalled();
  });
});
