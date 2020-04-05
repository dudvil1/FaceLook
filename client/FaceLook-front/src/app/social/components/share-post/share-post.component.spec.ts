import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SharePostComponent } from './share-post.component';
import { sharePostService } from '../../service/sharePost.model';
import { PostApiService } from '../../service/postApi.service';
import { PostsApiMockService } from '../../test/services/postApiMockService';
import { ToastrService } from 'ngx-toastr';
import { ToastrMockservice } from 'src/app/common/test/service/toastrMockService';
import { NavigatorMockService } from 'src/app/common/test/service/navigatorMockService';
import { NavigatorService } from 'src/app/common/service/navigator.service';
import { FormsModule } from '@angular/forms';
import { of } from 'rxjs';
import { LocationService } from '../../../common/service/locationService.service';
import { LocationMockService } from 'src/app/common/test/service/locationMockService';
import { SocketService } from 'src/app/common/service/socket.service';
import { SocketMockService } from 'src/app/common/test/service/socketMockService';

describe('SharePostComponent', () => {
  let component: SharePostComponent;
  let fixture: ComponentFixture<SharePostComponent>;
  let sharePost: sharePostService
  let postApi: PostApiService
  let toastrService: ToastrService
  let socketService: SocketService

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        SharePostComponent
      ],
      imports: [
        FormsModule
      ],
      providers: [
        sharePostService,
        { provide: LocationService, useClass: LocationMockService },
        { provide: PostApiService, useClass: PostsApiMockService },
        { provide: ToastrService, useClass: ToastrMockservice },
        { provide: SocketService, useClass: SocketMockService },
        { provide: NavigatorService, useClass: NavigatorMockService },
      ]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SharePostComponent);
    component = fixture.componentInstance;
    sharePost = TestBed.get(sharePostService)
    postApi = TestBed.get(PostApiService)
    toastrService = TestBed.get(ToastrService)
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('handleFileInput() should set fileToUpload property by the first file in the list he get', () => {
    // const oldImage = component.imageUrl;
    const fileMock = new File(['9', '5', '3'], 'check.img')
    const fileMock2 = new File(['9', '5', '3'], 'check.img')
    const dT = new ClipboardEvent('').clipboardData ||
      new DataTransfer();
    dT.items.add(fileMock);
    dT.items.add(fileMock2);

    component.handleFileInput(dT.files)

    expect(component.fileToUpload).toBe(fileMock, "should be set to the first object in the files array")
    expect(component.fileToUpload).not.toBe(fileMock2, "should`nt be set to the second object(if there is one) in the files array")
    //this happen on event triggerd reader.onload() that cant be sign to
    // setTimeout(() => {
    //   expect(component.imageUrl).not.toEqual(oldImage, "on handleFileInput() imageUrl is override. image display to user is reset to file imageUrl")
    //   done();
    // }, 100)
  });

  it('async createPost() should call postAPIservice to create new post from the data in the sharedPostService',
    async (done: DoneFn) => {
      const observableRes = of({ message: '' })

      const formData: FormData = new FormData();

      const spyPostApi = spyOn(postApi, 'addPost').and.returnValue(observableRes);
      const spytoastrService = spyOn(toastrService, 'success')
      const spyShareModel = spyOn(component.shareModel, 'resetdata')

      await component.createPost();

      expect(spyPostApi).toHaveBeenCalledWith(formData)
      observableRes.subscribe(() => {
        expect(component.postCreated).toBeTruthy("after response from api post create should be true");
        expect(spyShareModel).toHaveBeenCalled();
        expect(spytoastrService).toHaveBeenCalled();
        done()
      })
    });

});
