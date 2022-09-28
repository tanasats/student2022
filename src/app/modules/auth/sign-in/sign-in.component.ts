import { UserService } from 'src/app/service/user.service';
import { CurrentUserService } from './../../../service/current-user.service';
import { NotificationService } from 'src/app/service/notification.service';
import { AuthService } from 'src/app/service/auth.service';
import { MsuAuthService } from 'src/app/service/msu-auth.service';

import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { firstValueFrom, lastValueFrom } from 'rxjs';

@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.css'],
})
export class SignInComponent implements OnInit {
  public frmLogin: FormGroup = this.fb.group({
    username: ['', [Validators.required, Validators.minLength(3)]],
    password: ['', Validators.required],
    //username: ['tanasat', [Validators.required, Validators.minLength(3)]],
    //password: ['tanasat71521150', Validators.required],
    //username: ['janpen', [Validators.required, Validators.minLength(3)]],
    //password: ['5461200005331', Validators.required],
   // username: ['62012210012', [Validators.required, Validators.minLength(3)]],
   // password: ['1341101407056', Validators.required],
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


  private async applogin(username:string,password:string){
    console.log("applogin()");
    await firstValueFrom(this.authService.signin({username:username,password:password}) )
    .then((res)=>{
      console.log("applogin()->res=",res);
    })
    .catch((err)=>{ //err='1' is invalid password //err=0 is not found username
      console.log("applogin()->err=",err);
    })
  }




  public async onSubmit(form: FormGroup) {
    var ad_access_token = '';
    var ad_userinfo: any = '';
    var is_user_registered = false;
//    await this.applogin("tanasatx","tanasat71521150");
//    console.log("xxxxx");

    if (this.frmLogin.valid) {
      console.log('form submit Login', form.value);


      this.authService.signin(form.value).subscribe({
        next: (res) => {
          console.log('app_signin:', res);
          if (res.access_token) {
            localStorage.setItem('access-token', res.access_token); //<---app_access_token
            this.notifyService.show('success', 'App login success!!', '');
            //-----------------------> Trust User
              this.trustUser(res.access_token);
            //-----------------------> Trust User
          }
        },
        error: (err) => {
          console.log('app signin(error code):', err);

          if (err == '1') {
            // username has registered but this password is invalid
            //console.log("invalid password");
            this.notifyService.show('error', 'รหัสผ่านไม่ถูกต้อง !!', ''); // invalid app_signin and ad_signin
          //}else if (err == '2'){
          //   console.log("app has user but no password, Try to update password from AD");
          }else {
            console.log('user no register, Try to ad_signin()');
            this.msuAuthService.signin(form.value).subscribe({
              next: (res) => {
                console.log('ad_signin:', res);
                if (res.access_token) {
                  localStorage.setItem('access-token', res.access_token); //<-- ad_access_token
                  this.msuAuthService.me().subscribe({
                    next: (res) => {
                      console.log('ad_userinfo:', res);
                      ad_userinfo = res;
                      ad_userinfo.password = form.value.password;



                      //เอาข้อมูล ad_userinfo ไปลงทะเบียน App (user+role)
                      this.authService.register(ad_userinfo).subscribe({
                        next: (res) => {
                          console.log('register:', res);
                          // app_signin for get access_token
                          this.authService.signin(form.value).subscribe({
                            next: (res) => {
                              if (res.access_token) {
                                localStorage.setItem(
                                  'access-token',
                                  res.access_token
                                ); //<---app_access_token
                                this.notifyService.show('success','AD login success!!','');
                                //-----------------------> Trust User
                                  this.trustUser(res.access_token);
                                //-----------------------> Trust User
                              }
                            },
                            error: (err) => {
                              console.log(err);
                            },
                          });
                        },
                        error: (err) => {
                          console.log('register(e):', err);
                        },
                      });
                    },
                    error: (err) => {
                      console.log('ad_userinfo(e):', err);
                    },
                  });
                }
              },
              error: (err) => {
                console.log('ad_signin(e):', err);
                //this.notifyService.show('error', err, 'MSU Authentication'); // invalid app_signin and ad_signin
                this.notifyService.show('error', 'username/password ไม่ถูกต้อง', 'MSU Authentication'); // invalid app_signin and ad_signin
              },
            });
          }

        },
      });

    }
  }

  private trustUser(app_access_token: string) {
    localStorage.setItem('access-token', app_access_token);
    this.authService.me().subscribe({
      next: ([res]) => {
        //get user form local database
        console.log('sign-in.component call me() res=', res);
        const _user: any = res;

        //--- success signin-----
        this.userService.userroles(res.user_id).subscribe({
          next: (res) => {
            const _roles: any = res;
            let _role_code = _roles.map((item: any) => {
              return item.role_code;
            });
            console.log('useroles=', _role_code);
            
            this.currUserService.user_id = _user.user_id;
            this.currUserService.username = _user.username;
            this.currUserService.displayname = _user.displayname;
            this.currUserService.email = _user.email;

            this.currUserService.roles = _role_code;
            if (_role_code) {
              this.currUserService.role = _role_code[0];
            }

            this.currUserService.islogin = true; //<--this activate to emitt(data) to navbar
            this.router.navigate(['home']);
          },
          error: (err) => {
            console.log(err);
            this.notifyService.show('error', 'User roles ' + err, '');
          },
        });


      },
      error: (err) => {
        console.log(err);
        this.notifyService.show('error', err, '');
      },
    });
  }

}