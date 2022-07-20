import { Component, OnInit } from '@angular/core';
import { IMenuItems,MenuItems } from './admin.menu-items';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent implements OnInit {
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
