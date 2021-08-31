import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styles: [
  ]
})
export class LoginComponent {

  myForm: FormGroup = this.formBuilder.group({
    email: ['juliette@test.com', [ Validators.required,  Validators.email ]],
    password: ['.F2021pass', [ Validators.required,  Validators.minLength(8) ]],
  })

  constructor( private formBuilder: FormBuilder,
                private router: Router,
                private authService: AuthService ) { }

  login() {

    console.log(this.myForm.value)

    const { email, password } = this.myForm.value

    this.authService.login(email, password)
      .subscribe( success => {

        if ( success ) {
          this.router.navigate(['dashboard'])
        } else {
          // TODO Mensaje de ERROR
        }
    })


  }

}
