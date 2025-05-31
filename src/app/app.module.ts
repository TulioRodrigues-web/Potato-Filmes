import { NgModule } from '@angular/core';// Importa o decorador NgModule, que permite definir um módulo Angular
import { BrowserModule } from '@angular/platform-browser';// Importa o BrowserModule, necessário para executar a aplicação no navegador
import { RouteReuseStrategy } from '@angular/router';// Importa a interface RouteReuseStrategy, que define como reutilizar rotas no Angular
import {HttpClientModule} from "@angular/common/http";// Importa o módulo HttpClientModule, usado para fazer requisições HTTP para APIs
import { NgxPaginationModule } from 'ngx-pagination';// Importa o módulo de paginação (ngx-pagination), útil para adicionar paginação em listas
import { IonicModule, IonicRouteStrategy } from '@ionic/angular';// Importa funcionalidades do Ionic

import { AppComponent } from './app.component';// Importa o componente principal da aplicação
import { AppRoutingModule } from './app-routing.module';// Importa o módulo de roteamento da aplicação

@NgModule({
  declarations: [AppComponent],
  imports: [BrowserModule, HttpClientModule, IonicModule.forRoot(), AppRoutingModule, NgxPaginationModule],
  providers: [{ provide: RouteReuseStrategy, useClass: IonicRouteStrategy }],
  bootstrap: [AppComponent],
})
export class AppModule {}

// BrowserModule = Necessário para aplicação web
// HttpClientModule = Fazer chamadas HTTP 
// IonicModule, forRoot() = inicaliza o Ionic
// AppRoutingModule = Responsavel pelas rotas da aplicação
// NgxPaginationModule = Paginação de Listas
