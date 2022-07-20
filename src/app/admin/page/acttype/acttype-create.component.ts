import { ActtypeService } from 'src/app/service/acttype.service';
import { IActtype } from 'src/app/interface/acttype';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { NotificationService } from 'src/app/service/notification.service';
import { Location } from "@angular/common";

@Component({
  selector: 'app-acttype-create',
  templateUrl: './acttype-create.component.html',
  styleUrls: ['./acttype-create.component.css']
})
export class ActtypeCreateComponent implements OnInit {
  public formActtype:FormGroup;
  constructor(
    private acttypeService: ActtypeService,
    private formBuilder: FormBuilder,
    private notifyService: NotificationService,
    private location: Location
  ) {
    this.formActtype = this.formBuilder.group({
      acttype_id: [null,[]],
      acttype_code: [null,[Validators.required]],
      acttype_name: [null,[Validators.required]],
      cdate: [null,[]],
      mdate: [null,[]],   
    }); 
   }

  ngOnInit(): void { 
  }

  onSubmit(){
    if(this.formActtype.valid){
      let datas = this.formActtype.getRawValue(); 
      this.acttypeService.create(datas).subscribe({
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


}//class
