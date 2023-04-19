package de.neuefische.driver.backend.exceptions;

import java.time.Instant;

public record ApiError(
        String message,
        Instant timestamp
) {
}
