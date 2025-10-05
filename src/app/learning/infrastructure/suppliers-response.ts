import { BaseResource, BaseResponse } from '../../shared/infrastructure/base-response';

export interface SupplierResource extends BaseResource {
  id: number;
  legalName: string;
  brandName: string;
  taxId: string;
  phoneNumber: string;
  email: string;
  address: string;
  country: string;
  annualRevenueUSD: number;

}

export interface SuppliersResponse extends BaseResponse {
  suppliers: SupplierResource[];
}
