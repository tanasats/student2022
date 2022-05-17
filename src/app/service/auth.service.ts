import { Injectable } from '@angular/core';
import {
  HttpClient,
  HttpErrorResponse,
  HttpHeaders,
  HttpParams,
} from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private endpoint = 'http://localhost:3000/api/v1/auth';
  private _authorized:boolean=false;

  get httpOptions() {
    let token = localStorage.getItem('access-token') || '';
    return {
      headers: this.httpHeaders
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
      errorMsg = `Error: ${error.error.message}`;
    } else {
      // Server side error
      if (error instanceof HttpErrorResponse) {
        errorMsg = error.status + ' : ' + error.statusText;
      } else {
        errorMsg = error;
      }
    }
    return throwError(() => {
      return errorMsg;
    });
  }

  constructor(private http: HttpClient) {}
  
  signin(data: any): Observable<any> {
    console.log('sign data: ', data);
    return this.http
      .post(this.endpoint + '/signin', data, this.httpOptions)
      .pipe(catchError(this.handleError));
  }

  authorized(){
    return this._authorized;
  }

  



}
