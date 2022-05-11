import { IUser } from './../../../../interface/user';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from "@angular/forms";


@Component({
  selector: 'app-user-update',
  templateUrl: './user-update.component.html',
  styleUrls: ['./user-update.component.css']
})
export class UserUpdateComponent implements OnInit {
  public item:IUser;
  public itemId:number;
  public formUser:FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
  ) { 
    this.item = history.state.data; 
    this.itemId = this.route.snapshot.params['id'];

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
    this.formUser.patchValue(this.item);
  }

}
