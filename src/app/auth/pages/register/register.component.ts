import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

import { AuthService } from '../../services/auth.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styles: [
  ]
})
export class RegisterComponent {

  myForm: FormGroup = this.formBuilder.group({
    firtsname: ['Luana', [ Validators.required, Validators.minLength(3) ]],
    lastname: ['Morales', [ Validators.required, Validators.minLength(4) ]],
    email: ['luana@test.com', [ Validators.required, Validators.email ]],
    password: ['.L2021pass', [ Validators.required, Validators.minLength(8) ]],
  })

  constructor( private formBuilder: FormBuilder,
              private router: Router,
              private authService: AuthService,
              private toastr: ToastrService ) { }


  registerUser() {

    // console.log(this.myForm.value)
    const { firtsname, lastname, email, password } = this.myForm.value

    this.authService.createUser(firtsname, lastname, email, password)
      .subscribe( message => {

        if ( message === true ) {

          this.router.navigateByUrl('/dashboard')
          this.toastr.success(`${email}`, 'Welcome!!!')

        } else {

          this.toastr.error(`${message}`, '')

        }

    })

  }

}
