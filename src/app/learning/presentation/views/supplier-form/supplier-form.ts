import {Component, inject} from '@angular/core';
import {FormBuilder, FormControl, ReactiveFormsModule, Validators} from '@angular/forms';
import {ActivatedRoute, Router} from '@angular/router';
import {LearningStore} from '../../../application/learning.store';
import {Supplier} from '../../../domain/model/supplier.entity';
import {MatError, MatFormField, MatLabel} from '@angular/material/form-field';
import {MatButton} from '@angular/material/button';
import {MatInput} from '@angular/material/input';
import {CommonModule} from '@angular/common';
import { OnInit } from '@angular/core';
import { MatAutocomplete, MatAutocompleteTrigger, MatAutocompleteSelectedEvent } from '@angular/material/autocomplete';
import { MatOption } from '@angular/material/core';
import * as countriesLib from 'i18n-iso-countries';
import esLocale from 'i18n-iso-countries/langs/es.json';
import {TranslatePipe} from '@ngx-translate/core';

@Component({
  selector: 'app-supplier-form',
  imports: [
    ReactiveFormsModule,
    MatFormField,
    MatLabel,
    MatError,
    MatButton,
    MatInput,
    CommonModule,
    MatAutocomplete, MatAutocompleteTrigger, MatOption,
    TranslatePipe
  ],
  templateUrl: './supplier-form.html',
  styleUrl: './supplier-form.css'
})


export class SupplierForm implements OnInit{
  private fb = inject(FormBuilder);
  private route = inject(ActivatedRoute);
  protected router = inject(Router);
  private store = inject(LearningStore);


  form = this.fb.group({
    legalName: new FormControl<string>('', { nonNullable: true, validators: [Validators.required] }),
    brandName: new FormControl<string>('', { nonNullable: true, validators: [Validators.required] }),
    taxId: new FormControl<number | null>(null, [Validators.required, Validators.pattern(/^\d{11}$/)]),
    phoneNumber: new FormControl<string>('', { nonNullable: true, validators: [Validators.required] }),
    email: new FormControl<string>('', { nonNullable: true, validators: [Validators.required, Validators.email] }),
    web: new FormControl<string>('', { nonNullable: true, validators: [
        Validators.required,
        Validators.pattern(/^(http|https):\/\/[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}.*$/)
      ]}),
    address: new FormControl<string>('', { nonNullable: true, validators: [Validators.required] }),
    country: new FormControl<string>('', { nonNullable: true, validators: [Validators.required] }),
    annualRevenueUsd: new FormControl<number | null>(null)


  });


  isEdit = false;
  supplierId: number | null = null;
  countries: { code: string; name: string }[] = [];
  filteredCountries: Array<{ code: string; name: string }> = [];

  get taxId() {
    return this.form.get('taxId');
  }


  constructor() {
    this.route.params.subscribe(params  => {
      this.supplierId = params['id'] ? +params['id'] : null;
      this.isEdit = !!this.supplierId;
      if (this.isEdit) {
        const supplier = this.store.getSupplierById(this.supplierId)();
        console.log(supplier);
        if (supplier) this.form.patchValue({brandName: supplier.brandName, taxId: supplier.taxId, legalName: supplier.legalName, phoneNumber: supplier.phoneNumber, email: supplier.email, web: supplier.web, address: supplier.address, country: supplier.country, annualRevenueUsd: supplier.annualRevenueUsd});

      }
    });
  }

  ngOnInit(): void {
    // 1) Registrar el locale DENTRO de un método (no en el cuerpo de la clase)
    countriesLib.registerLocale(esLocale as any);

    // 2) Obtener nombres oficiales en español
    const entries = Object.entries(
      countriesLib.getNames('es', { select: 'official' })
    ); // [['PE','Perú'], ['US','Estados Unidos'], ...]

    this.countries = entries.map(([code, name]) => ({ code, name: String(name) }));
    this.filteredCountries = this.countries;

    // 3) Autocompletar (si usas input libre)
    this.form.get('country')!.valueChanges.subscribe(v => {
      const q = (v ?? '').toString().toLowerCase();
      this.filteredCountries = this.countries.filter(c =>
        c.name.toLowerCase().includes(q)
      );
    });
  }

  onCountrySelected(option: { code: string; name: string }) {
    this.form.get('country')!.setValue(option.name);
    // si quieres guardar el código aparte, agrega un formControl 'countryCode'
    // this.form.get('countryCode')!.setValue(option.code);
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
      web: this.form.value.web!,
      address: this.form.value.address!,
      country: this.form.value.country!,
      annualRevenueUsd: this.form.value.annualRevenueUsd ?? 0
    });

    if (this.isEdit) this.store.updateSupplier(supplier); else this.store.addSupplier(supplier);
    this.router.navigate(['suppliers']).then();
  }
}
