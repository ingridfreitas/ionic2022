import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AlertController } from '@ionic/angular';
import { Produtos, Usuario } from '../services/model';
import { StorageService } from '../services/storage.service';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page {

  listap: Produtos[] = []

  pcad: FormGroup;
  produtos: Produtos = new Produtos()


  constructor(private fbuild: FormBuilder, private alertController: AlertController, private storage: StorageService) {
    this.pcad = this.fbuild.group({
      nome_prod: ['', Validators.required],
      desc: ['', Validators.required],
      validade: ['', Validators.required],
      preco: ['', Validators.required]
    });
  }

  async salvarProduto() {
    if (this.pcad.valid) {
      this.produtos.nome_prod = this.pcad.value.nome_prod;
      this.produtos.desc = this.pcad.value.desc;
      this.produtos.validade = this.pcad.value.validade;
      this.produtos.preco = this.pcad.value.preco;
      await this.storage.set(this.produtos.nome_prod, this.produtos)
      this.prod()
    }
    else {
      this.presentAlert()
    }
    console.log(this.listap);
  }

  async excluir(nome: string) {
    await this.storage.remove(nome)
    this.prod()
  }

  async presentAlert() {
    const alert = await this.alertController.create({
      header: 'ERRO!!',
      message: 'Não foi possível concluir o cadastro',
      buttons: ['OK'],
    });

    await alert.present();
  }

  async prod() {
    this.listap = this.storage.getAll()
  }

  ionViewDidEnter() {
    this.prod()
  }

}
