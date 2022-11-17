import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { Usuario } from '../model';
import { ServicesService } from '../services.service';

@Component({
  selector: 'app-cadastro',
  templateUrl: './cadastro.page.html',
  styleUrls: ['./cadastro.page.scss'],
})
export class CadastroPage implements OnInit {

  nome: string;
  cpf: string;
  email: string;
  senha: string;
  cosenha: string

  usuario: Usuario[]

  user = {} as Usuario;

  ngOnInit() {
  }

  constructor(private http: HttpClient, private router: Router, private service: ServicesService) {
  }

  salvar() {
    const user: Usuario = {
      nome: this.nome,
      cpf: this.cpf,
      email: this.email,
      senha: this.senha
    }

    console.log(this.user.nome)
    console.log(this.user.cpf)
    console.log(this.user.email)
    console.log(this.user.senha)


    this.service.criarUsuario(user).subscribe(user => {
      console.log(user)
    })
  }

  
}