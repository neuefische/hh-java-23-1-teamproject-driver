package de.neuefische.driver.backend.models;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;
import org.springframework.data.annotation.Id;

public record Delivery(
        @Id
        String id,
        @NotBlank
                @Size(min=3, max=30)
        String title
) {
    public Delivery withId(String id) {
        return new Delivery(id, title);
    }
}
