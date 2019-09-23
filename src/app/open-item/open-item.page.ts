import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';

@Component({
  selector: 'app-open-item',
  templateUrl: './open-item.page.html',
  styleUrls: ['./open-item.page.scss'],
})
export class OpenItemPage implements OnInit {

  openedItem: any;
  name: any;
  icon: any;
  category: any;
  color: any;
  date: any;
  notesArea: any;

  constructor(public modalController: ModalController) { }

  ngOnInit() {
    this.name = this.openedItem.name
    this.icon = this.openedItem.icon
    this.category = this.openedItem.category
    this.color = this.openedItem.color
    this.date = this.openedItem.date
    this.notesArea = this.openedItem.notes
  }

  dismiss(){
    this.modalController.dismiss();
  }

  save(){
    var editedItem = {
      category: this.category,
      name: this.name,
      icon: this.icon,
      color: this.color,
      date: this.date,
      notes: this.notesArea
    }
    this.modalController.dismiss(editedItem);
  }

}
