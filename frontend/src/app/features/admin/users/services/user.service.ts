import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ApiService } from '../../../../core/services/api.service';
import { User } from '../../../../core/models/user.model';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private readonly basePath = '/users';

  constructor(private apiService: ApiService) {}

  /**
   * Récupère la liste de tous les utilisateurs
   * @returns Observable contenant un tableau d'utilisateurs
   */
  getUsers(): Observable<User[]> {
    return this.apiService.get<User[]>(this.basePath);
  }

  /**
   * Récupère un utilisateur par son identifiant
   * @param id Identifiant de l'utilisateur
   * @returns Observable contenant l'utilisateur
   */
  getUser(id: string): Observable<User> {
    return this.apiService.get<User>(`${this.basePath}/${id}`);
  }

  /**
   * Crée un nouvel utilisateur
   * @param user Données de l'utilisateur à créer
   * @returns Observable contenant l'utilisateur créé
   */
  createUser(user: Partial<User>): Observable<User> {
    return this.apiService.post<User>(this.basePath, user);
  }

  /**
   * Met à jour un utilisateur existant
   * @param id Identifiant de l'utilisateur
   * @param user Nouvelles données de l'utilisateur
   * @returns Observable contenant l'utilisateur mis à jour
   */
  updateUser(id: string, user: Partial<User>): Observable<User> {
    return this.apiService.put<User>(`${this.basePath}/${id}`, user);
  }

  /**
   * Supprime un utilisateur
   * @param id Identifiant de l'utilisateur à supprimer
   * @returns Observable
   */
  deleteUser(id: string): Observable<void> {
    return this.apiService.delete<void>(`${this.basePath}/${id}`);
  }

  /**
   * Recherche des utilisateurs par leur rôle
   * @param role Rôle à rechercher
   * @returns Observable contenant un tableau d'utilisateurs
   */
  getUsersByRole(role: string): Observable<User[]> {
    return this.apiService.get<User[]>(`${this.basePath}/role/${role}`);
  }

  /**
   * Récupère tous les utilisateurs actifs
   * @returns Observable contenant un tableau d'utilisateurs
   */
  getActiveUsers(): Observable<User[]> {
    return this.apiService.get<User[]>(`${this.basePath}/active`);
  }
} 