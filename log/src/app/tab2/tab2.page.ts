import { Component } from '@angular/core';
import { Produtos } from '../services/model';
import { StorageService } from '../services/storage.service';

@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss']
})
export class Tab2Page {

  constructor(private storage: StorageService) {}

  listap: Produtos[] = []

  

  async prod(){      
    this.listap = this.storage.getAll()
  }

  ionViewDidEnter(){
    this.prod();
  }

  async excluir(nome: string){
    await this.storage.remove(nome)
    this.prod()
  }

}
