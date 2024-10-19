import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { AccountService } from '../services/account.service';

@Injectable({
  providedIn: 'root'
})
export class AdminGuard implements CanActivate {

  constructor(private accountService: AccountService, private router: Router) {}

  canActivate(): Observable<boolean> {
    return this.accountService.getCurrentUserRole().pipe(
      map(role => {
        if (role === 'admin') {
          return true;
        } else {
          this.router.navigate(['/not-authorized']);
          return false;
        }
      })
    );
  }
}
