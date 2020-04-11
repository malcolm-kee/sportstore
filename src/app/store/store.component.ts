import { Component, OnInit } from '@angular/core';
import { BehaviorSubject, combineLatest } from 'rxjs';
import { map, switchMap } from 'rxjs/operators';
import { Cart, Product, ProductRepository } from '../model';

@Component({
  selector: 'app-store',
  templateUrl: './store.component.html',
  styleUrls: ['./store.component.scss'],
})
export class StoreComponent implements OnInit {
  categories$ = this.productRepository.getCategories();

  categorySubject = new BehaviorSubject<string | undefined>(undefined);
  currentPageSubject = new BehaviorSubject(0);
  pageSizeSubject = new BehaviorSubject(3);

  constructor(
    private productRepository: ProductRepository,
    private cart: Cart
  ) {}

  ngOnInit(): void {}

  products$ = this.categorySubject.pipe(
    switchMap((category) => this.productRepository.getProducts(category))
  );

  displayedProducts$ = combineLatest(
    this.products$,
    this.currentPageSubject,
    this.pageSizeSubject
  ).pipe(
    map(([products, currentPage, pageSize]) => {
      const start = currentPage * pageSize;

      return products.slice(start, start + pageSize);
    })
  );

  pageNumbers$ = combineLatest(this.products$, this.pageSizeSubject).pipe(
    map(([products, pageSize]) => {
      const length = Math.ceil(products.length / pageSize);
      const pages: number[] = [];
      for (let page = 1; page <= length; page++) {
        pages.push(page);
      }
      return pages;
    })
  );

  setCurrentPage(pageNum: number) {
    this.currentPageSubject.next(pageNum);
  }

  filterCategory(category: string | undefined) {
    this.categorySubject.next(category);
    this.setCurrentPage(0);
  }

  changePageSize(pageSize: string) {
    this.pageSizeSubject.next(Number(pageSize));
  }

  addProductToCart(product: Product) {
    this.cart.addLine(product);
  }
}
