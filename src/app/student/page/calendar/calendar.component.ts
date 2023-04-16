import { IActivity } from './../../../interface/activity';
import { ActivityService } from 'src/app/service/activity.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-calendar',
  templateUrl: './calendar.component.html',
  styleUrls: ['./calendar.component.css']
})
export class CalendarComponent implements OnInit {
  public activitys: IActivity[]=[];
  constructor(private activityService:ActivityService) { }

  ngOnInit(): void {
    this.activityService.filter(
      {
        page: 1,
        pagesize: 10,
        keyword:''
      }
    ).subscribe({
      next: (v)=>{
        console.log(v);
        this.activitys = v.items;
      },
      error: (error)=>{
        console.log(error);
      }
    })
  }  

}
