import { Component, OnInit, inject } from '@angular/core';
import { BudgetsService } from './services/budgets.service';
import { Firestore, collection, collectionData } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import firebase from 'firebase/compat/app';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
  firestore: Firestore = inject(Firestore);
  budgets$: Observable<any[]>;

  user!: firebase.User | null;

  constructor(private auth: AngularFireAuth) {
    const collectionInstance = collection(this.firestore, 'budgets');
    this.budgets$ = collectionData(collectionInstance);
  }

  ngOnInit(): void {
    this.auth.authState.subscribe((user) => {
      this.user = user;
    });
  }

  addBudgetModal = false;
  addExpenseModal = false;

  toggleAddBudgetModal(): void {
    this.addBudgetModal = !this.addBudgetModal;
  }

  toggleAddExpenseModal(): void {
    this.addExpenseModal = !this.addExpenseModal;
  }
}
