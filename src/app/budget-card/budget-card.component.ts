import { Component, EventEmitter, Input, Output } from '@angular/core';
import { BudgetsService } from '../services/budgets.service';

@Component({
  selector: 'app-budget-card',
  templateUrl: './budget-card.component.html',
})
export class BudgetCardComponent {
  constructor(private budgetsService: BudgetsService) {}
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

  onAddExpenseClick() {
    this.addExpenseClick.emit();
  }

  deleteBudget(id: string) {
    return this.budgetsService.deleteBudget(id);
  }

  logId(): void {
    console.log(this.id);
  }

  colorClass(): string {
    if (this.amount >= this.max) return 'bg-red-200';
    else return 'bg-slate-50';
  }

  getProgressBarRatio(amount: number, max: number): string {
    if (amount > max) return '100%';
    else return (amount / max) * 100 + '%';
  }

  getProgressBarColor(amount: number, max: number): string {
    const ratio = amount / max;
    if (ratio < 0.5) return 'bg-sky-400';
    if (ratio < 0.75) return 'bg-yellow-300';
    return 'bg-red-500';
  }

  getProgressBarColorLoan(amount: number, max: number): string {
    const ratio = amount / max;
    if (ratio < 0.5) return 'bg-red-500';
    if (ratio < 0.75) return 'bg-yellow-300';
    return 'bg-green-400';
  }
}
