package de.neuefische.driver.backend.services;

import de.neuefische.driver.backend.models.Delivery;
import de.neuefische.driver.backend.repos.DeliveryRepo;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.Mockito;

import java.util.ArrayList;
import java.util.List;
import java.util.NoSuchElementException;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.Mockito.mock;
import static org.mockito.Mockito.verify;

class DeliveryServiceTest {
    DeliveryService deliveryService;
    final IdService idService = mock(IdService.class);
    final DeliveryRepo deliveryRepo = mock(DeliveryRepo.class);

    private final String testIdOne = "1";

    private Delivery createTestDeliveryInstance() {

        return new Delivery(testIdOne, "pizza");
    }

    @BeforeEach
    void init() {
        this.deliveryService = new DeliveryService(deliveryRepo, idService);
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
        Delivery test = createTestDeliveryInstance();
        Mockito.when(deliveryRepo.getDeliveries())
                .thenReturn(new ArrayList<>(List.of(test)));

        List<Delivery> actual = deliveryService.getDeliveries();

        verify(deliveryRepo).getDeliveries();
        List<Delivery> expected = new ArrayList<>(List.of(test));
        assertEquals(expected, actual);
    }


    @Test
    void getDeliveryById_shouldReturnRequestedDelivery() {
        Delivery requested = createTestDeliveryInstance();

        Mockito.when(deliveryRepo.getDeliveryById(testIdOne))
                .thenReturn(requested);

        Delivery actual = deliveryService.getDeliveryById(testIdOne);

        verify(deliveryRepo).getDeliveryById(testIdOne);
        assertEquals(createTestDeliveryInstance(), actual);
    }

    @Test
    void getDeliveryById_shouldThrowException_whenInvalidId(){
        Mockito.when(deliveryRepo.getDeliveryById(testIdOne))
                .thenReturn(null);
        try {
            deliveryService.getDeliveryById(testIdOne);
            fail();
        }catch(NoSuchElementException e){
            assertTrue(true);
        }
        verify(deliveryRepo).getDeliveryById(testIdOne);
    }
    @Test
    void addDelivery_ShouldReturnAddedDelivery() {
        Delivery toAdd = createTestDeliveryInstance();
        Mockito.when(deliveryRepo.addDelivery(toAdd))
                .thenReturn(toAdd);
        Mockito.when(idService.createRandomId())
                .thenReturn(testIdOne);

        Delivery actual = deliveryService.addDelivery(toAdd);

        verify(deliveryRepo).addDelivery(toAdd);
        verify(idService).createRandomId();
        Delivery expected = createTestDeliveryInstance();
        assertEquals(expected, actual);
    }
}