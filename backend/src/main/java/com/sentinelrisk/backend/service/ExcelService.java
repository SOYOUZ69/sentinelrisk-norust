package com.sentinelrisk.backend.service;

import com.sentinelrisk.backend.model.Category;
import com.sentinelrisk.backend.model.Risk;
import org.apache.poi.ss.usermodel.*;
import org.apache.poi.ss.util.CellRangeAddressList;
import org.apache.poi.xssf.usermodel.XSSFDataValidation;
import org.apache.poi.xssf.usermodel.XSSFDataValidationConstraint;
import org.apache.poi.xssf.usermodel.XSSFDataValidationHelper;
import org.apache.poi.xssf.usermodel.XSSFSheet;
import org.apache.poi.xssf.usermodel.XSSFWorkbook;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.io.ByteArrayOutputStream;
import java.io.IOException;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;
import java.util.stream.Collectors;
import java.lang.reflect.Field;

@Service
public class ExcelService {

    private final CategoryService categoryService;

    @Autowired
    public ExcelService(CategoryService categoryService) {
        this.categoryService = categoryService;
    }

    /**
     * Génère un template Excel pour l'import de risques avec des listes déroulantes
     * pour les colonnes categoryId, impactLevel et probabilityLevel
     *
     * @return Le fichier Excel sous forme de tableau de bytes
     * @throws IOException En cas d'erreur lors de la génération du fichier
     */
    public byte[] generateRiskImportTemplate() throws IOException {
        try (XSSFWorkbook workbook = new XSSFWorkbook()) {
            // Créer une feuille pour les données
            XSSFSheet sheet = workbook.createSheet("Import Risques");

            // Créer une feuille cachée pour les listes de référence
            XSSFSheet hiddenSheet = workbook.createSheet("Données de référence");
            workbook.setSheetHidden(workbook.getSheetIndex(hiddenSheet), true);

            // Créer le style pour les en-têtes
            CellStyle headerStyle = workbook.createCellStyle();
            Font headerFont = workbook.createFont();
            headerFont.setBold(true);
            headerStyle.setFont(headerFont);
            headerStyle.setFillForegroundColor(IndexedColors.LIGHT_BLUE.getIndex());
            headerStyle.setFillPattern(FillPatternType.SOLID_FOREGROUND);
            headerStyle.setBorderBottom(BorderStyle.THIN);
            headerStyle.setBorderTop(BorderStyle.THIN);
            headerStyle.setBorderLeft(BorderStyle.THIN);
            headerStyle.setBorderRight(BorderStyle.THIN);

            // Créer la ligne d'en-tête
            Row headerRow = sheet.createRow(0);
            String[] headers = {"name", "description", "categoryName", "impactLevel", "probabilityLevel", "mitigationPlan"};
            
            for (int i = 0; i < headers.length; i++) {
                Cell cell = headerRow.createCell(i);
                cell.setCellValue(headers[i]);
                cell.setCellStyle(headerStyle);
                sheet.setColumnWidth(i, 256 * 20); // 20 caractères de large
            }

            // Récupérer dynamiquement les catégories depuis la base de données
            List<Category> categories = categoryService.getAllCategories();
            
            // Extraire les noms des catégories avec gestion des erreurs
            List<String> categoryNamesList = new ArrayList<>();
            for (Category category : categories) {
                try {
                    // Accès par réflexion au champ 'name'
                    Field nameField = Category.class.getDeclaredField("name");
                    nameField.setAccessible(true);
                    String name = (String) nameField.get(category);
                    categoryNamesList.add(name);
                } catch (Exception e) {
                    // Si erreur, utiliser un nom par défaut
                    categoryNamesList.add("Catégorie " + categoryNamesList.size() + 1);
                }
            }
            
            // Si aucune catégorie n'existe, créer une liste par défaut
            if (categoryNamesList.isEmpty()) {
                categoryNamesList.add("Catégorie par défaut");
            }
            
            String[] categoryNames = categoryNamesList.toArray(new String[0]);

            // Utiliser Arrays.stream pour les valeurs des énumérations
            String[] impactLevels = Arrays.stream(Risk.ImpactLevel.values())
                                           .map(Enum::name)
                                           .toArray(String[]::new);
            
            String[] probabilityLevels = Arrays.stream(Risk.ProbabilityLevel.values())
                                               .map(Enum::name)
                                               .toArray(String[]::new);

            // Créer les listes de référence dans la feuille cachée
            // 1. Catégories
            createNamedRangeForValidation(workbook, hiddenSheet, categoryNames, "Categories", 0);
            
            // 2. Niveaux d'impact
            createNamedRangeForValidation(workbook, hiddenSheet, impactLevels, "ImpactLevels", 1);
            
            // 3. Niveaux de probabilité
            createNamedRangeForValidation(workbook, hiddenSheet, probabilityLevels, "ProbabilityLevels", 2);

            // Ajouter les validations de données (listes déroulantes)
            XSSFDataValidationHelper dvHelper = new XSSFDataValidationHelper(sheet);
            
            // 1. Validation pour categoryName (colonne C = index 2)
            addValidationToColumn(sheet, dvHelper, "Categories", 1, 1000, 2);
            
            // 2. Validation pour impactLevel (colonne D = index 3)
            addValidationToColumn(sheet, dvHelper, "ImpactLevels", 1, 1000, 3);
            
            // 3. Validation pour probabilityLevel (colonne E = index 4)
            addValidationToColumn(sheet, dvHelper, "ProbabilityLevels", 1, 1000, 4);

            // Écrire le workbook dans un ByteArrayOutputStream
            ByteArrayOutputStream outputStream = new ByteArrayOutputStream();
            workbook.write(outputStream);
            return outputStream.toByteArray();
        }
    }

    /**
     * Crée une plage nommée pour une liste de validation
     */
    private void createNamedRangeForValidation(XSSFWorkbook workbook, Sheet hiddenSheet, String[] values, String rangeName, int columnIndex) {
        for (int i = 0; i < values.length; i++) {
            Row row = hiddenSheet.getRow(i);
            if (row == null) {
                row = hiddenSheet.createRow(i);
            }
            Cell cell = row.createCell(columnIndex);
            cell.setCellValue(values[i]);
        }
        
        // Créer une plage nommée pour la liste
        workbook.createName().setNameName(rangeName);
        workbook.getName(rangeName).setRefersToFormula("'Données de référence'!$" + 
            (char)('A' + columnIndex) + "$1:$" + (char)('A' + columnIndex) + "$" + values.length);
    }

    /**
     * Ajoute une validation de données à une colonne
     */
    private void addValidationToColumn(XSSFSheet sheet, XSSFDataValidationHelper dvHelper, String rangeName, 
                                      int firstRow, int lastRow, int columnIndex) {
        CellRangeAddressList addressList = new CellRangeAddressList(firstRow, lastRow, columnIndex, columnIndex);
        XSSFDataValidationConstraint dvConstraint = (XSSFDataValidationConstraint)
                dvHelper.createFormulaListConstraint(rangeName);
        XSSFDataValidation validation = (XSSFDataValidation)
                dvHelper.createValidation(dvConstraint, addressList);
        validation.setShowErrorBox(true);
        sheet.addValidationData(validation);
    }
} 