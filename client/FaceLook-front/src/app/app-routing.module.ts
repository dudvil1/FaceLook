import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

/* import components */
import { LogInComponent } from './registration/components/log-in/log-in.component'
import { RegisterComponent } from './registration/components/register/register.component'
import { ForgetPasswordComponent } from './registration/components/forget-password/forget-password.component'
import { socialComponent } from './social/social.component';
import { SharePostComponent } from './social/components/share-post/share-post.component'
import { FriendsComponent } from './social/components/friends/friends.component'
import { PostsComponent } from './social/components/posts/posts.component';
import { GuardService } from './common/service/guard.service';


const routes: Routes = [
  { path: "", redirectTo: "login", pathMatch: 'full' },
  { path: 'login', component: LogInComponent, canActivate: [GuardService], data: { jwtNeeded: false } },
  { path: 'login/:id', component: LogInComponent, canActivate: [GuardService], data: { jwtNeeded: false } },
  { path: 'register', component: RegisterComponent, canActivate: [GuardService], data: { jwtNeeded: false } },
  { path: 'forgotpassword', component: ForgetPasswordComponent, canActivate: [GuardService], data: { jwtNeeded: true } },
  { path: 'social', component: socialComponent, canActivate: [GuardService], data: { jwtNeeded: true } },
  { path: 'sharePost', component: SharePostComponent, canActivate: [GuardService], data: { jwtNeeded: true } },
  { path: 'friends', component: FriendsComponent, canActivate: [GuardService], data: { jwtNeeded: true } },
  { path: 'posts', component: PostsComponent, canActivate: [GuardService], data: { jwtNeeded: true } },

  { path: '**', redirectTo: "login" }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
