import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { Observable, map } from 'rxjs';
import firebase from 'firebase/compat/app';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(private auth: AngularFireAuth) {}

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

  registerUser(email: string, password: string) {
    return this.auth.createUserWithEmailAndPassword(email, password);
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
