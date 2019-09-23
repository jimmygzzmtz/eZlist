import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';

@Component({
  selector: 'app-add-item-modal',
  templateUrl: './add-item-modal.page.html',
  styleUrls: ['./add-item-modal.page.scss'],
})
export class AddItemModalPage implements OnInit {

  itemName: any;
  selectedButtonId: string;

  constructor(public modalController: ModalController) {
  }

  ngOnInit() {
  }

  dismiss(){
    this.modalController.dismiss();
  }

  selectedButton($event){
    this.itemName = document.querySelector('#itemName');
    this.itemName.disabled = false
    this.itemName.setFocus()
    document.querySelector('#' + $event.target.id).fill = "outline"
    if(this.selectedButtonId != undefined){
      document.querySelector('#' + this.selectedButtonId).fill = "solid"
    }
    this.selectedButtonId = $event.target.id
  }

}
