package de.neuefische.driver.backend.services;

import org.springframework.stereotype.Service;

import java.util.UUID;

@Service
public class IdService {
    public String createRandomId() {
        return UUID.randomUUID().toString();
    }
}
