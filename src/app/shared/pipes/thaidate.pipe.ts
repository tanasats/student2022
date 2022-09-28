import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'thaidate'
})
export class ThaidatePipe implements PipeTransform {

  transform(isoStr1: any, ...args: any[]): any {
    //2022-04-30T17:00:00.000Z
    let result:any;
    const months_th = [ "มกราคม", "กุมภาพันธ์", "มีนาคม", "เมษายน", "พฤษภาคม", "มิถุนายน", "กรกฎาคม", "สิงหาคม", "กันยายน", "ตุลาคม", "พฤศจิกายน", "ธันวาคม", ];
    const months_th_mini = [ "ม.ค.", "ก.พ.", "มี.ค.", "เม.ย.", "พ.ค.", "มิ.ย.", "ก.ค.", "ส.ค.", "ก.ย.", "ต.ค.", "พ.ย.", "ธ.ค.", ];
    const date1 = new Date(isoStr1);
    const yyyy = date1.getFullYear()+543;
    const mm = date1.getMonth();
    const dd = date1.getDate();
    switch(args[0]){
      case 'date': result=dd; break;
      case 'month': result=months_th_mini[mm]; break;
      case 'year': result=yyyy; break;
      default: result=dd+' '+months_th_mini[mm]+' '+yyyy;
    }
    return result;
  }

}
