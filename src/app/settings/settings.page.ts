import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { Storage } from '@ionic/storage';
import { TranslateService } from '@ngx-translate/core';
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.page.html',
  styleUrls: ['./settings.page.scss'],
})
export class SettingsPage implements OnInit {

  lang: any;
  darkOpt: any;

  constructor(public modalController: ModalController, private storage: Storage, private _translate: TranslateService, public alertController: AlertController) {

  }

  ngOnInit() {
    this.darkOpt = document.getElementById("darkOptSettings")
    this.storage.get('darkMode').then((val) => {
      this.darkOpt.value = val
    });

    this.storage.get('lang').then((val) => {
      this.lang = val
    });
  }

  selectDarkTheme(){
    if(this.darkOpt.value == 'system'){
      document.body.classList.toggle('dark', (window.matchMedia('(prefers-color-scheme: dark)').matches))
      this.storage.set('darkMode', this.darkOpt.value);
    }
    if(this.darkOpt.value == 'on'){
      document.body.classList.add('dark')
      this.storage.set('darkMode', this.darkOpt.value);
    }
    if(this.darkOpt.value == 'off'){
      document.body.classList.remove('dark')
      this.storage.set('darkMode', this.darkOpt.value);
    }
  }

  dismiss(){
    this.modalController.dismiss();
  }

  async clearStorage() {
    const alert = await this.alertController.create({
      header: this._translate.instant('ClearSt'),
      message: this._translate.instant('ConfirmClear'),
      buttons: [
        {
            text: this._translate.instant('Cancel')
        },
        {
            text: 'OK',
            handler: data => {
              this.storage.clear()
              location.reload()
            }
        }
    ]
    });

    await alert.present();
  }

  switchLang(lang){
    this._translate.use(lang);
    this.storage.set('lang', lang);
  }

  async installPrompt(){
    const alert = await this.alertController.create({
      header: this._translate.instant('Install'),
      message: this._translate.instant('InstallGuideiOS') + this._translate.instant('InstallGuideAndroid') + this._translate.instant('InstallGuideDesktop'),
      buttons: [
        {
            text: 'OK'
        }
    ]
    });

    await alert.present();
  }

}
