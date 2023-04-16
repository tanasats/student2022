import { ICurrentuser } from './../../../interface/currentuser';
import { CurrentUserService } from 'src/app/service/current-user.service';
import { SideBarService } from './../../serveces/side-bar.service';
import { Component, Input, OnInit } from '@angular/core';
import { IMenuItem } from 'src/app/interface/menuitem';
import { student_menu_items, admin_menu_items } from './sidebar.menu-items';
@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css'],
})
export class SidebarComponent implements OnInit {
  //@Input() _menuItems:IMenuItem[]=[];
  @Input() _menuItems: IMenuItem[] = [];
  public userinfo:ICurrentuser | null=null;
  constructor(
    public sideBarService: SideBarService,
    public CurrentUserService: CurrentUserService
  ) {}

  ngOnInit(): void {
    this.CurrentUserService.userInfoEmitter().subscribe(
      (currentuser: ICurrentuser) => {
        //setup menu for user role
        console.log('Setup menu for ', currentuser.role);
        this.userinfo=currentuser;
        switch (currentuser.role) {
          case 'Admin':
            this._menuItems = admin_menu_items;
            break;
          case 'Student':
            this._menuItems = student_menu_items;
            break;
          default:
            this._menuItems = [];
        }
      }
    );
  }

  menuGroupClick(event:any):void{
    console.log(event)
  }

}
