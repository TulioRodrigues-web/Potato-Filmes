import { NgModule } from '@angular/core'; // Importa a função NgModule para criar um módulo Angular
import { CommonModule } from '@angular/common'; // Importa funcionalidades comuns do Angular, como *ngIf, *ngFor etc.
import { FormsModule } from '@angular/forms'; // Importa suporte a formulários e ao uso de [(ngModel)], etc.
import { GeneroTraduzidoPipe } from '../pipes/generos-traduzidos.pipe'; // Importa o pipe personalizado que traduz os gêneros para o português
import { GeneroHouverDirective } from './genero-houver.directive';// Importa a diretiva personalizada que adiciona comportamentos a elementos HTML



import { IonicModule } from '@ionic/angular'; // Importa os componentes visuais e funcionalidades do Ionic

import { GenerosPageRoutingModule } from './generos-routing.module'; // Importa o módulo de rotas da página de gêneros

import { GenerosPage } from './generos.page'; // Importa o componente da página de gêneros

@NgModule({
  imports: [
    CommonModule,   // Diretivas comuns do Angular
    FormsModule,  // Funcionalidades de formulários (ex: ngModel)
    IonicModule,  // Componentes e recursos do Ionic
    GenerosPageRoutingModule  // Rotas relacionadas à página GenerosPage
  ],
  declarations: [GenerosPage, GeneroTraduzidoPipe, GeneroHouverDirective]
/*GenerosPage -- Componente principal da página de gêneros*/
/* GeneroTraduzidoPipe -- Pipe que traduz o ID do gênero para texto*/
/* GeneroHouverDirective -- Diretiva personalizada aplicada em elementos da página*/
})
export class GenerosPageModule {}
