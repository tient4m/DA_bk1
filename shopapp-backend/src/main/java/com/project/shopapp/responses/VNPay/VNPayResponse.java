package com.project.shopapp.responses.VNPay;

import com.fasterxml.jackson.annotation.JsonProperty;
import com.project.shopapp.dtos.VNPayDTO;
import lombok.*;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class VNPayResponse {
    @JsonProperty("orderInfo")
    private String orderInfo ;

    @JsonProperty("paymentTime")
    private String paymentTime ;

    @JsonProperty("transactionId")
    private String transactionId ;

    @JsonProperty("totalPrice")
    private String totalPrice ;

    @JsonProperty("bankCode")
    private String bankCode;

    @JsonProperty("vnp_CardType")
    private String vnp_CardType;

    public static VNPayResponse fromVNPayDTO(VNPayDTO vnpayDTO) {
        return VNPayResponse.builder()
                .orderInfo(vnpayDTO.getOrderInfo())
                .paymentTime(vnpayDTO.getPaymentTime())
                .transactionId(vnpayDTO.getTransactionId())
                .totalPrice(vnpayDTO.getTotalPrice())
                .bankCode(vnpayDTO.getBankCode())
                .vnp_CardType(vnpayDTO.getVnp_CardType())
                .build();
    }
}
