import { BaseEntity } from '../../../shared/domain/model/base-entity';

/**
 * Supplier entity
 *
 */
export class Supplier implements BaseEntity {
  private _id: number;
  private _legalName: string;
  private _brandName: string;
  private _taxId: string;
  private _phoneNumber: string;
  private _email: string;
  private _website: string;
  private _address: string;
  private _country: string;
  private _annualRevenueUSD: number

  /**
   * Constructor
   * @param supplier - Object containing supplier-form properties
   */
  constructor(supplier: {
    id: number;
    legalName: string;
    brandName: string;
    taxId: string;
    phoneNumber: string;
    email: string;
    website?: string;
    address: string;
    country: string;
    annualRevenueUSD: number

  }) {
    this._id = supplier.id;
    this._legalName = supplier.legalName;
    this._brandName = supplier.brandName;
    this._taxId = supplier.taxId;
    this._phoneNumber = supplier.phoneNumber;
    this._email = supplier.email;
    this._website = supplier.website ?? '';
    this._address = supplier.address;
    this._country = supplier.country;
    this._annualRevenueUSD = supplier.annualRevenueUSD

  }

  /**
   * Getters and Setters
   */
  get id(): number {
    return this._id;
  }
  set id(value: number) {
    this._id = value;
  }

  get legalName(): string {
    return this._legalName;
  }
  set legalName(value: string) {
    this._legalName = value;
  }

  get brandName(): string {
    return this._brandName;
  }
  set brandName(value: string) {
    this._brandName = value;
  }

  get taxId(): string {
    return this._taxId;
  }
  set taxId(value: string) {
    this._taxId = value;
  }

  get phoneNumber(): string {
    return this._phoneNumber;
  }
  set phoneNumber(value: string) {
    this._phoneNumber = value;
  }

  get email(): string {
    return this._email;
  }
  set email(value: string) {
    this._email = value;
  }

  get website(): string {
    return this._website;
  }
  set website(value: string) {
    this._website = value;
  }

  get address(): string {
    return this._address;
  }
  set address(value: string) {
    this._address = value;
  }

  get country(): string {
    return this._country;
  }
  set country(value: string) {
    this._country = value;
  }

  get annualRevenueUSD(): number {
    return this._annualRevenueUSD;
  }
  set annualRevenueUSD(value: number) {
    this._annualRevenueUSD = value;
  }


}
