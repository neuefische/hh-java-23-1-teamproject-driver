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
import org.springframework.web.server.ResponseStatusException;

import static org.junit.jupiter.api.Assertions.assertTrue;
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
    void getDeliveryById_shouldThrowException_whenInvalidId() throws Exception {
        mockMvc.perform(get("/api/deliveries/123"))
                .andExpect(status().isBadRequest())
                .andExpect(result -> assertTrue(
                        result.getResolvedException() instanceof ResponseStatusException));
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

    @Test
    void updateDelivery_shouldReturnUpdatedDelivery() throws Exception {
        String requested = mockMvc.perform(post("/api/deliveries")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content("""
                                {"title":  "test"}
                                """))
                .andReturn()
                .getResponse()
                .getContentAsString();

        Delivery addedDelivery = objectMapper.readValue(requested, Delivery.class);
        Delivery deliveryToUpdate = new Delivery(addedDelivery.id(), "update");
        String deliveryToUpdateJson = objectMapper.writeValueAsString(deliveryToUpdate);

        mockMvc.perform(put("/api/deliveries/" + deliveryToUpdate.id())
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(deliveryToUpdateJson))
                .andExpect(status().isOk())
                .andExpect(content().string(deliveryToUpdateJson));
    }

    @Test
    void updateDelivery_shouldThrowResponseStatusException_whenBodyIdAndUrlIdAreNotEqual() throws Exception {
        Delivery deliveryToUpdate = new Delivery("idOne", "update");
        String deliveryToUpdateJson = objectMapper.writeValueAsString(deliveryToUpdate);

        mockMvc.perform(put("/api/deliveries/wrongId")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(deliveryToUpdateJson))
                .andExpect(status().isIAmATeapot())
                .andExpect(result -> assertTrue(
                        result.getResolvedException() instanceof ResponseStatusException));
    }
}