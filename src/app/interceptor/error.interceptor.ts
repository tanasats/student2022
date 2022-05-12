import { throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpErrorResponse
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { NotificationService } from '../service/notification.service';

@Injectable()
export class ErrorInterceptor implements HttpInterceptor {

  constructor(private notifyService: NotificationService,) {}

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    return next.handle(request)
    .pipe(
      catchError((requestError)=>{
        //console.log('intercept error:',requestError);
        //this.notifyService.show('error',requestError.status+" : "+ requestError.statusText,'Error')
        //return throwError(() => new Error(requestError.statusText)) // throw out for error message;
        return throwError(() => new HttpErrorResponse(requestError));
      })
    ) //pipe
  }
}
