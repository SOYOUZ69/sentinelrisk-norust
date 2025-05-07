import { Component, OnInit, ViewChild, AfterViewInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { MatSort, Sort } from '@angular/material/sort';
import { CategoryService } from '../../services/category.service';
import { Category } from '../../models/category.model';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { CategoryFormDialogComponent } from '../category-form-dialog/category-form-dialog.component';

@Component({
  selector: 'app-category-list',
  templateUrl: './category-list.component.html',
  styleUrls: ['./category-list.component.scss']
})
export class CategoryListComponent implements OnInit, AfterViewInit {
  displayedColumns = ['name', 'description', 'actions'];
  dataSource: MatTableDataSource<Category>;
  total = 0;
  pageSize = 10;
  pageIndex = 0;
  filters = { name: '', description: '' };
  isLoading = false;
  categories: Category[] = []; // Tableau pour stocker les catégories brutes

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(
    private categoryService: CategoryService, 
    private router: Router,
    private dialog: MatDialog
  ) {
    // Initialiser dataSource avec un tableau vide
    this.dataSource = new MatTableDataSource<Category>([]);
  }

  ngOnInit() {
    this.loadCategories();
  }

  ngAfterViewInit() {
    // Cette méthode sera appelée après que les données soient chargées dans loadCategories
    if (this.paginator && this.sort) {
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    }
  }

  loadCategories() {
    this.isLoading = true;
    console.log('Chargement des catégories...');
    
    this.categoryService.getCategories()
      .subscribe({
        next: categories => {
          console.log('Catégories reçues (brut):', categories);
          
          if (!Array.isArray(categories)) {
            console.error('La réponse API n\'est pas un tableau valide:', categories);
            this.isLoading = false;
            return;
          }
          
          try {
            // Stocker les catégories dans le tableau local
            this.categories = categories;
            console.log('Nombre de catégories reçues:', this.categories.length);
            
            // Créer un NOUVEAU dataSource avec les données
            this.dataSource = new MatTableDataSource<Category>(this.categories);
            console.log('Nouveau dataSource créé avec categories:', this.dataSource.data.length);
            
            // Configurer le filtre personnalisé
            this.setupFilter();
            
            // Configurer paginator et sort sur le nouveau dataSource
            if (this.paginator) {
              this.dataSource.paginator = this.paginator;
              console.log('Paginator attaché au dataSource');
            }
            if (this.sort) {
              this.dataSource.sort = this.sort;
              console.log('Sort attaché au dataSource');
            }
            
            this.total = this.categories.length;
            console.log('Total mis à jour:', this.total);
            
            // Appliquer les filtres si nécessaire
            if (this.filters.name || this.filters.description) {
              this.applyFilters();
            }
            
          } catch (err) {
            console.error('Erreur lors du traitement des catégories:', err);
            this.dataSource = new MatTableDataSource<Category>([]);
          }
          
          this.isLoading = false;
        },
        error: error => {
          console.error('Erreur lors du chargement des catégories:', error);
          this.isLoading = false;
          this.dataSource = new MatTableDataSource<Category>([]);
        }
      });
  }

  setupFilter() {
    // Configurer une fonction de filtre personnalisée pour MatTableDataSource
    this.dataSource.filterPredicate = (data: Category, filter: string) => {
      const filterObj = JSON.parse(filter);
      const nameLower = data.name?.toLowerCase() || '';
      const descLower = data.description?.toLowerCase() || '';
      
      const nameMatch = !filterObj.name || nameLower.includes(filterObj.name.toLowerCase());
      const descMatch = !filterObj.description || descLower.includes(filterObj.description.toLowerCase());
      
      return nameMatch && descMatch;
    };
  }

  applyFilters() {
    this.pageIndex = 0;
    if (this.paginator) {
      this.paginator.pageIndex = 0;
    }
    
    console.log('Application des filtres:', this.filters);
    
    // Appliquer le filtre au dataSource
    // MatTableDataSource attend une chaîne comme filtre, nous convertissons donc notre objet en JSON
    this.dataSource.filter = JSON.stringify(this.filters);
    
    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
    
    // Mettre à jour le total
    this.total = this.dataSource.filteredData.length;
    console.log('Nombre de résultats après filtrage:', this.total);
  }

  clearFilters() {
    this.filters = { name: '', description: '' };
    this.applyFilters();
  }

  pageChanged(event: PageEvent) {
    this.pageIndex = event.pageIndex;
    this.pageSize = event.pageSize;
    // Nous n'avons plus besoin de recharger les données du serveur à chaque changement de page
    // car nous utilisons la pagination côté client via MatTableDataSource
  }

  sortChanged(event: Sort) {
    // Nous n'avons plus besoin de recharger les données du serveur car le tri est fait côté client
    console.log('Tri demandé:', event);
    // Le tri est géré automatiquement par MatTableDataSource
  }

  deleteCategory(id: number) {
    if (confirm('Supprimer cette catégorie ?')) {
      this.isLoading = true;
      this.categoryService.deleteCategory(id).subscribe({
        next: () => {
          console.log('Catégorie supprimée, rechargement...');
          this.loadCategories();
        },
        error: error => {
          console.error('Erreur lors de la suppression:', error);
          this.isLoading = false;
        }
      });
    }
  }

  openCategoryFormDialog(category?: Category) {
    console.log('Ouverture du formulaire pour la catégorie:', category);
    const dialogRef = this.dialog.open(CategoryFormDialogComponent, {
      width: '600px',
      data: category ? { id: category.id } : {}
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        console.log('Formulaire validé, rechargement...');
        this.loadCategories();
      }
    });
  }
} 