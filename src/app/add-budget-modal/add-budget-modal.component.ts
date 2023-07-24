import {
  Component,
  EventEmitter,
  Output,
  NgModule,
  Input,
} from '@angular/core';
import { BudgetsService } from '../shared/services/budgets.service';
import firebase from 'firebase/compat/app';
import {
  Firestore,
  collection,
  addDoc,
  updateDoc,
  doc,
} from '@angular/fire/firestore';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { IBudget } from 'src/app/shared/models/interfaces';
import { v4 as uuidv4 } from 'uuid';

@Component({
  selector: 'app-add-budget-modal',
  templateUrl: './add-budget-modal.component.html',
})
export class AddBudgetModalComponent {
  constructor(private budgetsService: BudgetsService) {}

  @Input() user!: firebase.User | null;
  @Output() closeModal = new EventEmitter<void>();

  handleSubmit(f: any) {
    this.budgetsService.addBudget(f.value, this.user!.uid);
    this.handleClose();
  }

  handleClose() {
    this.closeModal.emit();
  }
}
