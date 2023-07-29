import { Injectable } from '@angular/core';
import * as dayjs from 'dayjs';

@Injectable({
  providedIn: 'root',
})
export class DateService {
  constructor() {}

  getCurrentMonth(): string {
    return dayjs().format('MM');
  }

  getPreviousMonth(month: string): string {
    let previousMonthNumber = parseInt(month, 10) - 1;
    if (previousMonthNumber === 0) previousMonthNumber = 12;
    return previousMonthNumber.toString().padStart(2, '0');
  }

  getNextMonth(month: string): string {
    let nextMonthNumber = parseInt(month, 10) + 1;
    if (nextMonthNumber === 13) nextMonthNumber = 1;
    return nextMonthNumber.toString().padStart(2, '0');
  }
}
