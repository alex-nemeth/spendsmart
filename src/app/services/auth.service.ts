import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { Observable, map } from 'rxjs';
import firebase from 'firebase/compat/app';
import { IBudget } from 'src/shared/interfaces';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(private auth: AngularFireAuth) {}

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
}
