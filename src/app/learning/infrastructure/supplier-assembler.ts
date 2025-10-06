import {BaseAssembler} from '../../shared/infrastructure/base-assembler';
import {SuppliersResponse, SupplierResource} from './suppliers-response';
import {Supplier} from '../domain/model/supplier.entity';


export class SupplierAssembler implements BaseAssembler<Supplier, SupplierResource, SuppliersResponse> {
  toEntitiesFromResponse(response: SuppliersResponse): Supplier[] {
    return response.suppliers.map((resource) => this.toEntityFromResource(resource));
  }

  toEntityFromResource(resource: SupplierResource): Supplier {
    return new Supplier({
      id: resource.id,
      legalName: resource.legalName,
      brandName: resource.brandName,
      taxId: resource.taxId,
      phoneNumber: resource.phoneNumber,
      email: resource.email,
      web: resource.web,
      // website no viene en el resource; lo dejamos undefined (el constructor lo maneja)
      address: resource.address,
      country: resource.country,
      annualRevenueUsd: resource.annualRevenueUsd,
      lastUpdate: resource.lastUpdate ? new Date(resource.lastUpdate) : null
    });
  }

  toResourceFromEntity(entity: Supplier): SupplierResource {
    return {
      id: entity.id,
      legalName: entity.legalName,
      brandName: entity.brandName,
      taxId: entity.taxId,
      phoneNumber: entity.phoneNumber,
      email: entity.email,
      web: entity.web,
      address: entity.address,
      country: entity.country,
      annualRevenueUsd: entity.annualRevenueUsd,
      lastUpdate: entity.lastUpdate?.toISOString() ?? ''


    };
  }
}
