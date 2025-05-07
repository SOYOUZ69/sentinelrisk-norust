import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ApiService } from '../../../core/services/api.service';
import { HttpParams } from '@angular/common/http';
import { Category, CategoryRequest } from '../models/category.model';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {
  constructor(private api: ApiService) {}

  /**
   * Récupère la liste de toutes les catégories
   * @returns Observable contenant un tableau de catégories
   */
  getCategories(): Observable<Category[]> {
    console.log('Appel API pour récupérer toutes les catégories');
    return this.api.get<Category[]>('/categories');
  }

  /**
   * Récupère une catégorie par son identifiant
   * @param id Identifiant de la catégorie
   * @returns Observable contenant la catégorie
   */
  getCategory(id: number): Observable<Category> {
    return this.api.get<Category>(`/categories/${id}`);
  }

  /**
   * Crée une nouvelle catégorie
   * @param category Données de la catégorie à créer
   * @returns Observable contenant la catégorie créée
   */
  createCategory(body: CategoryRequest): Observable<Category> {
    return this.api.post<Category>('/categories', body);
  }

  /**
   * Met à jour une catégorie existante
   * @param id Identifiant de la catégorie
   * @param category Nouvelles données de la catégorie
   * @returns Observable contenant la catégorie mise à jour
   */
  updateCategory(id: number, body: CategoryRequest): Observable<Category> {
    return this.api.put<Category>(`/categories/${id}`, body);
  }

  /**
   * Supprime une catégorie
   * @param id Identifiant de la catégorie à supprimer
   * @returns Observable
   */
  deleteCategory(id: number): Observable<void> {
    return this.api.delete<void>(`/categories/${id}`);
  }

  /**
   * Vérifie si une catégorie existe avec un nom donné
   * @param name Nom de la catégorie à vérifier
   * @returns Observable contenant un booléen
   */
  categoryExists(name: string): Observable<boolean> {
    return this.api.get<boolean>(`/categories/exists?name=${encodeURIComponent(name)}`);
  }
} 