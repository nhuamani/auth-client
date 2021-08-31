import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { catchError, map, tap } from 'rxjs/operators';
import { of } from 'rxjs'

import { environment } from 'src/environments/environment';
import { AuthResponse, Usuario } from '../interfaces/interfaces';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private baseUrl: string = environment.baseUrl;
  private _user!: Usuario;

  get usuario() {
    return { ...this._user } // ...desestructurando
  }

  constructor(private http: HttpClient) { }

  login( email: string, password: string ) {

    const url = `${ this.baseUrl }/auth/login`
    const body = { email, password }

    return this.http.post<AuthResponse>(url, body)
      .pipe(
        tap( resp => {

          if ( resp.success ) {

            this._user = {
              firstname: resp.firstname!,
              lastname: resp.lastname!,
              uid: resp.uid!,
            }

            console.log(this._user)

          }

        }),
        map( resp => resp.success ),
        catchError( err => of(err.error.message) ) // on of() tranformamos el boolean a un Observable
      )

  }

}
