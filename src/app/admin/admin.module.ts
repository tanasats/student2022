import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from "@angular/forms";

import { AdminRoutingModule } from './admin-routing.module';
import { AdminComponent } from './admin.component';
import { DashboardComponent } from './page/dashboard/dashboard.component';
import { UserComponent } from './page/user/user.component';
import { UserUpdateComponent } from './page/user/user-update/user-update.component';
import { UserCreateComponent } from './page/user/user-create/user-create.component';



@NgModule({
  declarations: [
    AdminComponent,
    DashboardComponent,
    UserComponent,
    UserUpdateComponent,
    UserCreateComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    AdminRoutingModule,
    FormsModule,

  ]
})
export class AdminModule { }
