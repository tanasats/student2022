import { SideBarService } from './../../serveces/side-bar.service';
import { Component, OnInit } from '@angular/core';
//import { IMenuItem } from 'src/app/interface/menuitem';
//import { student_menu_items,admin_menu_items} from './main.menu-items';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css']
})
export class MainComponent implements OnInit {
  
  numbers = Array(50).fill(0);
  options = { autoHide: true, scrollbarMinSize: 50 };
  //_menu_items:IMenuItem[] = [];

  constructor(public sideBarService:SideBarService) { }

  ngOnInit(): void {
  }

  // setUserMenuItem(value:any){
  //   //this._menu_items=value;
  //   this._menu_items=student_menu_items;
  // }

}
