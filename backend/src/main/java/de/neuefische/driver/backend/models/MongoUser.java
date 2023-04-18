package de.neuefische.driver.backend.models;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

@Document("mongo-users")
public record MongoUser(
        @Id
        String id,
        String username,
        String password
) {
}
