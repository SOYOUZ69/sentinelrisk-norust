import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpErrorResponse
} from '@angular/common/http';
import { Observable, throwError, from, switchMap as rxjsSwitchMap, catchError as rxjsCatchError } from 'rxjs';
import { KeycloakService } from '../auth/keycloak.service';
import { Router } from '@angular/router';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  constructor(
    private keycloakService: KeycloakService,
    private router: Router
  ) {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    // Skip interceptor for login requests to Keycloak
    if (request.url.includes('/auth/') || request.url.includes('/token')) {
      return next.handle(request);
    }

    return from(this.keycloakService.getToken()).pipe(
      rxjsSwitchMap(token => {
        if (token) {
          const authReq = request.clone({
            setHeaders: {
              Authorization: `Bearer ${token}`
            }
          });
          return next.handle(authReq);
        }
        return next.handle(request);
      }),
      rxjsCatchError((error: HttpErrorResponse) => {
        if (error.status === 401) {
          // Token expired, try to refresh
          this.keycloakService.updateToken(30).subscribe({
            next: (success: boolean) => {
              if (!success) {
                // Token refresh failed, redirect to login
                this.keycloakService.login();
              }
            },
            error: () => {
              // Error refreshing token, redirect to login
              this.keycloakService.login();
            }
          });
        } else if (error.status === 403) {
          // Access denied, redirect to dashboard or unauthorized page
          this.router.navigate(['/unauthorized']);
        }
        return throwError(() => error);
      })
    );
  }
} 