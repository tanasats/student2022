import { Pipe, PipeTransform } from '@angular/core';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';

@Pipe({
  name: 'registerStatus'
})
export class RegisterStatusPipe implements PipeTransform {
  constructor(private _sanitizer: DomSanitizer) { }  
  transform(value:number, ...args: any[]): any {
    const status_name = ["รออนุมัติ","อนุมัติ","ไม่อนุมัติ"];
    const status_class = ["badge rounded-pill bg-warning","badge rounded-pill bg-success","badge rounded-pill bg-danger"];
    let str = `<div class='${status_class[value]}'>${status_name[value]}</div>`;
    return this._sanitizer.bypassSecurityTrustHtml(str)
  }
}
