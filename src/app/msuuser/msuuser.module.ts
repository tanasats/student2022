import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MsuuserRoutingModule } from './msuuser-routing.module';
import { MsuuserComponent } from './msuuser.component';
import { ProfileComponent } from './page/profile/profile.component';


@NgModule({
  declarations: [
    MsuuserComponent,
    ProfileComponent
  ],
  imports: [
    CommonModule,
    MsuuserRoutingModule
  ]
})
export class MsuuserModule { }
