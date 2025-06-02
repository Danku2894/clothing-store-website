package com.abysswear.dto;

import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotNull;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class CartItemRequest {
    @NotNull(message = "ID sản phẩm là bắt buộc")
    private Long productId;

    @NotNull(message = "Số lượng là bắt buộc")
    @Min(value = 1, message = "Số lượng phải lớn hơn 0")
    private Integer quantity;

    @NotNull(message = "Kích thước là bắt buộc")
    private String size;

    @NotNull(message = "Màu sắc là bắt buộc")
    private String color;
} 