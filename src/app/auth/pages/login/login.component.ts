import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

import { AuthService } from '../../services/auth.service';
import { ToastrService } from 'ngx-toastr';

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
                private authService: AuthService,
                private toastr: ToastrService ) { }

  login() {

    const { email, password } = this.myForm.value

    this.authService.login(email, password)
      .subscribe( success => {

        if ( success === true ) {

          this.router.navigate(['dashboard'])
          this.toastr.success(`${email}`, 'Welcome!!!')

        } else {

          this.toastr.error(`${success}`)

        }

    })

  }

}
