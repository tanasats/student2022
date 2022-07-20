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
export class UploadService {
  private endpoint = 'http://localhost:3000/api/v1/upload';
  constructor(private http: HttpClient) {}

  get httpOptions() {
    let token = localStorage.getItem('access-token') || '';
    return {
      headers: this.httpHeaders
    };
  }

  get httpHeaders() {
    let token = localStorage.getItem('access-token') || '';
    return new HttpHeaders({
        //'Content-Type': 'application/json',
        //'Content-Type': 'multipart/form-data; charset=utf-8',
        'Content-Type': 'multipart/form-data',
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
        if(error.error) {
          errorMsg = error.error;
        }else{
          errorMsg = error.statusText; //error.status + ' : ' + error.statusText;
        }
      } else {
        errorMsg = error;
      }
    }
    return throwError(() => {
      return errorMsg;
    });
  }

  upload(file: any): Observable<any> {
    console.log("file:",file);
    var formData: FormData = new FormData();
    //formData.append("username", "Groucho");
    formData.append('file', file);
    console.log(formData); 
    return this.http
      .post(this.endpoint,formData) //, this.httpOptions)
      .pipe(catchError(this.handleError));
  } 

 






} //class
