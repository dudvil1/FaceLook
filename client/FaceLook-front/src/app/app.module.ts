import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { FormsModule } from '@angular/forms';
import { ToastrModule } from 'ngx-toastr';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
/* import { HeaderInterceptor } from './interceptors/header-inceptor'; */


import { AppComponent } from './app.component';
import { LogInComponent } from './registration/components/log-in/log-in.component';
import { RegisterComponent } from './registration/components/register/register.component';
import { ForgetPasswordComponent } from './registration/components/forget-password/forget-password.component';

@NgModule({
  declarations: [
    AppComponent,
    LogInComponent,
    RegisterComponent,
    ForgetPasswordComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ToastrModule.forRoot(),
    AppRoutingModule,
    HttpClientModule
  ],
  providers: [
   /*  {
      provide: HTTP_INTERCEPTORS,
      useClass: HeaderInterceptor,
      multi: true
  }, */
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
