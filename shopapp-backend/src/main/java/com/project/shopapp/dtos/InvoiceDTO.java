package com.project.shopapp.dtos;

import com.project.shopapp.models.Product;
import lombok.*;

import java.util.List;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
public class InvoiceDTO {
    private String productName;
    private float price;
    private int quantity;
    private long totalMoney;
}
