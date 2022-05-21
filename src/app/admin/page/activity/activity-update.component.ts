import { ActivityService } from 'src/app/service/activity.service';
import { IActivity } from './../../../interface/activity';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NotificationService } from 'src/app/service/notification.service';
import { Location } from "@angular/common";

@Component({
  selector: 'app-activity-update',
  templateUrl: './activity-update.component.html',
  styleUrls: ['./activity-update.component.css']
})
export class ActivityUpdateComponent implements OnInit {
  public item: IActivity;
  public itemID: number;
  public formActivity: FormGroup;
  constructor(
    private activityService:ActivityService,
    private formBuilder: FormBuilder, 
    private notifyService: NotificationService,
    private route: ActivatedRoute,
    private location: Location
  ) {
    this.item = history.state.data;
    this.itemID = this.route.snapshot.params['id'];
    this.formActivity = this.formBuilder.group({
      activityid: [this.itemID, [Validators.required]],
      activitycode: [null, [Validators.required]],
      activityname: [null, [Validators.required]],
      cdate: [null, []],
      mdate: [null, []],
    });    
   }

   ngOnInit(): void {
    this.formActivity.patchValue(this.item);
  }

  
  onSubmit() {
    if(this.formActivity.valid){
      let datas = this.formActivity.getRawValue();
      this.activityService.update(datas).subscribe({
        next: (v) =>{
          console.log(v);
          if(v.affectedRows==1){
          this.notifyService.show('success','บันทึกการแก้ไขแล้ว','');
          this.location.back();
        }else{
          this.notifyService.show('error','บันทึกการแก้ไขผิดพลาด','');
        }
        },
        error: (e) =>{
          console.log(e);
          this.notifyService.show('error',e,'')
        }
      })
    }
  }

  getItem(){
    console.log(this.itemID);
    this.activityService.getById(this.itemID).subscribe({
      next: ([v]) => {
        console.log(v);
        this.formActivity.patchValue(v);
      },
      error: (e) => {
        this.notifyService.show('error',e,'');
      }
    })
  }



}
  