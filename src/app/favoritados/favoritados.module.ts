import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { FavoritadosPageRoutingModule } from './favoritados-routing.module';

import { FavoritadosPage } from './favoritados.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    FavoritadosPageRoutingModule
  ],
  declarations: [FavoritadosPage]
})
export class FavoritadosPageModule {}
