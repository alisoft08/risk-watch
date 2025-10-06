
import { Injectable, signal } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthStore {
  private readonly TOKEN_KEY = 'authToken';
  private tokenSignal = signal<string | null>(null);

  readonly token = this.tokenSignal.asReadonly();

  constructor() {
    // Hidratarse desde localStorage al iniciar la app
    this.hydrateFromStorage();

    // Limpiar token cuando se cierra la pestaña
    window.addEventListener('beforeunload', () => {
      this.clearToken();
    });
  }

  private hydrateFromStorage(): void {
    const storedToken = localStorage.getItem(this.TOKEN_KEY);
    if (storedToken) {
      this.tokenSignal.set(storedToken);
    }
  }

  getToken(): string | null {
    return this.tokenSignal();
  }

  setToken(token: string): void {
    localStorage.setItem(this.TOKEN_KEY, token);
    this.tokenSignal.set(token);
  }

  clearToken(): void {
    localStorage.removeItem(this.TOKEN_KEY);
    this.tokenSignal.set(null);
  }

  isAuthenticated(): boolean {
    return !!this.getToken();
  }

  logout(): void {
    this.clearToken();
  }
}

