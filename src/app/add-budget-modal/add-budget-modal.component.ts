import { Component, EventEmitter, Output, NgModule } from '@angular/core';
import { BudgetsService } from '../services/budgets.service';
import {
  Firestore,
  collection,
  addDoc,
  updateDoc,
} from '@angular/fire/firestore';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { IBudget } from 'src/shared/interfaces';
import { v4 as uuidv4 } from 'uuid';

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
          expenses: [],
        };
        addDoc(collectionInstance, newBudget)
          .then((doc) => {
            console.log('Budget saved successfully: ' + doc.id);
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
