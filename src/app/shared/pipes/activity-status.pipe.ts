import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'activityStatus'
})
export class ActivityStatusPipe implements PipeTransform {

  transform(value: unknown, ...args: unknown[]): unknown {
    return null;
  }

}
