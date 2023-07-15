import { Component, OnInit, inject } from '@angular/core';
import { BudgetsService } from './services/budgets.service';
import { Firestore, collection, collectionData } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import firebase from 'firebase/compat/app';
import { AuthService } from './services/auth.service';
import * as dayjs from 'dayjs';
import { IBudget } from 'src/shared/interfaces';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
})
export class AppComponent implements OnInit {
  firestore: Firestore = inject(Firestore);
  budgets$: Observable<any[]> | null;
  user!: firebase.User | null;
  currentBudget: IBudget = {
    amount: 0,
    expenses: [],
    id: '',
    max: 0,
    title: '',
  };
  currentBudgetId: string = '';

  constructor(private auth: AngularFireAuth, private authService: AuthService) {
    this.budgets$ = null;
  }

  ngOnInit(): void {
    this.auth.authState.subscribe((user) => {
      if (user) {
        this.user = user;
        const collectionInstance = collection(
          this.firestore,
          `users/${this.user.uid}/budgets`
        );
        this.budgets$ = collectionData(collectionInstance);
      }
    });
  }

  totalAmount(budget: IBudget): number {
    return budget.expenses.reduce((a, b) => a + b.amount, 0);
  }

  addBudgetModal = false;
  addExpenseModal = false;
  viewExpensesModal = false;

  toggleAddBudgetModal(): void {
    this.addBudgetModal = !this.addBudgetModal;
  }

  openAddExpenseModal(budgetId: string): void {
    this.currentBudgetId = budgetId;
    this.addExpenseModal = true;
  }

  closeAddExpenseModal(): void {
    this.addExpenseModal = false;
  }

  openViewExpensesModal(budget: IBudget): void {
    this.currentBudget = budget;
    this.currentBudgetId = budget.id;
    console.log('View expenses from app with id of ' + this.currentBudgetId);
    this.viewExpensesModal = true;
  }

  closeViewExpensesModal(): void {
    this.viewExpensesModal = false;
  }
}
