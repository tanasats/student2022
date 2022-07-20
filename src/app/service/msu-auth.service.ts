import {
  HttpClient,
  HttpErrorResponse,
  HttpHeaders,
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
//import 'rxjs/add/operator/catch';


@Injectable({
  providedIn: 'root',
})
export class MsuAuthService {
  private endpoint = 'https://data.msu.ac.th/api/v1.1/auth';

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
        'Authorization': 'Basic ' + btoa('tanasat.s@msu.ac.th:sudjing'),
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
        if (error.status==0){
          errorMsg= "Network Error !";
        } else if (error.error.message) {
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

  constructor(private http: HttpClient) {}

  signin(data: any): Observable<any> {
    console.log('sign data: ', data);
    return this.http
      .post(this.endpoint + '/signin', data, this.httpOptions)
      .pipe(catchError(this.handleError));
  }

  me(): Observable<any> {
    return this.http
      .get(this.endpoint + '/me', this.httpOptions)
      .pipe(catchError(this.handleError));
  }
}
