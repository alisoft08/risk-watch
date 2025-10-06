import {Component, inject} from '@angular/core';
import {LearningStore} from '../../../application/learning.store';
import {Router} from '@angular/router';
import {MatError} from '@angular/material/form-field';
import {MatProgressSpinner} from '@angular/material/progress-spinner';
import {
  MatCell,
  MatCellDef,
  MatColumnDef,
  MatHeaderCell,
  MatHeaderCellDef,
  MatHeaderRow,
  MatHeaderRowDef,
  MatRow,
  MatRowDef,
  MatTable
} from '@angular/material/table';
import {MatButton} from '@angular/material/button';
import {TranslatePipe} from '@ngx-translate/core';
import {DatePipe} from '@angular/common';

@Component({
  selector: 'app-supplier-list',
  imports: [
    MatError,
    MatProgressSpinner,
    MatTable,
    MatColumnDef,
    MatHeaderCell,
    MatCell,
    MatHeaderCellDef,
    MatCellDef,
    MatButton,
    MatHeaderRow,
    MatHeaderRowDef,
    MatRowDef,
    MatRow,
    TranslatePipe,
    DatePipe
  ],
  templateUrl: './supplier-list.html',
  styleUrl: './supplier-list.css'
})
export class SupplierList {
  isOpen = false;
  readonly store = inject(LearningStore);
  protected router = inject(Router);

  displayedColumns: string[] = ['id', 'legalName', 'brandName', 'taxId', 'phoneNumber', 'email', 'web', 'address', 'country', 'annualRevenueUsd', 'lastUpdate', 'actions'];

  editSupplier(id: number) {
    this.router.navigate(['suppliers',id,'edit']).then();
  }

  deleteSupplier(id: number) {
    this.store.deleteSupplier(id);
  }

  screenSupplier(name: string) {
    this.router.navigate(['suppliers',encodeURIComponent(name),'screening']).then();

  }

  // array ordenado cada vez que Angular re-renderiza
  get sortedSuppliers() {
    const items = [...this.store.suppliers()]; // evita mutar el original
    return items.sort((a: any, b: any) => {
      const ta = a?.lastUpdate ? new Date(a.lastUpdate).getTime() : 0;
      const tb = b?.lastUpdate ? new Date(b.lastUpdate).getTime() : 0;
      return tb - ta; // DESC: más nuevo primero
    });
  }


}
