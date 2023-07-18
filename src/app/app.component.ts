import { Component, OnInit, inject } from '@angular/core';
import { BudgetsService } from './services/budgets.service';
import { Firestore, collection, collectionData } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import firebase from 'firebase/compat/app';
import { AuthService } from './services/auth.service';
import { IBudget } from 'src/shared/interfaces';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
})
export class AppComponent implements OnInit {
  firestore: Firestore = inject(Firestore);
  budgets$!: Observable<any[]> | null;
  expenses!: number;
  user!: firebase.User | null;
  currentBudget!: IBudget;
  currentBudgetId!: string;

  constructor(
    private authService: AuthService,
    private budgetService: BudgetsService
  ) {}

  ngOnInit(): void {
    this.authService.getCurrentUser().subscribe((user) => {
      if (user) {
        this.user = user;
        this.budgets$ = this.budgetService.getAllBudgets(user.uid);
        this.budgetService
          .getAllExpenses(user.uid)
          .subscribe((expenses) => (this.expenses = expenses));
      }
    });
  }

  totalBudgetExpenses(budget: IBudget): number {
    return this.budgetService.getBudgetExpensesAmount(budget);
  }

  addBudgetModal = false;
  addExpenseModal = false;
  viewExpensesModal = false;

  toggleAddBudgetModal(): void {
    this.addBudgetModal = !this.addBudgetModal;
  }

  openAddExpenseModal(budget: IBudget): void {
    this.currentBudget = budget;
    this.addExpenseModal = true;
  }

  closeAddExpenseModal(): void {
    this.addExpenseModal = false;
  }

  openViewExpensesModal(budget: IBudget): void {
    this.currentBudget = budget;
    this.currentBudgetId = budget.id;
    this.viewExpensesModal = true;
  }

  closeViewExpensesModal(): void {
    this.viewExpensesModal = false;
  }
}
