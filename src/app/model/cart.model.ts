import { Injectable } from '@angular/core';
import { Product } from './product.model';

@Injectable({
  providedIn: 'root',
})
export class Cart {
  public lines: CartLine[] = [];

  get itemCount() {
    return this.lines.length;
  }

  get cartPrice(): number {
    return this.lines.reduce((total, item) => total + item.lineTotal, 0);
  }

  addLine(product: Product, quantity: number = 1) {
    let line = this.lines.find((line) => line.product.id == product.id);
    if (line != undefined) {
      line.quantity += quantity;
    } else {
      this.lines.push(new CartLine(product, quantity));
    }
  }

  updateQuantity(product: Product, quantity: number) {
    let line = this.lines.find((line) => line.product.id == product.id);
    if (line != undefined) {
      line.quantity = Number(quantity);
    }
  }

  removeLine(id: number) {
    let index = this.lines.findIndex((line) => line.product.id == id);
    this.lines.splice(index, 1);
  }

  clear() {
    this.lines = [];
  }
}

export class CartLine {
  constructor(public product: Product, public quantity: number) {}
  get lineTotal() {
    return this.quantity * this.product.price;
  }
}
