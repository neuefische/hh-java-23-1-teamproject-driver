package de.neuefische.driver.backend.controllers;

import de.neuefische.driver.backend.models.Delivery;
import de.neuefische.driver.backend.services.DeliveryService;
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
    public Delivery addDelivery(@RequestBody Delivery delivery) {
        return deliveryService.addDelivery(delivery);
    }
}
