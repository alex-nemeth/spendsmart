import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { BudgetCardComponent } from './budget-card/budget-card.component';
import { BudgetsService } from './shared/services/budgets.service';
import { AddBudgetModalComponent } from './add-budget-modal/add-budget-modal.component';
import { FormsModule } from '@angular/forms';
import { AddExpenseModalComponent } from './add-expense-modal/add-expense-modal.component';
import { initializeApp, provideFirebaseApp } from '@angular/fire/app';
import { environment } from '../environments/environment';
import { provideFirestore, getFirestore } from '@angular/fire/firestore';
import { AngularFireModule } from '@angular/fire/compat';
import { AngularFireAuthModule } from '@angular/fire/compat/auth';
import { LoginComponent } from './login/login.component';
import { ReactiveFormsModule } from '@angular/forms';
import { ViewExpensesModalComponent } from './view-expenses-modal/view-expenses-modal.component';
import { TotalBudgetCardComponent } from './total-budget-card/total-budget-card.component';
import { DateToLocalePipe } from './shared/pipes/date-to-locale.pipe';
import { RegistrationComponent } from './registration/registration.component';
import { StartupComponent } from './startup/startup.component';

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
