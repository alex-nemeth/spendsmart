import { Injectable } from '@angular/core';
import { collection, doc } from 'firebase/firestore';
import {
  Firestore,
  addDoc,
  arrayRemove,
  arrayUnion,
  collectionData,
  deleteDoc,
  updateDoc,
} from '@angular/fire/firestore';
import * as dayjs from 'dayjs';
import { BehaviorSubject, Observable } from 'rxjs';
import { IBudget, IExpense } from 'src/shared/interfaces';
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

  addBudget(budget: any, userId: string) {
    const instance = collection(this.firestore, `users/${userId}/budgets`);
    const newBudget: IBudget = {
      ...budget,
      amount: 0,
      expenses: [],
    };
    addDoc(instance, newBudget)
      .then((doc) => {
        console.log('New Budget Created! ID: ' + doc.id);
        updateDoc(doc, { id: doc.id });
      })
      .catch((error) => {
        console.log(error);
      });
  }

  deleteBudget(budgetId: string, userId: string) {
    const docInstance = doc(
      this.firestore,
      `users/${userId}/budgets/${budgetId}`
    );
    deleteDoc(docInstance).then(() => console.log('Budget deleted'));
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

  deleteExpense(expense: IExpense, budgetId: string, userId: string) {
    const docInstance = doc(
      this.firestore,
      `users/${userId}/budgets/${budgetId}`
    );
    updateDoc(docInstance, {
      expenses: arrayRemove(expense),
    }).then(() => {
      console.log('Expense deleted!');
    });
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
