import {Injectable} from '@angular/core';
import {BaseApi} from '../../shared/infrastructure/base-api';
import {RiskEntitiesApiEndpoint} from './risk-entities-api-endpoint';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {Supplier} from '../domain/model/supplier.entity';
import {SuppliersApiEndpoint} from './suppliers-api-endpoint';
import {RiskEntity} from '../domain/model/risk-entity.entity';

@Injectable({providedIn: 'root'})
export class LearningApi extends BaseApi {
  private readonly suppliersEndpoint: SuppliersApiEndpoint;
  private readonly riskEntitiesEndpoint: RiskEntitiesApiEndpoint;

  constructor(http: HttpClient) {
    super();

    this.suppliersEndpoint = new SuppliersApiEndpoint(http);
    this.riskEntitiesEndpoint = new RiskEntitiesApiEndpoint(http);
  }

  //rsk-entity-form
  getAllRiskEntitiesByName(name: string): Observable<RiskEntity[]> {
    return this.riskEntitiesEndpoint.getAllByName(name);
  }

  //supplier-form
  getSupplier(id: number): Observable<Supplier> {
    return this.suppliersEndpoint.getById(id);
  }

  getSuppliers() {
    return this.suppliersEndpoint.getAllResponse(); // Observable<HttpResponse<Supplier[]>>
  }

  createSupplier(supplier: Supplier): Observable<Supplier> {
    return this.suppliersEndpoint.create(supplier);
  }

  updateSupplier(supplier: Supplier): Observable<Supplier> {
    return this.suppliersEndpoint.update(supplier, supplier.id);
  }

  deleteSupplier(id: number): Observable<void> {
    return this.suppliersEndpoint.delete(id);
  }

}
