import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { Observable, map } from 'rxjs';
import firebase from 'firebase/compat/app';
import { BudgetsService } from './budgets.service';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(
    private auth: AngularFireAuth,
    private budgetsService: BudgetsService
  ) {}

  async logIn(email: string, password: string): Promise<boolean> {
    try {
      await this.auth.signInWithEmailAndPassword(email, password);
      return true;
    } catch (error) {
      return false;
    }
  }

  async registerUser(email: string, password: string): Promise<boolean> {
    try {
      const userCredential = await this.auth.createUserWithEmailAndPassword(
        email,
        password
      );
      const uid = userCredential.user?.uid;
      this.budgetsService.createUserDatabase(uid!, email);
      return true;
    } catch (error) {
      console.log(error);
      return false;
    }
  }

  async isEmailRegistered(email: string): Promise<boolean> {
    try {
      const signInMethods = await this.auth.fetchSignInMethodsForEmail(email);
      return signInMethods.length > 0;
    } catch (error) {
      return false;
    }
  }

  getCurrentUser(): Observable<firebase.User | null> {
    return this.auth.authState;
  }

  getCurrentUserUID(): Observable<string | null> {
    return this.auth.authState.pipe(
      map((user) => {
        if (user) return user.uid;
        else return null;
      })
    );
  }

  logOut() {
    this.auth
      .signOut()
      .then(() => console.log('Signed out'))
      .catch((error) => console.error(error));
  }
}
