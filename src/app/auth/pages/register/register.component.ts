import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

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
                private router: Router ) { }

  register() {

    console.log(this.myForm.value)

    this.router.navigateByUrl('/dashboard')

  }

}
