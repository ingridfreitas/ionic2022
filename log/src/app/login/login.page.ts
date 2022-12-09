import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AlertController } from '@ionic/angular';
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


  constructor(private formb: FormBuilder, private storage: StorageService, private route: Router) {
    this.loggin = this.formb.group({
      email: ['', Validators.compose([Validators.required, Validators.email])],
      senha: ['', Validators.required]
    });
  }


  async user() {
    this.listauser = this.storage.getAll()
  }

  ionViewDidEnter() {
    this.user()
  }

  ngOnInit() {
  }

  entrar() {
    for (let i = 0; this.listauser.length > i; i++) {
      if ((this.loggin.value['email'] == this.listauser[i].email) && (this.loggin.value['senha'] == this.listauser[i].senha)) {
        this.route.navigateByUrl('/tabs/tab1')
      }
    }
  }

}
