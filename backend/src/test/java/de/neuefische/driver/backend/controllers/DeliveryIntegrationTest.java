package de.neuefische.driver.backend.controllers;

import com.fasterxml.jackson.databind.ObjectMapper;
import de.neuefische.driver.backend.models.Delivery;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.http.MediaType;
import org.springframework.test.annotation.DirtiesContext;
import org.springframework.test.web.servlet.MockMvc;

import java.util.NoSuchElementException;

import static org.junit.jupiter.api.Assertions.fail;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;


@SpringBootTest
@AutoConfigureMockMvc
@DirtiesContext(classMode = DirtiesContext.ClassMode.BEFORE_EACH_TEST_METHOD)
class DeliveryIntegrationTest {
    @Autowired
    MockMvc mockMvc;

    @Autowired
    ObjectMapper objectMapper;

    @Test
    void getDeliveries_shouldReturnEmptyList_whenRepoIsEmpty() throws Exception {
        mockMvc.perform(get("/api/deliveries"))
                .andExpect(status().isOk())
                .andExpect(content().json("""
                []
                """));
    }

    @Test
    void getDeliveryById_shouldThrowException_whenInvalidId() {
        try {
            mockMvc.perform(get("/api/deliveries/123"));
            fail();
        } catch (Exception e) {
            if (!(e.getCause() instanceof NoSuchElementException)) {
                fail();
            }
        }
    }

    @Test
    void addDelivery_shouldReturnAddedDelivery() throws Exception {
        mockMvc.perform(post("/api/deliveries")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content("""
                                {"title":  "test"}
                                """))
                .andExpect(status().isOk())
                .andExpect(content().json("""
                        {"title":  "test"}
                        """))
                .andExpect(jsonPath("$.id").isNotEmpty());
    }

    @Test
    void getDeliveryById_shouldReturnRequestedDelivery() throws Exception {
        String requested = mockMvc.perform(post("/api/deliveries")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content("""
                                {"title":  "test"}
                                """))
                .andReturn()
                .getResponse()
                .getContentAsString();
        Delivery actualDelivery = objectMapper.readValue(requested, Delivery.class);
        String id = actualDelivery.id();

        mockMvc.perform(get("/api/deliveries/" + id))
                .andExpect(status().isOk())
                .andExpect(content().json("""
                             {
                               "id": "<ID>",
                             "title":  "test"}
                        """.replaceFirst("<ID>", id)));
    }
}