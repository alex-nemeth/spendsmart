import { Component, OnInit } from '@angular/core';
import { BudgetsService } from './services/budgets.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  constructor(private budgetsService: BudgetsService) {
    this.budgetsService.budgets$.subscribe((budget) => {
      this.budgets.push(budget);
    });
  }

  budgets: any[] = [];
  addBudgetModal = false;
  addExpenseModal = true;

  toggleAddBudgetModal(): void {
    this.addBudgetModal = !this.addBudgetModal;
  }

  toggleAddExpenseModal(): void {
    this.addExpenseModal = !this.addExpenseModal;
  }
}
