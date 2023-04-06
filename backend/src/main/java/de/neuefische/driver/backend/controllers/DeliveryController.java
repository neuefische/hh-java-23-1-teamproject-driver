package de.neuefische.driver.backend.controllers;

import de.neuefische.driver.backend.models.Delivery;
import de.neuefische.driver.backend.services.DeliveryService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.server.ResponseStatusException;

import java.util.List;
import java.util.NoSuchElementException;

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
        try {
            return deliveryService.getDeliveryById(id);
        }
        catch (NoSuchElementException e) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, e.getMessage());
        }
    }

    @PostMapping
    public Delivery addDelivery(@RequestBody Delivery delivery) {
        return deliveryService.addDelivery(delivery);
    }

    @PutMapping("/{id}")
    public Delivery updateDelivery(@PathVariable String id, @RequestBody Delivery delivery) {
        if (!id.equals(delivery.id())) {
            String message = "Id '" + id + "' doesn't match with delivery-id '" + delivery.id() + "'";
            throw new ResponseStatusException(HttpStatus.I_AM_A_TEAPOT, message);
        }

        return deliveryService.updateDelivery(delivery);
    }
}
