package com.abysswear.dto;

import jakarta.validation.constraints.NotBlank;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class OrderRequest {
    @NotBlank(message = "Tên người nhận là bắt buộc")
    private String recipientName;

    @NotBlank(message = "Số điện thoại người nhận là bắt buộc")
    private String recipientPhone;

    @NotBlank(message = "Địa chỉ giao hàng là bắt buộc")
    private String shippingAddress;

    @NotBlank(message = "Thành phố là bắt buộc")
    private String shippingCity;

    @NotBlank(message = "Quận/Huyện là bắt buộc")
    private String shippingDistrict;

    @NotBlank(message = "Phường/Xã là bắt buộc")
    private String shippingWard;

    @NotBlank(message = "Phương thức thanh toán là bắt buộc")
    private String paymentMethod;

    @NotBlank(message = "Phương thức vận chuyển là bắt buộc")
    private String deliveryMethod;
} 