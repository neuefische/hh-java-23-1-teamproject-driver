package de.neuefische.driver.backend.models;

import java.util.List;

public record Delivery(
        String id,
        List<String> order,
        String customer
) {
}
