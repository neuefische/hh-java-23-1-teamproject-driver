package de.neuefische.driver.backend.services;

import de.neuefische.driver.backend.models.Delivery;
import de.neuefische.driver.backend.repos.DeliveryRepo;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.Mockito;

import java.util.ArrayList;
import java.util.List;
import java.util.NoSuchElementException;
import java.util.Optional;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.Mockito.*;

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
        Mockito.when(deliveryRepo.findAll())
                .thenReturn(new ArrayList<>());

        List<Delivery> actual = deliveryService.getDeliveries();

        verify(deliveryRepo).findAll();
        assertEquals(new ArrayList<>(), actual);
    }

    @Test
    void getDeliveries_shouldReturn_listOfDeliveries() {
        Delivery test = createTestDeliveryInstance();
        Mockito.when(deliveryRepo.findAll())
                .thenReturn(new ArrayList<>(List.of(test)));

        List<Delivery> actual = deliveryService.getDeliveries();

        verify(deliveryRepo).findAll();
        List<Delivery> expected = new ArrayList<>(List.of(test));
        assertEquals(expected, actual);
    }

    @Test
    void getDeliveryById_shouldReturnRequestedDelivery() {
        Delivery requested = createTestDeliveryInstance();

        Mockito.when(deliveryRepo.findById(testIdOne))
                .thenReturn(Optional.of(requested));

        Delivery actual = deliveryService.getDeliveryById(testIdOne);

        verify(deliveryRepo).findById(testIdOne);
        assertEquals(createTestDeliveryInstance(), actual);
    }

    @Test
    void getDeliveryById_shouldThrowException_whenInvalidId() {
        String errorMessage = "Delivery with ID '" + testIdOne + "' not found!";

        Mockito.when(deliveryRepo.findById(testIdOne))
                .thenThrow(new NoSuchElementException(errorMessage));

        Exception exception = assertThrows(NoSuchElementException.class,
                () -> deliveryService.getDeliveryById(testIdOne));

        verify(deliveryRepo).findById(testIdOne);
        assertEquals(errorMessage, exception.getMessage());
    }


    @Test
    void addDelivery_ShouldReturnAddedDelivery() {
        Delivery toAdd = createTestDeliveryInstance();
        Mockito.when(deliveryRepo.save(toAdd))
                .thenReturn(toAdd);
        Mockito.when(idService.createRandomId())
                .thenReturn(testIdOne);

        Delivery actual = deliveryService.addDelivery(toAdd);
        Delivery expected = createTestDeliveryInstance();

        verify(deliveryRepo).save(toAdd);
        verify(idService).createRandomId();
        assertEquals(expected, actual);
    }

    @Test
    void updateDelivery_ShouldReturnUpdatedDelivery() {
        Delivery toUpdate = createTestDeliveryInstance();
        Mockito.when(deliveryRepo.existsById(toUpdate.id()))
                        .thenReturn(true);
        Mockito.when(deliveryRepo.save(toUpdate))
                .thenReturn(toUpdate);

        Delivery actual = deliveryService.updateDelivery(toUpdate);
        Delivery expected = createTestDeliveryInstance();

        verify(deliveryRepo).save(toUpdate);
        verify(deliveryRepo).existsById(toUpdate.id());
        assertEquals(expected, actual);
    }

    @Test
    void updateDelivery_ShouldThrowNoSuchElementException_whenIdNotExist() {
        Delivery toUpdate = createTestDeliveryInstance();
        Mockito.when(deliveryRepo.existsById(toUpdate.id()))
                .thenReturn(false);

        Exception exception = assertThrows(NoSuchElementException.class,
                () -> deliveryService.updateDelivery(toUpdate));

        verify(deliveryRepo).existsById(toUpdate.id());

        String actual = exception.getMessage();
        String expected = "Couldn't update delivery. Id " + toUpdate.id() + " doesn't exist";
        assertEquals(expected, actual);
    }

    @Test
    void deleteDeliveryById() {
        Mockito.when(deliveryRepo.existsById(testIdOne))
                .thenReturn(true);
        // WHEN
        deliveryService.deleteDeliveryById(testIdOne);
        // THEN
        verify(deliveryRepo).existsById(testIdOne);
    }

    @Test
    void deleteDeliveryById_shouldThrowException_whenInvalidId() {
        String id = "123";
        Mockito.when(deliveryRepo.existsById(id))
                .thenReturn(false);

        Exception exception = assertThrows(NoSuchElementException.class,
                () -> deliveryService.deleteDeliveryById(id));

        verify(deliveryRepo).existsById(id);

        String actual = exception.getMessage();
        String expected = "Couldn't delete delivery. Id " + id + " doesn't exist";
        assertEquals(expected, actual);
    }
}