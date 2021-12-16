package com.girardi.dscatalog.dto;

import java.io.Serializable;
import java.time.Instant;
import java.util.ArrayList;
import java.util.List;
import java.util.Set;

import javax.validation.constraints.NotBlank;
import javax.validation.constraints.PastOrPresent;
import javax.validation.constraints.Positive;

import com.girardi.dscatalog.entities.Category;
import com.girardi.dscatalog.entities.Product;


public class ProductDTO implements Serializable {
    private static final long serialVersionUID = 1L;

    private Long id;

    @NotBlank(message = "Name is required")
    private String name;

    @NotBlank(message = "Description is required")
    private String description;

    private String imgUrl;

    @Positive(message = "Price must be positive")
    private Double price;

    @PastOrPresent(message = "Date must be not in the furture")
    private Instant date;

    private List<CategoryDTO> categories = new ArrayList<>();

    public ProductDTO() {}

    public ProductDTO(
        Long id, 
        String name,
        String description,
        String imgUrl,
        Double price,
        Instant date
    ) {
        this.id = id;
        this.name = name;
        this.description = description;
        this.imgUrl = imgUrl;
        this.price = price;
        this.date = date;
    }

    public ProductDTO(Product entity) {
        this.id = entity.getId();
        this.name = entity.getName();
        this.description = entity.getDescription();
        this.imgUrl = entity.getImgUrl();
        this.price = entity.getPrice();
        this.date = entity.getDate();
    }

    public ProductDTO(Product entity, Set<Category> categories) {
        this(entity);
        categories.forEach(category -> this.categories.add(new CategoryDTO(category)));
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public String getImgUrl() {
        return imgUrl;
    }

    public void setImgUrl(String imgUrl) {
        this.imgUrl = imgUrl;
    }

    public Double getPrice() {
        return price;
    }

    public void setPrice(Double price) {
        this.price = price;
    }

    public Instant getDate() {
        return date;
    }

    public void setDate(Instant date) {
        this.date = date;
    }

    public List<CategoryDTO> getCategories() {
        return categories;
    }

    public void setCategories(List<CategoryDTO> categories) {
        this.categories = categories;
    }
}
