import {Component, inject} from '@angular/core';
import {FormBuilder, FormControl, ReactiveFormsModule, Validators} from '@angular/forms';
import {ActivatedRoute, Router} from '@angular/router';
import {LearningStore} from '../../../application/learning.store';
import {Supplier} from '../../../domain/model/supplier.entity';
import {MatError, MatFormField, MatLabel} from '@angular/material/form-field';
import {MatButton} from '@angular/material/button';
import {MatInput} from '@angular/material/input';

@Component({
  selector: 'app-category-form',
  imports: [
    ReactiveFormsModule,
    MatFormField,
    MatLabel,
    MatError,
    MatButton,
    MatInput
  ],
  templateUrl: './supplier-form.html',
  styleUrl: './supplier-form.css'
})
export class SupplierForm {
  private fb = inject(FormBuilder);
  private route = inject(ActivatedRoute);
  private router = inject(Router);
  private store = inject(LearningStore);

  form = this.fb.group({
    legalName: new FormControl<string>('', { nonNullable: true, validators: [Validators.required] }),
    brandName: new FormControl<string>('', { nonNullable: true, validators: [Validators.required] }),
    taxId: new FormControl<string>('', { nonNullable: true, validators: [Validators.required] }),
    phoneNumber: new FormControl<string>('', { nonNullable: true, validators: [Validators.required] }),
    email: new FormControl<string>('', { nonNullable: true, validators: [Validators.required, Validators.email] }),
    address: new FormControl<string>('', { nonNullable: true, validators: [Validators.required] }),
    country: new FormControl<string>('', { nonNullable: true, validators: [Validators.required] }),
    annualRevenueUSD: new FormControl<number | null>(null)


  });

  isEdit = false;
  supplierId: number | null = null;

  constructor() {
    this.route.params.subscribe(params  => {
      this.supplierId = params['id'] ? +params['id'] : null;
      this.isEdit = !!this.supplierId;
      if (this.isEdit) {
        const supplier = this.store.getSupplierById(this.supplierId)();
        console.log(supplier);
        if (supplier) this.form.patchValue({brandName: supplier.brandName});
      }
    });
  }

  submit() {
    if (this.form.invalid) return;
    const supplier: Supplier = new Supplier({
      id: this.supplierId ?? 0,
      legalName: this.form.value.legalName!,
      brandName: this.form.value.brandName!,
      taxId: this.form.value.taxId!,
      phoneNumber: this.form.value.phoneNumber!,
      email: this.form.value.email!,
      address: this.form.value.address!,
      country: this.form.value.country!,
      annualRevenueUSD: this.form.value.annualRevenueUSD ?? 0
    });

    if (this.isEdit) this.store.updateSupplier(supplier); else this.store.addSupplier(supplier);
    this.router.navigate(['learning/suppliers']).then();
  }
}
