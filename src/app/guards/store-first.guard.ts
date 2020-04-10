import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router } from '@angular/router';
import { StoreComponent } from '../store';

@Injectable({
  providedIn: 'root',
})
export class StoreFirstGuard implements CanActivate {
  constructor(private router: Router) {}

  private firstNavigation = true;

  canActivate(next: ActivatedRouteSnapshot): boolean {
    if (this.firstNavigation) {
      this.firstNavigation = false;
      if (next.component !== StoreComponent) {
        this.router.navigateByUrl('/');
        return false;
      }
    }
    return true;
  }
}
