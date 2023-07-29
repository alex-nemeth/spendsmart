import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BudgetsService } from './shared/services/budgets.service';
import { AddBudgetModalComponent } from './components/add-budget-modal/add-budget-modal.component';
import { FormsModule } from '@angular/forms';
import { initializeApp, provideFirebaseApp } from '@angular/fire/app';
import { environment } from '../environments/environment';
import { provideFirestore, getFirestore } from '@angular/fire/firestore';
import { AngularFireModule } from '@angular/fire/compat';
import { AngularFireAuthModule } from '@angular/fire/compat/auth';
import { ReactiveFormsModule } from '@angular/forms';
import { DateToLocalePipe } from './shared/pipes/date-to-locale.pipe';

import { HeaderComponent } from './components/header/header.component';
import { BudgetCardComponent } from './components/budget-card/budget-card.component';
import { AddExpenseModalComponent } from './components/add-expense-modal/add-expense-modal.component';
import { LoginComponent } from './components/login/login.component';
import { ViewExpensesModalComponent } from './components/view-expenses-modal/view-expenses-modal.component';
import { TotalBudgetCardComponent } from './components/total-budget-card/total-budget-card.component';
import { RegistrationComponent } from './components/registration/registration.component';
import { StartupComponent } from './components/startup/startup.component';
import { MonthToStringPipe } from './shared/pipes/month-to-string.pipe';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    BudgetCardComponent,
    AddBudgetModalComponent,
    AddExpenseModalComponent,
    LoginComponent,
    ViewExpensesModalComponent,
    TotalBudgetCardComponent,
    DateToLocalePipe,
    RegistrationComponent,
    StartupComponent,
    MonthToStringPipe,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    AngularFireAuthModule,
    AngularFireModule.initializeApp(environment.firebase),
    provideFirebaseApp(() => initializeApp(environment.firebase)),
    provideFirestore(() => getFirestore()),
  ],
  providers: [BudgetsService],
  bootstrap: [AppComponent],
})
export class AppModule {}
