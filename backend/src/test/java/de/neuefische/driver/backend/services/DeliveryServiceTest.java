package de.neuefische.driver.backend.services;

import de.neuefische.driver.backend.models.Delivery;
import de.neuefische.driver.backend.repos.DeliveryRepo;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.Mockito;

import java.util.ArrayList;
import java.util.List;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.Mockito.mock;
import static org.mockito.Mockito.verify;

class DeliveryServiceTest {
    DeliveryRepo deliveryRepo = mock(DeliveryRepo.class);
    DeliveryService deliveryService;

    @BeforeEach
    void init() {
        this.deliveryService = new DeliveryService(deliveryRepo);
    }

    @Test
    void getDeliveries_shouldReturnEmptyList_whenRepoIsEmpty() {
        Mockito.when(deliveryRepo.getDeliveries())
                .thenReturn(new ArrayList<>());

        List<Delivery> actual = deliveryService.getDeliveries();

        verify(deliveryRepo).getDeliveries();
        assertEquals(new ArrayList<>(), actual);
    }

    @Test
    void getDeliveries_shouldReturn_listOfDeliveries() {
        Delivery test = new Delivery("1234", "order1");
        Mockito.when(deliveryRepo.getDeliveries())
                .thenReturn(new ArrayList<>(List.of(test)));

        List<Delivery> actual = deliveryService.getDeliveries();

        verify(deliveryRepo).getDeliveries();
        List<Delivery> expected = new ArrayList<>(List.of(test));
        assertEquals(expected, actual);
    }
}