import { Component } from '@angular/core';
import { Router } from '@angular/router';

import { AuthService } from 'src/app/auth/services/auth.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styles: [
  ]
})
export class DashboardComponent {

  get usuario() {
    return this.authService.usuario
  }

  constructor( private router: Router,
              private authService: AuthService ) { }

  logout(){

    this.router.navigateByUrl('/auth/sign_in')

  }

}
