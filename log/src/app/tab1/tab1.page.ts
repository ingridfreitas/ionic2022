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
  listau: Usuario[] = []



  async prod() {
    if (this.pcad.value['desc'] != undefined) {
      this.listap = this.storage.getAll()
    }
  }

  async user() {
    this.listau = this.storage.getAll()
  }

  ionViewDidEnter() {
    this.prod();
  }

  async excluir(email: string) {
    await this.storage.remove(email)
    this.user()
  }

  pcad: FormGroup;
  produtos: Produtos = new Produtos()


  constructor(private fbuild: FormBuilder, private alertController: AlertController, private storage: StorageService) {
    this.pcad = this.fbuild.group({
      nome: [''],
      desc: [''],
      validade: [''],
      preco: ['']
    });
  }

  async salvarProduto() {
    if (this.pcad.valid) {
      this.produtos.nome = this.pcad.value.nome;
      this.produtos.desc = this.pcad.value.desc;
      this.produtos.validade = this.pcad.value.validade;
      this.produtos.preco = this.pcad.value.preco;
      await this.storage.set(this.produtos.nome, this.produtos)
      this.prod()
    }
    else {
      this.presentAlert()
    }
    console.log(this.listap);
  }

  async presentAlert() {
    const alert = await this.alertController.create({
      header: 'ERRO!!',
      message: 'Não foi possível concluir o cadastro',
      buttons: ['OK'],
    });

    await alert.present();
  }

  async deletarTudo(){
    await this.storage.delete();
  }

}
