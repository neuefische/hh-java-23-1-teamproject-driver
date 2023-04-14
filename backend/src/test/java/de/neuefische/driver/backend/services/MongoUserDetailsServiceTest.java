package de.neuefische.driver.backend.services;

import de.neuefische.driver.backend.models.MongoUser;
import de.neuefische.driver.backend.repos.MongoUserRepo;
import org.junit.jupiter.api.Test;
import org.mockito.Mockito;
import org.springframework.security.core.userdetails.User;
import org.springframework.security.core.userdetails.UserDetails;

import java.util.Collections;
import java.util.Optional;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.Mockito.*;

class MongoUserDetailsServiceTest {
    final MongoUserRepo mongoUserRepo = mock(MongoUserRepo.class);
    final MongoUserDetailsService mongoUserDetailsService = new MongoUserDetailsService(mongoUserRepo);

    @Test
    void loadUserByUsername_shouldReturnUser() {
        MongoUser mongoTestUser = new MongoUser("1", "testUser", "test");
        Mockito.when(mongoUserRepo.findMongoUserByUsername("testUser"))
                .thenReturn(Optional.of(mongoTestUser));

        UserDetails actual = mongoUserDetailsService.loadUserByUsername("testUser");
        UserDetails expected = new User(mongoTestUser.username(), mongoTestUser.password(), Collections.emptyList());

        verify(mongoUserRepo).findMongoUserByUsername("testUser");
        assertEquals(expected, actual);


    }
}