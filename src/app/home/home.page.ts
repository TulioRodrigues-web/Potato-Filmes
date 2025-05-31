import { Component , OnInit} from '@angular/core';
import { FiltatoService } from '../services/filtato.service'; // Importa o serviço que busca dados da API
import { Router } from '@angular/router';// Importa o roteador para navegação entre páginas
import { NgxPaginationModule } from 'ngx-pagination';// (Import desnecessário aqui, usado no módulo, não no componente)


@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
  standalone: false,
})
export class HomePage {

   PaginaInicial: any[] = [] // Armazena dados da página inicial da API
   mostrarIntegrantes = false; // Controle de exibição (provavelmente usado no HTML)
   filmes: any[] = []; // Lista de filmes/séries mostrados
   favoritos: any[] = []; // Lista de favoritos salvos
   seachTerm: string = ''; // Termo de busca digitado pelo usuário
   categoriaSelecionada = 'filmes'; // Categoria padrão
   mostrarMensagem = false; // Controle de exibição de alguma mensagem


   p: number = 1; // Página atual da paginação
   
   // Atualiza a página atual da paginação
   mudarPagina(event: number) {
  this.p = event;
}
   constructor(private FiltatoService: FiltatoService, private router: Router) {}

   // Executado quando o componente é iniciado
   ngOnInit(){

   this.loadPaginaInicial(); // Carrega dados da página inicial
   this.seachTerm = ''; // Reseta o campo de busca
   this.trocarCategoria(); // Carrega a categoria selecionada (filmes, séries, etc)
 
 }
// Voltar para o "início" recarregando a categoria
 voltarInicio(){

  this.seachTerm = '';
  this.trocarCategoria();
 }

// Troca a categoria com base na opção selecionada pelo usuário
 trocarCategoria(){

  if (this.categoriaSelecionada === 'filmes'){
    this.getPopularMovies(); // Carrega filmes populares

  }else if (this.categoriaSelecionada === 'series'){
    this.getPopularSeries(); // Carrega séries populares

  }else if (this.categoriaSelecionada === 'cartaz'){
    this.irParaPaginaEmCartaz(); // Vai para a página "Em cartaz"
  }
 }

// Requisição para obter filmes populares
 getPopularMovies(){
  this.FiltatoService.getPopularMovies().subscribe({
    next: (data) =>{
      
      this.filmes = data.results.map((filme: any) => ({
        ...filme,
        mostrarSinopse: false
        // Mapeia os filmes adicionando uma flag para exibir a sinopse
      }));
    },
     error:(err) => {
      console.error('Oxe, deu erro aqui ao busca a bobonica do filme', err);
     }
  });
 }


// Requisição para obter séries populares
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

  // Redireciona para a rota "/em-cartaz"
irParaPaginaEmCartaz(){
 this.router.navigate(['/em-cartaz']);
}


// Realiza a busca de filmes ou séries com base no termo digitado
searchMovies(){

// Se o campo estiver vazio, volta para a categoria
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

 // Alterna a exibição da sinopse de um filme
toggleSinopse(filme: any) {
  filme.mostrarSinopse = !filme.mostrarSinopse;
}


 // Adiciona um filme à lista de favoritos no localStorage
addToFavorites(filme: any){
   // Se favoritos ainda não foi carregado, recupera do localStorage
  if (!this.favoritos){
    this.favoritos = JSON.parse(localStorage.getItem('favoritos') || '[]');
  }

  // Verifica se o filme já está nos favoritos
  const jaFavoritado = this.favoritos.some(f => f.id === filme.id);
 // Se não estiver, adiciona
  if (!jaFavoritado){
    this.favoritos.push(filme);
    filme.favoritado = true;
    localStorage.setItem('favoritos', JSON.stringify(this.favoritos));
  }else {
    alert('Filme já foi favoritado oh Alzheimer')
  }
}

 // Carrega a página inicial da API
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
