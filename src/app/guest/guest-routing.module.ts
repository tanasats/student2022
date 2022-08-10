import { HomeComponent } from './page/home/home.component';
import { GuestComponent } from './guest.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  //{path:'',redirectTo:'admin/dashboard',pathMatch:'full'},
  //{ path: 'dashboard',redirectTo:'admin/dashboard'},
  //{path: 'admin',redirectTo:'admin/dashboard',pathMatch:'full'},
  {
    path: '',
    component: GuestComponent,
    children: [
      { path:'', component: HomeComponent ,pathMatch:'full'},
      { path: '**', redirectTo: '', pathMatch: 'full' },
    ],
  },
  // { path: '**', redirectTo: '', pathMatch: 'full' },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class GuestRoutingModule { }
