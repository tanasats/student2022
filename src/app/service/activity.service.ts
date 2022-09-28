import { Injectable } from '@angular/core';
import {
  HttpClient,
  HttpErrorResponse,
  HttpHeaders,
  HttpParams,
} from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
@Injectable({
  providedIn: 'root',
})
export class ActivityService {
  private endpoint = environment.apiURL+'/api/v1/activity';
  constructor(private http: HttpClient) {}

  get httpOptions() {
    //let token = localStorage.getItem('access-token') || '';
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
  get httpOptions_multipath() {
    //let token = localStorage.getItem('access-token') || '';
    return {
      headers: this.httpHeaders_multipath,
    };
  }
  get httpHeaders_multipath() {
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
    var errorMsg: string = 'Unknow error!';
    console.log(error);
    if (error.error instanceof ErrorEvent) {
      // Client side error
      console.log('client side error');
      errorMsg = `Client Error: ${error.error.message}`;
    } else {
      // Server side error
      console.log('server side error');
      if (error instanceof HttpErrorResponse) {
        if (error.error) {
          //console.log(error.error);
          errorMsg = error.error;
        } else {
          errorMsg = error.statusText; //error.status + ' : ' + error.statusText;
        }
      } else {
        errorMsg = error;
      }
    }
    console.log('errorMsg=', errorMsg);
    return throwError(() => {
      return errorMsg;
    });
  }

  getAll(): Observable<any> {
    return this.http
      .get(this.endpoint + 's', this.httpOptions)
      .pipe(catchError(this.handleError));
  }

  filter(parameters: any): Observable<any> {
    let params = new HttpParams()
      .set('page', parameters.page)
      .set('pagesize', parameters.pagesize)
      .set('keyword', parameters.keyword);
    return this.http
      .get(this.endpoint + 's', { headers: this.httpHeaders, params: params })
      .pipe(catchError(this.handleError));
  }

  getById(id: number): Observable<any> {
    return this.http
      .get(this.endpoint + '/' + id, this.httpOptions)
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
      .put(this.endpoint + '/' + datas.activity_id, datas, this.httpOptions)
      .pipe(catchError(this.handleError));
  }

  upload(datas: any): Observable<any> {
    return this.http
      .post(this.endpoint + '/upload', datas) //, this.httpOptions_multipath)
      .pipe(catchError(this.handleError));
  }
} //class
