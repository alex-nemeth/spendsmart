import { Component, EventEmitter, Output } from '@angular/core';
import { BudgetsService } from '../services/budgets.service';

@Component({
  selector: 'app-add-expense-modal',
  templateUrl: './add-expense-modal.component.html',
})
export class AddExpenseModalComponent {
  constructor(private budgetsService: BudgetsService) {}

  description: string = '';
  amount: number = 0;
  id: string = '';

  @Output() closeModal = new EventEmitter<void>();

  handleClose() {
    this.closeModal.emit();
  }

  handleSubmit() {
    this.budgetsService.addExpense(this.description, this.amount, this.id);
    this.handleClose();
  }
}
