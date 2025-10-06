import { Component, inject } from '@angular/core';
import {FormBuilder, FormControl, ReactiveFormsModule, Validators} from '@angular/forms';
import {Router} from '@angular/router';
import {IamApi} from '../../infrastructure/iam-api';
import {MatError, MatFormField, MatLabel} from '@angular/material/form-field';
import {MatButton} from '@angular/material/button';
import {MatInput} from '@angular/material/input';
import {CommonModule} from '@angular/common';
import {TranslatePipe} from '@ngx-translate/core';

@Component({
  selector: 'app-sign-up-form',
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
  templateUrl: './sign-up-form.html',
  styleUrl: './sign-up-form.css'
})
export class SignUpForm {
  private fb = inject(FormBuilder);
  protected router = inject(Router);
  private iamApi = inject(IamApi);

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

    this.iamApi.signUp(username, password).subscribe({
      next: (response) => {
        console.log('Usuario registrado exitosamente:', response);
        this.isSubmitting = false;
        // Redirigir al sign-in después de registrarse exitosamente
        this.router.navigate(['/sign-in']);
      },
      error: (error) => {
        console.error('Error al registrar usuario:', error);
        this.errorMessage = error.error?.message || 'Error al crear la cuenta. Intenta de nuevo.';
        this.isSubmitting = false;
      }
    });
  }

  onCancel(): void {
    this.router.navigate(['/']);
  }
}
