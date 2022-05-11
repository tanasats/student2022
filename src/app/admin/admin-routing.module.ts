import { UserCreateComponent } from './page/user/user-create/user-create.component';
import { UserUpdateComponent } from './page/user/user-update/user-update.component';
import { UserComponent } from './page/user/user.component';
import { DashboardComponent } from './page/dashboard/dashboard.component';
import { AdminComponent } from './admin.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  //{path:'',redirectTo:'admin/dashboard',pathMatch:'full'},
  //{ path: 'dashboard',redirectTo:'admin/dashboard'},
  { path:'',component:AdminComponent,
  children:[
    {path:'',redirectTo:'dashboard',pathMatch:'full'},
    {path:'dashboard',component:DashboardComponent},
    {path:'user',component:UserComponent},
    {path:'user/update/:id',component:UserUpdateComponent},
    {path:'user/create',component:UserCreateComponent},
  ]
},
  { path: '**', redirectTo:'',pathMatch:'full'}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule { }
