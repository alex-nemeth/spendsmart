import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AngularFireAuth } from '@angular/fire/compat/auth';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
})
export class LoginComponent {
  loginForm: FormGroup;

  constructor(private auth: AngularFireAuth, private formBuilder: FormBuilder) {
    this.loginForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
    });
  }

  logIn() {
    const { email, password } = this.loginForm.value;
    this.auth
      .signInWithEmailAndPassword(email, password)
      .then(() => {
        console.log('Sign in successfully');
      })
      .catch((error) => {
        console.error(error);
      });
  }
}
