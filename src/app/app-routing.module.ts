import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';


const routes: Routes = [
  //{ path:'', redirectTo:'home', pathMatch:'full'},
  { path:'', redirectTo:'guest', pathMatch:'full'},
  { path: 'guest',loadChildren:()=> import('./guest/guest-routing.module').then(m=>m.GuestRoutingModule)},
  { path: 'admin',loadChildren:()=> import('./admin/admin-routing.module').then(m=>m.AdminRoutingModule)},
  { path: 'student',loadChildren:()=> import('./student/student-routing.module').then(m=>m.StudentRoutingModule)},
  { path: 'msuuser',loadChildren:()=> import('./msuuser/msuuser-routing.module').then(m=>m.MsuuserRoutingModule)},
  { path: 'home', loadChildren: () => import('./modules/home/home.module').then(m => m.HomeModule) }, 
  { path: 'sign-in', loadChildren: () => import('./modules/auth/sign-in/sign-in.module').then(m => m.SignInModule) },
  { path: '**', redirectTo:'guest',pathMatch:'full'}
];
 
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
