package com.girardi.dscatalog.tests;

import java.time.Instant;

import com.girardi.dscatalog.dto.ProductDTO;
import com.girardi.dscatalog.entities.Category;
import com.girardi.dscatalog.entities.Product;

public class Factory {
    
    public static Product createProduct() {
        Product product = new Product(
            1L,
            "Phone",
            "Good Phone",
            "https://img.com/img.png",
            880.0,
            Instant.parse("2021-11-21T12:37:00Z")
        );

        product.getCategories().add(createCategory());

        return product;
    }

    public static ProductDTO createProductDTO() {
        Product product = createProduct();
        return new ProductDTO(product, product.getCategories());
    }

    public static Category createCategory() {
        return new Category(1L, "Electronics");
    }
}
