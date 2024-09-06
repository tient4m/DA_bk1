import { Injectable, Inject } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { catchError, Observable, tap, throwError } from 'rxjs';
import { environment } from '../../environments/environment';
import { HttpUtilService } from './http.util.service';
import { DOCUMENT } from '@angular/common';
import { inject } from '@angular/core';
import { ApiResponse } from '../responses/api.response';

@Injectable({
    providedIn: 'root'
})

export class VnpayService {
    private apiVnpay = `${environment.apiBaseUrl}`;
    private http = inject(HttpClient);
    private httpUtilService = inject(HttpUtilService);

    localStorage?: Storage;

    private apiConfig = {
        headers: this.httpUtilService.createHeaders(),
    }

    constructor(
        @Inject(DOCUMENT) private document: Document
    ) {
        this.localStorage = document.defaultView?.localStorage;
    }

    vnpay(amount: number, phoneNumber: String): Observable<ApiResponse> {
        let name = "bookapp";
        debugger
        const url = `${this.apiVnpay}/submitOrder?amount=${amount}&orderInfo=${phoneNumber}`;
        return this.http.post<ApiResponse>(url, null);
    }
    cancelOrderForVnpay(phoneNumber: string, totalMoney: number): Observable<ApiResponse> {
        const url = `${this.apiVnpay}/orders/cancelOrderForVnpay?phoneNumber=${phoneNumber}&totalMoney=${totalMoney}`;
        console.log('URL:', url);  // In ra URL để kiểm tra
        return this.http.put<ApiResponse>(url, null).pipe(
            tap(response => console.log('Response:', response)),
            catchError(error => {
                console.error('Error Message:', error.message);
                console.error('Error Status:', error.status);
                console.error('Error Response:', error.error);
                return throwError(error);
            })
        );
    }

}