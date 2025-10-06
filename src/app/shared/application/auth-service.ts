import { Injectable, signal } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private readonly TOKEN_KEY = 'authToken';
  private tokenSignal = signal<string | null>(this.getToken());

  readonly token = this.tokenSignal.asReadonly();

  constructor() {
    // Inicializar con el token de localStorage si existe
    const storedToken = this.getToken();
    if (storedToken) {
      this.tokenSignal.set(storedToken);
    }
  }

  getToken(): string | null {
    return localStorage.getItem(this.TOKEN_KEY);
  }

  setToken(token: string): void {
    localStorage.setItem(this.TOKEN_KEY, token);
    this.tokenSignal.set(token);
  }

  removeToken(): void {
    localStorage.removeItem(this.TOKEN_KEY);
    this.tokenSignal.set(null);
  }

  isAuthenticated(): boolean {
    return !!this.getToken();
  }
}

