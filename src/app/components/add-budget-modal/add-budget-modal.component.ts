import { Component, EventEmitter, Output, Input } from '@angular/core';
import { BudgetsService } from '../../shared/services/budgets.service';
import firebase from 'firebase/compat/app';

@Component({
  selector: 'app-add-budget-modal',
  templateUrl: './add-budget-modal.component.html',
})
export class AddBudgetModalComponent {
  constructor(private budgetsService: BudgetsService) {}

  @Input() user!: firebase.User | null;
  @Output() closeModal = new EventEmitter<void>();

  handleSubmit(f: any) {
    this.budgetsService.addBudget(f.value, this.user!.uid);
    this.handleClose();
  }

  handleClose() {
    this.closeModal.emit();
  }
}
