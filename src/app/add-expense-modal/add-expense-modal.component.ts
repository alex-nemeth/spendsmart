import { Component, EventEmitter, Input, Output } from '@angular/core';
import { BudgetsService } from '../services/budgets.service';

@Component({
  selector: 'app-add-expense-modal',
  templateUrl: './add-expense-modal.component.html',
})
export class AddExpenseModalComponent {
  constructor(private budgetsService: BudgetsService) {}
  @Input() id: string = '';
  description: string = '';
  amount: number = 0;

  @Output() closeModal = new EventEmitter<void>();

  handleClose() {
    this.closeModal.emit();
  }

  handleSubmit() {
    this.budgetsService.addExpense(this.description, this.amount, this.id);
    this.handleClose();
  }
}
