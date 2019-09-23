import { Component } from '@angular/core';
import { Storage } from '@ionic/storage';
import { ModalController, NavController, AlertController } from '@ionic/angular';
import { AddItemModalPage } from '../add-item-modal/add-item-modal.page';
import { OpenItemPage } from '../open-item/open-item.page';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})

export class HomePage {

  items: any = [];
  filterBy: any;
  filterSelector: any;

  nav = document.querySelector('ion-nav');

  constructor(private storage: Storage, public modalController: ModalController, public navController: NavController, public alertController: AlertController) {
    this.storage.get('itemsArr').then((val) => {
      if (val != "[]"){
       this.items = JSON.parse(val)
      }
      else{
       this.storage.set('itemsArr', JSON.stringify(this.items));
      }
    });
    this.filterBy = "All"
  }

  deleteItem(item){
    let index = this.items.indexOf(item);
    this.items.splice(index, 1);
    this.storage.set('itemsArr', JSON.stringify(this.items));
  }

  filterSelect(){
    this.filterSelector = document.querySelector('#hiddenSelector')
    this.filterSelector.open()
  }

  async openItem(item){
    let index = this.items.indexOf(item);

    const modal = await this.modalController.create({
      component: OpenItemPage,
      componentProps: {
        openedItem: item 
      }
    });

    modal.onDidDismiss()
      .then((data) => {
          if (data.data != undefined){
            this.items[index] = data.data
            this.storage.set('itemsArr', JSON.stringify(this.items));
          }
    });

    await modal.present(); 
  }

  getItems(){
    if(this.filterBy != "All"){
      var items2 = this.items.filter(checkItem, this);
      return items2;
    }
    else{
      return this.items
    }
    

    function checkItem(item) {
      return (item.category == this.filterBy);
    } 
  }

  async help(){
    const alert = await this.alertController.create({
      header: "About",
      message: 'eZlist Version 0.1.1',
      buttons: [
        {
            text: 'OK'
        }
    ]
    });
    await alert.present();
  }

  async addItem() {
    const modal = await this.modalController.create({
      component: AddItemModalPage,
      componentProps: { 
      }

      
    });

    modal.onDidDismiss()
      .then((data) => {
        if(data.data != undefined){
          var category
          var icon
          var color
          if(data.data.category == "barButton"){
            category = "Bar"
            icon = "beer"
            color = "#0cd1e8"
          }
          if(data.data.category == "bookButton"){
            category = "Book"
            icon = "book"
            color = "#ffce00"
          }
          if(data.data.category == "foodButton"){
            category = "Food"
            icon = "pizza"
            color = "pink"
          }
          if(data.data.category == "ideaButton"){
            category = "Idea"
            icon = "bulb"
            color = "orange"
          }
          if(data.data.category == "movieButton"){
            category = "Movie/TV"
            icon = "videocam"
            color = "#10dc60"
          }
          if(data.data.category == "musicButton"){
            category = "Music"
            icon = "musical-notes"
            color = "#ffbe7d"
          }
          if(data.data.category == "personButton"){
            category = "Person"
            icon = "person"
            color = "#7044ff"
          }
          if(data.data.category == "placeButton"){
            category = "Place"
            icon = "pin"
            color = "#f04141"
          }
          if(data.data.category == "productButton"){
            category = "Product"
            icon = "cube"
            color = "#ff8080"
          }
          if (this.items == null){
            this.items = [];
          }
          var newItem = {
            category: category,
            name: data.data.name,
            icon: icon,
            color: color,
            date: data.data.date,
            notes: ""
          }
          this.items.push(newItem)
          this.storage.set('itemsArr', JSON.stringify(this.items));
          this.openItem(newItem)
        }
    });

    await modal.present(); 

  }

}
