package com.girardi.dscatalog.resources;

import java.net.URI;

import javax.validation.Valid;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.servlet.support.ServletUriComponentsBuilder;

import com.girardi.dscatalog.dto.CategoryDTO;
import org.springframework.http.ResponseEntity;
import com.girardi.dscatalog.services.CategoryService;

@RestController
@RequestMapping(value = "/categories")
public class CategoryResource {

	@Autowired
	private CategoryService service;
	
	@GetMapping
	public ResponseEntity<Page<CategoryDTO>> findAll(Pageable pageable) {
		Page<CategoryDTO> list = service.findAllPaged(pageable);
		return ResponseEntity.ok().body(list);
	}

	@GetMapping(value = "/{id}")
	public ResponseEntity<CategoryDTO> findById(@PathVariable Long id) {
		CategoryDTO dto = service.findById(id);
		return ResponseEntity.ok().body(dto);
	}

	@PostMapping
	public ResponseEntity<CategoryDTO> insert(@Valid @RequestBody CategoryDTO dto) {
		dto = service.insert(dto);
		
		URI uri = ServletUriComponentsBuilder
			.fromCurrentRequest()
			.path("/{id}")
			.buildAndExpand(dto.getId())
			.toUri();

		return ResponseEntity.created(uri).body(dto);
	}

	@PutMapping(value = "/{id}")
	public ResponseEntity<CategoryDTO> update(
		@Valid
		@RequestBody CategoryDTO dto, 
		@PathVariable Long id) 
	{
		dto = service.update(dto, id);
		return ResponseEntity.ok().body(dto);
	}

	@DeleteMapping(value = "/{id}")
	public ResponseEntity<CategoryDTO> delete(@PathVariable Long id) {
		service.delete(id);
		return ResponseEntity.noContent().build();
	}
}
