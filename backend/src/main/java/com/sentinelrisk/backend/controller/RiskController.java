package com.sentinelrisk.backend.controller;

import com.sentinelrisk.backend.dto.RiskRequest;
import com.sentinelrisk.backend.dto.RiskResponse;
import com.sentinelrisk.backend.model.Risk;
import com.sentinelrisk.backend.service.RiskService;
import com.sentinelrisk.backend.service.CategoryService;
import com.sentinelrisk.backend.service.ExcelService;
import com.sentinelrisk.backend.dto.ImportResult;
import com.sentinelrisk.backend.dto.ImportError;
import com.sentinelrisk.backend.dto.BulkRiskRequest;
import com.sentinelrisk.backend.dto.BulkResponse;
import com.sentinelrisk.backend.model.Category;

import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.Parameter;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.List;
import org.springframework.validation.annotation.Validated;
import jakarta.persistence.EntityNotFoundException;
import org.springframework.http.MediaType;
import org.springframework.http.HttpHeaders;
import org.springframework.web.multipart.MultipartFile;

import org.apache.poi.ss.usermodel.*;
import org.apache.poi.xssf.usermodel.XSSFWorkbook;
import org.apache.poi.hssf.usermodel.HSSFWorkbook;

import java.io.IOException;
import java.io.InputStream;
import java.util.HashMap;
import java.util.Map;
import org.springframework.security.access.prepost.PreAuthorize;

@RestController
@RequestMapping("/api/risks")
@RequiredArgsConstructor
@Tag(name = "Risk Management", description = "Endpoints pour la gestion des risques")
public class RiskController {

    private final RiskService riskService;
    private final CategoryService categoryService;
    private final ExcelService excelService;

    @GetMapping
    @Operation(summary = "Lister tous les risques",
            description = "Récupère la liste complète des risques du système")
    @ApiResponse(responseCode = "200", description = "Liste des risques récupérée avec succès")
    @PreAuthorize("hasAnyAuthority('ROLE_ADMIN', 'ROLE_RISK_MANAGER', 'ROLE_COMPLIANCE_OFFICER', 'ROLE_AUDITOR', 'ROLE_USER')")
    public ResponseEntity<List<RiskResponse>> getAllRisks() {
        return ResponseEntity.ok(riskService.getAllRisks());
    }

    @GetMapping("/{id}")
    @Operation(summary = "Obtenir un risque par ID",
            description = "Récupère les détails d'un risque spécifique via son ID")
    @ApiResponse(responseCode = "200", description = "Risque trouvé")
    @ApiResponse(responseCode = "404", description = "Risque non trouvé")
    @PreAuthorize("hasAnyAuthority('ROLE_ADMIN', 'ROLE_RISK_MANAGER', 'ROLE_COMPLIANCE_OFFICER', 'ROLE_AUDITOR', 'ROLE_USER')")
    public ResponseEntity<RiskResponse> getRiskById(
            @Parameter(description = "ID du risque à récupérer") 
            @PathVariable Long id) {
        return ResponseEntity.ok(riskService.getRiskById(id));
    }

    @PostMapping
    @Operation(summary = "Créer un risque",
            description = "Crée un nouveau risque dans le système")
    @ApiResponse(responseCode = "201", description = "Risque créé avec succès")
    @ApiResponse(responseCode = "400", description = "Données du risque invalides")
    @PreAuthorize("hasAnyAuthority('ROLE_ADMIN', 'ROLE_RISK_MANAGER')")
    public ResponseEntity<RiskResponse> createRisk(
            @Parameter(description = "Données du risque à créer") 
            @Valid @RequestBody RiskRequest riskRequest) {
        RiskResponse createdRisk = riskService.createRisk(riskRequest);
        return ResponseEntity.status(HttpStatus.CREATED).body(createdRisk);
    }

    @PutMapping("/{id}")
    @Operation(summary = "Mettre à jour un risque",
            description = "Met à jour les informations d'un risque existant")
    @ApiResponse(responseCode = "200", description = "Risque mis à jour avec succès")
    @ApiResponse(responseCode = "404", description = "Risque non trouvé")
    @PreAuthorize("hasAnyAuthority('ROLE_ADMIN', 'ROLE_RISK_MANAGER')")
    public ResponseEntity<RiskResponse> updateRisk(
            @Parameter(description = "ID du risque à mettre à jour") 
            @PathVariable Long id,
            @Parameter(description = "Nouvelles données du risque") 
            @Valid @RequestBody RiskRequest riskRequest) {
        return ResponseEntity.ok(riskService.updateRisk(id, riskRequest));
    }

    @PutMapping("/{id}/controls")
    @Operation(summary = "Mettre à jour les contrôles associés à un risque",
            description = "Met à jour la liste des contrôles associés à un risque existant")
    @ApiResponse(responseCode = "200", description = "Contrôles du risque mis à jour avec succès")
    @ApiResponse(responseCode = "404", description = "Risque non trouvé")
    @PreAuthorize("hasAnyAuthority('ROLE_ADMIN', 'ROLE_RISK_MANAGER')")
    public ResponseEntity<RiskResponse> updateRiskControls(
            @Parameter(description = "ID du risque à mettre à jour") 
            @PathVariable Long id,
            @Parameter(description = "IDs des contrôles à associer") 
            @RequestBody List<Long> controlIds) {
        
        // Ajout de logs détaillés
        System.out.println("===========================================");
        System.out.println("ENDPOINT APPELÉ: PUT /risks/{id}/controls");
        System.out.println("ID du risque: " + id);
        System.out.println("IDs des contrôles reçus: " + controlIds);
        try {
            RiskResponse result = riskService.updateRiskControls(id, controlIds);
            System.out.println("Contrôles mis à jour avec succès pour le risque " + id);
            return ResponseEntity.ok(result);
        } catch (Exception e) {
            System.err.println("ERREUR lors de la mise à jour des contrôles du risque " + id);
            e.printStackTrace();
            throw e;
        }
    }

    @DeleteMapping("/{id}")
    @Operation(summary = "Supprimer un risque",
            description = "Supprime un risque du système")
    @ApiResponse(responseCode = "204", description = "Risque supprimé avec succès")
    @ApiResponse(responseCode = "404", description = "Risque non trouvé")
    @PreAuthorize("hasAnyAuthority('ROLE_ADMIN', 'ROLE_RISK_MANAGER')")
    public ResponseEntity<Void> deleteRisk(
            @Parameter(description = "ID du risque à supprimer") 
            @PathVariable Long id) {
        riskService.deleteRisk(id);
        return ResponseEntity.noContent().build();
    }

    @GetMapping("/high-score")
    @Operation(summary = "Lister les risques à score élevé",
            description = "Récupère la liste des risques ayant un score supérieur à un seuil défini")
    @ApiResponse(responseCode = "200", description = "Liste des risques à score élevé récupérée avec succès")
    @PreAuthorize("hasAnyAuthority('ROLE_ADMIN', 'ROLE_RISK_MANAGER', 'ROLE_COMPLIANCE_OFFICER', 'ROLE_AUDITOR', 'ROLE_USER')")
    public ResponseEntity<List<RiskResponse>> getHighScoreRisks(
            @Parameter(description = "Score minimum pour filtrer les risques") 
            @RequestParam(defaultValue = "75") int minScore) {
        return ResponseEntity.ok(riskService.getHighRisks(minScore));
    }

    @GetMapping("/category/{id}")
    @Operation(summary = "Lister les risques par catégorie",
            description = "Récupère la liste des risques appartenant à une catégorie spécifique")
    @ApiResponse(responseCode = "200", description = "Liste des risques de la catégorie récupérée avec succès")
    @ApiResponse(responseCode = "404", description = "Catégorie non trouvée")
    @PreAuthorize("hasAnyAuthority('ROLE_ADMIN', 'ROLE_RISK_MANAGER', 'ROLE_COMPLIANCE_OFFICER', 'ROLE_AUDITOR', 'ROLE_USER')")
    public ResponseEntity<List<RiskResponse>> getRisksByCategory(
            @Parameter(description = "ID de la catégorie") 
            @PathVariable Long id) {
        return ResponseEntity.ok(riskService.getRisksByCategory(id));
    }

    /**
     * Endpoint pour la création en masse de risques
     * @param requests Liste de requêtes de création de risques
     * @return Liste des risques créés avec statut 201 Created ou 207 Multi-Status en cas d'erreurs partielles
     */
    @PostMapping("/bulk")
    @Operation(summary = "Créer des risques en masse par API JSON",
            description = "Crée plusieurs risques en une seule requête")
    @ApiResponse(responseCode = "201", description = "Risques créés avec succès")
    @ApiResponse(responseCode = "207", description = "Certains risques créés avec des erreurs")
    @PreAuthorize("hasAnyAuthority('ROLE_ADMIN', 'ROLE_RISK_MANAGER')")
    public ResponseEntity<?> bulkCreate(@RequestBody @Validated List<BulkRiskRequest> requests) {
        if (requests == null || requests.isEmpty()) {
            return ResponseEntity.badRequest().body("Aucune donnée fournie pour l'import");
        }
        
        List<RiskResponse> successfullyCreated = new ArrayList<>();
        List<BulkResponse.Error> errors = new ArrayList<>();
        
        // Traiter chaque risque individuellement
        for (int i = 0; i < requests.size(); i++) {
            BulkRiskRequest request = requests.get(i);
            try {
                // Rechercher la catégorie par nom si fourni
                Category category = null;
                if (request.getCategoryName() != null && !request.getCategoryName().trim().isEmpty()) {
                    try {
                        category = categoryService.getCategoryByName(request.getCategoryName());
                    } catch (EntityNotFoundException e) {
                        errors.add(new BulkResponse.Error(i, "Catégorie non trouvée: " + request.getCategoryName()));
                        continue;
                    }
                } else if (request.getCategoryId() != null) {
                    try {
                        category = categoryService.getCategoryById(request.getCategoryId());
                    } catch (EntityNotFoundException e) {
                        errors.add(new BulkResponse.Error(i, "Catégorie non trouvée avec ID: " + request.getCategoryId()));
                        continue;
                    }
                } else {
                    errors.add(new BulkResponse.Error(i, "Aucune catégorie spécifiée"));
                    continue;
                }
                
                // Créer un objet RiskRequest à partir du BulkRiskRequest
                RiskRequest riskRequest = convertBulkToStandard(request, category.getId());
                
                // Créer le risque en utilisant le service existant
                RiskResponse createdRisk = riskService.createRisk(riskRequest);
                successfullyCreated.add(createdRisk);
                
            } catch (Exception e) {
                // Capturer toute erreur et l'ajouter à la liste des erreurs
                errors.add(new BulkResponse.Error(i, e.getMessage()));
            }
        }
        
        // Déterminer la réponse en fonction des résultats
        if (errors.isEmpty()) {
            // Tous les risques ont été créés avec succès
            return ResponseEntity.status(HttpStatus.CREATED).body(successfullyCreated);
        } else if (successfullyCreated.isEmpty()) {
            // Aucun risque n'a été créé
            return ResponseEntity.status(HttpStatus.BAD_REQUEST)
                    .body(new BulkResponse<>(successfullyCreated, errors));
        } else {
            // Certains risques ont été créés, d'autres ont échoué
            return ResponseEntity.status(HttpStatus.MULTI_STATUS)
                    .body(new BulkResponse<>(successfullyCreated, errors));
        }
    }
    
    /**
     * Convertit un BulkRiskRequest en RiskRequest standard
     */
    private RiskRequest convertBulkToStandard(BulkRiskRequest bulkRequest, Long categoryId) {
        RiskRequest request = new RiskRequest();
        request.setName(bulkRequest.getName());
        request.setDescription(bulkRequest.getDescription());
        request.setCategoryId(categoryId);
        request.setImpactLevel(bulkRequest.getImpactLevel());
        request.setProbabilityLevel(bulkRequest.getProbabilityLevel());
        request.setStatus(bulkRequest.getStatus() != null ? bulkRequest.getStatus() : Risk.Status.IDENTIFIED); // Valeur par défaut
        request.setMitigationPlan(bulkRequest.getMitigationPlan());
        return request;
    }

    /**
     * Endpoint pour télécharger un template Excel pour l'import de risques
     * @return Le fichier Excel avec les en-têtes et les listes déroulantes
     */
    @GetMapping(value = "/template", produces = "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet")
    @Operation(summary = "Télécharger un template Excel pour l'import de risques",
            description = "Génère un fichier Excel avec les en-têtes et les listes déroulantes pour l'import de risques")
    @ApiResponse(responseCode = "200", description = "Template généré avec succès")
    @PreAuthorize("hasAnyAuthority('ROLE_ADMIN', 'ROLE_RISK_MANAGER', 'ROLE_COMPLIANCE_OFFICER')")
    public ResponseEntity<byte[]> downloadTemplate() {
        try {
            byte[] excelContent = excelService.generateRiskImportTemplate();
            
            HttpHeaders headers = new HttpHeaders();
            headers.add(HttpHeaders.CONTENT_DISPOSITION, "attachment; filename=risk_import_template.xlsx");
            
            return ResponseEntity
                    .ok()
                    .headers(headers)
                    .body(excelContent);
        } catch (IOException e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
    }

    /**
     * Endpoint pour l'import CSV ou Excel en masse des risques
     */
    @PostMapping(value = "/bulk", consumes = MediaType.MULTIPART_FORM_DATA_VALUE, produces = MediaType.APPLICATION_JSON_VALUE)
    @Operation(summary = "Importer des risques en masse",
            description = "Importe des risques à partir d'un fichier CSV ou Excel")
    @ApiResponse(responseCode = "200", description = "Import réussi")
    @ApiResponse(responseCode = "207", description = "Import partiellement réussi avec des erreurs")
    @ApiResponse(responseCode = "400", description = "Fichier invalide")
    @PreAuthorize("hasAnyAuthority('ROLE_ADMIN', 'ROLE_RISK_MANAGER')")
    public ResponseEntity<ImportResult> importRisks(@RequestParam("file") MultipartFile file) {
        if (file.isEmpty()) {
            ImportResult result = new ImportResult(0);
            result.getErrors().add(new ImportError(0, "file", "Le fichier est vide"));
            return ResponseEntity.badRequest().body(result);
        }
        
        try {
            // Déterminer le type de fichier (CSV ou Excel)
            Workbook workbook = null;
            String filename = file.getOriginalFilename();
            
            if (filename != null && filename.endsWith(".xlsx")) {
                workbook = new XSSFWorkbook(file.getInputStream());
            } else if (filename != null && filename.endsWith(".xls")) {
                workbook = new HSSFWorkbook(file.getInputStream());
            } else if (filename != null && filename.endsWith(".csv")) {
                // Pour les fichiers CSV, on utilise la méthode existante
                return processCSVFile(file);
            } else {
                ImportResult result = new ImportResult(0);
                result.getErrors().add(new ImportError(0, "file", "Format de fichier non supporté. Utilisez .xlsx, .xls ou .csv"));
                return ResponseEntity.badRequest().body(result);
            }
            
            return processExcelFile(workbook);
            
        } catch (Exception e) {
            ImportResult result = new ImportResult(0);
            result.getErrors().add(new ImportError(0, "file", "Erreur lors du traitement du fichier: " + e.getMessage()));
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(result);
        }
    }
    
    /**
     * Traite un fichier Excel pour l'import de risques
     */
    private ResponseEntity<ImportResult> processExcelFile(Workbook workbook) {
        Sheet sheet = workbook.getSheetAt(0);
        Row headerRow = sheet.getRow(0);
        
        if (headerRow == null) {
            ImportResult result = new ImportResult(0);
            result.getErrors().add(new ImportError(0, "file", "Le fichier ne contient pas d'en-tête"));
            return ResponseEntity.badRequest().body(result);
        }
        
        // Mapper les colonnes aux indices
        Map<String, Integer> columnMap = new HashMap<>();
        for (int i = 0; i < headerRow.getLastCellNum(); i++) {
            Cell cell = headerRow.getCell(i);
            if (cell != null) {
                columnMap.put(cell.getStringCellValue().trim(), i);
            }
        }
        
        // Vérifier que toutes les colonnes requises sont présentes
        String[] requiredColumns = {"name", "categoryName", "impactLevel", "probabilityLevel"};
        List<String> missingColumns = new ArrayList<>();
        
        for (String column : requiredColumns) {
            if (!columnMap.containsKey(column)) {
                missingColumns.add(column);
            }
        }
        
        if (!missingColumns.isEmpty()) {
            ImportResult result = new ImportResult(0);
            result.getErrors().add(new ImportError(0, "headers", "Colonnes obligatoires manquantes: " + String.join(", ", missingColumns)));
            return ResponseEntity.badRequest().body(result);
        }
        
        // Traiter chaque ligne
        List<RiskResponse> successfullyCreated = new ArrayList<>();
        List<ImportError> errors = new ArrayList<>();
        
        for (int i = 1; i <= sheet.getLastRowNum(); i++) {
            Row row = sheet.getRow(i);
            if (row == null) continue;
            
            try {
                // Créer un objet BulkRiskRequest à partir des valeurs de la ligne
                BulkRiskRequest request = new BulkRiskRequest();
                
                // Extraire les valeurs des cellules
                Cell nameCell = row.getCell(columnMap.get("name"));
                if (nameCell == null) {
                    errors.add(new ImportError(i + 1, "name", "Le nom est obligatoire"));
                    continue;
                }
                request.setName(getCellValueAsString(nameCell));
                
                Cell descriptionCell = row.getCell(columnMap.get("description"));
                if (descriptionCell != null) {
                    request.setDescription(getCellValueAsString(descriptionCell));
                }
                
                Cell categoryCell = row.getCell(columnMap.get("categoryName"));
                if (categoryCell == null) {
                    errors.add(new ImportError(i + 1, "categoryName", "La catégorie est obligatoire"));
                    continue;
                }
                request.setCategoryName(getCellValueAsString(categoryCell));
                
                Cell impactCell = row.getCell(columnMap.get("impactLevel"));
                if (impactCell != null) {
                    String impactValue = getCellValueAsString(impactCell);
                    try {
                        request.setImpactLevel(Risk.ImpactLevel.valueOf(impactValue));
                    } catch (IllegalArgumentException e) {
                        errors.add(new ImportError(i + 1, "impactLevel", "Niveau d'impact invalide: " + impactValue));
                        continue;
                    }
                } else {
                    errors.add(new ImportError(i + 1, "impactLevel", "Le niveau d'impact est obligatoire"));
                    continue;
                }
                
                Cell probabilityCell = row.getCell(columnMap.get("probabilityLevel"));
                if (probabilityCell != null) {
                    String probabilityValue = getCellValueAsString(probabilityCell);
                    try {
                        request.setProbabilityLevel(Risk.ProbabilityLevel.valueOf(probabilityValue));
                    } catch (IllegalArgumentException e) {
                        errors.add(new ImportError(i + 1, "probabilityLevel", "Niveau de probabilité invalide: " + probabilityValue));
                        continue;
                    }
                } else {
                    errors.add(new ImportError(i + 1, "probabilityLevel", "Le niveau de probabilité est obligatoire"));
                    continue;
                }
                
                Cell mitigationCell = row.getCell(columnMap.get("mitigationPlan"));
                if (mitigationCell != null) {
                    request.setMitigationPlan(getCellValueAsString(mitigationCell));
                }
                
                // Rechercher la catégorie
                Category category = null;
                try {
                    category = categoryService.getCategoryByName(request.getCategoryName());
                } catch (EntityNotFoundException e) {
                    errors.add(new ImportError(i + 1, "categoryName", "Catégorie non trouvée: " + request.getCategoryName()));
                    continue;
                }
                
                // Créer un objet RiskRequest à partir du BulkRiskRequest
                RiskRequest riskRequest = new RiskRequest();
                riskRequest.setName(request.getName());
                riskRequest.setDescription(request.getDescription());
                riskRequest.setCategoryId(category.getId());
                riskRequest.setImpactLevel(request.getImpactLevel());
                riskRequest.setProbabilityLevel(request.getProbabilityLevel());
                riskRequest.setStatus(Risk.Status.IDENTIFIED); // Valeur par défaut
                riskRequest.setMitigationPlan(request.getMitigationPlan());
                
                // Créer le risque en utilisant le service existant
                RiskResponse createdRisk = riskService.createRisk(riskRequest);
                successfullyCreated.add(createdRisk);
                
            } catch (Exception e) {
                errors.add(new ImportError(i + 1, "general", e.getMessage()));
            }
        }
        
        // Créer l'objet de résultat
        ImportResult result = new ImportResult(successfullyCreated.size(), errors);
        
        // Déterminer la réponse en fonction des résultats
        if (errors.isEmpty()) {
            // Tous les risques ont été créés avec succès
            return ResponseEntity.status(HttpStatus.CREATED).body(result);
        } else if (successfullyCreated.isEmpty()) {
            // Aucun risque n'a été créé
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(result);
        } else {
            // Certains risques ont été créés, d'autres ont échoué
            return ResponseEntity.status(HttpStatus.MULTI_STATUS).body(result);
        }
    }
    
    /**
     * Traite un fichier CSV pour l'import de risques
     */
    private ResponseEntity<ImportResult> processCSVFile(MultipartFile file) throws IOException {
        // Lire le contenu du fichier
        String content = new String(file.getBytes());
        String[] lines = content.split("\n");
        
        if (lines.length <= 1) {
            ImportResult result = new ImportResult(0);
            result.getErrors().add(new ImportError(0, "file", "Le fichier ne contient pas de données"));
            return ResponseEntity.badRequest().body(result);
        }
        
        // Analyser l'en-tête pour déterminer les colonnes
        String[] headers = lines[0].split(",");
        
        // Préparer les listes pour stocker les résultats
        List<RiskResponse> successfullyCreated = new ArrayList<>();
        List<ImportError> errors = new ArrayList<>();
        
        // Traiter chaque ligne (sauf l'en-tête)
        for (int i = 1; i < lines.length; i++) {
            try {
                String line = lines[i].trim();
                if (line.isEmpty()) continue;
                
                // Analyser la ligne CSV (gestion basique, à améliorer pour les champs entre guillemets)
                String[] values = line.split(",");
                
                // Créer un objet BulkRiskRequest à partir des valeurs CSV
                BulkRiskRequest request = new BulkRiskRequest();
                
                // Remplir les champs en fonction des en-têtes
                for (int j = 0; j < headers.length && j < values.length; j++) {
                    String header = headers[j].trim();
                    String value = values[j].trim();
                    
                    // Enlever les guillemets si présents
                    if (value.startsWith("\"") && value.endsWith("\"")) {
                        value = value.substring(1, value.length() - 1);
                    }
                    
                    switch (header) {
                        case "name":
                            request.setName(value);
                            break;
                        case "description":
                            request.setDescription(value);
                            break;
                        case "categoryName":
                            request.setCategoryName(value);
                            break;
                        case "impactLevel":
                            try {
                                request.setImpactLevel(Risk.ImpactLevel.valueOf(value));
                            } catch (IllegalArgumentException e) {
                                errors.add(new ImportError(i + 1, "impactLevel", "Niveau d'impact invalide: " + value));
                            }
                            break;
                        case "probabilityLevel":
                            try {
                                request.setProbabilityLevel(Risk.ProbabilityLevel.valueOf(value));
                            } catch (IllegalArgumentException e) {
                                errors.add(new ImportError(i + 1, "probabilityLevel", "Niveau de probabilité invalide: " + value));
                            }
                            break;
                        case "mitigationPlan":
                            request.setMitigationPlan(value);
                            break;
                    }
                }
                
                // Vérifier les champs obligatoires
                if (request.getName() == null || request.getName().isEmpty()) {
                    errors.add(new ImportError(i + 1, "name", "Le nom est obligatoire"));
                    continue;
                }
                
                // Rechercher la catégorie
                Category category = null;
                if (request.getCategoryName() != null && !request.getCategoryName().trim().isEmpty()) {
                    try {
                        category = categoryService.getCategoryByName(request.getCategoryName());
                    } catch (EntityNotFoundException e) {
                        errors.add(new ImportError(i + 1, "categoryName", "Catégorie non trouvée: " + request.getCategoryName()));
                        continue;
                    }
                } else {
                    errors.add(new ImportError(i + 1, "categoryName", "Catégorie manquante"));
                    continue;
                }
                
                // Créer un objet RiskRequest à partir du BulkRiskRequest
                RiskRequest riskRequest = new RiskRequest();
                riskRequest.setName(request.getName());
                riskRequest.setDescription(request.getDescription());
                riskRequest.setCategoryId(category.getId());
                riskRequest.setImpactLevel(request.getImpactLevel());
                riskRequest.setProbabilityLevel(request.getProbabilityLevel());
                riskRequest.setStatus(Risk.Status.IDENTIFIED); // Valeur par défaut
                riskRequest.setMitigationPlan(request.getMitigationPlan());
                
                // Créer le risque en utilisant le service existant
                RiskResponse createdRisk = riskService.createRisk(riskRequest);
                successfullyCreated.add(createdRisk);
                
            } catch (Exception e) {
                errors.add(new ImportError(i + 1, "general", e.getMessage()));
            }
        }
        
        // Créer l'objet de résultat
        ImportResult result = new ImportResult(successfullyCreated.size(), errors);
        
        // Déterminer la réponse en fonction des résultats
        if (errors.isEmpty()) {
            // Tous les risques ont été créés avec succès
            return ResponseEntity.status(HttpStatus.CREATED).body(result);
        } else if (successfullyCreated.isEmpty()) {
            // Aucun risque n'a été créé
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(result);
        } else {
            // Certains risques ont été créés, d'autres ont échoué
            return ResponseEntity.status(HttpStatus.MULTI_STATUS).body(result);
        }
    }
    
    /**
     * Récupère la valeur d'une cellule Excel sous forme de chaîne de caractères
     */
    private String getCellValueAsString(Cell cell) {
        if (cell == null) return "";
        
        switch (cell.getCellType()) {
            case STRING:
                return cell.getStringCellValue();
            case NUMERIC:
                if (DateUtil.isCellDateFormatted(cell)) {
                    return cell.getLocalDateTimeCellValue().toString();
                } else {
                    // Pour éviter les valeurs comme "1.0" pour les entiers
                    double value = cell.getNumericCellValue();
                    if (value == Math.floor(value)) {
                        return String.valueOf((int) value);
                    } else {
                        return String.valueOf(value);
                    }
                }
            case BOOLEAN:
                return String.valueOf(cell.getBooleanCellValue());
            case FORMULA:
                try {
                    return cell.getStringCellValue();
                } catch (Exception e) {
                    try {
                        return String.valueOf(cell.getNumericCellValue());
                    } catch (Exception ex) {
                        return cell.getCellFormula();
                    }
                }
            default:
                return "";
        }
    }
}