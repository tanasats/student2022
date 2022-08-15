import { AuthService } from 'src/app/service/auth.service';
import { ICurrentuser } from 'src/app/interface/currentuser';
import { CurrentUserService } from 'src/app/service/current-user.service';
import { IUser } from 'src/app/interface/user';
import { UserService } from 'src/app/service/user.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  public current_user:ICurrentuser;
  public me:any;
  constructor(private userService:UserService,
    private currentUserService:CurrentUserService,
    private authService:AuthService,
    ) {   
     this.current_user=this.currentUserService.info;
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
    this.authService.getStudentPicture('62012210012').subscribe({
      next: (res)=>{
        console.log(res);
      }
    })
  }



}
