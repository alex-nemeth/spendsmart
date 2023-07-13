import { Component, EventEmitter, Input, Output } from '@angular/core';
import { BudgetsService } from '../services/budgets.service';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import {
  Firestore,
  collection,
  updateDoc,
  doc,
  arrayUnion,
} from '@angular/fire/firestore';
import { IExpense } from 'src/shared/interfaces';

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
    console.log(f.value);
    this.auth.authState.subscribe((user) => {
      if (user) {
        const uid = user.uid;
        const docInstance = doc(
          this.firestore,
          `users/${uid}/budgets/${this.id}`
        );
        console.log('UserID: ' + uid + 'Budget ID: ' + this.id + f.value);
        const newExpense = {
          ...f.value,
        };
        updateDoc(docInstance, {
          expenses: arrayUnion(newExpense),
        })
          .then(() => console.log('Expense Added!'))
          .catch((error) => console.error(error));
      }
    });
    this.handleClose();
  }
}
