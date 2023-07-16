import { Component, EventEmitter, Input, Output } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import {
  Firestore,
  collection,
  updateDoc,
  doc,
  arrayUnion,
  deleteDoc,
} from '@angular/fire/firestore';
import firebase from 'firebase/compat/app';
import { IBudget, IExpense } from 'src/shared/interfaces';
import * as dayjs from 'dayjs';
import { v4 as uuid } from 'uuid';
import { BudgetsService } from '../services/budgets.service';

@Component({
  selector: 'app-add-expense-modal',
  templateUrl: './add-expense-modal.component.html',
})
export class AddExpenseModalComponent {
  constructor(private budgetsService: BudgetsService) {}
  @Input() user!: firebase.User | null;
  @Input() budget!: IBudget;
  @Output() closeModal = new EventEmitter<void>();

  handleClose() {
    this.closeModal.emit();
  }

  handleSubmit(f: any) {
    if (this.user)
      this.budgetsService.addExpense(f.value, this.budget, this.user.uid);
    this.handleClose();
  }
}
