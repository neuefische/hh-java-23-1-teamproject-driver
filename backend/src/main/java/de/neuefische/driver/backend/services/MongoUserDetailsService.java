package de.neuefische.driver.backend.services;

import de.neuefische.driver.backend.models.MongoUser;
import de.neuefische.driver.backend.repos.MongoUserRepo;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.userdetails.*;
import org.springframework.stereotype.Service;

import java.util.Collections;

@Service
@RequiredArgsConstructor
public class MongoUserDetailsService implements UserDetailsService {
    private final MongoUserRepo mongoUserRepo;

    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
        MongoUser mongoUser = mongoUserRepo
                .findMongoUserByUsername(username)
                .orElseThrow(() -> new UsernameNotFoundException("User with name: " + username + " not found!"));

        return new User(mongoUser.username(), mongoUser.password(), Collections.emptyList());
    }
}
