import { CurrentUserService } from 'src/app/service/current-user.service';
import { UserService } from 'src/app/service/user.service';
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
        errorMsg = error+"xx";
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
    let _access_token = localStorage.getItem('access-token') || '';
    console.log("token=",_access_token);
    
    if (_access_token) {
      this.me().subscribe({
        next: ([res]) => {
          console.log('auth.service call me() res=', res);
          const _user: any = res;
          this.userService.userroles(res.user_id).subscribe({
            next: (res) => {
              console.log('useroles=', res);
              const _roles: any = res;
              const _role_code = _roles.map((item: any) => {
                return item.role_code;
              });
              console.log("useroles=",_role_code);
              
              this.currUserService.user_id = _user.user_id;
              this.currUserService.username = _user.username;
              this.currUserService.displayname = _user.displayname;
              this.currUserService.email = _user.email;

              this.currUserService.roles = _role_code;
              if (_role_code) {
                this.currUserService.role = _role_code[0];
              }
              this.currUserService.islogin = true; //<--this activate to emitt(data) to navbar or appbar
            },
            error: (err) => {
              console.log('userroles error:',err);
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
      console.log('localstorage not have _access_token');
    }
  }

  signin(data: any): Observable<any> {
    console.log('app_sign service: ', data);
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
    return this.http
      .get(this.endpoint + '/me', this.httpOptions)
      .pipe(catchError(this.handleError));
  }

  register(data: any): Observable<any> {
    console.log('register data: ', data);
    return this.http
      .post(this.endpoint + '/register', data, this.httpOptions)
      .pipe(catchError(this.handleError));
  }

  getStudentPicture(studentcode: string): Observable<Blob> {
    const url = "http://202.28.32.211/picture/student/"+studentcode.slice(0,2)+"/"+studentcode+".jpg";
    return this.http.get(url, { responseType: 'blob' });
  }

} //class
