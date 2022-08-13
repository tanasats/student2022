import { Component, OnInit } from '@angular/core';
import { guest_menu_items } from './guest.menu-items';

@Component({
  selector: 'app-guest',
  templateUrl: './guest.component.html',
  styleUrls: ['./guest.component.css']
})
export class GuestComponent implements OnInit {
  public sidenav_is_expaned=true;
  guest_menu_items:any=guest_menu_items;
  
  constructor() { }


  ngOnInit(): void {
  }

_test_expaned(){
  console.log("test");
  this.sidenav_is_expaned=!this.sidenav_is_expaned;
}
}
