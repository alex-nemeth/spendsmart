import { Component, EventEmitter, Input, Output } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import {
  Firestore,
  collection,
  updateDoc,
  doc,
  arrayUnion,
} from '@angular/fire/firestore';
import { IExpense } from 'src/shared/interfaces';
import * as dayjs from 'dayjs';
import { v4 as uuid } from 'uuid';

@Component({
  selector: 'app-add-expense-modal',
  templateUrl: './add-expense-modal.component.html',
})
export class AddExpenseModalComponent {
  constructor(private auth: AngularFireAuth, private firestore: Firestore) {}
  @Input() id: string = '';

  @Output() closeModal = new EventEmitter<void>();

  handleClose() {
    this.closeModal.emit();
  }

  handleSubmit(f: any) {
    const formValue = f.value;
    this.auth.authState.subscribe((user) => {
      if (user) {
        const uid = user.uid;
        const docInstance = doc(
          this.firestore,
          `users/${user.uid}/budgets/${this.id}`
        );
        const newExpense: Object = {
          id: uuid(),
          date: dayjs().format('DD.MM.YYYY'),
          ...formValue,
        };
        updateDoc(docInstance, {
          expenses: arrayUnion(newExpense),
        })
          .then(() => {
            console.log('Expense Added! ' + JSON.stringify(newExpense));
          })
          .catch((error) => console.error(error));
      }
    });
    this.handleClose();
  }
}
