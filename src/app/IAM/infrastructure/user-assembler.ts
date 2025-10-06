import {BaseAssembler} from '../../shared/infrastructure/base-assembler';
import {UsersResponse, UserResource} from './users-response';
import {User} from '../domain/user.entity';


export class UserAssembler implements BaseAssembler<User, UserResource, UsersResponse> {
  toEntitiesFromResponse(response: UsersResponse): User[] {
    return response.users.map((resource) => this.toEntityFromResource(resource));
  }

  toEntityFromResource(resource: UserResource): User {
    return new User({
      id: resource.id,
      username: resource.username,
      passwordHash: resource.passwordHash
    });
  }

  toResourceFromEntity(entity: User): UserResource {
    return {
      id: entity.id,
      username: entity.username,
      passwordHash: entity.passwordHash
    };
  }
}

