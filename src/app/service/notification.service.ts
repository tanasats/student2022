import { Injectable } from '@angular/core';
import { ToastrService } from 'ngx-toastr';

@Injectable({
  providedIn: 'root'
})
export class NotificationService {

  constructor(private toastr: ToastrService) { }
  show(type:any,message:any,title:any){
    switch(type){
      case "success":
          this.toastr.success(message,title);
        break;
        case "error":
          this.toastr.error(message,title);
          break;
        case "info":
          this.toastr.info(message,title);
          break;
        case "warning":
          this.toastr.warning(message,title);
          break;  
    }
  }
   
  showSuccess(message:any, title:any){
      this.toastr.success(message, title)
  }
   
  showError(message:any, title:any){
      this.toastr.error(message, title)
  }
   
  showInfo(message:any, title:any){
      this.toastr.info(message, title)
  }
   
  showWarning(message:any, title:any){
      this.toastr.warning(message, title)
  }

}
