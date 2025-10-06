import { BaseEntity } from '../../shared/domain/model/base-entity';

/**
 * User entity
 */
export class User implements BaseEntity {
  private _id: number;
  private _username: string;
  private _passwordHash: string;

  /**
   * Constructor
   * @param user - Object containing user properties
   */
  constructor(user: { id: number; username: string; passwordHash: string }) {
    this._id = user.id;
    this._username = user.username;
    this._passwordHash = user.passwordHash;
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

  get username(): string {
    return this._username;
  }
  set username(value: string) {
    this._username = value;
  }

  get passwordHash(): string {
    return this._passwordHash;
  }
  set passwordHash(value: string) {
    this._passwordHash = value;
  }
}

