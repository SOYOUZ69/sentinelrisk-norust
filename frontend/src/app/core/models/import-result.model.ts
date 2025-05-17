/**
 * Modèle pour le résultat d'une opération d'import
 */
export interface ImportResult {
  importedCount: number;
  errors: ImportError[];
}

/**
 * Modèle pour une erreur d'importation
 */
export interface ImportError {
  row: number;
  field: string;
  message: string;
} 