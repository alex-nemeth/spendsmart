import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { BudgetCardComponent } from './budget-card/budget-card.component';
import { BudgetsService } from './services/budgets.service';
import { AddBudgetModalComponent } from './add-budget-modal/add-budget-modal.component';
import { FormsModule } from '@angular/forms';
import { AddExpenseModalComponent } from './add-expense-modal/add-expense-modal.component';
import { initializeApp, provideFirebaseApp } from '@angular/fire/app';
import { environment } from '../environments/environment';
import { provideFirestore, getFirestore } from '@angular/fire/firestore';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    BudgetCardComponent,
    AddBudgetModalComponent,
    AddExpenseModalComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    provideFirebaseApp(() => initializeApp(environment.firebase)),
    provideFirestore(() => getFirestore()),
  ],
  providers: [BudgetsService],
  bootstrap: [AppComponent],
})
export class AppModule {}
