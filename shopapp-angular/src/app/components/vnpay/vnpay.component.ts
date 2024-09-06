
import { Component, OnInit, Inject } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { VnpayService } from '../../services/vnpay.servive';
import { RouterModule } from '@angular/router';

import { HeaderComponent } from '../header/header.component';
import { FooterComponent } from '../footer/footer.component';
import { RecommenderComponent } from '../recommender/recommender.component';
import { CommonModule, DOCUMENT } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { log } from 'node:console';

@Component({
  selector: 'app-vnpay',
  templateUrl: './vnpay.component.html',
  styleUrl: './vnpay.component.scss',
  standalone: true,
  imports: [
    RouterModule
  ],
  host: {
    'ngSkipHydration': ''
  }
})
export class VnpayComponent implements OnInit {
  orderId: string = '';
  totalPrice: number = 0;
  paymentTime: number = 0;
  transaction: string = '';
  bankId: string = '';
  cardType: string = '';
  soa: boolean = false;
  constructor(
    private route: ActivatedRoute,
    private vnpayService: VnpayService,
    @Inject(DOCUMENT) private document: Document) {
  }
  ngOnInit(): void {
    this.route.queryParams.subscribe(params => {
      debugger
      this.orderId = params['vnp_OrderInfo'];
      this.totalPrice = +params['vnp_Amount'] / 100;
      this.paymentTime = params['vnp_PayDate'];
      this.transaction = params['vnp_TransactionNo'];
      this.bankId = params['vnp_BankCode'];
      this.cardType = params['vnp_CardType'];
      this.transaction = params['vnp_TransactionStatus'];
      if (this.transaction == '00') {
        this.soa = true;
      }
      if (this.soa === false) {
        this.vnpayService.cancelOrderForVnpay(this.orderId, this.totalPrice).subscribe(data => {
          console.log(data);
        })
      }
    });
  }
}
