import {Component, inject, signal} from '@angular/core';
import {FormBuilder, FormControl, ReactiveFormsModule, Validators} from '@angular/forms';
import {LearningApi} from '../../../infrastructure/learning-api';
import {RiskEntity} from '../../../domain/model/risk-entity.entity';
import {CommonModule} from '@angular/common';
import {ActivatedRoute, Router} from '@angular/router';
import {MatButton} from '@angular/material/button';
import {TranslatePipe} from '@ngx-translate/core';

@Component({
  selector: 'app-supplier-screening-modal',
  imports: [CommonModule, MatButton, TranslatePipe],
  templateUrl: './supplier-screening-modal.html',
  styleUrl: './supplier-screening-modal.css'
})
export class SupplierScreeningModal {

  totalCountSignal = signal<number | null>(null);
  protected route = inject(ActivatedRoute);
  protected router = inject(Router);
  supplierName = '';  // nombre legal decodificado del supplier

  private fb = inject(FormBuilder);
  private learningApi = inject(LearningApi);
  isOpen = false;

  ngOnInit() {
    // Abre el modal apenas se carga la ruta
    this.isOpen = true;
    const raw = this.route.snapshot.paramMap.get('name') ?? '';
    const name = decodeURIComponent(raw).trim();
    this.supplierName = name;  // guardamos el nombre decodificado

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

  // mismo helper que usas en suppliers
  private formatError(err: any, fallback: string): string {
    return err?.error?.message ?? err?.message ?? fallback;
  }
}
