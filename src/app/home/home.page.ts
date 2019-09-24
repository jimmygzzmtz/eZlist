import { Component } from '@angular/core';
import { Storage } from '@ionic/storage';
import { ModalController, NavController, AlertController } from '@ionic/angular';
import { AddItemModalPage } from '../add-item-modal/add-item-modal.page';
import { OpenItemPage } from '../open-item/open-item.page';
import { SettingsPage } from '../settings/settings.page';
import { TranslateService } from '@ngx-translate/core';

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

  constructor(private storage: Storage, public modalController: ModalController, public navController: NavController, public alertController: AlertController, private _translate: TranslateService) {
    
    this.storage.get('itemsArr').then((val) => {
      if (val != "[]"){
       this.items = JSON.parse(val)
      }
      else{
       this.storage.set('itemsArr', JSON.stringify(this.items));
      }
    });

    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)');
    prefersDark.addListener((e) => this.checkToggle(e.matches));
    this.checkToggle(prefersDark.matches)

    this.filterBy = "All"
  }

  deleteItem(item){
    let index = this.items.indexOf(item);
    this.items.splice(index, 1);
    this.storage.set('itemsArr', JSON.stringify(this.items));
  }

  ngOnInit() {
    this.storage.get('lang').then((val) => {
      if (val != null){
        this._translate.use(val);
      }
      else{
        this._translate.use(this._translate.getBrowserLang());
       this.storage.set('lang', this._translate.getBrowserLang());
      }

    });
  }

  checkToggle(shouldCheck) {
    var darkOpt

    this.storage.get('darkMode').then((val) => {
      if (val != null){
        darkOpt = val
      }
      else{
       this.storage.set('darkMode', 'system');
       darkOpt.value = 'system'
      }

      if(darkOpt == 'system'){
        if(shouldCheck == true){
          document.body.classList.add('dark')
        }
        if(shouldCheck == false){
          document.body.classList.remove('dark')
        }
      }

      if(darkOpt == 'on'){
        document.body.classList.add('dark')
      }
      if(darkOpt == 'off'){
        document.body.classList.remove('dark')
      }
    });

  }

  filterSelect(){
    this.filterSelector = document.querySelector('#hiddenSelector')
    this.filterSelector.open()
  }

  onRightClick(item){
    var item2: any
    item2 = (document.getElementById(item.name + item.category))
    item2.open()
    return false;
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

  async goToSettings(){

    const modal = await this.modalController.create({
      component: SettingsPage,
      componentProps: {
      }
    });

    await modal.present(); 
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
