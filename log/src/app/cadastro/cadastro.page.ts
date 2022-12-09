import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, NgForm, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AlertController } from '@ionic/angular';
import { Usuario } from '../services/model';
import { StorageService } from '../services/storage.service';

@Component({
  selector: 'app-cadastro',
  templateUrl: './cadastro.page.html',
  styleUrls: ['./cadastro.page.scss'],
})
export class CadastroPage implements OnInit {

  fcad: FormGroup;
  usuario: Usuario = new Usuario()

  erros = {
    nome: [
      {tipo: 'required', mensagem: 'O campo nome é OBRIGATÓRIO'}
    ],
    cpf: [
      {tipo: 'required', mensagem: 'O campo cpf é OBRIGATÓRIO'},
      {tipo: 'minLength', mensagem: 'O campo nome deve possuir no mínimo 11 caracteres'}
    ],
    email: [
      {tipo: 'required', mensagem: 'O campo email é OBRIGATÓRIO'},
      {tipo: 'email', mensagem: 'O campo email deve ser de email'}
    ],
    senha: [
      {tipo: 'required', mensagem: 'O campo senha é OBRIGATÓRIO'},
      {tipo: 'minLength', mensagem: 'O campo senha deve possuir no mínimo 8 caracteres'}
    ],
    cosenha: [
      {tipo: 'required', mensagem: 'O campo senha é OBRIGATÓRIO'},
      {tipo: 'minLength', mensagem: 'O campo confirmar senha deve possuir no mínimo 8 caracteres'}
    ]
  }

  ngOnInit() { }

  constructor(private fbuild: FormBuilder, private alertController: AlertController, private storage: StorageService, private route: Router) {
    this.fcad = this.fbuild.group({
      nome: ['', Validators.required],
      cpf: ['', Validators.compose([Validators.required, Validators.minLength(11)])],
      email: ['', Validators.compose([Validators.email, Validators.required])],
      senha: ['', Validators.compose([Validators.required, Validators.minLength(8)])],
      cosenha: ['', Validators.compose([Validators.required, Validators.minLength(8)])]
    });
  }

  async salvarUser(){
    if(this.fcad.valid){
      this.usuario.nome = this.fcad.value.nome;
      this.usuario.cpf = this.fcad.value.cpf;
      this.usuario.email = this.fcad.value.email;
      this.usuario.senha = this.fcad.value.senha;
      await this.storage.set(this.usuario.email, this.usuario)
      this.route.navigateByUrl('/login')
    }
    else{
      this.presentAlert()
    }
  }

  async presentAlert() {
    const alert = await this.alertController.create({
      header: 'ERRO!!',
      message: 'Não foi possível concluir o cadastro',
      buttons: ['OK'],
    });

    await alert.present();
  }
}