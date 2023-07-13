import { Component, EventEmitter, Output, NgModule } from '@angular/core';
import { BudgetsService } from '../services/budgets.service';
import { Firestore, collection, addDoc } from '@angular/fire/firestore';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { IBudget } from 'src/shared/interfaces';

@Component({
  selector: 'app-add-budget-modal',
  templateUrl: './add-budget-modal.component.html',
})
export class AddBudgetModalComponent {
  constructor(private firestore: Firestore, private auth: AngularFireAuth) {}

  @Output() closeModal = new EventEmitter<void>();

  handleSubmit(f: any) {
    this.auth.authState.subscribe((user) => {
      if (user) {
        const uid = user.uid;
        const collectionInstance = collection(
          this.firestore,
          `users/${uid}/budgets`
        );
        const newBudget: IBudget = {
          ...f.value,
          amount: 0,
          id: uid,
          expenses: [],
        };
        addDoc(collectionInstance, newBudget)
          .then(() => {
            console.log('Budget saved successfully');
            this.handleClose();
          })
          .catch((error) => {
            console.log(error);
          });
      }
    });
  }

  handleClose() {
    this.closeModal.emit();
  }
}
