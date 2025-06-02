package com.abysswear.service;

import com.abysswear.dto.CartItemRequest;
import com.abysswear.dto.CartResponse;
import com.abysswear.entity.Cart;
import com.abysswear.entity.CartItem;
import com.abysswear.entity.Product;
import com.abysswear.entity.User;
import com.abysswear.repository.CartRepository;
import com.abysswear.repository.ProductRepository;
import com.abysswear.repository.UserRepository;
import jakarta.persistence.EntityNotFoundException;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.math.BigDecimal;
import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class CartService {

    private final CartRepository cartRepository;
    private final UserRepository userRepository;
    private final ProductRepository productRepository;

    @Transactional(readOnly = true)
    public CartResponse getCart(String email) {
        User user = userRepository.findByEmail(email)
                .orElseThrow(() -> new EntityNotFoundException("User not found"));

        Cart cart = cartRepository.findByUser(user)
                .orElseGet(() -> createCart(user));

        return mapToResponse(cart);
    }

    @Transactional
    public CartResponse addItem(String email, CartItemRequest request) {
        User user = userRepository.findByEmail(email)
                .orElseThrow(() -> new EntityNotFoundException("User not found"));

        Product product = productRepository.findById(request.getProductId())
                .orElseThrow(() -> new EntityNotFoundException("Product not found"));

        Cart cart = cartRepository.findByUser(user)
                .orElseGet(() -> createCart(user));

        CartItem cartItem = CartItem.builder()
                .cart(cart)
                .product(product)
                .quantity(request.getQuantity())
                .size(request.getSize())
                .color(request.getColor())
                .build();

        cart.addItem(cartItem);
        cartRepository.save(cart);

        return mapToResponse(cart);
    }

    @Transactional
    public CartResponse updateItem(String email, Long itemId, CartItemRequest request) {
        User user = userRepository.findByEmail(email)
                .orElseThrow(() -> new EntityNotFoundException("User not found"));

        Cart cart = cartRepository.findByUser(user)
                .orElseThrow(() -> new EntityNotFoundException("Cart not found"));

        CartItem cartItem = cart.getItems().stream()
                .filter(item -> item.getId().equals(itemId))
                .findFirst()
                .orElseThrow(() -> new EntityNotFoundException("Cart item not found"));

        cartItem.setQuantity(request.getQuantity());
        cartItem.setSize(request.getSize());
        cartItem.setColor(request.getColor());

        cartRepository.save(cart);

        return mapToResponse(cart);
    }

    @Transactional
    public CartResponse removeItem(String email, Long itemId) {
        User user = userRepository.findByEmail(email)
                .orElseThrow(() -> new EntityNotFoundException("User not found"));

        Cart cart = cartRepository.findByUser(user)
                .orElseThrow(() -> new EntityNotFoundException("Cart not found"));

        CartItem cartItem = cart.getItems().stream()
                .filter(item -> item.getId().equals(itemId))
                .findFirst()
                .orElseThrow(() -> new EntityNotFoundException("Cart item not found"));

        cart.removeItem(cartItem);
        cartRepository.save(cart);

        return mapToResponse(cart);
    }

    @Transactional
    public void clearCart(String email) {
        User user = userRepository.findByEmail(email)
                .orElseThrow(() -> new EntityNotFoundException("User not found"));

        Cart cart = cartRepository.findByUser(user)
                .orElseThrow(() -> new EntityNotFoundException("Cart not found"));

        cart.clear();
        cartRepository.save(cart);
    }

    private Cart createCart(User user) {
        Cart cart = Cart.builder()
                .user(user)
                .items(new ArrayList<>())
                .build();
        return cartRepository.save(cart);
    }

    private CartResponse mapToResponse(Cart cart) {
        List<CartResponse.CartItemDto> items = cart.getItems().stream()
                .map(this::mapToCartItemDto)
                .collect(Collectors.toList());

        BigDecimal total = items.stream()
                .map(CartResponse.CartItemDto::getSubtotal)
                .reduce(BigDecimal.ZERO, BigDecimal::add);

        return CartResponse.builder()
                .id(cart.getId())
                .items(items)
                .total(total)
                .build();
    }

    private CartResponse.CartItemDto mapToCartItemDto(CartItem item) {
        BigDecimal subtotal = item.getProduct().getPrice()
                .multiply(BigDecimal.valueOf(item.getQuantity()));

        return CartResponse.CartItemDto.builder()
                .id(item.getId())
                .productId(item.getProduct().getId())
                .productName(item.getProduct().getName())
                .productImage(item.getProduct().getImages().isEmpty() ? null : item.getProduct().getImages().get(0))
                .price(item.getProduct().getPrice())
                .quantity(item.getQuantity())
                .size(item.getSize())
                .color(item.getColor())
                .subtotal(subtotal)
                .build();
    }
} 