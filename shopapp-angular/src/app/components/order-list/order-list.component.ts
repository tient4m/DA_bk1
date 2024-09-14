import { Component, Inject, OnInit } from '@angular/core';
import { HeaderComponent } from '../header/header.component';
import { FooterComponent } from '../footer/footer.component';
import { Location } from '@angular/common';
import { OrderService } from '../../services/order.service';
import { Router, RouterModule } from '@angular/router';
import { ActivatedRoute } from '@angular/router';
import { OrderResponse } from '../../responses/order/order.response';
import { CommonModule, DOCUMENT } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { TokenService } from '../../services/token.service';
import { OrderDTO } from '../../dtos/order/order.dto';
@Component({
  selector: 'app-order-list',
  templateUrl: './order-list.component.html',
  styleUrl: './order-list.component.scss',
  standalone: true,
  imports: [
    RouterModule,
    HeaderComponent,
    FooterComponent,
    CommonModule
  ],


})
export class OrderListComponent implements OnInit {
  orders: OrderResponse[] = [];
  currentPage: number = 0;
  itemsPerPage: number = 5;
  pages: number[] = [];
  totalPages: number = 7;
  keyword: string = "";
  visiblePages: number[] = [];
  localStorage?: Storage;
  userId = this.tokenService.getUserId();
  orderData: OrderDTO = {
    user_id: 0, // Thay bằng user_id thích hợp
    fullname: '', // Khởi tạo rỗng, sẽ được điền từ form
    email: '', // Khởi tạo rỗng, sẽ được điền từ form    
    phone_number: '', // Khởi tạo rỗng, sẽ được điền từ form
    address: '', // Khởi tạo rỗng, sẽ được điền từ form
    status: 'pending',
    note: '', // Có thể thêm trường ghi chú nếu cần
    total_money: 0, // Sẽ được tính toán dựa trên giỏ hàng và mã giảm giá
    payment_method: 'cod', // Mặc định là thanh toán khi nhận hàng (COD)
    shipping_method: 'express', // Mặc định là vận chuyển nhanh (Express)
    coupon_code: '', // Sẽ được điền từ form khi áp dụng mã giảm giá
    cart_items: []
  };
  constructor(
    private orderService: OrderService,
    private router: Router,
    private location: Location,
    private tokenService: TokenService,
    @Inject(DOCUMENT) private document: Document
  ) {
    this.localStorage = document.defaultView?.localStorage;
  }
  ngOnInit(): void {
    debugger;
    // Đặt giá trị currentPage luôn bằng 0 ban đầu
    this.currentPage = 0;

    // Gọi hàm lấy đơn hàng với currentPage đã được thiết lập
    this.getOrdersByUserId(this.userId, this.currentPage, this.itemsPerPage);
  }


  getOrdersByUserId(userId: number, page: number, limit: number) {
    debugger
    this.orderService.getOrdersByUserId(userId, page, limit).subscribe({
      next: (orderResponse: any) => {
        debugger
        this.orders = orderResponse.data;
        this.visiblePages = this.generateVisiblePageArray(this.currentPage, this.totalPages);

      },
      error: (err) => {
        console.log(err);
      }
    });
  }
  generateVisiblePageArray(currentPage: number, totalPages: number): number[] {
    const maxVisiblePages = 5;
    const halfVisiblePages = Math.floor(maxVisiblePages / 2);

    // Bắt đầu từ 0 thay vì 1
    let startPage = Math.max(currentPage - halfVisiblePages, 0);
    let endPage = Math.min(startPage + maxVisiblePages - 1, totalPages - 1);

    if (endPage - startPage + 1 < maxVisiblePages) {
      startPage = Math.max(endPage - maxVisiblePages + 1, 0);
    }

    return new Array(endPage - startPage + 1).fill(0)
      .map((_, index) => startPage + index);
  }
  onPageChange(page: number) {
    debugger;
    this.currentPage = page < 0 ? 0 : page;
    this.localStorage?.setItem('currentOrderAdminPage', String(this.currentPage));
    this.getOrdersByUserId(this.userId, this.currentPage, this.itemsPerPage);
  }
  viewDetails(order: OrderResponse) {
    debugger
    this.router.navigate(['/ordersdetailuser', order.id]);
  }
}
