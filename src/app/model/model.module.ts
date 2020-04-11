import { NgModule } from '@angular/core';
import { Cart } from './cart.model';
import { Order } from './order.model';
import { OrderRepository } from './order.repository';
import { ProductRepository } from './product.repository';
import { RestDataSource } from './rest.datasource';

@NgModule({
  providers: [ProductRepository, RestDataSource, Cart, Order, OrderRepository],
})
export class ModelModule {}
