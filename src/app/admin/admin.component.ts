import { IMenuItem } from './../interface/menuitem';
import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { admin_menu_items } from './admin.menu-items';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent implements OnInit {
  @Output() _menuItem = new EventEmitter<any>();
  public admin_menu_items:IMenuItem[] = admin_menu_items;

  constructor() { }

  ngOnInit(): void {
  }
  
  addMenuItem(value: any) {
    this._menuItem.emit(value);
  }
}
