package de.neuefische.driver.backend.services;

import de.neuefische.driver.backend.models.Delivery;
import de.neuefische.driver.backend.repos.DeliveryRepo;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service

@RequiredArgsConstructor
public class DeliveryService {
    private final DeliveryRepo deliveryRepo;
    private final IdService idService;

    public List<Delivery> getDeliveries() {
        return deliveryRepo.getDeliveries();
    }

    public Delivery addDelivery(Delivery delivery) {
        String id = idService.createRandomId();
        Delivery deliveryToAdd = delivery.withId(id);
        return deliveryRepo.addDelivery(deliveryToAdd);
    }
}
