package com.girardi.dscatalog.services;

import com.girardi.dscatalog.dto.ProductDTO;
import com.girardi.dscatalog.repositories.ProductRepository;
import com.girardi.dscatalog.services.exceptions.ResourceNotFoundException;

import org.junit.jupiter.api.Assertions;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Sort;
import org.springframework.transaction.annotation.Transactional;

@SpringBootTest
@Transactional
public class ProductServiceIT {

    @Autowired
    private ProductService service;

    @Autowired
    private ProductRepository repository;

    private Long existingId;
    private Long nonExistingId;
    private Long countTotalProsucts;
    
    @BeforeEach
    void setUp() throws Exception {

        existingId = 1L;
        nonExistingId = -1L;
        countTotalProsucts = 25L;
    }

    @Test
    public void deleteShouldDeleteResourceWhenIdExists() {

        service.delete(existingId);

        Assertions.assertEquals(countTotalProsucts - 1, repository.count());
    }

    @Test
    public void deleteShouldReturnResourceNotFoundExceptionWhenIdDoesNotExists() {

        Assertions.assertThrows(ResourceNotFoundException.class, () -> 
            service.delete(nonExistingId)
        );
    }

    @Test
    public void findAllPageShouldReturnPageWhenPage0Size10() {

        PageRequest pageRequest = PageRequest.of(0, 10);
        Page<ProductDTO> result = service.findAllPaged(0L, "", pageRequest);

        Assertions.assertFalse(result.isEmpty());
        Assertions.assertEquals(0, result.getNumber());
        Assertions.assertEquals(10, result.getSize());
        Assertions.assertEquals(countTotalProsucts, result.getTotalElements());
    }

    @Test
    public void findAllPageShouldReturnEmptyPageWhenPageDoesNotExist() {

        PageRequest pageRequest = PageRequest.of(30, 10);
        Page<ProductDTO> result = service.findAllPaged(0L, "", pageRequest);

        Assertions.assertTrue(result.isEmpty());
        
    }

    @Test
    public void findAllPageShouldReturnSortedPageWhenPage() {

        PageRequest pageRequest = PageRequest.of(0, 10, Sort.by("name"));
        Page<ProductDTO> result = service.findAllPaged(0L, "", pageRequest);

        Assertions.assertFalse(result.isEmpty());
        Assertions.assertEquals("Macbook Pro", result.getContent().get(0).getName());
        Assertions.assertEquals("PC Gamer", result.getContent().get(1).getName());
        Assertions.assertEquals("PC Gamer Alfa", result.getContent().get(2).getName());
    }
}
