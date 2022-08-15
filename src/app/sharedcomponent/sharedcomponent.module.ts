import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SideNavComponent } from './side-nav/side-nav.component';
import { RouterModule } from '@angular/router';
import { PageTitleComponent } from './page-title/page-title.component';


@NgModule({
  declarations: [
    SideNavComponent,
    PageTitleComponent,
  ],
  imports: [
    CommonModule,
    RouterModule,
  ],
  exports: [
    SideNavComponent,
    PageTitleComponent,
  ]
})
export class SharedcomponentModule { }
