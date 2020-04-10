import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule as NgrxStore } from '@ngrx/store';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AppEffects } from './app.effects';
import { counterReducer } from './counter/counte.reducer';
import { CounterModule } from './counter/counter.module';
import { StoreModule } from './store/store.module';
import {
  StoreComponent,
  CheckoutComponent,
  CartDetailComponent,
} from './store';
import { RouterModule } from '@angular/router';
import { StoreFirstGuard } from './guards/store-first.guard';

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    CounterModule,
    StoreModule,
    RouterModule.forRoot([
      {
        path: 'store',
        component: StoreComponent,
        canActivate: [StoreFirstGuard],
      },
      {
        path: 'cart',
        component: CartDetailComponent,
        canActivate: [StoreFirstGuard],
      },
      {
        path: 'checkout',
        component: CheckoutComponent,
        canActivate: [StoreFirstGuard],
      },
      { path: '**', redirectTo: '/store' },
    ]),
    NgrxStore.forRoot({
      count: counterReducer,
    }),
    StoreDevtoolsModule.instrument(),
    EffectsModule.forRoot([AppEffects]),
  ],
  providers: [StoreFirstGuard],
  bootstrap: [AppComponent],
})
export class AppModule {}
