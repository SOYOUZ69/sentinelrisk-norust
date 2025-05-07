import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatDialog } from '@angular/material/dialog';
import { RiskService } from '../services/risk.service';
import { Risk } from '../../../core/models/risk.model';
import { finalize } from 'rxjs/operators';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatChipsModule } from '@angular/material/chips';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatDividerModule } from '@angular/material/divider';
import { RiskFormDialogComponent } from '../risk-form-dialog/risk-form-dialog.component';
import { RiskControlMappingDialogComponent } from '../risk-control-mapping-dialog/risk-control-mapping-dialog.component';

@Component({
  selector: 'app-risk-detail',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    MatCardModule,
    MatIconModule,
    MatButtonModule,
    MatProgressSpinnerModule,
    MatChipsModule,
    MatTooltipModule,
    MatExpansionModule,
    MatDividerModule
  ],
  templateUrl: './risk-detail.component.html',
  styleUrl: './risk-detail.component.css'
})
export class RiskDetailComponent implements OnInit {
  risk: Risk | null = null;
  isLoading = false;

  // Mappages pour les traductions
  impactLevelTranslations: Record<string, string> = {
    'NEGLIGIBLE': 'Négligeable',
    'LOW': 'Faible',
    'MEDIUM': 'Moyen',
    'HIGH': 'Élevé',
    'SEVERE': 'Sévère'
  };

  probabilityLevelTranslations: Record<string, string> = {
    'RARE': 'Rare',
    'UNLIKELY': 'Peu probable',
    'POSSIBLE': 'Possible',
    'LIKELY': 'Probable',
    'ALMOST_CERTAIN': 'Quasi certain'
  };

  statusTranslations: Record<string, string> = {
    'IDENTIFIED': 'Identifié',
    'IN_ASSESSMENT': 'En évaluation',
    'MITIGATED': 'Atténué',
    'ACCEPTED': 'Accepté',
    'CLOSED': 'Clôturé'
  };

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private riskService: RiskService,
    private snackBar: MatSnackBar,
    private dialog: MatDialog
  ) {}

  ngOnInit(): void {
    this.loadRiskDetails();
  }

  loadRiskDetails(): void {
    this.isLoading = true;
    const riskId = this.route.snapshot.paramMap.get('id');

    if (!riskId) {
      this.showError('Identifiant de risque non valide');
      this.router.navigate(['/risks']);
      return;
    }

    this.riskService.getRisk(riskId)
      .pipe(finalize(() => this.isLoading = false))
      .subscribe({
        next: (risk) => {
          this.risk = risk;
          console.log('Risque chargé:', risk);
        },
        error: (error) => {
          console.error(`Erreur lors du chargement du risque ${riskId}:`, error);
          this.showError('Impossible de charger les détails du risque');
          this.router.navigate(['/risks']);
        }
      });
  }

  openAssociationDialog(): void {
    if (!this.risk) return;

    // Extraire les IDs des contrôles associés
    const controlIds = this.risk.controls ? this.risk.controls.map(control => control.id.toString()) : [];
    console.log('Contrôles associés au risque:', this.risk.controls);
    console.log('IDs des contrôles envoyés au dialogue:', controlIds);

    const dialogRef = this.dialog.open(RiskControlMappingDialogComponent, {
      width: '600px',
      data: { 
        riskId: this.risk.id,
        controlIds: controlIds
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        console.log('Risque mis à jour reçu du dialogue:', result);
        this.risk = result; // Mettre à jour directement le risque avec les nouvelles données
        this.loadRiskDetails(); // Recharger les détails après modification
        this.showSuccess('Associations de contrôles mises à jour avec succès');
      }
    });
  }

  getImpactLevelClass(level: string): string {
    if (!level) return '';
    return level.toLowerCase();
  }

  getProbabilityLevelClass(level: string): string {
    if (!level) return '';
    return level.toLowerCase();
  }

  getScoreClass(score: number): string {
    if (!score && score !== 0) return '';
    if (score >= 16) return 'severe';
    if (score >= 10) return 'high';
    if (score >= 5) return 'medium';
    return 'low';
  }

  getStatusClass(status: string): string {
    if (!status) return '';
    return status.toLowerCase();
  }

  private showError(message: string): void {
    this.snackBar.open(message, 'Fermer', {
      duration: 5000,
      panelClass: ['error-snackbar']
    });
  }

  private showSuccess(message: string): void {
    this.snackBar.open(message, 'Fermer', {
      duration: 3000,
      panelClass: ['success-snackbar']
    });
  }
}
