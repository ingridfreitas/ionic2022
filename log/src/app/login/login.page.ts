import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  formLogin = this.formb.group({
  email: ['', Validators.compose([Validators.required, Validators.email])], 
  senha: ['', Validators.compose([Validators.required, Validators.minLength(6)])]
})

  constructor(private formb: FormBuilder) { }

  ngOnInit() {
  }

  entrar(){
  }

}
