import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";
import { AppRoutingModule } from "./app-routing.module";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { ToastrModule } from "ngx-toastr";
import { HttpClientModule, HTTP_INTERCEPTORS } from "@angular/common/http";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { HeaderInterceptor } from "./interceptors/header-inceptor";
import { registrationApiService } from "../app/registration/service/api-service.service";
import { AgmCoreModule } from '@agm/core';
import { GoogleMapsModule } from '@angular/google-maps';
import { AgmDirectionModule } from 'agm-direction';
import { JwtModule } from "@auth0/angular-jwt";
import { SocketIoModule, SocketIoConfig } from 'ngx-socket-io';

import { AppComponent } from "./app.component";
import { LogInComponent } from "./registration/components/log-in/log-in.component";
import { RegisterComponent } from "./registration/components/register/register.component";
import { ForgetPasswordComponent } from "./registration/components/forget-password/forget-password.component";
import { socialComponent } from "./social/social.component";
import { FeedComponent } from "./social/components/feed/feed.component";
import { MapComponent } from "./social/components/map/map.component";
import { SharePostComponent } from './social/components/share-post/share-post.component';
import { FriendsComponent } from './social/components/friends/friends.component';
import { PostApiService } from './social/service/postApi.service';
import { HeaderComponent } from './header/header/header.component';
import { PostsComponent } from './social/components/posts/posts.component';
import { PostComponent } from './social/components/post/post.component';
import { FriendComponent } from './social/components/friend/friend.component';
import { FriendApiService } from './social/service/friendApi.service';
import { TagsInputComponent } from './common/components/tags-input/tags-input.component';

function getToken() {
  return localStorage.getItem('token');
}
const config: SocketIoConfig = { url: 'http://localhost:3000', options: {} };

@NgModule({
  declarations: [
    AppComponent,
    LogInComponent,
    RegisterComponent,
    ForgetPasswordComponent,
    socialComponent,
    FeedComponent,
    MapComponent,
    SharePostComponent,
    FriendsComponent,
    HeaderComponent,
    PostsComponent,
    PostComponent,
    FriendComponent,
    TagsInputComponent
  ],
  imports: [
    ReactiveFormsModule,
    BrowserModule,
    FormsModule,
    ToastrModule.forRoot(),
    JwtModule.forRoot({
      config: {
        tokenGetter: getToken
      }
    }),
    SocketIoModule.forRoot(config),
    AppRoutingModule,
    HttpClientModule,
    GoogleMapsModule,
    BrowserAnimationsModule,
    AgmCoreModule.forRoot({
      apiKey: 'AIzaSyDmwtWcaG48hu9jgVn5Z20f1FgLQW3LATk',
      libraries: ['visualization']
    }),
    AgmDirectionModule,
  ],
  providers: [
    registrationApiService,
    PostApiService,
    FriendApiService,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: HeaderInterceptor,
      multi: true
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
