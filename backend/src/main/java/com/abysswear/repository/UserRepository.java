package com.abysswear.repository;

import com.abysswear.entity.User;
import com.abysswear.entity.UserRole;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface UserRepository extends JpaRepository<User, Long> {
    Optional<User> findByEmail(String email);
    boolean existsByEmail(String email);
    Page<User> findByRole(UserRole role, Pageable pageable);
    Page<User> findByActive(boolean active, Pageable pageable);
    Page<User> findByRoleAndActive(UserRole role, boolean active, Pageable pageable);
}