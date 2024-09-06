package com.project.shopapp.repositories;

import com.project.shopapp.models.OrderDetail;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface OrderDetailRepository extends JpaRepository<OrderDetail, Long> {
    List<OrderDetail> findByOrderId(Long orderId);

    @Query(value = "SELECT DISTINCT  ord.isRate " +
            "FROM order_details ord " +
            "join orders as ors " +
            "ON ors.id = ord.order_id " +
            "WHERE " +
            "ors.user_id = :user_id " +
            "and " +
            "ord.product_id = :product_id", nativeQuery = true)
    Integer isRate(@Param("user_id") Long userId,@Param("product_id") Long productId);
}
