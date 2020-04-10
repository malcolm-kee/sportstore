import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { StoreComponent } from './store.component';

@NgModule({
  imports: [CommonModule, FormsModule],
  declarations: [StoreComponent],
  exports: [StoreComponent],
})
export class StoreModule {}
