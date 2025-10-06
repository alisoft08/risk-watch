import {BaseEntity} from '../../../shared/domain/model/base-entity';

/**
 * RiskEntity entity
 *
 */
export class RiskEntity implements BaseEntity{
  private _name: string;
  private _jurisdiction: string;
  private _linkedTo: string;
  private _dataSource: string;

  /**
   * Constructor
   * @param riskEntity - Object containing risk entity properties
   */
  constructor(riskEntity: {
    name: string;
    jurisdiction: string;
    linkedTo: string;
    dataSource: string;
  }) {
    this._name = riskEntity.name;
    this._jurisdiction = riskEntity.jurisdiction;
    this._linkedTo = riskEntity.linkedTo;
    this._dataSource = riskEntity.dataSource;
  }

  /**
   * Getters and Setters
   */

  get name(): string {
    return this._name;
  }
  set name(value: string) {
    this._name = value;
  }

  get jurisdiction(): string {
    return this._jurisdiction;
  }
  set jurisdiction(value: string) {
    this._jurisdiction = value;
  }

  get linkedTo(): string {
    return this._linkedTo;
  }
  set linkedTo(value: string) {
    this._linkedTo = value;
  }

  get dataSource(): string {
    return this._dataSource;
  }
  set dataSource(value: string) {
    this._dataSource = value;
  }
}
