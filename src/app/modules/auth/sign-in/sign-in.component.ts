import { UserService } from 'src/app/service/user.service';
import { CurrentUserService } from './../../../service/current-user.service';
import { NotificationService } from 'src/app/service/notification.service';
import { AuthService } from 'src/app/service/auth.service';
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
    username: ['tanasat', [Validators.required, Validators.minLength(3)]],
    password: ['3440600170765', Validators.required],
    //email: ['', [Validators.required, Validators.email]],
    //message: ['', [Validators.required, Validators.minLength(15)]],
  });
  constructor(
    private fb: FormBuilder,
    private router: Router,
    private msuAuthService: MsuAuthService,
    private authService: AuthService,
    private currUserService: CurrentUserService,
    private userService: UserService,
    private notifyService: NotificationService
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
          if (res.access_token) {
            localStorage.setItem('access-token', res.access_token);
            this.authService.tokenSignin(res.access_token).subscribe({
              next: (res) => {
                localStorage.setItem('access-token', res.access_token);
                this.authService.me().subscribe({
                  next: ([[res]]) => {
                    //get user form database
                    console.log('sign-in.component call me() res=', res);
                    const _user: any = res;
                    console.log(res);
                    //--- success signin-----
                    this.userService.userroles(res.userid).subscribe({
                      next: (res) => {
                        const _roles: any = res;
                        let _rolecode = _roles.map((item: any) => {
                          return item.rolecode;
                        });
                        console.log('useroles=', _rolecode); 

                        this.currUserService.username = _user.username;
                        this.currUserService.displayname = _user.displayname;
                        this.currUserService.email = _user.email;

                        this.currUserService.roles = _rolecode;
                        if (_rolecode) {
                          this.currUserService.role = _rolecode[0];
                        }

                        this.currUserService.islogin = true; //<--this activate to emitt(data) to navbar
                        this.router.navigate(['home']);
                      },
                      error: (err) => {
                        console.log(err);
                        this.notifyService.show(
                          'error',
                          'User roles ' + err,
                          ''
                        );
                      },
                    });
                  },
                  error: (err) => {
                    console.log(err);
                    this.notifyService.show('error', err, '');
                  },
                });
              },
              error: (err) => {
                console.log(err);
                this.notifyService.show('error', err, '');
              },
            });
          }
        }, //next:
        error: (err) => {
          console.log(err);
          this.notifyService.show(
            'error',
            'Username หรือ Password ไม่ถูกต้อง',
            err
          );
        },
        //complete: () => { console.log("complete msuauthservice")},
      });
    }
  }
}
function item(item: any, arg1: (any: any) => any) {
  throw new Error('Function not implemented.');
}
