import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router'
//import { NavbarComponent } from './navbar.component';
//import { FooterComponent } from './footer.component';



@NgModule({
  imports: [
    CommonModule,
    RouterModule
  ],
  declarations: [
    //NavbarComponent,
    //FooterComponent
  ],
  exports:[
    //NavbarComponent,
    //FooterComponent
  ],
  providers:[]

})
export class CoreModule { }
