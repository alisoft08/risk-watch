import { BaseResource, BaseResponse } from '../../shared/infrastructure/base-response';

export interface SupplierResource extends BaseResource {
  id: number;
  legalName: string;
  brandName: string;
  taxId: number;
  phoneNumber: string;
  email: string;
  web: string;
  address: string;
  country: string;
  annualRevenueUsd: number;
  lastUpdate: string;

}

export interface SuppliersResponse extends BaseResponse {
  suppliers: SupplierResource[];
}
