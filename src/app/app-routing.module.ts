import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';


const routes: Routes = [
  { path:'', redirectTo:'/home', pathMatch:'full'},
  { path: 'home', loadChildren: () => import('./modules/home/home.module').then(m => m.HomeModule) }, 
  { path: 'sign-in', loadChildren: () => import('./modules/auth/sign-in/sign-in.module').then(m => m.SignInModule) },
  { path: '**', redirectTo:'/home',pathMatch:'full'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
