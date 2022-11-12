import { RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavbarComponent } from './layout/navbar/navbar.component';
import { FooterComponent } from './layout/footer/footer.component';
import { MainComponent } from './layout/main/main.component';
import { SimplebarAngularModule } from 'simplebar-angular';
import { SidebarComponent } from './layout/sidebar/sidebar.component';
import { TopbarComponent } from './layout/topbar/topbar.component';



@NgModule({
  declarations: [
    NavbarComponent,
    FooterComponent,
    MainComponent,
    SidebarComponent,
    TopbarComponent,
  ],
  imports: [
    CommonModule,
    RouterModule,
    SimplebarAngularModule,
  ],
  exports: [
    NavbarComponent,
    FooterComponent,
    MainComponent,
  ]
})
export class ThemeModule { }
