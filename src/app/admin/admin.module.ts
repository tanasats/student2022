import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from "@angular/forms";

import { AdminRoutingModule } from './admin-routing.module';
import { AdminComponent } from './admin.component';
import { DashboardComponent } from './page/dashboard/dashboard.component';
import { UserComponent } from './page/user/user.component';
import { UserUpdateComponent } from './page/user/user-update.component';
import { UserCreateComponent } from './page/user/user-create.component';
import { ActtypeComponent } from './page/acttype/acttype.component';
import { ActtypeUpdateComponent } from './page/acttype/acttype-update.component';
import { ActtypeCreateComponent } from './page/acttype/acttype-create.component';
import { ActivityComponent } from './page/activity/activity.component';
import { ActivityCreateComponent } from './page/activity/activity-create.component';
import { ActivityUpdateComponent } from './page/activity/activity-update.component';
import { FacultyComponent } from './page/faculty/faculty.component';
import { FacultyCreateComponent } from './page/faculty/faculty-create.component';
import { FacultyUpdateComponent } from './page/faculty/faculty-update.component';



@NgModule({
  declarations: [
    AdminComponent,
    DashboardComponent,
    UserComponent,
    UserUpdateComponent,
    UserCreateComponent,
    ActtypeComponent,
    ActtypeUpdateComponent,
    ActtypeCreateComponent,
    ActivityComponent,
    ActivityCreateComponent,
    ActivityUpdateComponent,
    FacultyComponent,
    FacultyCreateComponent,
    FacultyUpdateComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    AdminRoutingModule,
    FormsModule,

  ]
})
export class AdminModule { }
