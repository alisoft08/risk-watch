import {BaseApiEndpoint} from '../../shared/infrastructure/base-api-endpoint';
import {HttpClient} from '@angular/common/http';
import {environment} from '../../../environments/environment';
import {User} from '../domain/user.entity';
import {UserResource, UsersResponse} from './users-response';
import {UserAssembler} from './user-assembler';

const usersEndpointUrl = `${environment.platformProviderApiBaseUrl}${environment.platfromProviderUsersEndpointPath}`;
export class UsersApiEndpoint extends BaseApiEndpoint<User, UserResource, UsersResponse, UserAssembler> {
  constructor(http: HttpClient) {
    super(http, usersEndpointUrl, new UserAssembler());
  }
}

