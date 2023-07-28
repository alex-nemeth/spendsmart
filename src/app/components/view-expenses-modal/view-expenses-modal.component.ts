import { Component, EventEmitter, Input, Output } from '@angular/core';
import { IBudget, IExpense } from 'src/app/shared/models/interfaces';
import firebase from 'firebase/compat/app';
import { BudgetsService } from 'src/app/shared/services/budgets.service';

@Component({
  selector: 'app-view-expenses-modal',
  templateUrl: './view-expenses-modal.component.html',
})
export class ViewExpensesModalComponent {
  constructor(private budgetsService: BudgetsService) {}

  @Input() user!: firebase.User | null;
  @Input() budget!: IBudget;

  @Output() closeModal = new EventEmitter<void>();

  handleClose() {
    this.closeModal.emit();
  }

  deleteBudget() {
    this.budgetsService.deleteBudget(this.budget.id, this.user!.uid);
    this.handleClose();
  }

  deleteExpense(expense: IExpense) {
    // deletes expense from the budget stored in the component first
    // this ensures that the component is rerendered when the function is called
    this.budget.expenses = this.budget.expenses.filter(
      (e) => e.id !== expense.id
    );
    this.budgetsService.deleteExpense(expense, this.budget.id, this.user!.uid);
  }
}
