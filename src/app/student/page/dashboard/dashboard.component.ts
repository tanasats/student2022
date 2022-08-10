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

  constructor(
    private activityService:ActivityService,
  ) { }

  ngOnInit(): void {
    this.activityService.filter({
        page:1,
        pagesize: 10,
        keyword: '',
      }).subscribe({
        next: (v)=>{
          console.log(v);
          this.activitys=v.items;
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
