import { Component, OnInit, Inject } from '@angular/core';
import { Product } from '../../models/product';
import { Router } from '@angular/router';
import { environment } from '../../../environments/environment';
import { ProductService } from '../../services/product.service';
import { TokenService } from '../../services/token.service';
import { ApiResponse } from '../../responses/api.response';
import { HttpErrorResponse } from '@angular/common/http';

import { CommonModule, DOCUMENT } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-recommender',
  templateUrl: './recommender.component.html',
  styleUrls: ['./recommender.component.scss'],
  standalone: true,
  imports: [
    CommonModule,
    FormsModule
  ]
})
export class RecommenderComponent implements OnInit {
  currentGroupIndex: number = 0;
  token: string = '';
  products: Product[] = [];
  productGroups: Product[][] = [];
  apiBaseUrl = environment.apiBaseUrl;

  constructor(
    private productService: ProductService,
    private router: Router,
    private tokenService: TokenService
  ) { }

  ngOnInit() {
    this.token = this.tokenService.getToken();
    this.loadRecommendedProducts();
  }

  loadRecommendedProducts() {
    const service = this.token ? this.productService.getRecommended(this.token) : this.productService.getRecommendedForGuest();
    service.subscribe({
      next: (apiResponse: ApiResponse) => {
        debugger
        this.products = apiResponse.data.map((product: Product) => {
          return {
            ...product,
            url: `${this.apiBaseUrl}/products/images/${product.thumbnail}`
          };
        });
        this.groupProducts();
      },
      error: (error: HttpErrorResponse) => {
        console.error(error?.error?.message ?? '');
      }
    });
  }

  groupProducts() {
    debugger
    const groupSize = 4;
    this.productGroups = [];
    for (let i = 0; i < this.products.length; i += groupSize) {
      this.productGroups.push(this.products.slice(i, i + groupSize));
    }
  }
  handleGroupAction(groupIndex: number) {
    const group = this.productGroups[groupIndex];
  }

  previousGroup() {
    if (this.currentGroupIndex > 0) {
      this.currentGroupIndex--;
    }
  }

  nextGroup() {
    if (this.currentGroupIndex < this.productGroups.length - 1) {
      this.currentGroupIndex++;
    }
  }

  // Bổ sung logic để xác định khi nào nút 'Previous' và 'Next' nên hiển thị hoặc ẩn
  showPrevious(): boolean {
    return this.currentGroupIndex > 0;
  }

  showNext(): boolean {
    return this.currentGroupIndex < this.productGroups.length - 1;
  }
  onProductClick(productId: number) {
    debugger;
    // Điều hướng đến trang detail-product với productId là tham số
    this.router.navigate(['/products', productId]);
  }
}
