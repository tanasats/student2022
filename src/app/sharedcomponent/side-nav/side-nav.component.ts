import { Component, OnInit,Input } from '@angular/core';
import { IMenuItem } from 'src/app/interface/menuitem';

@Component({
  selector: 'app-side-nav',
  templateUrl: './side-nav.component.html',
  styleUrls: ['./side-nav.component.css']
})
export class SideNavComponent implements OnInit {
  @Input() is_expaned:boolean = false;
  @Input() _menuItems:IMenuItem[]=[];
  

  constructor() { }


  ngOnInit(): void {
  }
  _toggleSideNav(){
    this.is_expaned=!this.is_expaned;
  }
}
