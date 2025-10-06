import {computed, Injectable, Signal, signal} from '@angular/core';
import {User} from '../domain/user.entity';
import {IamApi} from '../infrastructure/iam-api';
import {takeUntilDestroyed} from '@angular/core/rxjs-interop';
import {retry} from 'rxjs';


@Injectable({providedIn: 'root'})
export class IamStore {
  // State signals

  private readonly usersSignal = signal<User[]>([]);
  private readonly errorSignal = signal<string | null>(null);
  private readonly loadingSignal = signal<boolean>(false);

  // Readonly signals

  readonly users = this.usersSignal.asReadonly();
  readonly error = this.errorSignal.asReadonly();


  readonly loading = this.loadingSignal.asReadonly();

  constructor(private iamApi: IamApi) {

    this.loadUsers();

  }



  //USER
  getUserById(id: number | null | undefined): Signal<User | undefined> {
    return computed(() => id ? this.users().find(u => u.id === id) : undefined);
  }



  private loadUsers(): void {
    this.loadingSignal.set(true);
    this.errorSignal.set(null);

    this.iamApi.getUsers() // => Observable<HttpResponse<User[]>>
      .pipe(takeUntilDestroyed())
      .subscribe({
        next: resp => {
          this.usersSignal.set(resp.body ?? []);
          this.loadingSignal.set(false);
        },
        error: err => {
          this.errorSignal.set(this.formatError(err, 'Failed to load users'));
          this.loadingSignal.set(false);
        }
      });
  }




  private formatError(error: any,  fallback: string): string {
    if (error instanceof Error)
      return error.message.includes('Resource not found') ? `${fallback}: Not found` : error.message;
    return fallback;
  }

}
