import { Component, OnInit, inject } from '@angular/core';
import { BudgetsService } from './shared/services/budgets.service';
import { Firestore } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import firebase from 'firebase/compat/app';
import { AuthService } from './shared/services/auth.service';
import { IBudget } from 'src/app/shared/models/interfaces';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['../styles.css'],
})
export class AppComponent implements OnInit {
  firestore: Firestore = inject(Firestore);
  budgets$!: Observable<any[]> | null;
  expenses!: number;
  user!: firebase.User | null;
  currentBudget!: IBudget;
  currentBudgetId!: string;
  registration: boolean = false;

  constructor(
    private authService: AuthService,
    private budgetsService: BudgetsService
  ) {}

  ngOnInit(): void {
    this.authService.getCurrentUser().subscribe((user) => {
      if (user) {
        this.user = user;
        this.budgets$ = this.budgetsService.getAllBudgets(user.uid);
        this.budgetsService
          .getAllExpenses(user.uid)
          .subscribe((expenses) => (this.expenses = expenses));
      }
    });
  }

  totalBudgetExpenses(budget: IBudget): number {
    return this.budgetsService.getBudgetExpensesAmount(budget);
  }

  addBudgetModal = false;
  addExpenseModal = false;
  viewExpensesModal = false;

  toggleRegistration() {
    this.registration = !this.registration;
  }

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

  handleLogOut() {
    this.authService.logOut();
    this.user = null;
  }
}
