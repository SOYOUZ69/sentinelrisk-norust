import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ApiService } from '../../../core/services/api.service';
import { Category } from '../../../core/models/risk.model';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {
  private readonly basePath = '/categories';

  constructor(private apiService: ApiService) {}

  /**
   * Récupère la liste de toutes les catégories
   * @returns Observable contenant un tableau de catégories
   */
  getCategories(): Observable<Category[]> {
    return this.apiService.get<Category[]>(this.basePath);
  }

  /**
   * Récupère une catégorie par son identifiant
   * @param id Identifiant de la catégorie
   * @returns Observable contenant la catégorie
   */
  getCategory(id: string): Observable<Category> {
    return this.apiService.get<Category>(`${this.basePath}/${id}`);
  }

  /**
   * Crée une nouvelle catégorie
   * @param category Données de la catégorie à créer
   * @returns Observable contenant la catégorie créée
   */
  createCategory(category: Partial<Category>): Observable<Category> {
    return this.apiService.post<Category>(this.basePath, category);
  }

  /**
   * Met à jour une catégorie existante
   * @param id Identifiant de la catégorie
   * @param category Nouvelles données de la catégorie
   * @returns Observable contenant la catégorie mise à jour
   */
  updateCategory(id: string, category: Partial<Category>): Observable<Category> {
    return this.apiService.put<Category>(`${this.basePath}/${id}`, category);
  }

  /**
   * Supprime une catégorie
   * @param id Identifiant de la catégorie à supprimer
   * @returns Observable
   */
  deleteCategory(id: string): Observable<void> {
    return this.apiService.delete<void>(`${this.basePath}/${id}`);
  }

  /**
   * Vérifie si une catégorie existe avec un nom donné
   * @param name Nom de la catégorie à vérifier
   * @returns Observable contenant un booléen
   */
  categoryExists(name: string): Observable<boolean> {
    return this.apiService.get<boolean>(`${this.basePath}/exists?name=${encodeURIComponent(name)}`);
  }
} 