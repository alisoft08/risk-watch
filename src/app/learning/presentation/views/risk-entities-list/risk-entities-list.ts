import {Component, inject, signal} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {FormBuilder, FormControl, ReactiveFormsModule, Validators} from '@angular/forms';
import {LearningApi} from '../../../infrastructure/learning-api';
import {RiskEntity} from '../../../domain/model/risk-entity.entity';
import {CommonModule} from '@angular/common';
import {TranslatePipe} from '@ngx-translate/core';
import {MatButton} from '@angular/material/button';

@Component({
  selector: 'app-risk-entities-list',
  imports: [ReactiveFormsModule, CommonModule, TranslatePipe, MatButton],
  templateUrl: './risk-entities-list.html',
  styleUrl: './risk-entities-list.css'
})
export class RiskEntitiesList {
  totalCountSignal = signal<number | null>(null);
  private route = inject(ActivatedRoute);
  private router = inject(Router);


  private fb = inject(FormBuilder);
  private learningApi = inject(LearningApi);
  isOpen = false;

  ngOnInit() {
    // Abre el modal apenas se carga la ruta
    this.isOpen = true;
    const raw = this.route.snapshot.paramMap.get('name') ?? '';
    const name = decodeURIComponent(raw).trim();

    if (name) {
      this.nameControl.setValue(name);
      // Si quieres que busque automáticamente:
      this.onScreeningClick();
    }
  }

  closeModal() {
    this.isOpen = false;
    // Vuelve atrás al cerrar el modal
    history.back();
  }

  // signals/estado
  riskEntitiesSignal = signal<RiskEntity[] | null>(null);
  loadingRiskSignal = signal(false);
  errorRiskSignal = signal<string | null>(null);

  // campo de búsqueda
  nameControl = new FormControl<string>('', { nonNullable: true, validators: [Validators.required, Validators.minLength(2)] });

  /** NO se llama en ngOnInit */
  onScreeningClick(): void {
    const name = this.nameControl.value.trim();
    if (!name) {
      this.errorRiskSignal.set('Ingresa un nombre para hacer screening.');
      return;
    }
    this.loadRiskEntities(name);
  }

  private loadRiskEntities(name: string): void {
    this.loadingRiskSignal.set(true);
    this.errorRiskSignal.set(null);
    this.riskEntitiesSignal.set(null); // opcional: limpia resultados anteriores
    this.totalCountSignal.set(null);

    this.learningApi.getAllRiskEntitiesByName(name).subscribe({
      next: (items: RiskEntity[]) => {
        this.riskEntitiesSignal.set(items);
        this.totalCountSignal.set(items.length);   // sin headers, usamos length
        this.loadingRiskSignal.set(false);
      },
      error: (err) => {
        this.errorRiskSignal.set(this.formatError(err, 'No se pudo cargar el screening'));
        this.loadingRiskSignal.set(false);
      }
    });
  }

  goBackToSuppliers(): void {
    this.router.navigate(['/suppliers']);
  }

  // mismo helper que usas en suppliers
  private formatError(err: any, fallback: string): string {
    return err?.error?.message ?? err?.message ?? fallback;
  }
}
