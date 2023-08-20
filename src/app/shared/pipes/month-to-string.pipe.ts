import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'monthToString',
})
export class MonthToStringPipe implements PipeTransform {
  transform(input: string): string {
    // Ensure that the input is a valid string in the format of "YYYYMM" or "MM"
    if (!/^(?:\d{4}\d{2}|\d{2})$/.test(input)) {
      return '';
    }

    let year: string;
    let month: string;

    if (input.length === 6) {
      // If input has 6 characters, extract year and month separately
      year = input.slice(0, 4);
      month = input.slice(4);
    } else {
      // Return the input unchanged if format is wrong
      return input;
    }

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

    let result = '';

    if (monthNumber >= 1 && monthNumber <= 12) {
      result += monthNames[monthNumber - 1];
    }

    if (year) {
      if (result.length > 0) {
        result += ' ';
      }
      result += year;
    }

    return result;
  }
}
