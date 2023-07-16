import { Injectable } from '@angular/core';
import { collection, doc } from 'firebase/firestore';
import {
  Firestore,
  arrayUnion,
  collectionData,
  updateDoc,
} from '@angular/fire/firestore';
import * as dayjs from 'dayjs';
import { BehaviorSubject, Observable } from 'rxjs';
import { IBudget } from 'src/shared/interfaces';
import { v4 as uuid } from 'uuid';

@Injectable({
  providedIn: 'root',
})
export class BudgetsService {
  constructor(private firestore: Firestore) {}

  getAllBudgets(userId: string): Observable<any[]> {
    const instance = collection(this.firestore, `users/${userId}/budgets`);
    return collectionData(instance);
  }

  getBudgetExpensesAmount(budget: IBudget): number {
    return budget.expenses.reduce((a, b) => a + b.amount, 0);
  }

  addExpense(expense: any, budget: IBudget, userId: string) {
    const docInstance = doc(
      this.firestore,
      `users/${userId}/budgets/${budget.id}`
    );
    const newExpense: Object = {
      id: uuid(),
      date: dayjs().format('DD.MM.YYYY'),
      ...expense,
    };
    updateDoc(docInstance, {
      expenses: arrayUnion(newExpense),
    })
      .then(() => {
        console.log('Expense Added! ' + JSON.stringify(newExpense));
      })
      .catch((error) => console.error(error));
  }
}

// private budgetsSubject = new BehaviorSubject<any[]>([]);
// private expensesSubject = new BehaviorSubject<any[]>([]);

// budgets$: Observable<any[]> = this.budgetsSubject.asObservable();
// expenses$: Observable<any[]> = this.expensesSubject.asObservable();

// UNCATEGORIZED_BUDGET_ID = 'Uncategorized';

// getBudgetExpenses(budgetId: string): any[] {
//   const expenses = this.expensesSubject.getValue();
//   return expenses.filter((expense) => expense.budgetId === budgetId);
// }

// addExpense(description: string, amount: number, budgetId: string): void {
//   const expenses = this.expensesSubject.getValue();
//   const newExpense = { id: uuidv4(), description, amount, budgetId };
//   this.expensesSubject.next([...expenses, newExpense]);
// }

// addBudget(name: string, max: number): void {
//   const budgets = this.budgetsSubject.getValue();
//   if (budgets.find((budget) => budget.name === name)) return;
//   const newBudget = { id: uuidv4(), name, max };
//   this.budgetsSubject.next([...budgets, newBudget]);
// }

// deleteBudget(id: string): void {
//   const expenses = this.expensesSubject.getValue();
//   const budgets = this.budgetsSubject.getValue();

//   const updatedExpenses = expenses.map((expense) => {
//     if (expense.budgetId !== id) return expense;
//     return { ...expense, budgetId: this.UNCATEGORIZED_BUDGET_ID };
//   });

//   const updatedBudgets = budgets.filter((budget) => budget.id !== id);

//   this.expensesSubject.next(updatedExpenses);
//   this.budgetsSubject.next(updatedBudgets);
// }

// deleteExpense(id: string): void {
//   const expenses = this.expensesSubject.getValue();
//   const updatedExpenses = expenses.filter((expense) => expense.id !== id);
//   this.expensesSubject.next(updatedExpenses);
// }
