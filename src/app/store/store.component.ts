import { Component, OnInit } from '@angular/core';
import { map } from 'rxjs/operators';
import { Cart, Product, ProductRepository } from '../model';

@Component({
  selector: 'app-store',
  templateUrl: './store.component.html',
  styleUrls: ['./store.component.scss'],
})
export class StoreComponent implements OnInit {
  constructor(
    private productRepository: ProductRepository,
    private cart: Cart
  ) {}

  ngOnInit(): void {}

  selectedCategory: string | undefined;
  productsPerPage = 3;
  currentPage = 0;

  get products$() {
    return this.productRepository.getProducts(this.selectedCategory);
  }
  get displayedProducts$() {
    const start = this.currentPage * this.productsPerPage;
    return this.products$.pipe(
      map((products) => products.slice(start, start + this.productsPerPage))
    );
  }
  categories$ = this.productRepository.getCategories();

  get pageNumbers$() {
    return this.products$.pipe(
      map((products) => Math.ceil(products.length / this.productsPerPage)),
      map((length) => {
        const pages: number[] = [];
        for (let page = 1; page <= length; page++) {
          pages.push(page);
        }
        return pages;
      })
    );
  }

  setCurrentPage(pageNum: number) {
    this.currentPage = pageNum;
  }

  filterCategory(category: string | undefined) {
    this.selectedCategory = category;
    this.setCurrentPage(0);
  }

  changePageSize(pageSize: string) {
    this.productsPerPage = Number(pageSize);
    this.setCurrentPage(0);
  }

  addProductToCart(product: Product) {
    this.cart.addLine(product);
  }
}
