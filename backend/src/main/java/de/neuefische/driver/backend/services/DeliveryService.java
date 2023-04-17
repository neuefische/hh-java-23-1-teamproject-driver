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
        return deliveryRepo.findAll();
    }

    public Delivery addDelivery(Delivery delivery) {
        String id = idService.createRandomId();
        Delivery deliveryToAdd = delivery.withId(id);
        return deliveryRepo.save(deliveryToAdd);
    }

    public Delivery getDeliveryById(String id) {
        String errorMessage = "Delivery with ID '" + id + "' not found!";
        return deliveryRepo.findById(id)
                .orElseThrow(() -> new NoSuchElementException(errorMessage));
    }

    public Delivery updateDelivery(Delivery delivery) {
        if (deliveryRepo.existsById(delivery.id())) {
            return deliveryRepo.save(delivery);
        }
        throw new NoSuchElementException("Couldn't update delivery. Id " + delivery.id() + " doesn't exist");
    }

    public void deleteDeliveryById(String id) {
        if (deliveryRepo.existsById(id)) {
            deliveryRepo.deleteById(id);
        } else throw new NoSuchElementException("Couldn't delete delivery. Id " + id + " doesn't exist");
    }
}
