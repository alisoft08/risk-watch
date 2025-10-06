import {Injectable} from '@angular/core';
import {BaseApi} from '../../shared/infrastructure/base-api';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {User} from '../domain/user.entity';
import {UsersApiEndpoint} from './users-api-endpoint';
import {environment} from '../../../environments/environment';

@Injectable({providedIn: 'root'})
export class IamApi extends BaseApi {
  private readonly usersEndpoint: UsersApiEndpoint;

  constructor(private http: HttpClient) {
    super();
    this.usersEndpoint = new UsersApiEndpoint(http);
  }

  //user-management
  getUser(id: number): Observable<User> {
    return this.usersEndpoint.getById(id);
  }

  getUsers() {
    return this.usersEndpoint.getAllResponse(); // Observable<HttpResponse<User[]>>
  }

  // Authentication
  signUp(username: string, password: string): Observable<any> {
    const url = `${environment.platformProviderApiBaseUrl}${environment.platformProviderSignUpEndpointPath}`;
    return this.http.post(url, { username, password });
  }

  signIn(username: string, password: string): Observable<any> {
    const url = `${environment.platformProviderApiBaseUrl}${environment.platfromProviderSignInEndpointPath}`;
    return this.http.post(url, { username, password });
  }

}
