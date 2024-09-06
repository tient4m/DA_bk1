import { CommonModule } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { OrderDetailAdmin } from '../../models/OrderDetailAdmin';
import { OrderResponse } from '../../responses/order/order.response';
import { OrderService } from '../../services/order.service';
import { ActivatedRoute, Router } from '@angular/router';
import { VnpayService } from '../../services/vnpay.servive';
import { ApiResponse } from '../../responses/api.response';
import { HttpErrorResponse } from '@angular/common/http';
import { HeaderComponent } from "../header/header.component";
import { FooterComponent } from "../footer/footer.component";
import { TokenService } from '../../services/token.service';
import { ProductService } from '../../services/product.service';
import { CommentDto } from '../../dtos/product/comment.dto';

@Component({
  selector: 'app-order-detail-user',
  templateUrl: './order-detail-user.component.html',
  styleUrl: './order-detail-user.component.scss',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    HeaderComponent,
    FooterComponent
  ]
})
export class OrderDetailUserComponent implements OnInit {
  showRatingForm: boolean = false;
  token: string = '';
  stars: number[] = [1, 2, 3, 4, 5];
  ratingUser: number = 0;
  comment: string = '';
  listProducts: number[] = [];
  showRatingFormMap: { [key: number]: boolean } = {};
  showButtonFormMap: { [key: number]: boolean } = {};
  orderDetails_admin: OrderDetailAdmin[] = [];
  isReviewed: boolean = false;
  userId = this.tokenService.getUserId();
  orderId: number = 0;
  orderResponse: OrderResponse = {
    id: 0, // Hoặc bất kỳ giá trị số nào bạn muốn
    user_id: 0,
    fullname: '',
    phone_number: '',
    email: '',
    address: '',
    note: '',
    order_date: new Date(),
    status: '',
    total_money: 0,
    shipping_method: '',
    shipping_address: '',
    shipping_date: new Date(),
    payment_method: '',
    order_details: [],
  };
  private orderService = inject(OrderService);
  constructor(
    private productService: ProductService,
    private route: ActivatedRoute,
    private tokenService: TokenService,
    private router: Router,
    private vnpayService: VnpayService
  ) { }

  ngOnInit(): void {
    this.token = this.tokenService.getToken();
    this.getOrderDetails();
    debugger

  }
  getOrderDetails(): void {
    debugger
    this.orderId = Number(this.route.snapshot.paramMap.get('id'));
    this.orderService.getOrderById(this.orderId).subscribe({
      next: (apiResponse: ApiResponse) => {
        debugger;
        const response = apiResponse.data
        this.orderResponse.id = response.id;
        this.orderResponse.user_id = response.user_id;
        this.orderResponse.fullname = response.fullname;
        this.orderResponse.email = response.email;
        this.orderResponse.phone_number = response.phone_number;
        this.orderResponse.address = response.address;
        this.orderResponse.note = response.note;
        this.orderResponse.total_money = response.total_money;
        if (response.order_date) {
          this.orderResponse.order_date = new Date(response.order_date);
          // this.orderResponse.order_date = new Date(
          //   response.order_date[0],
          //   response.order_date[1] - 1,
          //   response.order_date[2]
          // );
        }
        this.orderDetails_admin = response.order_details;
        // .map((order_detail: any) => {
        //   ;
        //   // .map((order_detail:any) => {
        //   order_detail.thumbnail = `${environment.apiBaseUrl}/products/images/${order_detail.product.thumbnail}`;
        //   // order_detail.number_of_products = order_detail.numberOfProducts
        //   //order_detail.total_money = order_detail.totalMoney
        //   return order_detail;
        // });
        this.orderResponse.payment_method = response.payment_method;
        if (response.shipping_date) {
          this.orderResponse.shipping_date = new Date(
            response.shipping_date[0],
            response.shipping_date[1] - 1,
            response.shipping_date[2]
          );
        }
        this.orderResponse.shipping_method = response.shipping_method;
        this.orderResponse.status = response.status;
        debugger
        this.orderResponse.order_details = response.order_details;
        this.orderResponse.order_details.forEach((order_detail: any) => {
          this.listProducts.push(order_detail.product_id);
          debugger
        });
        debugger
      },
      complete: () => {
        this.listProductsRating();
        console.log('showRatingFormMap:', this.showRatingFormMap);
        console.log('showButtonFormMap:', this.showButtonFormMap);

        debugger;
      },
      error: (error: HttpErrorResponse) => {
        debugger;
        console.error(error?.error?.message ?? '');
      }
    });
  }

  showRatingBox(productId: number) {
    this.showRatingFormMap[productId] = true;
  }
  listProductsRating(): void {
    this.listProducts.forEach((product_id: number) => {
      debugger
      this.showRatingFormMap[product_id] = false;
      this.getIsRate(product_id, this.userId);
    });
  }

  hideRatingBox(productId: number) {
    this.showRatingFormMap[productId] = false;
  }
  submitRating(productId: number, rate: number, comment: string = '') {
    debugger
    const commentDto: CommentDto = {
      product_id: productId,
      user_id: this.tokenService.getUserId(),
      content: comment
    };
    // this.inserRate(productId, rate);
    // this.inserComment(commentDto, this.token);
    this.hideRatingBox(productId);
  }
  inserRate(productId: number, rate: number): void {
    this.productService.insertRate(productId, rate, this.userId).subscribe({
      next: (apiResponse: ApiResponse) => {
        debugger;
        console.log(apiResponse);
      },
      complete: () => {
        debugger;
      },
      error: (error: HttpErrorResponse) => {
        debugger;
        console.error(error?.error?.message ?? '');
      }
    });
  }
  inserComment(commentDto: CommentDto, token: string): void {
    this.productService.insertComment(commentDto, token).subscribe({
      next: (apiResponse: ApiResponse) => {
        debugger;
        console.log(apiResponse);
      },
      complete: () => {
        debugger;
      },
      error: (error: HttpErrorResponse) => {
        debugger;
        console.error(error?.error?.message ?? '');
      }
    });
  }
  getIsRate(productId: number, userId: number): void {
    this.productService.getIsRate(productId, userId).subscribe({
      next: (apiResponse: ApiResponse) => {
        debugger;
        console.log(apiResponse.data);
        this.showButtonFormMap[productId] = !!apiResponse.data;
      },
      complete: () => {
        debugger;
      },
      error: (error: HttpErrorResponse) => {
        debugger;
        console.error(error?.error?.message ?? '');
      }
    });
  }
}
