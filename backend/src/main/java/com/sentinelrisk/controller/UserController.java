package com.sentinelrisk.controller;

import com.sentinelrisk.dto.UserDTO;
import com.sentinelrisk.service.KeycloakUserService;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/users")
public class UserController {
    private static final Logger logger = LoggerFactory.getLogger(UserController.class);

    private final KeycloakUserService userService;

    public UserController(KeycloakUserService userService) {
        this.userService = userService;
    }

    @GetMapping
    public ResponseEntity<List<UserDTO>> listUsers() {
        logger.debug("Listing all users");
        return ResponseEntity.ok(userService.listUsers());
    }

    @GetMapping("/{id}")
    public ResponseEntity<UserDTO> getUserById(@PathVariable String id) {
        logger.debug("Getting user by ID: {}", id);
        return ResponseEntity.ok(userService.getUserById(id));
    }

    @PostMapping
    public ResponseEntity<UserDTO> createUser(@RequestBody UserDTO userDTO) {
        logger.info("Creating new user: {}", userDTO.getUsername());
        UserDTO createdUser = userService.createUser(userDTO);
        logger.info("User created successfully with ID: {}", createdUser.getId());
        return ResponseEntity.ok(createdUser);
    }

    @PutMapping("/{id}")
    public ResponseEntity<UserDTO> updateUser(@PathVariable String id, @RequestBody UserDTO userDTO) {
        logger.info("Updating user with ID: {}", id);
        return ResponseEntity.ok(userService.updateUser(id, userDTO));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteUser(@PathVariable String id) {
        logger.info("Deleting user with ID: {}", id);
        userService.deleteUser(id);
        return ResponseEntity.noContent().build();
    }
} 