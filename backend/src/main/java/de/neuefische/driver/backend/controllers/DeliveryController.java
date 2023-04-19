package de.neuefische.driver.backend.controllers;

import de.neuefische.driver.backend.models.Delivery;
import de.neuefische.driver.backend.services.DeliveryService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/deliveries")
@RequiredArgsConstructor
public class DeliveryController {
    private final DeliveryService deliveryService;

    @GetMapping
    public List<Delivery> getDeliveries() {
        return deliveryService.getDeliveries();
    }

    @GetMapping("/{id}")
    public Delivery getDeliveryById(@PathVariable String id) {
        return deliveryService.getDeliveryById(id);
    }

    @PostMapping
    public Delivery addDelivery(@RequestBody @Valid Delivery delivery) {
        return deliveryService.addDelivery(delivery);
    }

    @PutMapping("/{id}")
    public Delivery updateDelivery(@PathVariable String id, @RequestBody Delivery delivery) {
        if (!id.equals(delivery.id())) {
            String message = "Id '" + id + "' doesn't match with delivery-id '" + delivery.id() + "'";
            throw new IllegalArgumentException(message);
        }

        return deliveryService.updateDelivery(delivery);
    }

    @DeleteMapping("/{id}")
    void deleteDeliveryById(@PathVariable String id) {
        if (id.isBlank()) {
            throw new IllegalArgumentException("Id is empty");
        }

        deliveryService.deleteDeliveryById(id);
    }
}
