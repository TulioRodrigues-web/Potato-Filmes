import { Component , OnInit} from '@angular/core';
import { FiltatoService } from '../services/filtato.service'; //acha o service
import { Router } from '@angular/router';
import { NgxPaginationModule } from 'ngx-pagination';


@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
  standalone: false,
})
export class HomePage {

   PaginaInicial: any[] = []
   mostrarIntegrantes = false;
   filmes: any[] = [];
   favoritos: any[] = [];
   seachTerm: string = '';
   categoriaSelecionada = 'filmes';
   mostrarMensagem = false;


   p: number = 1; 
   

   mudarPagina(event: number) {
  this.p = event;
}
   constructor(private FiltatoService: FiltatoService, private router: Router) {}


   ngOnInit(){

   this.loadPaginaInicial();
   this.seachTerm = '';
   this.trocarCategoria();

 }

 voltarInicio(){

  this.seachTerm = '';
  this.trocarCategoria();
 }


 trocarCategoria(){

  if (this.categoriaSelecionada === 'filmes'){
    this.getPopularMovies();

  }else if (this.categoriaSelecionada === 'series'){
    this.getPopularSeries();

  }else if (this.categoriaSelecionada === 'cartaz'){
    this.irParaPaginaEmCartaz();
  }
 }


 getPopularMovies(){
  this.FiltatoService.getPopularMovies().subscribe({
    next: (data) =>{
      this.filmes = data.results.map((filme: any) => ({
        ...filme,
        mostrarSinopse: false
      }));
    },
     error:(err) => {
      console.error('Oxe, deu erro aqui ao busca a bobonica do filme', err);
     }
  });
 }

 getPopularSeries(){
   this.FiltatoService.getPopularSeries().subscribe({
    next: (data => {
      this.filmes = data.results.map((filme: any) => ({
        ...filme,
        mostrarSinopse: false,
      }));
    }),
    error: (err) => {
      console.error('Ué! Deu erro ao buscar séries populares', err);
    }
   });
 }

irParaPaginaEmCartaz(){
 this.router.navigate(['/em-cartaz']);
}



searchMovies(){

  if (this.seachTerm.trim() === ''){
    this.trocarCategoria();

  }else{

    if (this.categoriaSelecionada === 'filmes'){
      this.FiltatoService.searchMovie(this.seachTerm).subscribe({
        next: (data) => {
          this.filmes = data.results.map((filme: any) => ({
            ...filme,
            mostrarSinopse: false
          }));
        },

        error: (err) => {
          console.error('Erro ao buscar filmes, Aoopeste', err);
        }
      });
    }else if (this.categoriaSelecionada === 'series'){
      this.FiltatoService.searchTVShow(this.seachTerm).subscribe({
        next: (data) => {
          this.filmes = data.results.map((filmes: any) => ({
            ...filmes,
            mostrarSinopse: false
          })); 
        },
        error: (err) => {
          console.error('Erro ao buscar a peste da série', err);
        }
      });
    }
  }

}


toggleSinopse(filme: any) {
  filme.mostrarSinopse = !filme.mostrarSinopse;
}



addToFavorites(filme: any){
  if (!this.favoritos){
    this.favoritos = JSON.parse(localStorage.getItem('favoritos') || '[]');
  }

  const jaFavoritado = this.favoritos.some(f => f.id === filme.id);

  if (!jaFavoritado){
    this.favoritos.push(filme);
    filme.favoritado = true;
    localStorage.setItem('favoritos', JSON.stringify(this.favoritos));
  }else {
    alert('Filme já foi favoritado oh Alzheimer')
  }
}


loadPaginaInicial(){

  this.FiltatoService.getPaginaInicial().subscribe({
    next: (res) => {
      this.PaginaInicial = res.results;
      console.log('Filmes: ', this.PaginaInicial);
    },
    error: (err) => {
        console.error('Erro ao carregar filmes:', err);

    }
  });
}




}
