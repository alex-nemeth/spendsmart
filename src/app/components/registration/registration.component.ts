import { Component, EventEmitter, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/shared/services/auth.service';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
})
export class RegistrationComponent {
  registrationForm: FormGroup;
  error: boolean = false;
  errorMessage: string = '';

  constructor(
    private authService: AuthService,
    private formBuilder: FormBuilder,
    private router: Router
  ) {
    this.registrationForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      confirmPassword: ['', [Validators.required, Validators.minLength(6)]],
    });
  }

  register() {
    const { email, password, confirmPassword } = this.registrationForm.value;
    if (!this.passwordMatchCheck(password, confirmPassword)) {
      if (!this.authService.isEmailRegistered(email)) {
        this.authService.registerUser(email, password);
        this.router.navigate(['']);
      } else {
        this.error = true;
        this.errorMessage = 'Email already in use.';
      }
    }
  }

  passwordMatchCheck(password: string, confirmPassword: string): boolean {
    if (password !== confirmPassword) {
      this.error = true;
      this.errorMessage = 'Passwords do not match.';
      return true;
    } else {
      this.error = false;
      return false;
    }
  }
}
