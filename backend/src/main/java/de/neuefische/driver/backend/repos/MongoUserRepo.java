package de.neuefische.driver.backend.repos;

import de.neuefische.driver.backend.models.MongoUser;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface MongoUserRepo extends MongoRepository <MongoUser, String> {
    Optional<MongoUser> findMongoUserByUsername(String username);
}
