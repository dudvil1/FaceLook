import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

/* import components */
import {LogInComponent} from './registration/components/log-in/log-in.component'
import {RegisterComponent} from './registration/components/register/register.component'
import {ForgetPasswordComponent} from './registration/components/forget-password/forget-password.component'
import { socialComponent } from './social/social.component';
import { SharePostComponent } from './social/components/share-post/share-post.component'
import {FriendsComponent} from './social/components/friends/friends.component'


const routes: Routes = [
  {path: '', component: LogInComponent},
  {path: 'login' , component: LogInComponent},
  {path: 'login/:id', component: LogInComponent},
  {path: 'register' , component:RegisterComponent},
  {path: 'forgotpassword' , component: ForgetPasswordComponent},
  {path: 'social' , component: socialComponent},
  {path: 'sharePost' , component: SharePostComponent },
  {path: 'friends' , component: FriendsComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
