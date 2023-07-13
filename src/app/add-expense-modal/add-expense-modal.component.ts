import { Component, EventEmitter, Input, Output } from '@angular/core';
import { BudgetsService } from '../services/budgets.service';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { Firestore } from '@angular/fire/firestore';

@Component({
  selector: 'app-add-expense-modal',
  templateUrl: './add-expense-modal.component.html',
})
export class AddExpenseModalComponent {
  constructor(
    private budgetsService: BudgetsService,
    private auth: AngularFireAuth,
    private firestore: Firestore
  ) {}
  @Input() id: string = '';
  description: string = '';
  amount: number = 0;

  @Output() closeModal = new EventEmitter<void>();

  handleClose() {
    this.closeModal.emit();
  }

  handleSubmit(f: any) {
    this.auth.authState.subscribe((user) => {
      if (user) {
        const uid = user.uid;
        // const collectionInstance = collection(this.firestore, `users/${uid}/budgets/`)
      }
    });

    // this.budgetsService.addExpense(this.description, this.amount, this.id);
    this.handleClose();
  }
}
