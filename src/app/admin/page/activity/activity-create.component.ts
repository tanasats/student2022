import { ActivityService } from 'src/app/service/activity.service';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { NotificationService } from 'src/app/service/notification.service';
import { Location } from "@angular/common";

@Component({
  selector: 'app-activity-create',
  templateUrl: './activity-create.component.html',
  styleUrls: ['./activity-create.component.css']
})
export class ActivityCreateComponent implements OnInit {
  public formActivity:FormGroup;
  constructor(
    private activityService: ActivityService,
    private formBuilder: FormBuilder,
    private notifyService: NotificationService,
    private location: Location
  ) {
    this.formActivity = this.formBuilder.group({
      activityid: [null,[]],
      activitycode: [null,[]],
      activityname: [null,[Validators.required]],
      cdate: [null,[]],
      mdate: [null,[]],   
    }); 
   }


  ngOnInit(): void {
  }

  onSubmit(){
    if(this.formActivity.valid){
      let datas = this.formActivity.getRawValue(); 
      this.activityService.create(datas).subscribe({
        next: (v) => {
          console.log(v);
          this.notifyService.show('success','เพิ่มข้อมูลแล้ว','');
          //this.formActtype.reset();
          this.location.back();
        },
        error: (e) => {
          console.log(e);
          this.notifyService.show('error',e,'');
        }
      })
    }
  }

}
