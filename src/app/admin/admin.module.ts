import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { AuthComponent, AuthGuard } from '../auth';
import { AuthModule } from '../auth/auth.module';
import { AdminComponent } from './admin.component';

@NgModule({
  declarations: [AdminComponent],
  imports: [
    CommonModule,
    AuthModule,
    RouterModule.forChild([
      { path: 'auth', component: AuthComponent },
      { path: 'main', component: AdminComponent, canActivate: [AuthGuard] },
      { path: '**', redirectTo: 'auth' },
    ]),
  ],
  exports: [AdminComponent],
})
export class AdminModule {}
