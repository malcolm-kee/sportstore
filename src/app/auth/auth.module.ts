import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AuthComponent } from './auth.component';
import { AuthGuard } from './auth.guard';
import { AuthService } from './auth.service';

@NgModule({
  declarations: [AuthComponent],
  providers: [AuthService, AuthGuard],
  imports: [CommonModule, FormsModule],
  exports: [AuthComponent],
})
export class AuthModule {}
