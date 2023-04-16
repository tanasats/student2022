import { ICurrentuser } from './../../../interface/currentuser';
import { CurrentUserService } from './../../../service/current-user.service';
import { IActivity } from 'src/app/interface/activity';
import { ActivityService } from 'src/app/service/activity.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  public activitys:IActivity[]=[];
  public newactivity:IActivity[]=[];
  public myactivity:any;
  public today:Date = new Date();
  constructor(
    private currentUserService:CurrentUserService,
    private activityService:ActivityService,
  ) { }

  ngOnInit(): void {
    this.loadNewactivity();
    this.loadMyActivity();
  }


  loadMyActivity(){
    this.activityService.getUserActivity(this.currentUserService.user_id)
    .subscribe({
      next: (v) =>{
        this.myactivity=v;
      },
      error: (e) =>{
        console.log(e);
      }
    })
  }
  loadNewactivity(){
    this.activityService.current({
      page:1,
      pagesize: 10,
    }).subscribe({
      next: (v)=>{
        this.newactivity=v.items;
      },
      error: (e)=>{
        console.log(e);
      }
    });    
  }

  onRegister(item:IActivity){
    console.log('Register :',item);
  }
  
  onDelete(item:IActivity){
    console.log('Delete :',item);
  }

}
