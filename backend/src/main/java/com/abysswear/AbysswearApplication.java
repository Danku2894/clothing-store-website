package com.abysswear;

import io.swagger.v3.oas.annotations.OpenAPIDefinition;
import io.swagger.v3.oas.annotations.info.Info;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

@SpringBootApplication
@OpenAPIDefinition(
    info = @Info(
        title = "Abysswear API",
        version = "1.0",
        description = "API documentation for Abysswear e-commerce platform"
    )
)
public class AbysswearApplication {
    public static void main(String[] args) {
        SpringApplication.run(AbysswearApplication.class, args);
    }
} 