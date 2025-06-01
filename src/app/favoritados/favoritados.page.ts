import { Component, OnInit } from '@angular/core';
import { FiltatoService } from '../services/filtato.service';
import { Router } from '@angular/router';
@Component({
  selector: 'app-favoritados',
  templateUrl: './favoritados.page.html',
  styleUrls: ['./favoritados.page.scss'],
  standalone: false
})
export class FavoritadosPage implements OnInit {
  favoritos: any[] = []; // Guarda a lista de filmes favoritos
  filmeDetalhes: any = null; // guarda o filme selecionado para mostrar detalhes

  constructor(private filtatoService: FiltatoService, private router: Router) { }

  ngOnInit() {
    this.carregarFavoritos(); //Quando a página carregar, pega os favoritos

  }

  carregarFavoritos(){
    this.favoritos = this.filtatoService.getFavorites();
  }

  removeFavorito(filme: any){
    let favoritos = this.filtatoService.getFavorites(); // Pega a lista atual
    favoritos = favoritos.filter( f => f.id !== filme.id);
    localStorage.setItem('favoritos', JSON.stringify(favoritos));
    this.carregarFavoritos();
  }

  abrirDetalhes(filme: any){
    this.router.navigate(['/detalhes', filme.id]);
  }


  mostrarDetalhes(filme: any){
    if (this.filmeDetalhes && this.filmeDetalhes.id === filme.id){
      this.filmeDetalhes = null;
      return;
    }


    this.filtatoService.getMovieDetails(filme.id).subscribe(
      data => {
        this.filmeDetalhes = data;
      },

      error => {
        console.error('Erro ao carregar detalhes: ', error);
      }
    );
  }


  fecharDetalhes(){

    this.filmeDetalhes = null;

  }
}
