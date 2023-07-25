import { Component, EventEmitter, Input, Output } from '@angular/core';
import firebase from 'firebase/compat/app';
import { IBudget } from 'src/app/shared/models/interfaces';
import { BudgetsService } from '../shared/services/budgets.service';

@Component({
  selector: 'app-add-expense-modal',
  templateUrl: './add-expense-modal.component.html',
})
export class AddExpenseModalComponent {
  constructor(private budgetsService: BudgetsService) {}
  @Input() user!: firebase.User | null;
  @Input() budget!: IBudget;
  @Output() closeModal = new EventEmitter<void>();

  handleClose() {
    this.closeModal.emit();
  }

  handleSubmit(f: any) {
    if (this.user)
      this.budgetsService.addExpense(f.value, this.budget, this.user.uid);
    this.handleClose();
  }
}
