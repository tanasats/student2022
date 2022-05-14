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



@NgModule({
  declarations: [
    AdminComponent,
    DashboardComponent,
    UserComponent,
    UserUpdateComponent,
    UserCreateComponent,
    ActtypeComponent,
    ActtypeUpdateComponent,
    ActtypeCreateComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    AdminRoutingModule,
    FormsModule,

  ]
})
export class AdminModule { }
