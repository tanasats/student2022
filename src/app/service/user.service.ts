import { Injectable } from '@angular/core';
import {
  HttpClient,
  HttpErrorResponse,
  HttpHeaders,
} from "@angular/common/http";
import { Observable, throwError } from "rxjs";
import { catchError } from "rxjs/operators";

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private endpoint = 'http://localhost:3000/api/v1/user';
  constructor(
    private http: HttpClient,
  ) { }

  get httpOptions() {
    let token = localStorage.getItem("access-token") || "";
    return {
      headers: new HttpHeaders({
        "Content-Type": "application/json",
        //'Content-Type': 'multipart/form-data; charset=utf-8',
        "Cache-Control": "no-cache",
        "x-access-token": token,
      }),
    };
  }

  private handleError(error: HttpErrorResponse) {
    //console.log("isstanceof httperrorresponse=",error instanceof HttpErrorResponse);
    switch (error.status) {
      case 0:
        return throwError({'status':0,'statusText':'Network/Http failure response'});
        break;
      case 400:
        return throwError(error);
        break;
      default:
        return throwError(error);
    }
  }




  getUser(): Observable<any> { //by authaccount
    return this.http
      .get(this.endpoint + "s", this.httpOptions)
      .pipe(catchError(this.handleError));
  }

  delete(id:any): Observable<any> {
    return this.http
    .delete(this.endpoint+"/"+id,this.httpOptions)
    .pipe(catchError(this.handleError));
  }



} // class
