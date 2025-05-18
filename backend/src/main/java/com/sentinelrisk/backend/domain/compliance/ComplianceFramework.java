package com.sentinelrisk.backend.domain.compliance;

import jakarta.persistence.*;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.annotations.UpdateTimestamp;

import java.time.LocalDateTime;
import java.util.HashSet;
import java.util.Set;

@Entity
@Table(name = "compliance_frameworks", uniqueConstraints = {
    @UniqueConstraint(columnNames = {"name", "version"})
})
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class ComplianceFramework {
    
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    
    @NotBlank
    @Size(max = 100)
    @Column(nullable = false)
    private String name;
    
    @NotBlank
    @Size(max = 50)
    @Column(nullable = false)
    private String version;
    
    @Size(max = 1000)
    @Column(length = 1000)
    private String description;
    
    @OneToMany(mappedBy = "framework", cascade = CascadeType.ALL, orphanRemoval = true)
    private Set<ComplianceRequirement> requirements = new HashSet<>();
    
    @CreationTimestamp
    @Column(name = "created_at", nullable = false, updatable = false)
    private LocalDateTime createdAt;
    
    @UpdateTimestamp
    @Column(name = "updated_at")
    private LocalDateTime updatedAt;
    
    // Méthode utilitaire pour ajouter un requirement
    public void addRequirement(ComplianceRequirement requirement) {
        requirements.add(requirement);
        requirement.setFramework(this);
    }
    
    // Méthode utilitaire pour retirer un requirement
    public void removeRequirement(ComplianceRequirement requirement) {
        requirements.remove(requirement);
        requirement.setFramework(null);
    }
} 