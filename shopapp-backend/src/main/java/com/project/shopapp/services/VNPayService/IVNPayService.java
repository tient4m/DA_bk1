package com.project.shopapp.services.VNPayService;

import jakarta.servlet.http.HttpServletRequest;

public interface IVNPayService {
    String createOrder(int total, String orderInfor, String urlReturn);

    int orderReturn(HttpServletRequest request);
}
