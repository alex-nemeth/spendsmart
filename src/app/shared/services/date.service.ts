import { Injectable } from '@angular/core';
import * as dayjs from 'dayjs';

@Injectable({
  providedIn: 'root',
})
export class DateService {
  constructor() {}

  getCurrentMonth(): string {
    return dayjs().format('YYYYMM');
  }

  getPreviousMonth(yearMonth: string): string {
    const year = parseInt(yearMonth.slice(0, 4), 10);
    const month = parseInt(yearMonth.slice(4), 10);

    let previousYear = year;
    let previousMonth = month - 1;

    if (previousMonth === 0) {
      previousMonth = 12;
      previousYear--;
    }

    return `${previousYear}${previousMonth.toString().padStart(2, '0')}`;
  }

  getNextMonth(yearMonth: string): string {
    const year = parseInt(yearMonth.slice(0, 4), 10);
    const month = parseInt(yearMonth.slice(4), 10);

    let nextYear = year;
    let nextMonth = month + 1;

    if (nextMonth === 13) {
      nextMonth = 1;
      nextYear++;
    }

    return `${nextYear}${nextMonth.toString().padStart(2, '0')}`;
  }
}
