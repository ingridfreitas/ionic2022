import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Produtos, Usuario } from '../services/model';
import { StorageService } from '../services/storage.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  loggin: FormGroup;
  listauser: Usuario[] = []


  constructor(private formb: FormBuilder, private storage: StorageService) {
    this.loggin = this.formb.group({
      email: ['', Validators.compose ([Validators.required, Validators.email])],
      senha: ['', Validators.required]
    });
  }


  async user() {
    if (this.listauser[i].email != undefined) {
      this.listauser = this.storage.getAll()
    }
  }

  ionViewDidEnter() {
    console.log(this.listauser)
  
  }

  ngOnInit() {
    this.user()
  }

  entrar() {
    for (let i = 0; this.listauser.length > i; i++) {
      console.log(this.listauser.values['email'])
      if ((this.loggin.value['email'] == this.listauser[i].nome) && (this.loggin.value['senha'] == this.listauser[i].senha)) {
        console.log('Logado')
      }
    }
  }

}
