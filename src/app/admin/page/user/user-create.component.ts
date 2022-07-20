import { IUser } from 'src/app/interface/user';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { NotificationService } from 'src/app/service/notification.service';
import { UserService } from 'src/app/service/user.service';
import { Location } from "@angular/common";

//import { ModalDismissReasons, NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-user-create',
  templateUrl: './user-create.component.html',
  styleUrls: ['./user-create.component.css']
})
export class UserCreateComponent implements OnInit {
  public formUser:FormGroup;
  constructor(
    private userService: UserService,
    private formBuilder: FormBuilder,
    private notifyService: NotificationService,
    //private route: ActivatedRoute,
    private location: Location
  ) { 
    this.formUser = this.formBuilder.group({
      user_id: [null,[]],
      username: [null,[Validators.required]],
      password: [null,[]],
      displayname:[null,[]],
      email: [null,[]],
      cdate: [null,[]],
      mdate: [null,[]],   
    }); 
  }
 
  ngOnInit(): void {
  }


  onSubmit(){
    if(this.formUser.valid){
      let datas = this.formUser.getRawValue(); 
      this.userService.create(datas).subscribe({
        next: (v) => {
          console.log(v);
          this.notifyService.show('success','เพิ่มข้อมูลแล้ว','');
          //this.formUser.reset();
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
