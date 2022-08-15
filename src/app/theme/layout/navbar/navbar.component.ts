import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ICurrentuser } from 'src/app/interface/currentuser';
import { AuthService } from 'src/app/service/auth.service';
import { CurrentUserService } from 'src/app/service/current-user.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
  public islogin=false;
  public role="";
  public displayname="";
  public showNavBar = false;



  constructor( 
    public authService:AuthService,
    public currUserService:CurrentUserService,
    private router: Router,
    ) {   }

  ngOnInit(): void {
    // subscribe currentuserservice emit
    this.currUserService.getEmitter().subscribe((currUserObject:ICurrentuser) => { 
      console.log("Navbar.component getEmitter(currUserObject) form currUserService =",JSON.stringify(currUserObject)); 
        this.islogin=currUserObject.islogin;
        this.displayname=currUserObject.displayname;
        this.role=currUserObject.role;
    }); 
  }
  
  logout(){
    console.log("logout()");
    this.currUserService.logout();
    this.router.navigate(['guest']);
    this.showNavBar=!this.showNavBar;
  }

  toggleNavbar(){
    this.showNavBar=!this.showNavBar;

  }
  collapseNavbar(){
    this.showNavBar=false;
  }

  // ngAfterContentInit() { // activate when user has browser refresh
  //   console.log("navbar.component->ngAfterContentInit()");
  // }  
  // ngAfterContentChecked() { // activate by every user action on html page
  //   console.log("navbar.component->ngAfterContentChecked()");
  // }
  // ngAfterViewInit() {
  //   console.log("navbar.component->ngAfterViewInit()");
  //   console.log("navbar get currUserSer.authorized=",this.currUserService.authorized);
  // }
}
