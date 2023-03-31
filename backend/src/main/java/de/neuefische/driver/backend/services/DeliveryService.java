package de.neuefische.driver.backend.services;

import de.neuefische.driver.backend.models.Delivery;
import de.neuefische.driver.backend.repos.DeliveryRepo;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.UUID;

@Service
@RequiredArgsConstructor
public class DeliveryService {
    private final DeliveryRepo deliveryRepo;

    public List<Delivery> getDeliveries() {
        return deliveryRepo.getDeliveries();
    }

    public Delivery addDelivery(Delivery delivery) {
        String id = UUID.randomUUID().toString();
        Delivery deliveryToAdd = delivery.withId(id);
        return deliveryRepo.addDelivery(deliveryToAdd);
    }
}
