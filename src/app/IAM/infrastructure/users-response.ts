import { BaseResource, BaseResponse } from '../../shared/infrastructure/base-response';

export interface UserResource extends BaseResource {
  id: number;
  username: string;
  passwordHash: string;
}

export interface UsersResponse extends BaseResponse {
  users: UserResource[];
}

