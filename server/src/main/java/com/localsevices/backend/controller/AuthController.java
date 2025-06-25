package com.localsevices.backend.controller;

import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.localsevices.backend.model.User;
import com.localsevices.backend.repository.UserRepository;
import com.localsevices.backend.repository.ServiceRepository;
import com.localsevices.backend.service.EmailService;

import com.localsevices.backend.model.Service;

@RestController
@RequestMapping("/api/auth")
@CrossOrigin(origins = "http://localhost:3000")
public class AuthController {

    @Autowired private UserRepository userRepository;
    @Autowired private EmailService emailService;
    @Autowired private ServiceRepository serviceRepository;

    @GetMapping("/profile/{userId}")
    public ResponseEntity<Map<String, Object>> profile(@PathVariable long userId) {
        Optional<User> user=userRepository.findById(userId);
        if(user.isEmpty()){
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(Map.of("error","user not found"));
        }
        List<Service> services=serviceRepository.findByUser_Id(userId);
        Map<String, Object> response=new HashMap<>();
        response.put("name",user.get().getName());
        response.put("services",services);
        return ResponseEntity.ok(response);
    }

    //@CrossOrigin(origins = "http://localhost:3000")
    @PostMapping("/register")
    public ResponseEntity<String> register(@RequestBody User user) {
        System.out.println(user.getName()+":"+user.getEmail()+":"+user.getPassword());
        if (userRepository.findByEmailIgnoreCase(user.getEmail()).isPresent())
            return ResponseEntity.badRequest().body("Email already exists");
        userRepository.save(user);
        return ResponseEntity.ok("Registered successfully");
    }
    //@CrossOrigin(origins = "http://localhost:3000")
    @PostMapping("/login")
    public ResponseEntity<String> login(@RequestBody Map<String, String> credentials) {
        Optional<User> user = userRepository.findByEmailAndPassword(
            credentials.get("email"), credentials.get("password"));
        if (user.isPresent()) {
            System.out.println(String.valueOf(user.get().getId()));
        return ResponseEntity.ok(String.valueOf(user.get().getId()));
    } else {
        return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Invalid credentials");
    }
    }

    @PostMapping("/forgot-password")
    public ResponseEntity<String> forgotPassword(@RequestBody Map<String, String> payload) {
        String email = payload.get("email").trim().toLowerCase();
        Optional<User> userOpt = userRepository.findByEmailIgnoreCase(email);
        if (userOpt.isPresent()) {
            System.out.println("Email found");
            emailService.sendPassword(email, userOpt.get().getPassword());
            return ResponseEntity.ok("Password sent to email");
        }
        return ResponseEntity.badRequest().body("Email not registered");
    }
}

