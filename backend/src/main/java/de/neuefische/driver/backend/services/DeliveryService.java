package de.neuefische.driver.backend.services;

import de.neuefische.driver.backend.models.Delivery;
import de.neuefische.driver.backend.repos.DeliveryRepo;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.NoSuchElementException;

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

    public Delivery getDeliveryById(String id) {
        Delivery requestedDelivery = deliveryRepo.getDeliveryById(id);
        if(requestedDelivery == null){
            throw new NoSuchElementException("No Delivery with ID " + id);
        }
        return requestedDelivery;
    }
}
