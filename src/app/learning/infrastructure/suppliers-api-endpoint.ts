import {BaseApiEndpoint} from '../../shared/infrastructure/base-api-endpoint';
import {HttpClient} from '@angular/common/http';
import {environment} from '../../../environments/environment';
import {Supplier} from '../domain/model/supplier.entity';
import {SupplierResource, SuppliersResponse} from './suppliers-response';
import {SupplierAssembler} from './supplier-assembler';

const suppliersEndpointUrl = `${environment.platformProviderApiBaseUrl}${environment.platformProviderSuppliersEndpointPath}`;
export class SuppliersApiEndpoint extends BaseApiEndpoint<Supplier, SupplierResource, SuppliersResponse, SupplierAssembler> {
  constructor(http: HttpClient) {
    super(http, suppliersEndpointUrl, new SupplierAssembler());
  }
}
