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
  private endpoint = 'https://data.msu.ac.th/api/v1/auth';
  get httpOptions() {
    let token = localStorage.getItem('access-token') || '';
    return {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        //'Content-Type': 'multipart/form-data; charset=utf-8',
        'Cache-Control': 'no-cache',
        'x-access-token': token,
      }),
    };
  }
  // private handleError(error: any) {
  //   //console.log("isstanceof httperrorresponse=",error instanceof HttpErrorResponse);
  //   if (error instanceof HttpErrorResponse) {
  //     // this is server side error
  //     switch (error.status) {
  //       case 0: //net::ERR_TIMED_OUT
  //         return throwError(
  //           () => new Error("{'status':0,'error':'Network out of service!'}")
  //         );
  //         break;
  //       case 400:
  //         return throwError(() => new Error(error.message));
  //         break;
  //       default:
  //         return throwError(() => new Error(error.message));
  //     }
  //   }else{
  //     // this is client side error
  //   }
  //   return throwError(error);
  // }

  // private handleError(error:HttpErrorResponse){
  //   if(error.error instanceof ErrorEvent){
  //     // Client side error

  //   }else{
  //     // Server side error

  //   }
  // }

  private handleError(error: any) {
    let errorMsg: string;
    if (error.error instanceof ErrorEvent) {
      // Client side error
      errorMsg = `Error: ${error.error.message}`;
    } else {
      // Server side error
      errorMsg = this.getServerErrorMessage(error);
    }
    return throwError(() => new Error(errorMsg));
  }

  private getServerErrorMessage(error: HttpErrorResponse): string {
    switch (error.status) {
      case 404: {
        return `Not Found: ${error.message}`;
      }
      case 403: {
        return `Access Denied: ${error.message}`;
      }
      case 500: {
        return `Internal Server Error: ${error.message}`;
      }
      default: {
        return `Unknown Server Error: ${error.message}`;
      }
    }
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
