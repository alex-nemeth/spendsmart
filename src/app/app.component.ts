import { Component, OnInit, inject } from '@angular/core';
import { BudgetsService } from './services/budgets.service';
import { Firestore, collection, collectionData } from '@angular/fire/firestore';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  firestore: Firestore = inject(Firestore);
  budgets$: Observable<any[]>;

  constructor() {
    const collectionInstance = collection(this.firestore, 'budgets');
    this.budgets$ = collectionData(collectionInstance);
  }

  addBudgetModal = true;
  addExpenseModal = false;

  toggleAddBudgetModal(): void {
    this.addBudgetModal = !this.addBudgetModal;
  }

  toggleAddExpenseModal(): void {
    this.addExpenseModal = !this.addExpenseModal;
  }
}
