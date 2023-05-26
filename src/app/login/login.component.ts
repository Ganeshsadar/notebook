import { Component } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { NgOptimizedImage } from '@angular/common';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {


  loginform = new FormGroup({
    user: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [Validators.required, Validators.minLength(5)]),
  })
  login() {
    console.warn(this.loginform.value)
  }
  get user() {
    return this.loginform.get('user')
  }
  get password() {
    return this.loginform.get('password')
  }
noSpaceAlow(control:FormControl)
{
if(control.value!=null && control.value.indexOf(' ')!=-1)
{
return{noSpaceAllowed:true};
}
return null;
}




}
