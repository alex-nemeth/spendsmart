import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import * as dayjs from 'dayjs';
import firebase from 'firebase/compat/app';
import { IBudget } from 'src/app/shared/models/interfaces';
import { BudgetsService } from 'src/app/shared/services/budgets.service';

@Component({
  selector: 'app-add-expense-modal',
  templateUrl: './add-expense-modal.component.html',
})
export class AddExpenseModalComponent implements OnInit {
  constructor(private budgetsService: BudgetsService) {}
  @Input() user!: firebase.User | null;
  @Input() budget!: IBudget;
  @Output() closeModal = new EventEmitter<void>();
  today = dayjs().format('YYYY-MM-DD');

  ngOnInit(): void {
    const dateInput = document.getElementById('date') as HTMLInputElement;
    console.log(dateInput.value);
    dateInput.value = dayjs().format('YYYY-MM-DD');
    console.log(dateInput.value);
  }

  handleClose() {
    this.closeModal.emit();
  }

  handleSubmit(f: any) {
    if (this.user)
      this.budgetsService.addExpense(f.value, this.budget, this.user.uid);
    this.handleClose();
  }
}
