import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styles: [
  ]
})
export class LoginComponent {

  myForm: FormGroup = this.formBuilder.group({
    email: ['juliette@test.com', [ Validators.required,  Validators.email ]],
    password: ['.F2021pass', [ Validators.required,  Validators.minLength(6) ]],
  })

  constructor( private formBuilder: FormBuilder ) { }

  login() {

    console.log(this.myForm.value)
    console.log(this.myForm.valid)

  }

}
