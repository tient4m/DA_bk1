package com.project.shopapp.dtos;

import lombok.*;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
public class VNPayDTO {
    private String orderInfo ;
    private String paymentTime ;
    private String transactionId ;
    private String totalPrice ;
    private String bankCode;
    private String vnp_CardType;
}
