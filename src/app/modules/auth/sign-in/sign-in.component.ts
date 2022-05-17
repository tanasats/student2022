import { AuthService } from './../../../service/auth.service';
import { MsuAuthService } from 'src/app/service/msu-auth.service';

import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { faCoffee, faSignIn } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.css'],
})
export class SignInComponent implements OnInit {
  public faCoffee = faCoffee;
  public faSignIn = faSignIn;

  public frmLogin: FormGroup = this.fb.group({
    username: ['', [Validators.required, Validators.minLength(3)]],
    password: ['', Validators.required],
    //email: ['', [Validators.required, Validators.email]],
    //message: ['', [Validators.required, Validators.minLength(15)]],
  });
  constructor(
    private fb: FormBuilder,
    private router: Router,
    private msuAuthService: MsuAuthService,
    private authService:AuthService,
  ) {}

  ngOnInit(): void {}

  public onSubmit(form: FormGroup) {
    if (this.frmLogin.valid) {
      console.log('submit Login', form.value);
      this.msuAuthService.signin(form.value).subscribe({
      //  this.authService.signin(form.value).subscribe({
        next: (res) => { 
          console.log(res);
          // msu authorized ok
            


          if(res.access_token){
            localStorage.setItem('access-token',res.access_token);

            
          }



        },//next:
        error: (err) => { console.log(err);},
        complete: () => { console.log("complete msuauthservice")},
      });
    }
  }
}
