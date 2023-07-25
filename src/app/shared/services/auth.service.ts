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

  logIn(email: string, password: string) {
    this.auth
      .signInWithEmailAndPassword(email, password)
      .then(() => {
        console.log('Sign in successfully');
      })
      .catch((error) => {
        console.error(error);
      });
  }

  async registerUser(email: string, password: string) {
    try {
      const userCredential = await this.auth.createUserWithEmailAndPassword(
        email,
        password
      );
      const uid = userCredential.user?.uid;
      this.budgetsService.createUserDatabase(uid!, email);
    } catch (error) {
      console.log(error);
    }
    // return this.auth
    //   .createUserWithEmailAndPassword(email, password)
    //   .then((user) => {
    //     const email = user.credential.;
    //     this.getCurrentUserUID().subscribe(uid => this.budgetsService.addNewUser(uid))
    //   });
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
