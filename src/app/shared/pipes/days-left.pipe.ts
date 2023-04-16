import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'daysLeft',
})
export class DaysLeftPipe implements PipeTransform {
  transform(value: any, ...args: any[]): string {
    let today = new Date();
    let date1 = new Date(value);
    let timemilisec = date1.getTime() - today.getTime();
    let days = Math.floor(timemilisec / (1000 * 60 * 60 * 24));
    let day_text = '';
    if (days < 0) day_text = "<div class='text-danger'>ผ่านมาแล้ว</div>";
    else if ((days == 0)) day_text = "<div class='text-success'>วันนี้</div>";
    else if ((days == 1)) day_text = "<div class='text-success'>วันพรุ่งนี้</div>";
    else day_text = "<div class='text-success'>อีก " + days + "วัน </div>";

    return day_text;
  }
}
