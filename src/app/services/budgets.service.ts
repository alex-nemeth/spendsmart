import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { v4 as uuidv4 } from 'uuid';

@Injectable({
  providedIn: 'root',
})
export class BudgetsService {
  private budgetsSubject = new BehaviorSubject<any[]>([]);
  private expensesSubject = new BehaviorSubject<any[]>([]);

  budgets$: Observable<any[]> = this.budgetsSubject.asObservable();
  expenses$: Observable<any[]> = this.expensesSubject.asObservable();

  UNCATEGORIZED_BUDGET_ID = 'Uncategorized';

  getBudgetExpenses(budgetId: string): any[] {
    const expenses = this.expensesSubject.getValue();
    return expenses.filter((expense) => expense.budgetId === budgetId);
  }

  addExpense(description: string, amount: number, budgetId: string): void {
    const expenses = this.expensesSubject.getValue();
    const newExpense = { id: uuidv4(), description, amount, budgetId };
    this.expensesSubject.next([...expenses, newExpense]);
  }

  addBudget(name: string, max: number): void {
    const budgets = this.budgetsSubject.getValue();
    if (budgets.find((budget) => budget.name === name)) return;
    const newBudget = { id: uuidv4(), name, max };
    this.budgetsSubject.next([...budgets, newBudget]);
  }

  deleteBudget(id: string): void {
    const expenses = this.expensesSubject.getValue();
    const budgets = this.budgetsSubject.getValue();

    const updatedExpenses = expenses.map((expense) => {
      if (expense.budgetId !== id) return expense;
      return { ...expense, budgetId: this.UNCATEGORIZED_BUDGET_ID };
    });

    const updatedBudgets = budgets.filter((budget) => budget.id !== id);

    this.expensesSubject.next(updatedExpenses);
    this.budgetsSubject.next(updatedBudgets);
  }

  deleteExpense(id: string): void {
    const expenses = this.expensesSubject.getValue();
    const updatedExpenses = expenses.filter((expense) => expense.id !== id);
    this.expensesSubject.next(updatedExpenses);
  }
}
