import { Component } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { AddItemModalPage } from '../add-item-modal/add-item-modal.page';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {

  constructor(public modalController: ModalController) {

  }

  async addItem() {
    const modal = await this.modalController.create({
      component: AddItemModalPage,
      componentProps: { 
      }
    });

    modal.onDidDismiss()
      .then(() => {
        
    });

    await modal.present(); 

  }

}
