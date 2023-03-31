package de.neuefische.driver.backend.repos;

import de.neuefische.driver.backend.models.Delivery;
import org.springframework.stereotype.Repository;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Repository
public class DeliveryRepo {
    private final Map<String, Delivery> deliveries = new HashMap<>();

    public List<Delivery> getDeliveries() {
        return new ArrayList<>(deliveries.values());
    }

    public Delivery addDelivery(Delivery deliveryToAdd) {
        deliveries.put(deliveryToAdd.id(), deliveryToAdd);
        return deliveryToAdd;
    }

    public Delivery getDeliveryById(String id) {
        return deliveries.get(id);
    }
}
