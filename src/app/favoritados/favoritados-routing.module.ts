import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { FavoritadosPage } from './favoritados.page';

const routes: Routes = [
  {
    path: '',
    component: FavoritadosPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class FavoritadosPageRoutingModule {}
