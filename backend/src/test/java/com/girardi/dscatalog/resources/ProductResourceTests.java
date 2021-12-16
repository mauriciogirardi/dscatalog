package com.girardi.dscatalog.resources;

import static org.mockito.ArgumentMatchers.any;
import static org.mockito.ArgumentMatchers.eq;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.put;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.post;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.delete;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.jsonPath;

import java.util.List;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.girardi.dscatalog.dto.ProductDTO;
import com.girardi.dscatalog.services.ProductService;
import com.girardi.dscatalog.services.exceptions.DataBaseException;
import com.girardi.dscatalog.services.exceptions.ResourceNotFoundException;
import com.girardi.dscatalog.tests.Factory;
import com.girardi.dscatalog.tests.TokenUtil;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.Mockito;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.data.domain.PageImpl;
import org.springframework.http.MediaType;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.ResultActions;

@SpringBootTest
@AutoConfigureMockMvc
public class ProductResourceTests {
    
    @Autowired
    private MockMvc mockMvc;

    @Autowired
    private TokenUtil tokenUtil;

    @MockBean
    private ProductService service;

    @Autowired
    private ObjectMapper objectMapper;

    private PageImpl<ProductDTO> page;
    private ProductDTO productDTO;
    private Long existingId;
    private Long dependentId;
    private Long nonExistingId;
    private String username;
    private String password;

    @BeforeEach
    void setUp() throws Exception {
        existingId = 1L;
        nonExistingId = -1L;
        dependentId = 3L;
        productDTO = Factory.createProductDTO();
        page = new PageImpl<>(List.of(productDTO)); 
        username = "maria@gmail.com";
        password = "123456";

        Mockito
            .when(service.findAllPaged(any(), any(), any()))
            .thenReturn(page);

        Mockito
            .when(service.findById(existingId))
            .thenReturn(productDTO);

        Mockito
            .when(service.findById(nonExistingId))
            .thenThrow(ResourceNotFoundException.class);

        
        Mockito
            .when(service.update(any() ,eq(existingId)))
            .thenReturn(productDTO);

        Mockito
            .when(service.update(any(), eq(nonExistingId)))
            .thenThrow(ResourceNotFoundException.class);

        Mockito
            .doNothing()
            .when(service)
            .delete(existingId);

        Mockito
            .doThrow(ResourceNotFoundException.class)
            .when(service)
            .delete(nonExistingId);
            
        Mockito
            .doThrow(DataBaseException.class)
            .when(service)
            .delete(dependentId);
        
        Mockito
            .when(service.insert(any()))
            .thenReturn(productDTO);
    }


    @Test
    public void findAllShouldReturnPage() throws Exception {
        
        mockMvc
            .perform(get("/products"))
            .andExpect(status().isOk())
            .andExpect(jsonPath("$.content.[0].id").value(productDTO.getId()));
    }

    @Test
    public void findByIdShouldReturnProductWhenIdExists() throws Exception {

        mockMvc
            .perform(get("/products/{id}", existingId))
            .andExpect(status().isOk());
    }

    @Test
    public void findByIdShouldReturnNotFoundWhenIdDoesNotExists() throws Exception {

        ResultActions result = mockMvc
            .perform(get("/products/{id}", nonExistingId));

        result.andExpect(status().isNotFound());
    }

    @Test
    public void updateShouldReturnProductWhenIdExists() throws Exception {
        String accessToken = tokenUtil.obtainAccessToken(mockMvc, username, password);
        String jsonBody = objectMapper.writeValueAsString(productDTO);

        ResultActions result = mockMvc
            .perform(put("/products/{id}", existingId)
                .header("Authorization", "Bearer " + accessToken)
                .content(jsonBody)
                .contentType(MediaType.APPLICATION_JSON)
                .accept(MediaType.APPLICATION_JSON)
            );

        result.andExpect(status().isOk());
        result.andExpect(jsonPath("$.id").value(productDTO.getId()));
    }

    @Test
    public void updateShouldReturnNotFoundWhenIdDoesNotExists() throws Exception {
        String accessToken = tokenUtil.obtainAccessToken(mockMvc, username, password);
        String jsonBody = objectMapper.writeValueAsString(productDTO);

        ResultActions result = mockMvc
            .perform(put("/products/{id}", nonExistingId)
                .header("Authorization", "Bearer " + accessToken)
                .content(jsonBody)
                .contentType(MediaType.APPLICATION_JSON)
                .accept(MediaType.APPLICATION_JSON)
            );

        result.andExpect(status().isNotFound());
    }

    @Test
    public void insertShouldReturnProductDTOCreated() throws Exception {

        String accessToken = tokenUtil.obtainAccessToken(mockMvc, username, password);
        String jsonBody = objectMapper.writeValueAsString(productDTO);

        ResultActions result = mockMvc
            .perform(post("/products")
                .header("Authorization", "Bearer " + accessToken)
                .content(jsonBody)
                .contentType(MediaType.APPLICATION_JSON)
                .accept(MediaType.APPLICATION_JSON)
            );
                

        result.andExpect(status().isCreated());
        result.andExpect(jsonPath("$.id").value(productDTO.getId()));
    }

    @Test
    public void deleteShouldReturnNoContentWhenIdExist() throws Exception {
        String accessToken = tokenUtil.obtainAccessToken(mockMvc, username, password);

        ResultActions result = mockMvc
            .perform(delete("/products/{id}", existingId)
                .header("Authorization", "Bearer " + accessToken)
                .accept(MediaType.APPLICATION_JSON)
            );
                

        result.andExpect(status().isNoContent());
    }

    @Test
    public void deleteShouldReturnNotFoundWhenIdDoesNotExist() throws Exception {
        String accessToken = tokenUtil.obtainAccessToken(mockMvc, username, password);

        ResultActions result = mockMvc
        .perform(delete("/products/{id}", nonExistingId)
            .header("Authorization", "Bearer " + accessToken)
            .accept(MediaType.APPLICATION_JSON)
        );
            

        result.andExpect(status().isNotFound());
    }
}
