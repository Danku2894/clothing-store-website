package com.abysswear.dto.admin;

import com.abysswear.entity.OrderStatus;
import lombok.Data;

import java.math.BigDecimal;
import java.time.LocalDateTime;
import java.util.List;

@Data
public class OrderResponse {
    private Long id;
    private String orderNumber;
    private String customerName;
    private OrderStatus status;
    private BigDecimal total;
    private int itemCount;
    private LocalDateTime createdAt;
    private List<OrderItemDto> items;

    @Data
    public static class OrderItemDto {
        private Long productId;
        private String productName;
        private int quantity;
        private BigDecimal price;
    }
}
