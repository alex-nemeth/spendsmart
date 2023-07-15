import { Component, EventEmitter, Input, Output } from '@angular/core';
import { IBudget } from 'src/shared/interfaces';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { Firestore, doc, deleteDoc } from '@angular/fire/firestore';

@Component({
  selector: 'app-view-expenses-modal',
  templateUrl: './view-expenses-modal.component.html',
})
export class ViewExpensesModalComponent {
  constructor(private auth: AngularFireAuth, private firestore: Firestore) {}

  @Input() id: string = '';
  @Input() budget: IBudget = {
    id: '',
    title: '',
    amount: 0,
    max: 0,
    expenses: [],
  };

  @Output() closeModal = new EventEmitter<void>();

  handleClose() {
    console.log('handleCLose triggerred');
    this.closeModal.emit();
  }

  deleteBudget() {
    this.auth.authState.subscribe((user) => {
      if (user) {
        const docInstance = doc(
          this.firestore,
          `users/${user.uid}/budgets/${this.id}`
        );
        deleteDoc(docInstance).then(() => console.log('Budget deleted'));
      }
    });
  }
}
