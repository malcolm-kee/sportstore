import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from './auth.service';

@Component({
  templateUrl: 'auth.component.html',
})
export class AuthComponent {
  public username: string;
  public password: string;
  public errorMessage: string;
  constructor(private router: Router, private authService: AuthService) {}

  authenticate(form: NgForm) {
    if (form.valid) {
      this.authService
        .authenticate(this.username, this.password)
        .subscribe((response) => {
          if (response) {
            this.router.navigateByUrl('/admin/main');
          }
          this.errorMessage = 'Authentication Failed';
        });
    } else {
      this.errorMessage = 'Form Data Invalid';
    }
  }
}
