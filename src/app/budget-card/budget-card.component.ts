import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-budget-card',
  templateUrl: './budget-card.component.html',
})
export class BudgetCardComponent {
  constructor() {}
  @Input()
  id: string = '';
  @Input()
  title: string = 'Budget';
  @Input()
  amount: number = 0;
  @Input()
  max: number = 100;
  @Input()
  loan: boolean = false;
  @Input()
  hideButtons: boolean = false;

  @Output() addExpenseClick = new EventEmitter<void>();
  @Output() viewExpensesClick = new EventEmitter<void>();

  onAddExpenseClick() {
    this.addExpenseClick.emit();
  }

  onViewExpensesClick() {
    this.viewExpensesClick.emit();
  }

  colorClass(): string {
    if (this.amount >= this.max) return 'bg-red-200';
    else return 'bg-slate-50';
  }

  getProgressBarRatio(): string {
    if (this.amount > this.max) return '100%';
    else return (this.amount / this.max) * 100 + '%';
  }

  getProgressBarColor(): string {
    const ratio = this.amount / this.max;
    if (ratio < 0.5) return 'bg-sky-400';
    if (ratio < 0.75) return 'bg-yellow-300';
    return 'bg-red-500';
  }

  // getProgressBarColorLoan(): string {
  //   const ratio = amount / max;
  //   if (ratio < 0.5) return 'bg-red-500';
  //   if (ratio < 0.75) return 'bg-yellow-300';
  //   return 'bg-green-400';
  // }
}
