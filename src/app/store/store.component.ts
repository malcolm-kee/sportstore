import { Component, OnInit } from '@angular/core';
import { ProductRepository } from '../model';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-store',
  templateUrl: './store.component.html',
  styleUrls: ['./store.component.scss'],
})
export class StoreComponent implements OnInit {
  constructor(private productRepository: ProductRepository) {}

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

  filterCategory(category: string | undefined) {
    this.selectedCategory = category;
    this.setCurrentPage(0);
  }

  setCurrentPage(pageNum: number) {
    this.currentPage = pageNum;
  }
}
