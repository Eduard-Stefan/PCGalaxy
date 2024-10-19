import { Component } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { AccountService } from '../services/account.service';
import { Login } from '../models/login.model';
import { AppComponent } from '../app.component';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  email: string = '';
  password: string = '';
  rememberMe: boolean = false;

  constructor(
    private accountService: AccountService,
    private snackBar: MatSnackBar,
    private router: Router
  ) {}

  onSubmit(): void {
    const trimmedEmail: string = this.email.trim().replace(/\s+/g, ' ');
    const trimmedPassword: string = this.password.trim().replace(/\s+/g, ' ');

    const model: Login = {
      email: trimmedEmail,
      password: trimmedPassword,
      rememberMe: this.rememberMe,
    };

    this.accountService.login(model).subscribe({
      next: () => {
        this.accountService.getCurrentUser().subscribe({ 
          next: (user) => {
            AppComponent.currentUser = user;
            AppComponent.signedIn = true;
            this.accountService.getCurrentUserRole().subscribe({
              next: (role) => {
                if (role === 'admin') {
                  AppComponent.isAdmin = true;
                }
                else {
                  AppComponent.isAdmin = false;
                }
                this.router.navigate(['/'], { queryParams: { message: 'Login successful' } });
              },
              error: (err) => {
                console.error(err);
              },
            });
          },
          error: (err) => {
            console.error(err);
          },
        });
      },
      error: (err) => {
        console.error(err);
        this.snackBar.open('Login failed, email or password incorrect', 'Close', {
          duration: 3000,
        });
      },
    });
  }
}
