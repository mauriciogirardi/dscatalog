package com.girardi.dscatalog.services;

import static org.mockito.ArgumentMatchers.any;

import org.junit.jupiter.api.Assertions;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.Mockito;
import org.springframework.dao.DataIntegrityViolationException;
import org.springframework.dao.EmptyResultDataAccessException;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageImpl;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.test.context.junit.jupiter.SpringExtension;

import java.util.List;
import java.util.Optional;

import javax.persistence.EntityNotFoundException;

import com.girardi.dscatalog.dto.ProductDTO;
import com.girardi.dscatalog.entities.Category;
import com.girardi.dscatalog.entities.Product;
import com.girardi.dscatalog.repositories.CategoryRepository;
import com.girardi.dscatalog.repositories.ProductRepository;
import com.girardi.dscatalog.services.exceptions.DataBaseException;
import com.girardi.dscatalog.services.exceptions.ResourceNotFoundException;
import com.girardi.dscatalog.tests.Factory;

@ExtendWith(SpringExtension.class)
public class ProductServiceTests {
    
    @InjectMocks
    private ProductService service;

    @Mock
    private ProductRepository repository;

    @Mock
    private CategoryRepository categoryRepository;

    private long ExistingId;
    private long nonExistingId;
    private long dependentId;
    private PageImpl<Product> page;
    private Product product;
    private Category category;
    private ProductDTO productDTO;

    @BeforeEach
    void setUp() throws Exception {
        ExistingId = 1L;
        nonExistingId = -1L;
        dependentId = 4L;
        product = Factory.createProduct();
        page = new PageImpl<>(List.of(product));
        category = Factory.createCategory();
        productDTO = Factory.createProductDTO();

        Mockito
            .when(repository.getOne(ExistingId))
            .thenReturn(product);

        Mockito
            .when(repository.getOne(nonExistingId))
            .thenThrow(EntityNotFoundException.class);

        Mockito
            .when(categoryRepository.getOne(ExistingId))
            .thenReturn(category);

        Mockito
            .when(categoryRepository.getOne(nonExistingId))
            .thenThrow(EntityNotFoundException.class);


        Mockito
            .when(repository.save(any()))
            .thenReturn(product);

        Mockito
            .when(repository.findAll((Pageable) any()))
            .thenReturn(page);

        Mockito 
            .when(repository.findById(ExistingId))
            .thenReturn(Optional.of(product));
        
        Mockito 
            .when(repository.findById(nonExistingId))
            .thenReturn(Optional.empty());

        Mockito 
            .when(repository.find(any(), any(), any()))
            .thenReturn(page);

        Mockito
            .doNothing()
            .when(repository)
            .deleteById(ExistingId);

        Mockito
            .doThrow(EmptyResultDataAccessException.class)
            .when(repository)
            .deleteById(nonExistingId);

        Mockito
            .doThrow(DataIntegrityViolationException.class)
            .when(repository)
            .deleteById(dependentId);
    }

    @Test
    public void deleteShouldDoNothingWhenIdExists() {

        Assertions.assertDoesNotThrow(
            () -> service.delete(ExistingId)
        );

        Mockito
            .verify(repository, Mockito.times(1))
            .deleteById(ExistingId);
    }

    @Test
    public void deleteShouldThrowEmptyResourceNotFoundExceptionWhenIdDoesNotExists() {

        Assertions.assertThrows(
            ResourceNotFoundException.class,
            () -> service.delete(nonExistingId)
        );

        Mockito
            .verify(repository, Mockito.times(1))
            .deleteById(nonExistingId);
    }

    @Test
    public void deleteShouldThrowEmptyDataBaseExceptionWhenDependentId() {

        Assertions.assertThrows(
            DataBaseException.class,
            () -> service.delete(dependentId)
        );

        Mockito
            .verify(repository, Mockito.times(1))
            .deleteById(dependentId);
    }

    @Test
    public void findAllShouldReturnPage() {
        Pageable pageable = PageRequest.of(0, 10);

        Page<ProductDTO> result = service.findAllPaged(0L, "", pageable);

        Assertions.assertNotNull(result);
    }

    @Test
    public void findByIdShouldReturnDTOWhenIdExists() {
        ProductDTO result = service.findById(ExistingId);

        Assertions.assertNotNull(result);

        Mockito
            .verify(repository)
            .findById(ExistingId);
    }

    @Test
    public void findByIdShouldThrowResourceNotFoundExceptionWhenIdDoesNotExists() {
        Assertions.assertThrows(
            ResourceNotFoundException.class,
            () -> service.findById(nonExistingId)
        );

        Mockito
            .verify(repository)
            .findById(nonExistingId);
    }

    @Test
    public void updateShouldReturnDTOWhenIdIsNull() {

        ProductDTO result = service.update(productDTO, ExistingId);

        Assertions.assertNotNull(result);

        Mockito
            .verify(repository)
            .save(any());
    }

    @Test
    public void updateShouldThrowResourceNotFoundExceptionWhenIdDoesNotExists() {

        Assertions.assertThrows(
            ResourceNotFoundException.class,
            () -> service.update(productDTO, nonExistingId)
        );

    }
}
