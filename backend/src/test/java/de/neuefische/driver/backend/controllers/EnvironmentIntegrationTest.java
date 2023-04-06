package de.neuefische.driver.backend.controllers;

import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.web.servlet.MockMvc;

import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

@SpringBootTest
@AutoConfigureMockMvc
class EnvironmentIntegrationTest {

    @Autowired
    MockMvc mockMvc;

    @Test
    void getEnvironmentName_shouldReturnStringTest() throws Exception{
        mockMvc.perform(get("/api/info"))
                .andExpect(status().isOk())
                .andExpect(content().string("test"));
    }
}