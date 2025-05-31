import { NgModule } from '@angular/core'; // Permite criar módulos no Angular
import { CommonModule } from '@angular/common'; // Oferece diretivas comuns como *ngIf e *ngFor
import { IonicModule } from '@ionic/angular'; // Módulo com os componentes do Ionic (botões, cards, etc.)
import { FormsModule } from '@angular/forms'; // Permite o uso de formulários e ligação de dados (ngModel)
import { HomePage } from './home.page'; // Importa o componente da página Home
import { NgxPaginationModule } from 'ngx-pagination'; // Módulo para paginação dos dados

import { HomePageRoutingModule } from './home-routing.module'; // Importa o módulo de rotas específico para a página Home


@NgModule({
  imports: [
    CommonModule, // Diretivas comuns do Angular
    FormsModule,  // Para trabalhar com formulários (ex: [(ngModel)])
    IonicModule,   // Componentes visuais e funcionais do Ionic
    HomePageRoutingModule, // Define as rotas relacionadas à HomePage
    NgxPaginationModule // Permite uso da paginação na página
  ],
  declarations: [HomePage]   // Declara o componente que faz parte deste módulo
})
export class HomePageModule {} // Exporta a classe do módulo, que agrupa tudo relacionado à HomePage
