import { IActtype } from 'src/app/interface/acttype';
import { ActtypeService } from 'src/app/service/acttype.service';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NotificationService } from 'src/app/service/notification.service';
import { Location } from "@angular/common";

@Component({
  selector: 'app-acttype-update',
  templateUrl: './acttype-update.component.html',
  styleUrls: ['./acttype-update.component.css']
})
export class ActtypeUpdateComponent implements OnInit {
  public item: IActtype;
  public itemID: number;
  public formActtype: FormGroup;
  constructor(
    private acttypeService:ActtypeService,
    private formBuilder: FormBuilder, 
    private notifyService: NotificationService,
    private route: ActivatedRoute,
    private location: Location
  ) {
    this.item = history.state.data;
    this.itemID = this.route.snapshot.params['id'];
    this.formActtype = this.formBuilder.group({
      acttypeid: [this.itemID, [Validators.required]],
      acttypename: [null, [Validators.required]],
      cdate: [null, []],
      mdate: [null, []],
    });    
   }

  ngOnInit(): void {
    this.formActtype.patchValue(this.item);
  }

  
  onSubmit() {
    if(this.formActtype.valid){
      let datas = this.formActtype.getRawValue();
      this.acttypeService.update(datas).subscribe({
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
    this.acttypeService.getById(this.itemID).subscribe({
      next: ([v]) => {
        console.log(v);
        this.formActtype.patchValue(v);
      },
      error: (e) => {
        this.notifyService.show('error',e,'');
      }
    })
  }

}
 