import { Component, EventEmitter, Input, Output } from '@angular/core';
import { IBudget, IExpense } from 'src/shared/interfaces';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { Firestore, doc, deleteDoc } from '@angular/fire/firestore';
import { arrayRemove, updateDoc } from 'firebase/firestore';
import { ChangeDetectorRef } from '@angular/core';
import firebase from 'firebase/compat/app';
import { BudgetsService } from '../services/budgets.service';

@Component({
  selector: 'app-view-expenses-modal',
  templateUrl: './view-expenses-modal.component.html',
})
export class ViewExpensesModalComponent {
  constructor(
    private budgetsService: BudgetsService,
    private auth: AngularFireAuth,
    private firestore: Firestore,
    private changeDetector: ChangeDetectorRef
  ) {}

  @Input() user!: firebase.User | null;
  @Input() budget!: IBudget;

  @Output() closeModal = new EventEmitter<void>();

  handleClose() {
    this.closeModal.emit();
  }

  deleteBudget() {
    this.budgetsService.deleteBudget(this.budget.id, this.user!.uid);
    this.handleClose();
  }

  deleteExpense(expense: IExpense) {
    const selectedBudgetId = this.budget.id;
    const selectedExpense = expense;
    this.auth.authState.subscribe((user) => {
      if (user) {
        const docInstance = doc(
          this.firestore,
          `users/${user.uid}/budgets/${selectedBudgetId}`
        );
        updateDoc(docInstance, {
          expenses: arrayRemove(selectedExpense),
        }).then(() => {
          console.log('Expense deleted!');
          this.changeDetector.detectChanges();
        });
      }
    });
  }
}
