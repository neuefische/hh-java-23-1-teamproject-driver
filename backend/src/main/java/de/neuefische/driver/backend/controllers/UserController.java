package de.neuefische.driver.backend.controllers;

import jakarta.servlet.http.HttpSession;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/user")
public class UserController {
    @GetMapping
    public String getTest(){
        return "test";
    }

    @GetMapping("/me")
    public String getMe2() {
        return SecurityContextHolder
                .getContext()
                .getAuthentication()
                .getName();
    }
    @PostMapping("/login")
    public String login() {
        return SecurityContextHolder
                .getContext()
                .getAuthentication()
                .getName();
    }

    @PostMapping("/logout")
    public void logout(HttpSession httpSession){
        httpSession.invalidate();
        SecurityContextHolder.clearContext();
    }

}
