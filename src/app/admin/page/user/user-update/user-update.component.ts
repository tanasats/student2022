import { UserService } from 'src/app/service/user.service';
import { IUser } from './../../../../interface/user';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NotificationService } from 'src/app/service/notification.service';
import { Location } from "@angular/common";

@Component({
  selector: 'app-user-update',
  templateUrl: './user-update.component.html',
  styleUrls: ['./user-update.component.css'],
})
export class UserUpdateComponent implements OnInit {
  public item: IUser;
  public itemId: number;
  public formUser: FormGroup;

  constructor(
    private userService:UserService,
    private formBuilder: FormBuilder, 
    private notifyService: NotificationService,
    private route: ActivatedRoute,
    private location: Location
    ) {
    this.item = history.state.data;
    this.itemId = this.route.snapshot.params['id'];

    this.formUser = this.formBuilder.group({
      userid: [this.itemId, [Validators.required]],
      username: [null, [Validators.required]],
      password: [null, []],
      email: [null, []],
      cdate: [null, []],
      mdate: [null, []],
    });
  }

  ngOnInit(): void {
    this.formUser.patchValue(this.item);
  }

  onSubmit() {
    if(this.formUser.valid){
      let datas = this.formUser.getRawValue();
      this.userService.update(datas).subscribe({
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
    console.log(this.itemId);
    this.userService.getById(this.itemId).subscribe({
      next: ([v]) => {
        console.log(v);
        this.formUser.patchValue(v);
      },
      error: (e) => {
        this.notifyService.show('error',e,'');
      }
    })
  }

}
