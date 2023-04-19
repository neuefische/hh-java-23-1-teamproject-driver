package de.neuefische.driver.backend.controllers;

import com.fasterxml.jackson.databind.ObjectMapper;
import de.neuefische.driver.backend.models.Delivery;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.http.MediaType;
import org.springframework.security.test.context.support.WithMockUser;
import org.springframework.test.annotation.DirtiesContext;
import org.springframework.test.web.servlet.MockMvc;

import static org.springframework.security.test.web.servlet.request.SecurityMockMvcRequestPostProcessors.csrf;

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
    @WithMockUser
    void getDeliveries_shouldReturnEmptyList_whenRepoIsEmpty() throws Exception {
        mockMvc.perform(get("/api/deliveries"))
                .andExpect(status().isOk())
                .andExpect(content().json("""
                        []
                        """));
    }

    @Test
    @WithMockUser
    void getDeliveryById_shouldReturnApiErrorAndStatusIsNotFound_whenInvalidId() throws Exception {
        String id = "123";
        String expectedBody = "{ \"message\": \"Delivery with ID '" + id + "' not found!\"}";

        mockMvc.perform(get("/api/deliveries/" + id))
                .andExpect(status().isNotFound())
                .andExpect(content().json(expectedBody))
                .andExpect(jsonPath("$.timestamp").isNotEmpty());
    }

    @Test
    @WithMockUser
    void addDelivery_shouldReturnAddedDelivery() throws Exception {
        mockMvc.perform(post("/api/deliveries")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content("""
                                {"title":  "test"}
                                """)
                        .with(csrf()))
                .andExpect(status().isOk())
                .andExpect(content().json("""
                        {"title":  "test"}
                        """))
                .andExpect(jsonPath("$.id").isNotEmpty());
    }

    @Test
    @WithMockUser
    void getDeliveryById_shouldReturnRequestedDelivery() throws Exception {
        String requested = mockMvc.perform(post("/api/deliveries")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content("""
                                {"title":  "test"}
                                """)
                        .with(csrf()))
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
    void getDeliveryById_shouldReturnStatus401_whenUserIsUndefinedOrAnonymous() throws Exception {
        mockMvc.perform(get("/api/deliveries"))
                .andExpect(status().isUnauthorized());
    }


    @Test
    @WithMockUser
    void updateDelivery_shouldReturnUpdatedDelivery() throws Exception {
        String requested = mockMvc.perform(post("/api/deliveries")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content("""
                                {"title":  "test"}
                                """)
                        .with(csrf()))
                .andReturn()
                .getResponse()
                .getContentAsString();

        Delivery addedDelivery = objectMapper.readValue(requested, Delivery.class);
        Delivery deliveryToUpdate = new Delivery(addedDelivery.id(), "update");
        String deliveryToUpdateJson = objectMapper.writeValueAsString(deliveryToUpdate);

        mockMvc.perform(put("/api/deliveries/" + deliveryToUpdate.id())
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(deliveryToUpdateJson)
                        .with(csrf()))
                .andExpect(status().isOk())
                .andExpect(content().string(deliveryToUpdateJson));
    }

    @Test
    @WithMockUser
    void updateDelivery_shouldReturnApiErrorAndStatusIsUnprocessable_whenBodyIdAndUrlIdAreNotEqual() throws Exception {
        String bodyId = "1";
        Delivery deliveryToUpdate = new Delivery(bodyId, "update");
        String deliveryToUpdateJson = objectMapper.writeValueAsString(deliveryToUpdate);

        String urlId = "123";
        String expectedBody = "{ \"message\": \"Id '" + urlId + "' doesn't match with delivery-id '" + bodyId + "'\"}";

        mockMvc.perform(put("/api/deliveries/" + urlId)
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(deliveryToUpdateJson)
                        .with(csrf()))
                .andExpect(status().isUnprocessableEntity())
                .andExpect(content().json(expectedBody))
                .andExpect(jsonPath("$.timestamp").isNotEmpty());
    }

    @Test
    @WithMockUser
    void expectSuccessfulDelete() throws Exception {
        String saveResult = mockMvc.perform(
                        post("/api/deliveries")
                                .contentType(MediaType.APPLICATION_JSON)
                                .content("""
                                        {"title": "test"}
                                        """)
                                .with(csrf()))
                .andReturn()
                .getResponse()
                .getContentAsString();

        Delivery saveResultDelivery = objectMapper.readValue(saveResult, Delivery.class);
        String id = saveResultDelivery.id();

        mockMvc.perform(delete("/api/deliveries/" + id)
                        .with(csrf()))
                .andExpect(status().isOk());

        mockMvc.perform(get("/api/deliveries"))
                .andExpect(status().isOk())
                .andExpect(content().json("""
                        []
                        """
                ));
    }


    @Test
    @WithMockUser
    void deleteDelivery_shouldReturnApiErrorAndStatusIsNotFound_whenIdNotExist() throws Exception {
        String id = "123";
        String expectedBody = "{ \"message\": \"Couldn't delete delivery. Id " + id + " doesn't exist\"}";

        mockMvc.perform(delete("/api/deliveries/" + id)
                        .with(csrf()))
                .andExpect(status().isNotFound())
                .andExpect(content().json(expectedBody))
                .andExpect(jsonPath("$.timestamp").isNotEmpty());
    }

    @Test
    @WithMockUser
    void deleteDelivery_shouldReturnApiErrorAndStatusIsUnprocessable_whenIdIsWhitespace() throws Exception {
        String id = " ";
        String expectedBody = "{ \"message\": \"Id is empty\"}";

        mockMvc.perform(delete("/api/deliveries/" + id)
                        .with(csrf()))
                .andExpect(status().isUnprocessableEntity())
                .andExpect(content().json(expectedBody))
                .andExpect(jsonPath("$.timestamp").isNotEmpty());
    }
}