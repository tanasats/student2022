import { ActivityService } from 'src/app/service/activity.service';
import { RegisterService } from './../../../service/register.service';
import { IActivity } from './../../../interface/activity';
import { CurrentUserService } from './../../../service/current-user.service';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-activity',
  templateUrl: './activity.component.html',
  styleUrls: ['./activity.component.css']
})
export class ActivityComponent implements OnInit {
  public activity:IActivity;
  public activity_id:any;
  public registerusers:any;
  public registeruser_count:any=0;
  public isregistered:any=undefined;
  //public activity_id:any;
  //public activity:IActivity;
  public imgUrl:string= environment.imgURL;
  
  constructor( private route: ActivatedRoute,
    private activityService:ActivityService,
    private currentUserService:CurrentUserService,
    private registerService:RegisterService
    ){
    this.activity = history.state.data;
    this.activity_id = this.route.snapshot.params['id'];
  }

  ngOnInit(): void {
    this.loadRegisterUser();
  }

  loadRegisterUser(){
    this.registerusers=this.activityService.getRegisterUser(this.activity_id)
    .subscribe({
      next: (v)=>{
        this.registerusers=v;
        this.registeruser_count=v.length;
        this.isregistered = v.find((member:any)=>{ return member.user_id==this.currentUserService.user_id});
        console.log("find result:",this.isregistered);
      },
      error: (e)=>{
        console.log(e);
      }
    });
    //console.log(this.registerusers);
  }

  register(){
    console.log(this.currentUserService.user_id,this.activity_id);
    const user_id=this.currentUserService.user_id;
    const activity_id=this.activity_id;
    this.registerService.register({'user_id':user_id,'activity_id':activity_id})
    .subscribe({
      next: (v)=>{
        console.log(v);
        this.loadRegisterUser();
      },
      error: (e)=>{
        console.log(e);
      }
    });
  }


}
