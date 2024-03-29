import { Injectable } from '@angular/core';
import { collection, doc, setDoc } from 'firebase/firestore';
import {
  Firestore,
  addDoc,
  arrayRemove,
  arrayUnion,
  collectionData,
  deleteDoc,
  updateDoc,
} from '@angular/fire/firestore';
import { Observable, map } from 'rxjs';
import { IBudget, IExpense } from 'src/app/shared/models/interfaces';
import { v4 as uuid } from 'uuid';
import * as dayjs from 'dayjs';

@Injectable({
  providedIn: 'root',
})
export class BudgetsService {
  constructor(private firestore: Firestore) {}

  getAllBudgets(userId: string): Observable<any[]> {
    const instance = collection(this.firestore, `users/${userId}/budgets`);
    return collectionData(instance);
  }

  getAllExpenses(userId: string, month?: string): Observable<number> {
    return this.getAllBudgets(userId).pipe(
      map((budgets: any[]) => {
        let totalExpenses = 0;
        for (const budget of budgets)
          totalExpenses += this.getBudgetExpensesAmount(budget);
        return totalExpenses;
      })
    );
  }

  getAllExpensesFromObservable(
    budgets$: Observable<IBudget[]>
  ): Observable<number> {
    return budgets$.pipe(
      map((budgets: any[]) => {
        let totalExpenses = 0;
        for (const budget of budgets) {
          totalExpenses += this.getBudgetExpensesAmount(budget);
        }
        return totalExpenses;
      })
    );
  }

  getBudgetExpensesAmount(budget: IBudget, month?: string): number {
    if (month) return budget.expenses.reduce((a, b) => a + b.amount, 0);
    else return budget.expenses.reduce((a, b) => a + b.amount, 0);
  }

  async createUserDatabase(uid: string, email: string) {
    try {
      const userDocRef = doc(this.firestore, `users/${uid}`);
      await setDoc(userDocRef, { email: email });
    } catch (error) {
      console.log(error);
    }
  }

  addBudget(budget: any, userId: string, selectedMonth?: string): void {
    const instance = collection(this.firestore, `users/${userId}/budgets`);
    let newBudget: IBudget = {
      ...budget,
      amount: 0,
      expenses: [],
    };
    if (budget.timespan === 'monthly') newBudget.timespan = selectedMonth;
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
    // Adds todays date if date wasn't selected
    if (!expense.date) {
      expense.date = dayjs().format('YYYY-MM-DD');
    }
    const docInstance = doc(
      this.firestore,
      `users/${userId}/budgets/${budget.id}`
    );
    const newExpense: Object = {
      id: uuid(),
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
