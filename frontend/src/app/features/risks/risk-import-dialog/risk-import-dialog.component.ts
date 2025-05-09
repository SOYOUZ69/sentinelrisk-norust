import { Component, ViewChild, ElementRef, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { MatButton } from '@angular/material/button';
import { MatProgressBar } from '@angular/material/progress-bar';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatTableModule } from '@angular/material/table';
import { MatIconModule } from '@angular/material/icon';
import { MatChipsModule } from '@angular/material/chips';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatSnackBar } from '@angular/material/snack-bar';

// @ts-ignore
import * as XLSX from 'xlsx';

import { RiskService } from '../services/risk.service';
import { ImpactLevel, ProbabilityLevel } from '../../../core/models/risk.model';
import { finalize } from 'rxjs/operators';

// Log to verify XLSX is loaded correctly
console.log('XLSX module loaded:', !!XLSX);

export interface RiskImportItem {
  name: string;
  description: string;
  categoryName: string;
  impactLevel: ImpactLevel;
  probabilityLevel: ProbabilityLevel;
  mitigationPlan?: string;
  isValid: boolean;
  errors: string[];
}

@Component({
  selector: 'app-risk-import-dialog',
  templateUrl: './risk-import-dialog.component.html',
  styleUrls: ['./risk-import-dialog.component.scss'],
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    MatDialogModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatProgressBarModule,
    MatTableModule,
    MatIconModule,
    MatChipsModule,
    MatTooltipModule
  ]
})
export class RiskImportDialogComponent implements OnInit {
  @ViewChild('fileInput') fileInput!: ElementRef;
  
  fileName = '';
  isLoading = false;
  isProcessing = false;
  successCount = 0;
  errorCount = 0;
  
  // Colonnes pour la table d'aperçu
  displayedColumns: string[] = ['name', 'description', 'categoryName', 'impactLevel', 'probabilityLevel', 'mitigationPlan', 'status'];
  
  // Source de données pour la table
  dataSource = new MatTableDataSource<RiskImportItem>([]);
  
  // Valeurs valides pour les niveaux d'impact et de probabilité
  validImpactLevels = Object.values(ImpactLevel);
  validProbabilityLevels = Object.values(ProbabilityLevel);
  
  constructor(
    public dialogRef: MatDialogRef<RiskImportDialogComponent>,
    private riskService: RiskService,
    private snackBar: MatSnackBar
  ) {}
  
  ngOnInit(): void {
    // Initialisation au besoin
  }
  
  onFileSelected(event: Event): void {
    const input = event.target as HTMLInputElement;
    
    if (!input.files?.length) {
      return;
    }
    
    const file = input.files[0];
    this.fileName = file.name;
    this.isLoading = true;
    
    // Utilisation de FileReader pour lire le contenu du fichier
    const reader = new FileReader();
    
    reader.onload = (e: any) => {
      try {
        // Lire le workbook
        // @ts-ignore - Ignorer les erreurs de typage pour les appels XLSX
        const workbook = XLSX.read(e.target.result, { type: 'binary' });
        
        // Récupérer la première feuille
        const firstSheetName = workbook.SheetNames[0];
        const worksheet = workbook.Sheets[firstSheetName];
        
        // Convertir en JSON
        // @ts-ignore - Ignorer les erreurs de typage pour les appels XLSX
        const jsonData = XLSX.utils.sheet_to_json(worksheet);
        
        // Mapper et valider les données
        this.processData(jsonData);
        
      } catch (error) {
        console.error('Erreur lors de la lecture du fichier', error);
        this.snackBar.open('Erreur lors de la lecture du fichier. Format invalide.', 'Fermer', {
          duration: 5000
        });
      } finally {
        this.isLoading = false;
      }
    };
    
    reader.onerror = (error) => {
      console.error('Erreur lors de la lecture du fichier', error);
      this.isLoading = false;
      this.snackBar.open('Erreur lors de la lecture du fichier', 'Fermer', {
        duration: 5000
      });
    };
    
    // Lecture du fichier comme binary string
    reader.readAsBinaryString(file);
  }
  
  /**
   * Traite et valide les données importées
   */
  processData(data: any[]): void {
    if (!data || data.length === 0) {
      this.snackBar.open('Aucune donnée trouvée dans le fichier', 'Fermer', {
        duration: 5000
      });
      return;
    }
    
    // Mapper les données du fichier au format attendu
    const importItems: RiskImportItem[] = data.map(item => {
      const errors: string[] = [];
      
      // Vérification des champs requis
      if (!item.name) errors.push('Nom manquant');
      if (!item.description) errors.push('Description manquante');
      if (!item.categoryName) errors.push('Catégorie manquante');
      
      // Vérification des valeurs enum
      const impactLevel = String(item.impactLevel).toUpperCase();
      if (!impactLevel || !this.validImpactLevels.includes(impactLevel as ImpactLevel)) {
        errors.push(`Niveau d'impact invalide: ${item.impactLevel}. Valeurs acceptées: ${this.validImpactLevels.join(', ')}`);
      }
      
      const probabilityLevel = String(item.probabilityLevel).toUpperCase();
      if (!probabilityLevel || !this.validProbabilityLevels.includes(probabilityLevel as ProbabilityLevel)) {
        errors.push(`Niveau de probabilité invalide: ${item.probabilityLevel}. Valeurs acceptées: ${this.validProbabilityLevels.join(', ')}`);
      }
      
      return {
        name: item.name || '',
        description: item.description || '',
        categoryName: item.categoryName || '',
        impactLevel: impactLevel as ImpactLevel,
        probabilityLevel: probabilityLevel as ProbabilityLevel,
        mitigationPlan: item.mitigationPlan || '',
        isValid: errors.length === 0,
        errors: errors
      };
    });
    
    // Mettre à jour la source de données
    this.dataSource.data = importItems;
    
    // Vérifier si tous les éléments sont valides
    this.errorCount = importItems.filter(item => !item.isValid).length;
    this.successCount = importItems.length - this.errorCount;
    
    if (this.errorCount > 0) {
      this.snackBar.open(`${this.errorCount} ligne(s) contiennent des erreurs. Corrigez-les avant d'importer.`, 'OK', {
        duration: 5000
      });
    } else {
      this.snackBar.open(`${importItems.length} risque(s) prêt(s) à être importé(s)`, 'OK', {
        duration: 3000
      });
    }
  }
  
  /**
   * Lance l'import vers le backend
   */
  importRisks(): void {
    const validItems = this.dataSource.data.filter(item => item.isValid);
    
    if (validItems.length === 0) {
      this.snackBar.open('Aucun risque valide à importer', 'Fermer', {
        duration: 3000
      });
      return;
    }
    
    this.isProcessing = true;
    
    this.riskService.bulkCreate(validItems)
      .pipe(finalize(() => this.isProcessing = false))
      .subscribe({
        next: (response) => {
          this.snackBar.open(`Import terminé : ${response.length} risque(s) créé(s)`, 'OK', {
            duration: 5000
          });
          this.dialogRef.close(true); // Ferme avec succès
        },
        error: (error) => {
          console.error('Erreur lors de l\'import', error);
          this.snackBar.open(`Erreur lors de l'import : ${error.message || 'Erreur inconnue'}`, 'Fermer', {
            duration: 5000
          });
        }
      });
  }
  
  onCancel(): void {
    this.dialogRef.close(false);
  }
  
  triggerFileInput(): void {
    this.fileInput.nativeElement.click();
  }
  
  /**
   * Renvoie une classe CSS basée sur la validité de l'élément
   */
  getRowClass(item: RiskImportItem): string {
    return item.isValid ? 'valid-row' : 'invalid-row';
  }
} 