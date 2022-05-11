import { IUser } from './../../../../interface/user';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { NotificationService } from 'src/app/service/notification.service';
//import { ModalDismissReasons, NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-user-create',
  templateUrl: './user-create.component.html',
  styleUrls: ['./user-create.component.css']
})
export class UserCreateComponent implements OnInit {
  public formUser:FormGroup;
  constructor(
    private formBuilder: FormBuilder,
    private notifyService: NotificationService,
    private route: ActivatedRoute,
  ) { 
    this.formUser = this.formBuilder.group({
      userid: [null,[]],
      username: [null,[]],
      password: [null,[]],
      email: [null,[]],
      cdate: [null,[]],
      mdate: [null,[]],   
    }); 
  }
 
  ngOnInit(): void {
  }


  onSubmit(){
    console.log('onSubmit()');
  }



}
