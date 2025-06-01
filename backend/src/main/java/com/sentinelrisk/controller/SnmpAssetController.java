package com.sentinelrisk.controller;

import com.sentinelrisk.dto.AssetCreateRequest;
import com.sentinelrisk.model.Asset;
import com.sentinelrisk.service.AssetService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/snmp/assets")
@RequiredArgsConstructor
@Tag(name = "SNMP Assets", description = "API de gestion des assets SNMP")
public class SnmpAssetController {

    private final AssetService assetService;

    @GetMapping
    @PreAuthorize("hasAnyRole('ADMIN', 'RISK_MANAGER')")
    @Operation(summary = "Récupérer tous les assets SNMP")
    public ResponseEntity<List<Asset>> getAllAssets() {
        return ResponseEntity.ok(assetService.getAllAssets());
    }

    @GetMapping("/{id}")
    @PreAuthorize("hasAnyRole('ADMIN', 'RISK_MANAGER')")
    @Operation(summary = "Récupérer un asset par son ID")
    public ResponseEntity<Asset> getAssetById(@PathVariable Long id) {
        return assetService.getAssetById(id)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    @GetMapping("/active")
    @PreAuthorize("hasAnyRole('ADMIN', 'RISK_MANAGER')")
    @Operation(summary = "Récupérer tous les assets actifs")
    public ResponseEntity<List<Asset>> getActiveAssets() {
        return ResponseEntity.ok(assetService.getActiveAssets());
    }

    @GetMapping("/type/{type}")
    @PreAuthorize("hasAnyRole('ADMIN', 'RISK_MANAGER')")
    @Operation(summary = "Récupérer les assets par type")
    public ResponseEntity<List<Asset>> getAssetsByType(@PathVariable Asset.AssetType type) {
        return ResponseEntity.ok(assetService.getAssetsByType(type));
    }

    @PostMapping
    @PreAuthorize("hasAnyRole('ADMIN', 'RISK_MANAGER')")
    @Operation(summary = "Créer ou mettre à jour un asset SNMP")
    public ResponseEntity<Asset> createOrUpdateAsset(@Valid @RequestBody AssetCreateRequest request) {
        try {
            Asset asset = convertToAsset(request);
            Asset savedAsset = assetService.saveAsset(asset);
            return ResponseEntity.ok(savedAsset);
        } catch (IllegalArgumentException e) {
            return ResponseEntity.badRequest().build();
        }
    }

    @PutMapping("/{id}")
    @PreAuthorize("hasAnyRole('ADMIN', 'RISK_MANAGER')")
    @Operation(summary = "Mettre à jour un asset existant")
    public ResponseEntity<Asset> updateAsset(@PathVariable Long id, @Valid @RequestBody Asset asset) {
        if (!assetService.getAssetById(id).isPresent()) {
            return ResponseEntity.notFound().build();
        }
        
        try {
            Asset savedAsset = assetService.saveAsset(asset);
            return ResponseEntity.ok(savedAsset);
        } catch (IllegalArgumentException e) {
            return ResponseEntity.badRequest().build();
        }
    }

    @DeleteMapping("/{id}")
    @PreAuthorize("hasAnyRole('ADMIN', 'RISK_MANAGER')")
    @Operation(summary = "Supprimer un asset SNMP")
    public ResponseEntity<Void> deleteAsset(@PathVariable Long id) {
        try {
            assetService.deleteAsset(id);
            return ResponseEntity.noContent().build();
        } catch (IllegalArgumentException e) {
            return ResponseEntity.notFound().build();
        }
    }

    @PatchMapping("/{id}/toggle-status")
    @PreAuthorize("hasAnyRole('ADMIN', 'RISK_MANAGER')")
    @Operation(summary = "Activer/désactiver un asset")
    public ResponseEntity<Asset> toggleAssetStatus(@PathVariable Long id) {
        try {
            Asset updatedAsset = assetService.toggleAssetStatus(id);
            return ResponseEntity.ok(updatedAsset);
        } catch (IllegalArgumentException e) {
            return ResponseEntity.notFound().build();
        }
    }

    @GetMapping("/with-scan-configs")
    @PreAuthorize("hasAnyRole('ADMIN', 'RISK_MANAGER')")
    @Operation(summary = "Récupérer les assets avec configurations de scan actives")
    public ResponseEntity<List<Asset>> getAssetsWithActiveScanConfigs() {
        return ResponseEntity.ok(assetService.getAssetsWithActiveScanConfigs());
    }

    @GetMapping("/statistics/by-type")
    @PreAuthorize("hasAnyRole('ADMIN', 'RISK_MANAGER')")
    @Operation(summary = "Statistiques des assets par type")
    public ResponseEntity<List<Object[]>> getAssetStatisticsByType() {
        return ResponseEntity.ok(assetService.countAssetsByType());
    }

    @PostMapping("/test-connection")
    @PreAuthorize("hasAnyRole('ADMIN', 'RISK_MANAGER')")
    @Operation(summary = "Tester la connexion SNMP vers un asset")
    public ResponseEntity<Map<String, Object>> testConnection(@Valid @RequestBody AssetCreateRequest request) {
        try {
            Asset asset = convertToAsset(request);
            boolean success = assetService.testSnmpConnection(asset);
            
            Map<String, Object> response = new HashMap<>();
            response.put("success", success);
            if (!success) {
                response.put("error", "Impossible de se connecter à l'asset SNMP");
            }
            
            return ResponseEntity.ok(response);
        } catch (Exception e) {
            Map<String, Object> response = new HashMap<>();
            response.put("success", false);
            response.put("error", e.getMessage());
            return ResponseEntity.ok(response);
        }
    }

    private Asset convertToAsset(AssetCreateRequest request) {
        Asset asset = new Asset();
        asset.setHostname(request.getHostname());
        asset.setIpAddress(request.getIpAddress());
        asset.setType(request.getType());
        asset.setSnmpVersion(request.getSnmpVersion());
        asset.setPort(request.getPort());
        asset.setCommunity(request.getCommunity());
        asset.setSnmpV3User(request.getSnmpV3User());
        asset.setAuthProtocol(request.getAuthProtocol());
        asset.setAuthPass(request.getAuthPass());
        asset.setPrivProtocol(request.getPrivProtocol());
        asset.setPrivPass(request.getPrivPass());
        asset.setDescription(request.getDescription());
        asset.setActive(request.getActive());
        return asset;
    }
} 