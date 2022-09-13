import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-activity',
  templateUrl: './activity.component.html',
  styleUrls: ['./activity.component.css']
})
export class ActivityComponent implements OnInit {
  public item_id:any;
  public item:any;
  public imgUrl:string= environment.imgURL;
  
  constructor( private route: ActivatedRoute,) { 
    this.item = history.state.data;
    this.item_id = this.route.snapshot.params['id'];
  }

  ngOnInit(): void {
  }

}
