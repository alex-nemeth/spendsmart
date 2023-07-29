import { Component, OnInit, inject } from '@angular/core';
import { BudgetsService } from './shared/services/budgets.service';
import { Observable } from 'rxjs';
import firebase from 'firebase/compat/app';
import { AuthService } from './shared/services/auth.service';
import { IBudget, IExpense } from 'src/app/shared/models/interfaces';
import { DateService } from './shared/services/date.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['../styles.css'],
})
export class AppComponent implements OnInit {
  budgets$!: Observable<any[]> | null;
  expenses!: number;
  user!: firebase.User | null;
  currentBudget!: IBudget;
  currentBudgetId!: string;
  registration: boolean = false;
  selectedMonth!: string;
  previousMonth!: string;
  nextMonth!: string;

  constructor(
    private authService: AuthService,
    private budgetsService: BudgetsService,
    private dateService: DateService
  ) {}

  ngOnInit(): void {
    this.selectedMonth = this.dateService.getCurrentMonth();
    this.previousMonth = this.dateService.getPreviousMonth(this.selectedMonth);
    this.nextMonth = this.dateService.getNextMonth(this.selectedMonth);
    this.authService.getCurrentUser().subscribe((user) => {
      if (user) {
        this.user = user;
        this.budgets$ = this.budgetsService.getAllBudgets(user.uid);
        this.budgetsService
          .getAllExpenses(user.uid, this.selectedMonth)
          .subscribe((expenses) => (this.expenses = expenses));
        console.log(this.expenses);
      }
    });
  }

  onMonthChange(change?: string) {
    if (change === 'previous') {
      this.selectedMonth = this.dateService.getPreviousMonth(
        this.selectedMonth
      );
      this.previousMonth = this.dateService.getPreviousMonth(
        this.selectedMonth
      );
      this.nextMonth = this.dateService.getNextMonth(this.selectedMonth);
    } else {
      this.selectedMonth = this.dateService.getNextMonth(this.selectedMonth);
      this.previousMonth = this.dateService.getPreviousMonth(
        this.selectedMonth
      );
      this.nextMonth = this.dateService.getNextMonth(this.selectedMonth);
    }
    this.budgetsService
      .getAllExpenses(this.user!.uid, this.selectedMonth)
      .subscribe((expenses) => (this.expenses = expenses));
  }

  totalBudgetExpenses(budget: IBudget, month?: string): number {
    return month
      ? this.budgetsService.getBudgetExpensesAmount(budget, month)
      : this.budgetsService.getBudgetExpensesAmount(budget);
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
