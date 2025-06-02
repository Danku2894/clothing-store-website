package com.abysswear.repository;

import com.abysswear.entity.Product;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;

public interface ProductRepository extends JpaRepository<Product, Long> {
    Page<Product> findByIsActiveTrue(Pageable pageable);
    Page<Product> findByCategoryAndIsActiveTrue(String category, Pageable pageable);
    Page<Product> findByCollectionAndIsActiveTrue(String collection, Pageable pageable);
    
    @Query("SELECT DISTINCT p.category FROM Product p WHERE p.isActive = true")
    List<String> findDistinctCategories();
    
    @Query("SELECT DISTINCT p.collection FROM Product p WHERE p.isActive = true")
    List<String> findDistinctCollections();
} 