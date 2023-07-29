import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'monthToString',
})
export class MonthToStringPipe implements PipeTransform {
  transform(month: string): string {
    // Ensure that the input is a valid month string in the format of "XX"
    if (!/^\d{2}$/.test(month)) {
      return '';
    }

    // Parse the month string to an integer and get the corresponding month name
    const monthNumber = parseInt(month, 10);
    const monthNames = [
      'January',
      'February',
      'March',
      'April',
      'May',
      'June',
      'July',
      'August',
      'September',
      'October',
      'November',
      'December',
    ];

    if (monthNumber >= 1 && monthNumber <= 12) {
      return monthNames[monthNumber - 1];
    } else {
      return '';
    }
  }
}
