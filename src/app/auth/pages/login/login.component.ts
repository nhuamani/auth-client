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
                private _authService: AuthService ) { }

  login() {

    console.log(this.myForm.value)

    const { email, password } = this.myForm.value

    this._authService.login(email, password).subscribe( data => {
      console.log(data)

    })

    // this.router.navigate(['dashboard'])
  }

}
