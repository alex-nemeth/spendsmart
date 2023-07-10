import { Component, EventEmitter, Output, NgModule } from '@angular/core';
import { BudgetsService } from '../services/budgets.service';

@Component({
  selector: 'app-add-budget-modal',
  templateUrl: './add-budget-modal.component.html',
})
export class AddBudgetModalComponent {
  constructor(private budgetsService: BudgetsService) {}

  @Output() closeModal = new EventEmitter<void>();

  title: string = '';
  max = 0;

  handleSubmit() {
    this.budgetsService.addBudget(this.title, this.max);
    this.handleClose();
  }

  handleClose() {
    this.closeModal.emit();
  }

  logMax() {
    console.log(this.max);
  }

  onChange(e: Event, prop: any) {}
}
