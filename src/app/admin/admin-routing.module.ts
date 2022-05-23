import { ActivityComponent } from './page/activity/activity.component';
import { ActivityCreateComponent } from './page/activity/activity-create.component';
import { ActivityUpdateComponent } from './page/activity/activity-update.component';
import { ActtypeUpdateComponent } from './page/acttype/acttype-update.component';
import { ActtypeCreateComponent } from './page/acttype/acttype-create.component';
import { ActtypeComponent } from './page/acttype/acttype.component';
import { UserCreateComponent } from './page/user/user-create.component';
import { UserUpdateComponent } from './page/user/user-update.component';
import { UserComponent } from './page/user/user.component';
import { DashboardComponent } from './page/dashboard/dashboard.component';
import { AdminComponent } from './admin.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FacultyComponent } from './page/faculty/faculty.component';
import { FacultyCreateComponent } from './page/faculty/faculty-create.component';
import { FacultyUpdateComponent } from './page/faculty/faculty-update.component';
import { AuthGuard } from '../service/auth.guard';

const routes: Routes = [
  //{path:'',redirectTo:'admin/dashboard',pathMatch:'full'},
  //{ path: 'dashboard',redirectTo:'admin/dashboard'},
  //{path: 'admin',redirectTo:'admin/dashboard',pathMatch:'full'},
  {
    path: '',
    component: AdminComponent,
    canActivate: [AuthGuard], 
    data: {
      userRoles: ['Admin'], // Multiple Allowed User
    },
    children: [
      { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
      { path: 'dashboard', component: DashboardComponent },
      { path: 'activity', component: ActivityComponent },
      { path: 'activity/create', component: ActivityCreateComponent },
      { path: 'activity/update/:id', component: ActivityUpdateComponent },
      { path: 'user', component: UserComponent },
      { path: 'user/create', component: UserCreateComponent },
      { path: 'user/update/:id', component: UserUpdateComponent },
      { path: 'acttype', component: ActtypeComponent },
      { path: 'acttype/create', component: ActtypeCreateComponent },
      { path: 'acttype/update/:id', component: ActtypeUpdateComponent },
      { path: 'faculty', component: FacultyComponent },
      { path: 'faculty/create', component: FacultyCreateComponent },
      { path: 'faculty/update/:id', component: FacultyUpdateComponent },
      { path: '**', redirectTo: 'dashboard', pathMatch: 'full' },
    ],
  },
  // { path: '**', redirectTo: '', pathMatch: 'full' },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AdminRoutingModule {}
