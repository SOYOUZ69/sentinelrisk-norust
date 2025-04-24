package com.sentinelrisk.repository;

import com.sentinelrisk.model.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;
import java.util.List;
import java.util.Optional;

@Repository
public interface UserRepository extends JpaRepository<User, Long> {
    Optional<User> findByEmail(String email);
    Optional<User> findByKeycloakId(String keycloakId);
    
    @Query("SELECT u FROM User u JOIN u.roles r WHERE r = :role")
    List<User> findByRole(String role);
    
    @Query("SELECT u FROM User u WHERE :role MEMBER OF u.roles")
    List<User> findUsersWithRole(String role);
    
    boolean existsByEmail(String email);
    boolean existsByKeycloakId(String keycloakId);
} 