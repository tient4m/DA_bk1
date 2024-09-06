import { Injectable } from "@angular/core";
import { environment } from "../../environments/environment";
import { HttpClient, HttpParams } from "@angular/common/http";
import { Observable } from "rxjs";
import { ApiResponse } from "../responses/api.response";

@Injectable({
    providedIn: 'root'
})
export class CommentService {
    private apiBaseUrl = environment.apiBaseUrl;
    constructor(private http: HttpClient) { }

    getCommentByProductId(productId: number, page: number, limit: number): Observable<ApiResponse> {
        const params = new HttpParams()
            .set('productId', productId)
            .set('page', page)
            .set('size', limit);
        return this.http.get<ApiResponse>(`${this.apiBaseUrl}/comments/product`, { params });
    }
}