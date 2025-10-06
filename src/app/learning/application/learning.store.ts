import {computed, Injectable, Signal, signal} from '@angular/core';
import {Supplier} from '../domain/model/supplier.entity';
import {LearningApi} from '../infrastructure/learning-api';
import {takeUntilDestroyed} from '@angular/core/rxjs-interop';
import {retry} from 'rxjs';


@Injectable({providedIn: 'root'})
export class LearningStore {
  // State signals

  private readonly suppliersSignal = signal<Supplier[]>([]);
  private readonly errorSignal = signal<string | null>(null);
  private readonly loadingSignal = signal<boolean>(false);
  private readonly totalCountSignal = signal<number>(0);

  // Readonly signals

  readonly suppliers = this.suppliersSignal.asReadonly();
  readonly error = this.errorSignal.asReadonly();
  // Computed signals
  readonly totalCount = this.totalCountSignal.asReadonly();


  readonly loading = this.loadingSignal.asReadonly();

  constructor(private learningApi: LearningApi) {

    this.loadSuppliers();

  }



  //SUPPLIER
  addSupplier(supplier: Supplier): void {
    this.loadingSignal.set(true);
    this.errorSignal.set(null);
    this.learningApi.createSupplier(supplier).pipe(retry(2)).subscribe({
      next: createdSupplier => {
        this.suppliersSignal.update(suppliers => [...suppliers, createdSupplier]);
        this.loadingSignal.set(false);
      },
      error: err => {
        this.errorSignal.set(this.formatError(err, 'Failed to create supplier-form'));
        this.loadingSignal.set(false);
      }
    });
  }

  getSupplierById(id: number | null | undefined): Signal<Supplier | undefined> {
    return computed(() => id ? this.suppliers().find(c => c.id === id) : undefined);
  }

  updateSupplier(updatedSupplier: Supplier): void {
    this.loadingSignal.set(true);
    this.errorSignal.set(null);
    this.learningApi.updateSupplier(updatedSupplier).pipe(retry(2)).subscribe({
      next: supplier => {
        this.suppliersSignal.update(suppliers => suppliers.map(c => c.id === supplier.id ? supplier : c));
        this.loadingSignal.set(false);
      },
      error: err => {
        this.errorSignal.set(this.formatError(err, 'Failed to update supplier'));
        this.loadingSignal.set(false);
      }
    });
  }



  deleteSupplier(id: number): void {
    this.loadingSignal.set(true);
    this.errorSignal.set(null);
    this.learningApi.deleteSupplier(id).pipe(retry(2)).subscribe({
      next: () => {
        this.suppliersSignal.update(suppliers => suppliers.filter(c => c.id !== id));
        this.loadingSignal.set(false);
      },
      error: err => {
        this.errorSignal.set(this.formatError(err, 'Failed to delete supplier'));
        this.loadingSignal.set(false);
      }
    });
  }



  private loadSuppliers(): void {
    this.loadingSignal.set(true);
    this.errorSignal.set(null);

    this.learningApi.getSuppliers() // => Observable<HttpResponse<Supplier[]>>
      .pipe(takeUntilDestroyed())
      .subscribe({
        next: resp => {
          this.suppliersSignal.set(resp.body ?? []);
          this.totalCountSignal.set(Number(resp.headers.get('X-Total-Count') ?? 0));
          this.loadingSignal.set(false);
        },
        error: err => {
          this.errorSignal.set(this.formatError(err, 'Failed to load suppliers'));
          this.loadingSignal.set(false);
        }
      });
  }




  private formatError(error: any,  fallback: string): string {
    if (error instanceof Error)
      return error.message.includes('Resource not found') ? `${fallback}: Not found` : error.message;
    return fallback;
  }

}
