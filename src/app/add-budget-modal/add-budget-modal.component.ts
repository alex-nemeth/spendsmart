import { Component, EventEmitter, Output, NgModule } from '@angular/core';
import { BudgetsService } from '../services/budgets.service';
import { Firestore, collection, addDoc } from '@angular/fire/firestore';

@Component({
  selector: 'app-add-budget-modal',
  templateUrl: './add-budget-modal.component.html',
})
export class AddBudgetModalComponent {
  constructor(private firestore: Firestore) {}

  @Output() closeModal = new EventEmitter<void>();

  handleSubmit(f: any) {
    const collectionInstance = collection(this.firestore, 'budgets');
    const newBudget = { ...f.value, amount: 0 };
    addDoc(collectionInstance, newBudget)
      .then(() => {
        console.log('Budget saved successfully');
        this.handleClose();
      })
      .catch((error) => {
        console.log(error);
      });
  }

  handleClose() {
    this.closeModal.emit();
  }
}
