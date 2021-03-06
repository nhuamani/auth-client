import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { catchError, map, tap } from 'rxjs/operators';
import { Observable, of } from 'rxjs'

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


  createUser( firstname: string, lastname: string, email: string,  password: string) {

    const url = `${ this.baseUrl }/auth/new`
    const body = { firstname, lastname, email, password }

    return this.http.post<AuthResponse>(url, body)
      .pipe(
        tap( ({ success, token }) => { // tap: encadena rxjs

          if ( success ) {

            localStorage.setItem('token', token!)

          }

        }),
        map( resp => resp.success ), // OK
        catchError( err => of(err.error.message) ) // ERROR
      )

  }


  logIn( email: string, password: string ) {

    const url = `${ this.baseUrl }/auth/login`
    const body = { email, password }

    return this.http.post<AuthResponse>(url, body)
      .pipe(
        tap( resp => {

          if ( resp.success ) {

            localStorage.setItem('token', resp.token!)

          }

        }),
        map( resp => resp.success ),
        catchError( err => of(err.error.message) ) // on of() tranformamos el boolean a un Observable
      )

  }


  logOut() {

    localStorage.removeItem('token')

  }


  validateToken(): Observable<boolean> {

    const url = `${ this.baseUrl }/auth/token`

    const headers = new HttpHeaders().set(
      'x-token', localStorage.getItem('token') || ''
    )

    return this.http.get<AuthResponse> (url, { headers })
            .pipe(
              map( resp => {

                localStorage.setItem('token', resp.newtoken! )

                this._user = {
                  uid: resp.uid!,
                  email: resp.email!,
                  firstname: resp.firstname!,
                  lastname: resp.lastname!,
                }

                return resp.success
              }),
              catchError( err => of(false) )
            )

  }

}
