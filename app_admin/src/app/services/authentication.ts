import { Injectable, computed, signal } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, tap } from 'rxjs';

interface LoginResponse {
  token: string;
}

@Injectable({ providedIn: 'root' })
export class AuthenticationService {
  private readonly tokenState = signal<string | null>(localStorage.getItem('travlr-token'));
  readonly isLoggedIn = computed(() => Boolean(this.token));

  constructor(private readonly http: HttpClient) {}

  get token(): string | null {
    const token = this.tokenState();
    if (!token) return null;

    try {
      const payload = JSON.parse(atob(token.split('.')[1]));
      return payload.exp > Date.now() / 1000 ? token : null;
    } catch {
      return null;
    }
  }

  // Sign in and save the returned token.
  login(email: string, password: string): Observable<LoginResponse> {
    return this.http.post<LoginResponse>('/api/login', { email, password }).pipe(
      tap(({ token }) => {
        localStorage.setItem('travlr-token', token);
        this.tokenState.set(token);
      })
    );
  }

  // Clear the saved token.
  logout(): void {
    localStorage.removeItem('travlr-token');
    this.tokenState.set(null);
  }
}
