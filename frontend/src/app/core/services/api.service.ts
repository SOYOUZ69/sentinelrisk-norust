import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  private apiUrl = environment.apiUrl;

  constructor(private http: HttpClient) {}

  /**
   * Effectue une requête HTTP GET
   * @param path Chemin de l'API (sans le préfixe de base)
   * @param params Paramètres optionnels de la requête
   * @returns Observable avec les données
   */
  get<T>(path: string, params: HttpParams = new HttpParams()): Observable<T> {
    return this.http.get<T>(`${this.apiUrl}${path}`, { params });
  }

  /**
   * Effectue une requête HTTP POST
   * @param path Chemin de l'API (sans le préfixe de base)
   * @param body Corps de la requête
   * @returns Observable avec les données
   */
  post<T>(path: string, body: any): Observable<T> {
    return this.http.post<T>(`${this.apiUrl}${path}`, body);
  }

  /**
   * Effectue une requête HTTP PUT
   * @param path Chemin de l'API (sans le préfixe de base)
   * @param body Corps de la requête
   * @returns Observable avec les données
   */
  put<T>(path: string, body: any): Observable<T> {
    return this.http.put<T>(`${this.apiUrl}${path}`, body);
  }

  /**
   * Effectue une requête HTTP PATCH
   * @param path Chemin de l'API (sans le préfixe de base)
   * @param body Corps de la requête
   * @returns Observable avec les données
   */
  patch<T>(path: string, body: any): Observable<T> {
    return this.http.patch<T>(`${this.apiUrl}${path}`, body);
  }

  /**
   * Effectue une requête HTTP DELETE
   * @param path Chemin de l'API (sans le préfixe de base)
   * @returns Observable avec les données
   */
  delete<T>(path: string): Observable<T> {
    return this.http.delete<T>(`${this.apiUrl}${path}`);
  }
} 