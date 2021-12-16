package com.girardi.dscatalog.services;

import java.util.Arrays;
import java.util.List;

import javax.persistence.EntityNotFoundException;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.dao.DataIntegrityViolationException;
import org.springframework.dao.EmptyResultDataAccessException;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.stereotype.Service;

import com.girardi.dscatalog.dto.CategoryDTO;
import com.girardi.dscatalog.dto.ProductDTO;
import com.girardi.dscatalog.entities.Category;
import com.girardi.dscatalog.entities.Product;
import com.girardi.dscatalog.repositories.CategoryRepository;
import com.girardi.dscatalog.repositories.ProductRepository;
import com.girardi.dscatalog.services.exceptions.DataBaseException;
import com.girardi.dscatalog.services.exceptions.ResourceNotFoundException;

@Service
public class ProductService {
    
    @Autowired
    private ProductRepository repository;

    @Autowired
    private CategoryRepository categoryRepository;
    
    @Transactional(readOnly = true)
    public Page<ProductDTO> findAllPaged(Long categoryId, String name, Pageable pageable) {
        List<Category> categories = 
            (categoryId == 0L) ? null : Arrays.asList(categoryRepository.getOne(categoryId));
        Page<Product> page = repository.find(categories, name, pageable);
        repository.findProductsWithCategories(page.getContent());
        return page.map(x -> new ProductDTO(x, x.getCategories()));
    }

    @Transactional(readOnly = true)
    public ProductDTO findById(Long id) {
        Product entity = repository.findById(id).orElseThrow(
            () -> new ResourceNotFoundException("Product not found!"));
        
        return new ProductDTO(entity, entity.getCategories());
    }

    @Transactional
    public ProductDTO insert(ProductDTO dto) {
        Product entity = new Product();
       
        copyDtoToEntity(dto, entity);
       
        entity = repository.save(entity);

        return new ProductDTO(entity);
    }

    @Transactional
    public ProductDTO update(ProductDTO dto, Long id) {
        try {
            Product entity = repository.getOne(id);

            copyDtoToEntity(dto, entity);
            
            entity = repository.save(entity);
            
            return new ProductDTO(entity);
        } catch (EntityNotFoundException e) {
            throw new ResourceNotFoundException("Id Product not found!");
        }
    }

    public void delete(Long id) {
        try {
            repository.deleteById(id);
        } catch (EmptyResultDataAccessException e) {
            throw new ResourceNotFoundException("Id Product not found!");
        } catch (DataIntegrityViolationException e) {
            throw new DataBaseException("Integrity violation!");
        }
    }

    private void copyDtoToEntity(ProductDTO dto, Product entity) {
        entity.setName(dto.getName());
        entity.setDescription(dto.getDescription());
        entity.setPrice(dto.getPrice());
        entity.setDate(dto.getDate());
        entity.setImgUrl(dto.getImgUrl());

        entity.getCategories().clear();
        for (CategoryDTO cat : dto.getCategories()) {
            Category category = categoryRepository.getOne(cat.getId());
            entity.getCategories().add(category);
        }
    }
}
