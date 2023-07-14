import { Component, OnInit, inject } from '@angular/core';
import { BudgetsService } from './services/budgets.service';
import { Firestore, collection, collectionData } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import firebase from 'firebase/compat/app';
import { AuthService } from './services/auth.service';
import * as dayjs from 'dayjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
})
export class AppComponent implements OnInit {
  firestore: Firestore = inject(Firestore);
  budgets$: Observable<any[]> | null;
  user!: firebase.User | null;
  currentBudgetId: string = '';

  constructor(private auth: AngularFireAuth, private authService: AuthService) {
    this.budgets$ = null;
  }

  ngOnInit(): void {
    this.auth.authState.subscribe((user) => {
      if (user) {
        this.user = user;
        const collectionInstance = collection(
          this.firestore,
          `users/${this.user.uid}/budgets`
        );
        this.budgets$ = collectionData(collectionInstance);
      }
      this.budgets$?.subscribe((b) => console.log(b));
    });
  }

  addBudgetModal = false;
  addExpenseModal = false;

  toggleAddBudgetModal(): void {
    this.addBudgetModal = !this.addBudgetModal;
  }

  openAddExpenseModal(budgetId: string): void {
    console.log('click');
    this.currentBudgetId = budgetId;
    this.addExpenseModal = true;
  }

  closeAddExpenseModal(): void {
    this.addExpenseModal = false;
  }
}
