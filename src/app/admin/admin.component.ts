import { IMenuItem } from './../interface/menuitem';
import { Component, OnInit } from '@angular/core';
import { admin_menu_items } from './admin.menu-items';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent implements OnInit {
  public admin_menu_items:IMenuItem[] = admin_menu_items;

  constructor() { }

  ngOnInit(): void {
  }

}
