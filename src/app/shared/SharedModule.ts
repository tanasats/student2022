//import { TestComponent } from './../admin/page/test/test.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { WordcountPipe } from './pipes/wordcount.pipe';
import { ThaidatePipe } from './pipes/thaidate.pipe';

import { TestComponent } from './components/test/test.component';
import { Test123Component } from './components/test123/test123.component';
import { PagetitleComponent } from './components/pagetitle/pagetitle.component';
import { SidebarComponent } from './components/sidebar/sidebar.component';

@NgModule({
  imports: [
    CommonModule,
    
  ],
  declarations: [
    WordcountPipe,
    ThaidatePipe,
    TestComponent,
    Test123Component,
    PagetitleComponent,
    SidebarComponent,
  ],
  exports: [
    WordcountPipe,
    ThaidatePipe,
    TestComponent,
    Test123Component,
    PagetitleComponent,
    SidebarComponent,
  ],  
})
export class SharedModule { 
} 
