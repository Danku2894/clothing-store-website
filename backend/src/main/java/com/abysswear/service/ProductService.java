package com.abysswear.service;

import com.abysswear.dto.ProductRequest;
import com.abysswear.dto.ProductResponse;
import com.abysswear.entity.Product;
import com.abysswear.repository.ProductRepository;
import jakarta.persistence.EntityNotFoundException;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
@RequiredArgsConstructor
public class ProductService {

    private final ProductRepository productRepository;

    public Page<ProductResponse> getAllProducts(String category, String collection, Pageable pageable) {
        Page<Product> products;
        if (category != null) {
            products = productRepository.findByCategoryAndIsActiveTrue(category, pageable);
        } else if (collection != null) {
            products = productRepository.findByCollectionAndIsActiveTrue(collection, pageable);
        } else {
            products = productRepository.findByIsActiveTrue(pageable);
        }
        return products.map(this::mapToResponse);
    }

    public ProductResponse getProduct(Long id) {
        return productRepository.findById(id)
                .map(this::mapToResponse)
                .orElseThrow(() -> new EntityNotFoundException("Product not found"));
    }

    @Transactional
    public ProductResponse createProduct(ProductRequest request) {
        Product product = Product.builder()
                .name(request.getName())
                .description(request.getDescription())
                .price(request.getPrice())
                .images(request.getImages())
                .sizes(request.getSizes())
                .colors(request.getColors())
                .category(request.getCategory())
                .collection(request.getCollection())
                .stock(request.getStock())
                .isActive(true)
                .build();

        return mapToResponse(productRepository.save(product));
    }

    @Transactional
    public ProductResponse updateProduct(Long id, ProductRequest request) {
        Product product = productRepository.findById(id)
                .orElseThrow(() -> new EntityNotFoundException("Product not found"));

        product.setName(request.getName());
        product.setDescription(request.getDescription());
        product.setPrice(request.getPrice());
        product.setImages(request.getImages());
        product.setSizes(request.getSizes());
        product.setColors(request.getColors());
        product.setCategory(request.getCategory());
        product.setCollection(request.getCollection());
        product.setStock(request.getStock());

        return mapToResponse(productRepository.save(product));
    }

    @Transactional
    public void deleteProduct(Long id) {
        Product product = productRepository.findById(id)
                .orElseThrow(() -> new EntityNotFoundException("Product not found"));
        product.setIsActive(false);
        productRepository.save(product);
    }

    public List<String> getCategories() {
        return productRepository.findDistinctCategories();
    }

    public List<String> getCollections() {
        return productRepository.findDistinctCollections();
    }

    private ProductResponse mapToResponse(Product product) {
        return ProductResponse.builder()
                .id(product.getId())
                .name(product.getName())
                .description(product.getDescription())
                .price(product.getPrice())
                .images(product.getImages())
                .sizes(product.getSizes())
                .colors(product.getColors())
                .category(product.getCategory())
                .collection(product.getCollection())
                .stock(product.getStock())
                .isActive(product.getIsActive())
                .createdAt(product.getCreatedAt())
                .updatedAt(product.getUpdatedAt())
                .build();
    }
} 