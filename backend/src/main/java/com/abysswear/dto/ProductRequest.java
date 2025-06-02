package com.abysswear.dto;

import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.math.BigDecimal;
import java.util.List;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class ProductRequest {
    @NotBlank(message = "Tên sản phẩm là bắt buộc")
    private String name;

    @NotBlank(message = "Mô tả sản phẩm là bắt buộc")
    private String description;

    @NotNull(message = "Giá sản phẩm là bắt buộc")
    @Min(value = 0, message = "Giá sản phẩm phải lớn hơn hoặc bằng 0")
    private BigDecimal price;

    private List<String> images;
    private List<String> sizes;
    private List<String> colors;

    @NotBlank(message = "Danh mục sản phẩm là bắt buộc")
    private String category;

    @NotBlank(message = "Bộ sưu tập là bắt buộc")
    private String collection;

    @NotNull(message = "Số lượng tồn kho là bắt buộc")
    @Min(value = 0, message = "Số lượng tồn kho phải lớn hơn hoặc bằng 0")
    private Integer stock;
} 