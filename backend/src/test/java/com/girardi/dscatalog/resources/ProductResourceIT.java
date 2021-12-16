package com.girardi.dscatalog.resources;

import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.put;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.girardi.dscatalog.dto.ProductDTO;
import com.girardi.dscatalog.tests.Factory;
import com.girardi.dscatalog.tests.TokenUtil;

import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.jsonPath;

import org.springframework.http.MediaType;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.ResultActions;
import org.springframework.transaction.annotation.Transactional;

@SpringBootTest
@AutoConfigureMockMvc
@Transactional
public class ProductResourceIT {

    @Autowired
    private MockMvc mockMvc;

    @Autowired
    private ObjectMapper objectMapper;

    @Autowired
    private TokenUtil tokenUtil;

    private Long existingId;
    private Long nonExistingId;
    private Long countTotalProducts;
    private String username;
    private String password;

    @BeforeEach
    public void setUp() throws Exception {
        existingId = 1L;
        nonExistingId = -1L;
        countTotalProducts = 25L;
        username = "maria@gmail.com";
        password = "123456";
    }  

    @Test
    public void findAllShoundReturnSortedPageWhenSortByName() throws Exception {
       
        ResultActions result =
            mockMvc.perform(
                get("/products?page=0&size=12&sort=name,asc")
                    .accept(MediaType.APPLICATION_JSON)
            );

        result.andExpect(status().isOk());
        result.andExpect(jsonPath("$.totalElements").value(countTotalProducts));
        result.andExpect(jsonPath("$.content").exists());
        result.andExpect(jsonPath("$.content[0].name").value("Macbook Pro"));
    }

    @Test
    public void updateShouldReturnProductDTOWhenIDExists() throws Exception {

        String accessToken = tokenUtil.obtainAccessToken(mockMvc, username, password);

        ProductDTO productDTO = Factory.createProductDTO();
        String jsonBody = objectMapper.writeValueAsString(productDTO);
        String expectedName = productDTO.getName();

        ResultActions result =
            mockMvc.perform(
                put("/products/{id}", existingId)
                    .header("Authorization", "Bearer " + accessToken)
                    .content(jsonBody)
                    .contentType(MediaType.APPLICATION_JSON)
                    .accept(MediaType.APPLICATION_JSON)
            );

        result.andExpect(status().isOk());
        result.andExpect(jsonPath("$.id").value(existingId));
        result.andExpect(jsonPath("$.name").value(expectedName));
    }

    @Test
    public void updateShouldReturnNotFoundWhenIdDoesNotExists() throws Exception {

        String accessToken = tokenUtil.obtainAccessToken(mockMvc, username, password);
       
        ProductDTO productDTO = Factory.createProductDTO();
        String jsonBody = objectMapper.writeValueAsString(productDTO);

        ResultActions result =
            mockMvc.perform(
                put("/products/{id}", nonExistingId)
                    .header("Authorization", "Bearer " + accessToken)
                    .content(jsonBody)
                    .contentType(MediaType.APPLICATION_JSON)
                    .accept(MediaType.APPLICATION_JSON)
            );

        result.andExpect(status().isNotFound());
    }
}
