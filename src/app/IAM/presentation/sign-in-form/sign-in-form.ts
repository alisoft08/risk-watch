import { Component, inject } from '@angular/core';
import {FormBuilder, FormControl, ReactiveFormsModule, Validators} from '@angular/forms';
import {Router} from '@angular/router';
import {IamApi} from '../../infrastructure/iam-api';
import {MatError, MatFormField, MatLabel} from '@angular/material/form-field';
import {MatButton} from '@angular/material/button';
import {MatInput} from '@angular/material/input';
import {CommonModule} from '@angular/common';
import {TranslatePipe} from '@ngx-translate/core';
import {AuthStore} from '../../../shared/application/auth-store';

@Component({
  selector: 'app-sign-in-form',
  imports: [
    ReactiveFormsModule,
    MatFormField,
    MatLabel,
    MatError,
    MatButton,
    MatInput,
    CommonModule,
    TranslatePipe
  ],
  templateUrl: './sign-in-form.html',
  styleUrl: './sign-in-form.css'
})
export class SignInForm {
  private fb = inject(FormBuilder);
  protected router = inject(Router);
  private iamApi = inject(IamApi);
  private authStore = inject(AuthStore);

  form = this.fb.group({
    username: new FormControl<string>('', {
      nonNullable: true,
      validators: [Validators.required, Validators.minLength(3)]
    }),
    password: new FormControl<string>('', {
      nonNullable: true,
      validators: [Validators.required, Validators.minLength(6)]
    })
  });

  isSubmitting = false;
  errorMessage: string | null = null;

  onSubmit(): void {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }

    this.isSubmitting = true;
    this.errorMessage = null;

    const { username, password } = this.form.getRawValue();

    this.iamApi.signIn(username, password).subscribe({
      next: (response) => {
        console.log('Login exitoso:', response);
        // Guardar el token usando el AuthStore
        if (response.token) {
          this.authStore.setToken(response.token);
        }
        this.isSubmitting = false;
        // Redirigir al home después del login exitoso
        this.router.navigate(['/home']);
      },
      error: (error) => {
        console.error('Error al iniciar sesión:', error);
        this.errorMessage = error.error?.message || 'Credenciales inválidas. Intenta de nuevo.';
        this.isSubmitting = false;
      }
    });
  }

  goToSignUp(): void {
    this.router.navigate(['/sign-up']);
  }
}
