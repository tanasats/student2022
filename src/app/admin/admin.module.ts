import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

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
import { ActorganizationComponent } from './page/actorganization/actorganization.component';
import { TestComponent } from './page/test/test.component';


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
    ActorganizationComponent,
    TestComponent,
    
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    AdminRoutingModule,
    FormsModule,
    NgbModule,

  ]
})
export class AdminModule { }
