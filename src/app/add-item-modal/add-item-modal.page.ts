import { Component, OnInit } from '@angular/core';
import { ModalController, AlertController } from '@ionic/angular';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-add-item-modal',
  templateUrl: './add-item-modal.page.html',
  styleUrls: ['./add-item-modal.page.scss'],
})
export class AddItemModalPage implements OnInit {

  itemNameString: any;
  itemName: any;
  selectedButtonId: string;
  buttonAux: any;

  constructor(public modalController: ModalController, public alertController: AlertController, private _translate: TranslateService) {
  }

  ngOnInit() {
  }

  selectedButton($event){
    this.itemName = document.querySelector('#itemName');
    this.itemName.disabled = false
    setTimeout(() => { this.itemName.setFocus(); }, 150);
    if(this.selectedButtonId != $event.currentTarget.id){
      this.buttonAux = document.querySelector('#' + $event.currentTarget.id)
      this.buttonAux.fill = "outline"
      if(this.selectedButtonId != undefined){
        this.buttonAux = document.querySelector('#' + this.selectedButtonId)
        this.buttonAux.fill = "solid"
      }
      this.selectedButtonId = $event.currentTarget.id
    }
    else{
      this.buttonAux = document.querySelector('#' + this.selectedButtonId)
      this.buttonAux.fill = "solid"
      this.selectedButtonId = undefined
      this.itemName.disabled = true
    }
    
  }

  dismiss(){
    this.modalController.dismiss();
  }

  async save(){
    if(this.selectedButtonId == undefined || this.itemNameString == undefined){
      const alert = await this.alertController.create({
        header: this._translate.instant('FillInput'),
        buttons: [
          {
              text: 'OK'
          }
      ]
      });
      await alert.present();
    }
    else{
      var item = {
        category: this.selectedButtonId,
        name: this.itemNameString,
        date: new Date
      } 
      this.modalController.dismiss(item);
    }
  }

}
