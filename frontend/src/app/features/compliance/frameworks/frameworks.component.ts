import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { ComplianceFramework } from '../../../core/models/compliance.model';
import { ComplianceFrameworkService } from '../services/compliance-framework.service';
import { FrameworkFormDialogComponent } from './framework-form-dialog/framework-form-dialog.component';

@Component({
  selector: 'app-frameworks',
  templateUrl: './frameworks.component.html',
  styleUrls: ['./frameworks.component.scss']
})
export class FrameworksComponent implements OnInit {
  displayedColumns: string[] = ['name', 'version', 'description', 'actions'];
  dataSource = new MatTableDataSource<ComplianceFramework>([]);
  isLoading = true;
  error: string | null = null;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(
    private frameworkService: ComplianceFrameworkService,
    private dialog: MatDialog
  ) { }

  ngOnInit(): void {
    this.loadFrameworks();
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  loadFrameworks() {
    this.isLoading = true;
    this.error = null;
    
    this.frameworkService.getFrameworks().subscribe({
      next: (frameworks) => {
        this.dataSource.data = frameworks;
        this.isLoading = false;
      },
      error: (error) => {
        console.error('Erreur lors du chargement des frameworks', error);
        this.error = 'Impossible de charger les frameworks. Veuillez réessayer.';
        this.isLoading = false;
      }
    });
  }

  openFrameworkDialog(framework?: ComplianceFramework) {
    const dialogRef = this.dialog.open(FrameworkFormDialogComponent, {
      width: '500px',
      data: framework || {}
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        if (result.id) {
          // Mise à jour
          this.updateFramework(result);
        } else {
          // Création
          this.createFramework(result);
        }
      }
    });
  }

  createFramework(framework: Partial<ComplianceFramework>) {
    this.frameworkService.createFramework(framework).subscribe({
      next: (newFramework) => {
        this.dataSource.data = [...this.dataSource.data, newFramework];
      },
      error: (error) => {
        console.error('Erreur lors de la création du framework', error);
        // Gérer l'erreur (notification, etc.)
      }
    });
  }

  updateFramework(framework: ComplianceFramework) {
    this.frameworkService.updateFramework(framework.id, framework).subscribe({
      next: (updatedFramework) => {
        const index = this.dataSource.data.findIndex(f => f.id === updatedFramework.id);
        if (index !== -1) {
          const updatedData = [...this.dataSource.data];
          updatedData[index] = updatedFramework;
          this.dataSource.data = updatedData;
        }
      },
      error: (error) => {
        console.error('Erreur lors de la mise à jour du framework', error);
        // Gérer l'erreur (notification, etc.)
      }
    });
  }

  deleteFramework(id: string) {
    if (confirm('Êtes-vous sûr de vouloir supprimer ce framework? Cette action est irréversible.')) {
      this.frameworkService.deleteFramework(id).subscribe({
        next: () => {
          this.dataSource.data = this.dataSource.data.filter(f => f.id !== id);
        },
        error: (error) => {
          console.error('Erreur lors de la suppression du framework', error);
          // Gérer l'erreur (notification, etc.)
        }
      });
    }
  }
} 