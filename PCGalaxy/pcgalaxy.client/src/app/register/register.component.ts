import { Component } from '@angular/core';
import { AccountService } from '../services/account.service';
import { Register } from '../models/register.model';
import { MatSnackBar } from '@angular/material/snack-bar';
import * as validator from 'validator';
import { parsePhoneNumberFromString } from 'libphonenumber-js';
import { Router } from '@angular/router';
import { AppComponent } from '../app.component';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrl: './register.component.css',
})
export class RegisterComponent {
  firstName: string = '';
  lastName: string = '';
  email: string = '';
  phoneNumber: string = '';
  password: string = '';
  confirmPassword: string = '';

  constructor(
    private accountService: AccountService,
    private snackBar: MatSnackBar,
    private router: Router
  ) {}

  onSubmit(): void {
    const trimmedFirstName: string = this.firstName.trim().replace(/\s+/g, ' ');
    const trimmedLastName: string = this.lastName.trim().replace(/\s+/g, ' ');
    const trimmedEmail: string = this.email.trim().replace(/\s+/g, ' ');
    const trimmedPhoneNumber: string = this.phoneNumber.trim().replace(/\s+/g, ' ');
    const trimmedPassword: string = this.password.trim().replace(/\s+/g, ' ');
    const trimmedConfirmPassword: string = this.confirmPassword.trim().replace(/\s+/g, ' ');

    const model: Register = {
      firstName: trimmedFirstName,
      lastName: trimmedLastName,
      email: trimmedEmail,
      phoneNumber: trimmedPhoneNumber,
      password: trimmedPassword,
      confirmPassword: trimmedConfirmPassword,
    };

    this.accountService.register(model).subscribe({
      next: () => {
        this.accountService.getCurrentUser().subscribe({ 
          next: (user) => {
            AppComponent.currentUser = user;
            AppComponent.signedIn = true;
            AppComponent.isAdmin = false;
            this.router.navigate(['/'], { queryParams: { message: 'Registration successful' } });
          },
          error: (err) => {
            console.error(err);
          },
        });
      },
      error: (err) => {
        console.error(err);
        this.snackBar.open('Registration failed, email already exists', 'Close', {
          duration: 3000,
        });
      },
    });
  }

  isFieldWhitespace(field: string): boolean {
    return field.length > 0 && field.trim().length === 0;
  }

  isFieldTooLong(field: string, maxLength: number): boolean {
    return field.length > maxLength;
  }

  isEmailInvalid(email: string): boolean {
    if (email.length === 0) {
      return false;
    }
    return !validator.isEmail(email);
  }

  isPhoneNumberInvalid(phoneNumber: string): boolean {
    if (phoneNumber.length === 0) {
      return false;
    }
    const phoneNumberObj = parsePhoneNumberFromString(phoneNumber);
    return !phoneNumberObj || !phoneNumberObj.isValid();
  }

  isPasswordLongEnough(password: string): boolean {
    return password.length >= 6 || password.length === 0;
  }

  hasNonAlphanumericCharacter(password: string): boolean {
    return /\W/.test(password) || password.length === 0;
  }

  hasDigit(password: string): boolean {
    return /\d/.test(password) || password.length === 0;
  }

  hasLowercaseLetter(password: string): boolean {
    return /[a-z]/.test(password) || password.length === 0;
  }

  hasUppercaseLetter(password: string): boolean {
    return /[A-Z]/.test(password) || password.length === 0;
  }

  isPasswordMismatch(password: string, confirmPassword: string): boolean {
    return password !== confirmPassword && confirmPassword.length > 0;
  }
}
