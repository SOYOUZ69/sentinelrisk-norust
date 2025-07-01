import { Injectable } from '@angular/core';
import { DashboardRealData } from './dashboard-real-data.service';
// @ts-ignore
import * as XLSX from 'xlsx';

export interface ExportOptions {
  format: 'pdf' | 'excel';
  includeCharts: boolean;
  includeHistory: boolean;
  dateRange?: {
    start: Date;
    end: Date;
  };
}

@Injectable({
  providedIn: 'root'
})
export class DashboardExportService {

  constructor() {}

  /**
   * Exporte les données du dashboard
   */
  exportDashboard(data: DashboardRealData, options: ExportOptions): void {
    if (options.format === 'pdf') {
      this.exportToPDF(data, options);
    } else {
      this.exportToExcel(data, options);
    }
  }

  /**
   * Exporte en PDF (orienté présentation)
   */
  private exportToPDF(data: DashboardRealData, options: ExportOptions): void {
    // Créer le contenu HTML pour le PDF
    const htmlContent = this.generatePDFContent(data, options);
    
    // Créer un blob avec le contenu HTML
    const blob = new Blob([htmlContent], { type: 'text/html' });
    const url = window.URL.createObjectURL(blob);
    
    // Ouvrir dans un nouvel onglet pour impression
    const printWindow = window.open(url, '_blank');
    if (printWindow) {
      printWindow.document.title = `Rapport Dashboard - ${new Date().toLocaleDateString()}`;
      printWindow.print();
    }
  }

  /**
   * Exporte en Excel (orienté analyse brute)
   */
  private exportToExcel(data: DashboardRealData, options: ExportOptions): void {
    const workbook = XLSX.utils.book_new();
    
    // Feuille 1: KPIs principaux
    const kpisData = this.generateKPIsSheet(data);
    const kpisSheet = XLSX.utils.json_to_sheet(kpisData);
    XLSX.utils.book_append_sheet(workbook, kpisSheet, 'KPIs');
    
    // Feuille 2: Détail des risques
    const risksData = this.generateRisksSheet(data);
    const risksSheet = XLSX.utils.json_to_sheet(risksData);
    XLSX.utils.book_append_sheet(workbook, risksSheet, 'Risques');
    
    // Feuille 3: Évaluations
    const assessmentsData = this.generateAssessmentsSheet(data);
    const assessmentsSheet = XLSX.utils.json_to_sheet(assessmentsData);
    XLSX.utils.book_append_sheet(workbook, assessmentsSheet, 'Évaluations');
    
    // Feuille 4: Contrôles
    const controlsData = this.generateControlsSheet(data);
    const controlsSheet = XLSX.utils.json_to_sheet(controlsData);
    XLSX.utils.book_append_sheet(workbook, controlsSheet, 'Contrôles');
    
    // Feuille 5: Plans de remédiation
    const plansData = this.generatePlansSheet(data);
    const plansSheet = XLSX.utils.json_to_sheet(plansData);
    XLSX.utils.book_append_sheet(workbook, plansSheet, 'Plans de remédiation');
    
    // Feuille 6: Historique (si demandé)
    if (options.includeHistory) {
      const historyData = this.generateHistorySheet(data);
      const historySheet = XLSX.utils.json_to_sheet(historyData);
      XLSX.utils.book_append_sheet(workbook, historySheet, 'Historique');
    }
    
    // Générer et télécharger le fichier
    const fileName = `dashboard_sentinelrisk_${new Date().toISOString().split('T')[0]}.xlsx`;
    XLSX.writeFile(workbook, fileName);
  }

  /**
   * Génère le contenu HTML pour le PDF
   */
  private generatePDFContent(data: DashboardRealData, options: ExportOptions): string {
    const date = new Date().toLocaleDateString('fr-FR');
    const time = new Date().toLocaleTimeString('fr-FR');
    
    return `
      <!DOCTYPE html>
      <html>
      <head>
        <meta charset="utf-8">
        <title>Rapport Dashboard SentinelRisk</title>
        <style>
          body { font-family: Arial, sans-serif; margin: 20px; }
          .header { text-align: center; border-bottom: 2px solid #333; padding-bottom: 20px; margin-bottom: 30px; }
          .section { margin-bottom: 30px; }
          .section h2 { color: #1976d2; border-bottom: 1px solid #ddd; padding-bottom: 10px; }
          .kpi-grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(200px, 1fr)); gap: 20px; margin: 20px 0; }
          .kpi-card { border: 1px solid #ddd; padding: 15px; border-radius: 8px; text-align: center; }
          .kpi-value { font-size: 24px; font-weight: bold; color: #1976d2; }
          .kpi-label { color: #666; margin-top: 5px; }
          .chart-placeholder { background: #f5f5f5; padding: 40px; text-align: center; border-radius: 8px; margin: 20px 0; }
          .evolution-comment { background: #e3f2fd; padding: 15px; border-radius: 8px; margin: 20px 0; }
          .footer { margin-top: 40px; padding-top: 20px; border-top: 1px solid #ddd; text-align: center; color: #666; }
        </style>
      </head>
      <body>
        <div class="header">
          <h1>📊 Rapport Dashboard SentinelRisk</h1>
          <p>Généré le ${date} à ${time}</p>
        </div>

        <div class="section">
          <h2>🎯 KPIs Principaux</h2>
          <div class="kpi-grid">
            <div class="kpi-card">
              <div class="kpi-value">${data.risks.totalRisks}</div>
              <div class="kpi-label">Total des risques</div>
            </div>
            <div class="kpi-card">
              <div class="kpi-value">${data.risks.averageScore}/10</div>
              <div class="kpi-label">Score moyen des risques</div>
            </div>
            <div class="kpi-card">
              <div class="kpi-value">${data.assessments.averageScore}/10</div>
              <div class="kpi-label">Score moyen des évaluations</div>
            </div>
            <div class="kpi-card">
              <div class="kpi-value">${data.controls.averageEffectiveness}%</div>
              <div class="kpi-label">Efficacité moyenne des contrôles</div>
            </div>
            <div class="kpi-card">
              <div class="kpi-value">${data.remediationPlans.completionRate}%</div>
              <div class="kpi-label">Taux de complétion des plans</div>
            </div>
          </div>
        </div>

        <div class="section">
          <h2>📈 Évolution des Risques</h2>
          <div class="chart-placeholder">
            ${options.includeCharts ? 'Graphique d\'évolution des risques (à implémenter avec une librairie de graphiques)' : 'Graphiques disponibles dans la version interactive'}
          </div>
          <div class="evolution-comment">
            <strong>Analyse automatique :</strong>
            ${this.generateEvolutionComment(data)}
          </div>
        </div>

        <div class="section">
          <h2>📋 Répartition par Statut</h2>
          <div class="kpi-grid">
            <div class="kpi-card">
              <div class="kpi-value">${data.risks.openRisks}</div>
              <div class="kpi-label">Risques ouverts</div>
            </div>
            <div class="kpi-card">
              <div class="kpi-value">${data.risks.closedRisks}</div>
              <div class="kpi-label">Risques fermés</div>
            </div>
          </div>
        </div>

        <div class="footer">
          <p>Rapport généré automatiquement par SentinelRisk</p>
          <p>Pour plus de détails, consultez l'interface web interactive</p>
        </div>
      </body>
      </html>
    `;
  }

  /**
   * Génère un commentaire automatique sur l'évolution
   */
  private generateEvolutionComment(data: DashboardRealData): string {
    const openRisks = data.risks.openRisks;
    const totalRisks = data.risks.totalRisks;
    const completionRate = data.remediationPlans.completionRate;
    
    let comment = '';
    
    if (openRisks > totalRisks * 0.7) {
      comment += 'Attention : Plus de 70% des risques sont encore ouverts. ';
    } else if (openRisks > totalRisks * 0.5) {
      comment += 'Progression : Plus de la moitié des risques sont en cours de traitement. ';
    } else {
      comment += 'Excellent : La majorité des risques ont été traités. ';
    }
    
    if (completionRate > 80) {
      comment += 'Les plans de remédiation sont très efficaces avec un taux de complétion élevé.';
    } else if (completionRate > 50) {
      comment += 'Les plans de remédiation progressent bien mais peuvent être optimisés.';
    } else {
      comment += 'Les plans de remédiation nécessitent une attention particulière.';
    }
    
    return comment;
  }

  /**
   * Génère la feuille KPIs pour Excel
   */
  private generateKPIsSheet(data: DashboardRealData): any[] {
    return [
      { 'KPI': 'Total des risques', 'Valeur': data.risks.totalRisks },
      { 'KPI': 'Risques ouverts', 'Valeur': data.risks.openRisks },
      { 'KPI': 'Risques fermés', 'Valeur': data.risks.closedRisks },
      { 'KPI': 'Score moyen des risques', 'Valeur': data.risks.averageScore },
      { 'KPI': 'Total des évaluations', 'Valeur': data.assessments.totalAssessments },
      { 'KPI': 'Score moyen des évaluations', 'Valeur': data.assessments.averageScore },
      { 'KPI': 'Total des contrôles', 'Valeur': data.controls.totalControls },
      { 'KPI': 'Efficacité moyenne des contrôles', 'Valeur': `${data.controls.averageEffectiveness}%` },
      { 'KPI': 'Total des plans de remédiation', 'Valeur': data.remediationPlans.totalPlans },
      { 'KPI': 'Taux de complétion des plans', 'Valeur': `${data.remediationPlans.completionRate}%` }
    ];
  }

  /**
   * Génère la feuille risques pour Excel
   */
  private generateRisksSheet(data: DashboardRealData): any[] {
    const risksData: any[] = [];
    
    // Ajouter les données par statut
    data.risks.risksByStatus.forEach(item => {
      risksData.push({
        'Type': 'Statut',
        'Catégorie': item.status,
        'Nombre': item.count
      });
    });
    
    // Ajouter les données par niveau
    data.risks.risksByLevel.forEach(item => {
      risksData.push({
        'Type': 'Niveau',
        'Catégorie': item.level,
        'Nombre': item.count
      });
    });
    
    // Ajouter les données par catégorie
    data.risks.risksByCategory.forEach(item => {
      risksData.push({
        'Type': 'Catégorie',
        'Catégorie': item.category,
        'Nombre': item.count
      });
    });
    
    return risksData;
  }

  /**
   * Génère la feuille évaluations pour Excel
   */
  private generateAssessmentsSheet(data: DashboardRealData): any[] {
    return data.assessments.scoreEvolution.map(assessment => ({
      'ID': assessment.id,
      'Score': assessment.score,
      'Date': new Date(assessment.date).toLocaleDateString('fr-FR'),
      'ID Risque': assessment.riskId
    }));
  }

  /**
   * Génère la feuille contrôles pour Excel
   */
  private generateControlsSheet(data: DashboardRealData): any[] {
    return data.controls.effectivenessEvolution.map(control => ({
      'ID': control.id,
      'Efficacité': `${control.effectiveness}%`,
      'Date': new Date(control.date).toLocaleDateString('fr-FR'),
      'ID Contrôle': control.controlId
    }));
  }

  /**
   * Génère la feuille plans de remédiation pour Excel
   */
  private generatePlansSheet(data: DashboardRealData): any[] {
    return data.remediationPlans.completionEvolution.map(plan => ({
      'ID': plan.id,
      'Efficacité': `${plan.efficacite}%`,
      'Statut': plan.status,
      'Date': new Date(plan.date).toLocaleDateString('fr-FR')
    }));
  }

  /**
   * Génère la feuille historique pour Excel
   */
  private generateHistorySheet(data: DashboardRealData): any[] {
    const historyData: any[] = [];
    
    // Historique des statuts de risques
    data.history.riskStatusHistory.forEach(item => {
      historyData.push({
        'Type': 'Changement de statut',
        'ID Risque': item.riskId,
        'Ancien statut': item.oldStatus,
        'Nouveau statut': item.newStatus,
        'Date': new Date(item.changedAt).toLocaleDateString('fr-FR'),
        'Modifié par': item.changedBy
      });
    });
    
    // Historique des scores d'évaluation
    data.history.assessmentScoreHistory.forEach(item => {
      historyData.push({
        'Type': 'Changement de score',
        'ID Évaluation': item.assessmentId,
        'Ancien score': item.oldScore,
        'Nouveau score': item.newScore,
        'Date': new Date(item.changedAt).toLocaleDateString('fr-FR'),
        'Modifié par': item.changedBy
      });
    });
    
    // Historique des impacts de risques
    data.history.riskImpactHistory.forEach(item => {
      historyData.push({
        'Type': 'Changement d\'impact',
        'ID Risque': item.riskId,
        'ID Plan': item.planId,
        'Ancien impact': item.oldImpact,
        'Nouveau impact': item.newImpact,
        'Ancien score': item.oldScore,
        'Nouveau score': item.newScore,
        'Date': new Date(item.changedAt).toLocaleDateString('fr-FR'),
        'Modifié par': item.changedBy
      });
    });
    
    return historyData;
  }
} 