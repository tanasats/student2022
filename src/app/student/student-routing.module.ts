import { ProfileComponent } from './page/profile/profile.component';
import { StudentComponent } from './student.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './page/dashboard/dashboard.component';
import { AuthGuard } from 'src/app/service/auth.guard';
import { ActivityComponent } from './page/activity/activity.component';

const routes: Routes = [
  //{path:'',redirectTo:'admin/dashboard',pathMatch:'full'},
  //{ path: 'dashboard',redirectTo:'admin/dashboard'},
  {
    path: '',
    component: StudentComponent,
    canActivate: [AuthGuard],
    data: {
      userRoles: ['Student'], // Multiple Allowed User
    },
    children: [
      { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
      { path: 'dashboard', component: DashboardComponent },
      { path: 'profile', component: ProfileComponent},
      { path: 'activity/:id',component: ActivityComponent}
      // {path:'activity',component:ActivityComponent},
      // {path:'activity/create',component:ActivityCreateComponent},
      // {path:'activity/update/:id',component:ActivityUpdateComponent},
    ],
  },
  { path: '**', redirectTo: '', pathMatch: 'full' },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class StudentRoutingModule {}
