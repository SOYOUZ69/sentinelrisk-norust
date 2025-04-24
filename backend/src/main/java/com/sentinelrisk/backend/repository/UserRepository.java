package com.sentinelrisk.backend.repository;

import com.sentinelrisk.backend.model.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface UserRepository extends JpaRepository<User, String> {
    Optional<User> findByUsername(String username);
    Optional<User> findByEmail(String email);
    List<User> findByDepartment(String department);
    
    List<User> findByRole(String role);
    
    @Query("SELECT u FROM User u WHERE u.active = true AND EXISTS (SELECT a FROM Assessment a WHERE a.user = u AND a.status = 'PENDING')")
    List<User> findActiveUsersWithPendingAssessments();
    
    boolean existsByUsername(String username);
    boolean existsByEmail(String email);
} 