package com.project.shopapp.controllers;


import com.project.shopapp.dtos.VNPayDTO;
import com.project.shopapp.responses.ResponseObject;
import com.project.shopapp.responses.VNPay.VNPayResponse;
import com.project.shopapp.services.VNPayService.IVNPayService;
import io.swagger.v3.oas.models.responses.ApiResponse;
import jakarta.servlet.http.HttpServletRequest;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.*;

import java.net.URI;

@RestController
@RequestMapping("${api.prefix}/")
public class VNPayController {
    @Autowired
    private IVNPayService vnPayService;


    @GetMapping("")
    public String home(){
        return "index";
    }

    @PostMapping("/submitOrder")
    public ResponseEntity<?> submitOrder(@RequestParam("amount") int orderTotal,
                                            @RequestParam("orderInfo") String orderInfo,
                                            HttpServletRequest request){
        String baseUrl = request.getScheme() + "://" + request.getServerName() + ":" + request.getServerPort();
        String vnpayUrl = vnPayService.createOrder(orderTotal, orderInfo, baseUrl);
        URI redirectUri = URI.create(vnpayUrl);
        return ResponseEntity.status(HttpStatus.OK)
                        .body(ResponseObject.builder()
                        .message("Redirect to VNPay")
                        .data(redirectUri)
                        .status(HttpStatus.OK)
                        .build());
    }

    @GetMapping("/vnpay-payment")
    public ResponseEntity<?> GetMapping(HttpServletRequest request, Model model){
        int paymentStatus =vnPayService.orderReturn(request);

        String orderInfo = request.getParameter("vnp_OrderInfo");
        String paymentTime = request.getParameter("vnp_PayDate");
        String transactionId = request.getParameter("vnp_TransactionNo");
        String totalPrice = request.getParameter("vnp_Amount");
        String bankCode = request.getParameter("vnp_BankCode");
        String vnp_CardType = request.getParameter("vnp_CardType");

        model.addAttribute("orderId", orderInfo);
        model.addAttribute("totalPrice", totalPrice);
        model.addAttribute("paymentTime", paymentTime);
        model.addAttribute("transactionId", transactionId);

        VNPayDTO vnpayDTO = VNPayDTO.builder()
                .orderInfo(orderInfo)
                .paymentTime(paymentTime)
                .transactionId(transactionId)
                .totalPrice(totalPrice)
                .bankCode(bankCode)
                .vnp_CardType(vnp_CardType)
                .build();

        VNPayResponse vnpayResponse = VNPayResponse.fromVNPayDTO(vnpayDTO);

        if (paymentStatus == 1)
            return ResponseEntity.status(HttpStatus.OK)
                    .body(ResponseObject.builder()
                            .message("Payment success")
                            .data(vnpayResponse)
                            .status(HttpStatus.OK)
                            .build());
//            return "redirect:" + "http://localhost:4200/order-success";
        else
//            return "redirect:" + "http://localhost:4200/order-fail";
        return ResponseEntity.status(HttpStatus.BAD_REQUEST)
                .body(ResponseObject.builder()
                        .message("Payment failed")
                        .data(vnpayResponse)
                        .status(HttpStatus.BAD_REQUEST)
                        .build());
    }
}
