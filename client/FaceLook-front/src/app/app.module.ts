import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";
import { AppRoutingModule } from "./app-routing.module";
import { FormsModule } from "@angular/forms";
import { ToastrModule } from "ngx-toastr";
import { HttpClientModule, HTTP_INTERCEPTORS } from "@angular/common/http";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { HeaderInterceptor } from "./interceptors/header-inceptor";
import { registrationApiService } from "../app/registration/service/api-service.service";
import { AgmCoreModule } from '@agm/core';
import { GoogleMapsModule } from '@angular/google-maps';
import { AgmDirectionModule } from 'agm-direction';

import { AppComponent } from "./app.component";
import { LogInComponent } from "./registration/components/log-in/log-in.component";
import { RegisterComponent } from "./registration/components/register/register.component";
import { ForgetPasswordComponent } from "./registration/components/forget-password/forget-password.component";
import { socialComponent } from "./social/social.component";
import { FeedComponent } from "./social/components/feed/feed.component";
import { MapComponent } from "./social/components/map/map.component";
import { SharePostComponent } from './social/components/share-post/share-post.component';
import { FriendsComponent } from './social/components/friends/friends.component';
import { postApiService } from './social/service/postApi.service';
import { HeaderComponent } from './header/header/header.component';
import { PostsComponent } from './social/components/posts/posts.component';
import { PostComponent } from './social/components/post/post.component';

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
    PostComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ToastrModule.forRoot(),
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
    postApiService,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: HeaderInterceptor,
      multi: true
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
