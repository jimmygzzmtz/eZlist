import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { AddItemModalPage } from '../add-item-modal/add-item-modal.page';
import { OpenItemPage } from '../open-item/open-item.page';

import { HomePage } from './home.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild([
      {
        path: '',
        component: HomePage
      }
    ])
  ],
  declarations: [HomePage, AddItemModalPage, OpenItemPage],
  entryComponents: [AddItemModalPage, OpenItemPage]
})
export class HomePageModule {}
