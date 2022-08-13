import { SharedcomponentModule } from './../sharedcomponent/sharedcomponent.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';


import { StudentRoutingModule } from './student-routing.module';
import { StudentComponent } from './student.component';
import { DashboardComponent } from './page/dashboard/dashboard.component';
import { ActivityItemComponent } from './component/activity-item/activity-item.component';
//import { ActivityItemsComponent } from './component/activity-items/activity-items.component';


@NgModule({
  declarations: [
    StudentComponent,
    DashboardComponent,
    ActivityItemComponent,
    //ActivityItemsComponent
  ],
  imports: [
    CommonModule,
    StudentRoutingModule,
    SharedcomponentModule
  ]
})
export class StudentModule { }
