package de.neuefische.driver.backend.controllers;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/info")
public class EnvironmentController {
    @Value("${environment.name}")
    String environmentName;

    @GetMapping
    public String getEnvironmentName() {
        return environmentName;
    }
}
