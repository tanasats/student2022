import { UserService } from './../../../service/user.service';
import { CurrentUserService } from './../../../service/current-user.service';
import { Component, OnInit } from '@angular/core';
import { ICurrentuser } from 'src/app/interface/currentuser';


@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  public current_user:ICurrentuser;
  me:any;
  constructor(private currentUserService:CurrentUserService,
    private userService:UserService) { 
      console.log("Profile constructor();");
    
      this.current_user=this.currentUserService.info;
      console.log(this.current_user);

      this.userService.getById(this.current_user.user_id).subscribe({
       next: ([res])=>{
         this.me=res;
       },
       error: (err)=>{
         console.log(err);
       }
      });


    
  }
  

  ngOnInit(): void {
  }

}
