import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { Observable, map } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(private auth: AngularFireAuth) {}

  getCurrentUserUID(): Observable<string | null> {
    return this.auth.authState.pipe(
      map((user) => {
        if (user) return user.uid;
        else return null;
      })
    );
  }
}
