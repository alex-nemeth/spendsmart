import { Pipe, PipeTransform } from '@angular/core';
import * as dayjs from 'dayjs';

@Pipe({
  name: 'dateToLocale',
})
export class DateToLocalePipe implements PipeTransform {
  transform(value: string): string {
    return dayjs(value).format('DD.MM.YYYY');
  }
}
