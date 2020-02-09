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
import { AgmDirectionModule } from 'agm-direction';

import { AppComponent } from "./app.component";
import { LogInComponent } from "./registration/components/log-in/log-in.component";
import { RegisterComponent } from "./registration/components/register/register.component";
import { ForgetPasswordComponent } from "./registration/components/forget-password/forget-password.component";
import { socialComponent } from "./social/social.component";
import { FeedComponent } from "./social/components/feed/feed.component";
import { MapComponent } from "./social/components/map/map.component";

@NgModule({
  declarations: [
    AppComponent,
    LogInComponent,
    RegisterComponent,
    ForgetPasswordComponent,
    socialComponent,
    FeedComponent,
    MapComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ToastrModule.forRoot(),
    AppRoutingModule,
    HttpClientModule,
    BrowserAnimationsModule,
    AgmCoreModule.forRoot({
      apiKey: 'AIzaSyDmwtWcaG48hu9jgVn5Z20f1FgLQW3LATk',
      libraries: ['visualization']
    }),
    AgmDirectionModule,
  ],
  providers: [
    registrationApiService,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: HeaderInterceptor,
      multi: true
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
