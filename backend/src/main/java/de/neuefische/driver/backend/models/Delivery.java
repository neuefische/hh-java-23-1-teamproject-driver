package de.neuefische.driver.backend.models;

import org.springframework.data.annotation.Id;

public record Delivery(
        @Id
        String id,
        String title
) {
    public Delivery withId(String id) {
        return new Delivery(id, title);
    }
}
