import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';
import { RestDataSource } from './rest.datasource';
import { Product } from './product.model';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ProductRepository {
  constructor(private dataSource: RestDataSource) {}

  private products$ = this.dataSource.getProducts();
  private categories$ = this.products$.pipe(
    map((products) =>
      products
        .map((product) => product.category)
        .filter(
          (category, index, products) => products.indexOf(category) === index
        )
        .sort()
    )
  );

  getProducts(category?: string): Observable<Product[]> {
    return this.products$.pipe(
      map((products) =>
        category
          ? products.filter((product) => product.category === category)
          : products
      )
    );
  }

  getProduct(id: number): Observable<Product> {
    return this.products$.pipe(
      map((products) => products.find((product) => product.id === id))
    );
  }

  getCategories(): Observable<string[]> {
    return this.categories$;
  }

  saveProduct(product: Product) {
    if (product.id == null || product.id == 0) {
      this.dataSource.saveProduct(product).toPromise();
    } else {
      this.dataSource.updateProduct(product).toPromise();
    }
  }

  deleteProduct(id: number) {
    this.dataSource.deleteProduct(id).toPromise();
  }
}
