package de.neuefische.driver.backend.repos;

import de.neuefische.driver.backend.models.Delivery;
import org.springframework.stereotype.Repository;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Repository
public class DeliveryRepo {
    private final Map<String, Delivery> deliveries;

    public DeliveryRepo() {
        Map<String, Delivery> deliveryMap = new HashMap<>();
        deliveryMap.put("1", new Delivery("1234", "first order"));
        deliveryMap.put("2", new Delivery("6789", "second order"));
        this.deliveries = deliveryMap;
    }

    public List<Delivery> getDeliveries() {
        return new ArrayList<>(deliveries.values());
    }
}
