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
import { Observable, map } from 'rxjs';
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

  getAllExpenses(userId: string): Observable<number> {
    return this.getAllBudgets(userId).pipe(
      map((budgets: any[]) => {
        let totalExpenses = 0;
        for (const budget of budgets) {
          totalExpenses += this.getBudgetExpensesAmount(budget);
        }
        return totalExpenses;
      })
    );
  }

  getBudgetExpensesAmount(budget: IBudget): number {
    return budget.expenses.reduce((a, b) => a + b.amount, 0);
  }

  addBudget(budget: any, userId: string): void {
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

  deleteBudget(budgetId: string, userId: string): void {
    const docInstance = doc(
      this.firestore,
      `users/${userId}/budgets/${budgetId}`
    );
    deleteDoc(docInstance).then(() => console.log('Budget deleted'));
  }

  addExpense(expense: any, budget: IBudget, userId: string): void {
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

  deleteExpense(expense: IExpense, budgetId: string, userId: string): void {
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
