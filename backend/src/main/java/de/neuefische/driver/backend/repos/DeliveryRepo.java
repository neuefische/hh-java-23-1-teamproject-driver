package de.neuefische.driver.backend.repos;

import de.neuefische.driver.backend.models.Delivery;
import org.springframework.data.mongodb.repository.MongoRepository;

public interface DeliveryRepo extends MongoRepository<Delivery, String> {
}
