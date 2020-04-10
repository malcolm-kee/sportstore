import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';
import { StaticDataSource } from './static.datasource';

@Injectable({
  providedIn: 'root',
})
export class ProductRepository {
  constructor(private dataSource: StaticDataSource) {}

  private $products = this.dataSource.getProducts();
  private $categories = this.$products.pipe(
    map((products) =>
      products
        .map((product) => product.category)
        .filter(
          (category, index, products) => products.indexOf(category) === index
        )
        .sort()
    )
  );

  getProducts(category?: string) {
    return this.$products.pipe(
      map((products) =>
        typeof category !== 'undefined'
          ? products.filter((p) => p.category === category)
          : products
      )
    );
  }

  getProduct(id: number) {
    return this.$products.pipe(
      map((products) => products.find((product) => product.id === id))
    );
  }

  getCategories() {
    return this.$categories;
  }
}
