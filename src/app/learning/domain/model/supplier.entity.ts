import { BaseEntity } from '../../../shared/domain/model/base-entity';

/**
 * Supplier entity
 *
 */
export class Supplier implements BaseEntity {
  private _id: number;
  private _legalName: string;
  private _brandName: string;
  private _taxId: number;
  private _phoneNumber: string;
  private _email: string;
  private _web: string;
  private _address: string;
  private _country: string;
  private _annualRevenueUsd: number;
  private _lastUpdate: Date | null;

  /**
   * Constructor
   * @param supplier - Object containing supplier-form properties
   */
  constructor(supplier: {
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
    lastUpdate?: Date | null;
  }) {
    this._id = supplier.id;
    this._legalName = supplier.legalName;
    this._brandName = supplier.brandName;
    this._taxId = supplier.taxId;
    this._phoneNumber = supplier.phoneNumber;
    this._email = supplier.email;
    this._web = supplier.web;
    this._address = supplier.address;
    this._country = supplier.country;
    this._annualRevenueUsd = supplier.annualRevenueUsd
    this._lastUpdate = supplier.lastUpdate ?? null; // 👈


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

  get taxId(): number {
    return this._taxId;
  }
  set taxId(value: number) {
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

  get web(): string {
    return this._web;
  }
  set web(value: string) {
    this._web = value;
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

  get annualRevenueUsd(): number {
    return this._annualRevenueUsd;
  }
  set annualRevenueUsd(value: number) {
    this._annualRevenueUsd = value;
  }

  get lastUpdate(): Date | null {
    return this._lastUpdate;
  }



}
