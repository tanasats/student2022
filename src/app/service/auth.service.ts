import { UserService } from 'src/app/service/user.service';
import { CurrentUserService } from './current-user.service';
import { EventEmitter, Injectable, Output } from '@angular/core';
import {
  HttpClient,
  HttpErrorResponse,
  HttpHeaders,
  HttpParams,
} from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
//import { JwtHelperService } from "@auth0/angular-jwt";

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private endpoint = 'http://localhost:3000/api/v1/auth';

  get httpOptions() {
    let token = localStorage.getItem('access-token') || '';
    return {
      headers: this.httpHeaders,
    };
  }

  get httpHeaders() {
    let token = localStorage.getItem('access-token') || '';
    return new HttpHeaders({
      'Content-Type': 'application/json',
      //'Content-Type': 'multipart/form-data; charset=utf-8',
      'Cache-Control': 'no-cache',
      'x-access-token': token,
    });
  }

  private handleError(error: any) {
    let errorMsg: string;
    console.log(error);
    if (error.error instanceof ErrorEvent) {
      // Client side error
      errorMsg = `Client Error: ${error.error.message}`;
    } else {
      // Server side error
      if (error instanceof HttpErrorResponse) {
        if (error.error) {
          errorMsg = error.error.message;
        } else if (error.statusText) {
          errorMsg = error.statusText; //error.status + ' : ' + error.statusText;
        } else {
          errorMsg = error.error;
        }
      } else {
        errorMsg = error;
      }
    }
    return throwError(() => {
      return errorMsg;
    });
  }

  constructor(
    private http: HttpClient,
    private currUserService: CurrentUserService,
    private userService: UserService //private jwt:JwtHelperService
  ) {
    console.log('#auth.service.constructor()');
    let accesstoken = localStorage.getItem('access-token') || '';
    if (accesstoken) {
      this.me().subscribe({
        next: ([[res]]) => {
          console.log('auth.service call me() res=', res);
          const _user: any = res;
          this.userService.userroles(res.userid).subscribe({
            next: (res) => {
              console.log('useroles=', res);
              const _roles: any = res;
              const _rolecode = _roles.map((item: any) => {
                return item.rolecode;
              });
              console.log("useroles=",_rolecode);

              this.currUserService.username = _user.username;
              this.currUserService.displayname = _user.displayname;
              this.currUserService.email = _user.email;

              this.currUserService.roles = _rolecode;
              if (_rolecode) {
                this.currUserService.role = _rolecode[0];
              }

              this.currUserService.islogin = true; //<--this activate to emitt(data) to navbar
            },
            error: (err) => {
              console.log(err);
              //this.notifyService.show('error','User roles '+err,'');
            },
          });
        },
        error: (err) => {
          console.log('auth.service call me() err=', err);
          if (err === 'jwt expired') this.currUserService.logout();
        },
      });
    } else {
      console.log('localstorage not have accesstoken');
    }
  }

  signin(data: any): Observable<any> {
    console.log('sign data: ', data);
    return this.http
      .post(this.endpoint + '/signin', data, this.httpOptions)
      .pipe(catchError(this.handleError));
  }

  tokenSignin(token: String): Observable<any> {
    return this.http
      .post(this.endpoint + '/tokensignin', { token: token }, this.httpOptions)
      .pipe(catchError(this.handleError));
  }

  me(): Observable<any> {
    // you can pass here whatever you want
    return this.http
      .get(this.endpoint + '/me', this.httpOptions)
      .pipe(catchError(this.handleError));
  }
} //class
