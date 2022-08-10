import { IActivity } from 'src/app/interface/activity';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-activity-item',
  templateUrl: './activity-item.component.html',
  styleUrls: ['./activity-item.component.css'],
})
export class ActivityItemComponent implements OnInit {
  @Input() item?: IActivity;
  @Output() onRegister = new EventEmitter<IActivity>();
  @Output() onDelete = new EventEmitter<IActivity>();

  constructor() {}
  ngOnInit(): void {}

  regItemEvent(data:any) {
    this.onRegister.emit(data);
  }
  delItemEvent(data:any){
    this.onDelete.emit(data);
  }
}
