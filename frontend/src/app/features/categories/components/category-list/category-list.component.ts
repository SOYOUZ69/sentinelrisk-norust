import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { MatSort, Sort } from '@angular/material/sort';
import { CategoryService } from '../../services/category.service';
import { Category } from '../../models/category.model';
import { Router } from '@angular/router';

@Component({
  selector: 'app-category-list',
  templateUrl: './category-list.component.html',
  styleUrls: ['./category-list.component.scss']
})
export class CategoryListComponent implements OnInit {
  displayedColumns = ['name', 'description', 'actions'];
  dataSource = new MatTableDataSource<Category>([]);
  total = 0;
  pageSize = 10;
  pageIndex = 0;
  filters = { name: '', description: '' };

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(private categoryService: CategoryService, private router: Router) {}

  ngOnInit() {
    this.loadCategories();
  }

  loadCategories() {
    this.categoryService.getCategories(this.pageIndex, this.pageSize, this.filters)
      .subscribe(page => {
        this.dataSource.data = page.content;
        this.total = page.totalElements;
      });
  }

  applyFilters() {
    this.pageIndex = 0;
    this.loadCategories();
  }

  pageChanged(event: PageEvent) {
    this.pageIndex = event.pageIndex;
    this.pageSize = event.pageSize;
    this.loadCategories();
  }

  sortChanged(event: Sort) {
    // Optionnel : recharger avec tri si backend le supporte
    this.loadCategories();
  }

  deleteCategory(id: number) {
    if (confirm('Supprimer cette catégorie ?')) {
      this.categoryService.deleteCategory(id).subscribe(() => this.loadCategories());
    }
  }
} 