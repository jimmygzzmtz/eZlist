import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';

@Component({
  selector: 'app-open-item',
  templateUrl: './open-item.page.html',
  styleUrls: ['./open-item.page.scss'],
})
export class OpenItemPage implements OnInit {

  openedItem: any;
  icon: any;
  category: any;
  color: any;
  date: any;
  notesArea: any;
  itemNameInput: any;
  categorySelector: any;
  categorySelectorVal: any;

  constructor(public modalController: ModalController) { }

  ngOnInit() {
    this.icon = this.openedItem.icon
    this.category = this.openedItem.category
    this.color = this.openedItem.color
    this.date = this.openedItem.date
    this.notesArea = this.openedItem.notes
    this.itemNameInput = this.openedItem.name

    this.categorySelectorVal = this.openedItem.category

    //var textArea = document.querySelector('#textArea');
    //setTimeout(() => { textArea.setFocus(); }, 150);
  }

  dismiss(){
    this.modalController.dismiss();
  }

  catChanged(cat){
    if(cat == "Bar"){
      this.icon = "beer"
      this.color = "#0cd1e8"
    }
    if(cat == "Book"){
      this.icon = "book"
      this.color = "#ffce00"
    }
    if(cat == "Food"){
      this.icon = "pizza"
      this.color = "pink"
    }
    if(cat == "Idea"){
      this.icon = "bulb"
      this.color = "orange"
    }
    if(cat == "Movie"){
      this.icon = "videocam"
      this.color = "#10dc60"
    }
    if(cat == "Music"){
      this.icon = "musical-notes"
      this.color = "#ffbe7d"
    }
    if(cat == "Person"){
      this.icon = "person"
      this.color = "#7044ff"
    }
    if(cat == "Place"){
      this.icon = "pin"
      this.color = "#f04141"
    }
    if(cat == "Product"){
      this.icon = "cube"
      this.color = "#ff8080"
    }
  }

  categorySelect(){
    this.categorySelector = document.querySelector('#hiddenCatSelector')
    this.categorySelector.open()
  }

  save(){
    var editedItem = {
      category: this.categorySelectorVal,
      name: this.itemNameInput,
      icon: this.icon,
      color: this.color,
      date: this.date,
      notes: this.notesArea
    }
    this.modalController.dismiss(editedItem);
  }

}
