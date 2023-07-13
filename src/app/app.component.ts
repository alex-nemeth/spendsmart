import { Component, OnInit, inject } from '@angular/core';
import { BudgetsService } from './services/budgets.service';
import { Firestore, collection, collectionData } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import firebase from 'firebase/compat/app';
import { AuthService } from './services/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
  firestore: Firestore = inject(Firestore);
  budgets$: Observable<any[]> | null;
  user!: firebase.User | null;

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
