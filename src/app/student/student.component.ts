import { Component, OnInit } from '@angular/core';
import { IMenuItems,MenuItems } from './student.menu-items';

@Component({
  selector: 'app-student',
  templateUrl: './student.component.html',
  styleUrls: ['./student.component.css']
})
export class StudentComponent implements OnInit {
  public sidebarnavItems:IMenuItems[]=[];
  public openSidenav=true;
  constructor() { }


  ngOnInit(): void {
    this.sidebarnavItems = MenuItems.filter(sidebarnavItem => sidebarnavItem);
    console.log(this.sidebarnavItems);
  }

  toggleSideNav(){
    this.openSidenav=!this.openSidenav;
  }
}
