package com.project.shopapp.services.orders;

import com.project.shopapp.dtos.InvoiceDTO;
import com.project.shopapp.dtos.OrderDTO;
import com.project.shopapp.exceptions.DataNotFoundException;
import com.project.shopapp.models.Order;
import com.project.shopapp.responses.order.OrderResponse;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

import java.util.List;

public interface IOrderService {
    Order createOrder(OrderDTO orderDTO) throws Exception;
    Order getOrderById(Long orderId);
    Order updateOrder(Long id, OrderDTO orderDTO) throws DataNotFoundException;
    void deleteOrder(Long orderId);
//    List<OrderResponse> findByUserId(Long userId);

    List<OrderResponse> findByUserId(Long userId, int page, int size);

    Page<Order> getOrdersByKeyword(String keyword, Pageable pageable);

    void cancelOrderForVnpay(String phoneNumber, Float totalMoney);

    List<InvoiceDTO> createInvoice(long orderId);
}
