package de.neuefische.driver.backend.models;

public record Delivery(
        String id,
        String title
) {
    public Delivery withId(String id) {
        return new Delivery(id, title);
    }
}
