package com.girardi.dscatalog.services;

import javax.persistence.EntityNotFoundException;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.dao.DataIntegrityViolationException;
import org.springframework.dao.EmptyResultDataAccessException;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.stereotype.Service;

import com.girardi.dscatalog.dto.CategoryDTO;
import com.girardi.dscatalog.entities.Category;
import com.girardi.dscatalog.repositories.CategoryRepository;
import com.girardi.dscatalog.services.exceptions.DataBaseException;
import com.girardi.dscatalog.services.exceptions.ResourceNotFoundException;

@Service
public class CategoryService {
    
    @Autowired
    private CategoryRepository repository;
    
    @Transactional(readOnly = true)
    public Page<CategoryDTO> findAllPaged(Pageable pageable) {
        Page<Category> list = repository.findAll(pageable);

        return list.map(x -> new CategoryDTO(x));
    }

    @Transactional(readOnly = true)
    public CategoryDTO findById(Long id) {
        Category entity = repository.findById(id).orElseThrow(
            () -> new ResourceNotFoundException("Category not found!"));
        
        return new CategoryDTO(entity);
    }

    @Transactional
    public CategoryDTO insert(CategoryDTO dto) {
        Category entity = new Category();
        entity.setName(dto.getName());
        entity = repository.save(entity);

        return new CategoryDTO(entity);
    }

    @Transactional
    public CategoryDTO update(CategoryDTO dto, Long id) {
        try {
            Category entity = repository.getOne(id);

            entity.setName(dto.getName());
            entity = repository.save(entity);
            
            return new CategoryDTO(entity);
        } catch (EntityNotFoundException e) {
            throw new ResourceNotFoundException("Id category not found!");
        }
    }

    public void delete(Long id) {
        try {
            repository.deleteById(id);
        } catch (EmptyResultDataAccessException e) {
            throw new ResourceNotFoundException("Id category not found!");
        } catch (DataIntegrityViolationException e) {
            throw new DataBaseException("Integrity violation!");
        }
    }
}
