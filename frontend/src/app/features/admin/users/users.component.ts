import { Component, OnInit } from '@angular/core';
import { User } from '../../../core/models/user.model';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { UserService } from './services/user.service';
import { UserFormDialogComponent, UserFormDialogData } from './user-form-dialog/user-form-dialog.component';
import { ConfirmDialogComponent, ConfirmDialogData } from '../shared/confirm-dialog/confirm-dialog.component';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss']
})
export class UsersComponent implements OnInit {
  users: User[] = [];
  displayedColumns: string[] = ['username', 'email', 'fullName', 'department', 'role', 'active', 'createdAt', 'actions'];
  isLoading = false;

  constructor(
    private userService: UserService,
    private dialog: MatDialog,
    private snackBar: MatSnackBar
  ) {}

  ngOnInit(): void {
    this.loadUsers();
  }

  loadUsers(): void {
    this.isLoading = true;
    this.userService.getUsers().subscribe({
      next: (users) => {
        console.log('Utilisateurs récupérés:', users);
        this.users = users;
        this.isLoading = false;
      },
      error: (error) => {
        console.error('Erreur lors du chargement des utilisateurs:', error);
        this.showError('Erreur lors du chargement des utilisateurs');
        this.isLoading = false;
      }
    });
  }

  openUserForm(user?: User): void {
    const dialogData: UserFormDialogData = {
      user: user,
      isEdit: !!user
    };

    const dialogRef = this.dialog.open(UserFormDialogComponent, {
      width: '500px',
      data: dialogData
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        if (dialogData.isEdit) {
          this.updateUser(user!.id, result);
        } else {
          this.createUser(result);
        }
      }
    });
  }

  deleteUser(user: User): void {
    const dialogData: ConfirmDialogData = {
      title: 'Confirmation de suppression',
      message: `Êtes-vous sûr de vouloir supprimer l'utilisateur ${user.username} ?`,
      confirmText: 'Supprimer',
      cancelText: 'Annuler',
      color: 'warn'
    };

    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
      width: '400px',
      data: dialogData
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.performDeleteUser(user.id);
      }
    });
  }

  private performDeleteUser(id: string): void {
    this.isLoading = true;
    this.userService.deleteUser(id).subscribe({
      next: () => {
        this.loadUsers();
        this.showSuccess('Utilisateur supprimé avec succès');
      },
      error: (error) => {
        console.error('Erreur lors de la suppression de l\'utilisateur:', error);
        this.showError('Erreur lors de la suppression de l\'utilisateur');
        this.isLoading = false;
      }
    });
  }

  private createUser(userData: Partial<User>): void {
    this.isLoading = true;
    this.userService.createUser(userData).subscribe({
      next: () => {
        this.loadUsers();
        this.showSuccess('Utilisateur créé avec succès');
      },
      error: (error) => {
        console.error('Erreur lors de la création de l\'utilisateur:', error);
        this.showError('Erreur lors de la création de l\'utilisateur');
        this.isLoading = false;
      }
    });
  }

  private updateUser(id: string, userData: Partial<User>): void {
    this.isLoading = true;
    this.userService.updateUser(id, userData).subscribe({
      next: () => {
        this.loadUsers();
        this.showSuccess('Utilisateur mis à jour avec succès');
      },
      error: (error) => {
        console.error('Erreur lors de la mise à jour de l\'utilisateur:', error);
        this.showError('Erreur lors de la mise à jour de l\'utilisateur');
        this.isLoading = false;
      }
    });
  }

  private showSuccess(message: string): void {
    this.snackBar.open(message, 'Fermer', { duration: 3000 });
  }

  private showError(message: string): void {
    this.snackBar.open(message, 'Fermer', { duration: 3000, panelClass: ['error-snackbar'] });
  }
} 