import { SideBarService } from './../../serveces/side-bar.service';
import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { AuthService } from 'src/app/service/auth.service';
import { CurrentUserService } from 'src/app/service/current-user.service';
import { ICurrentuser } from 'src/app/interface/currentuser';
import { Router } from '@angular/router';

@Component({
  selector: 'app-topbar',
  templateUrl: './topbar.component.html',
  styleUrls: ['./topbar.component.css']
})
export class TopbarComponent implements OnInit {

  //@Output() newMenuItemEvent = new EventEmitter<string>();
  public islogin=false;
  public role="";
  public displayname="";
  public showNavBar = false;


  constructor(
    public authService:AuthService,
    public currUserService:CurrentUserService,
    public sideBarService:SideBarService,
    private router: Router) { }

    ngOnInit(): void {
      // subscribe currentuserservice emit
      console.log("TopBar Work!!");
      this.currUserService.userInfoEmitter().subscribe((currUserObject:ICurrentuser) => { 
        console.log("TopBar.component userInfoEmitter(currUserObject) form currUserService =",JSON.stringify(currUserObject)); 
          this.islogin=currUserObject.islogin;
          this.displayname=currUserObject.displayname;
          this.role=currUserObject.role;
      }); 
    //  this.addMenuItem("tanasat");

    }

    // addMenuItem(value: string) {
    //   this.newMenuItemEvent.emit(value);
    // }

    logout(){
      console.log("logout()");
      this.currUserService.logout();
      this.router.navigate(['guest']);
      this.showNavBar=!this.showNavBar;
    }

}
