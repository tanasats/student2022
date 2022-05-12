import { Injectable } from '@angular/core';
import {
  HttpClient,
  HttpErrorResponse,
  HttpHeaders,
} from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private endpoint = 'http://localhost:3000/api/v1/user';
  constructor(private http: HttpClient) {}

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
    }); //return throwError(() => new Error(errorMsg));
  }

  private getServerErrorMessagex(error: HttpErrorResponse): string {
    switch (error.status) {
      case 0: {
        return `${error.statusText}`;
      }
      case 404: {
        return `Not Found: ${error.url}`; //${error.message}`;
      }
      case 403: {
        return `Access Denied: ${error.url}`; //${error.message}`;
      }
      case 500: {
        return `Internal Server Error: ${error.statusText}`; //${error.message}`;
      }
      default: {
        return `Unknown Server Error: ${error.statusText}`; //${error.message}`;
      }
    }
  }

  getUser(): Observable<any> {
    return this.http
      .get(this.endpoint + 's', this.httpOptions)
      .pipe(catchError(this.handleError));
  }

  delete(id: any): Observable<any> {
    return this.http
      .delete(this.endpoint + '/' + id, this.httpOptions)
      .pipe(catchError(this.handleError));
  }

  create(datas: any): Observable<any> {
    return this.http
      .post(this.endpoint, datas, this.httpOptions)
      .pipe(catchError(this.handleError));
  }

  update(datas: any): Observable<any> {
    return this.http
      .put(this.endpoint + '/' + datas.userid, datas, this.httpOptions)
      .pipe(catchError(this.handleError));
  }

  getById(id:number): Observable<any> {
    return this.http
      .get(this.endpoint + '/'+id, this.httpOptions)
      .pipe(catchError(this.handleError));
  }

} // class
