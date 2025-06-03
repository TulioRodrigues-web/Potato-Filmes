
import { Injectable } from '@angular/core'; // Importa os decoradores e serviços necessários do Angular e do módulo HTTP

import { HttpClient, HttpHeaders } from '@angular/common/http';// Importa o HttpClient para fazer requisições HTTP e o HttpHeaders para configurar cabeçalhos (como o de autenticação)

import { Observable } from 'rxjs'; // Importa o tipo Observable para lidar com respostas assíncronas




// Define que este serviço será injetado globalmente (disponível em toda a aplicação)

@Injectable({
  providedIn: 'root'
})
export class FiltatoService {
  //Token de autenticação para acessar a API do TMDB (the Movie Database)
  private token = 'eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI4ZDFhYWNiNmJlMTA0NjUzOGQ4N2JlZTYzN2VmYWM1NSIsIm5iZiI6MS43NDcwNTQ4NTk2NTkwMDAyZSs5LCJzdWIiOiI2ODIxZjEwYjJkMzk0MGViYTU1YTJiY2IiLCJzY29wZXMiOlsiYXBpX3JlYWQiXSwidmVyc2lvbiI6MX0.UjrVM2CM0OCCke3WD33154PxvAJryHGakOkFpHRvsK4'
  
  //URL base da API TMDB
  private apiUrl = 'https://api.themoviedb.org/3'
  
  // Injeta o serviço HttpClient para fazer requisições HTTP
  constructor(private http: HttpClient) { }



// Método privado que retorna o cabeçalho de autorização com o token JWT
  private getHeaders(): HttpHeaders{
    return new HttpHeaders({
      Authorization: `Bearer ${this.token}`, // Adiciona o token no cabeçalho Authorization
    });
  }


  // Faz uma requisição para a página inicial da API (retorna metadados gerais)// 
  getPaginaInicial(): Observable<any> {
  return this.http.get<any>('https://api.themoviedb.org/3');
}


  // Séries populares
   // Faz uma requisição para buscar séries populares, com idioma e região configurados
    getPopularSeries(): Observable<any> {
    return this.http.get(`${this.apiUrl}/tv/popular?language=pt-BR&region=BR`, {
      headers: this.getHeaders(),
    });
  }


  // Filmes populares
  // Faz uma requisição para buscar filmes populares
  
  getPopularMovies(): Observable<any> {
    return this.http.get(`${this.apiUrl}/movie/popular?language=pt-BR&region=BR`, {
      headers: this.getHeaders(),
    });
  }

  
// Buscar filmes
 // Faz uma busca por filmes com base em um termo (query) digitado pelo usuário
  searchMovie(query: string): Observable<any> {
    return this.http.get(`${this.apiUrl}/search/movie?language=pt-BR&query=${query}`, {
      headers: this.getHeaders(),
    });
  }

  // Buscar séries
    // Faz uma busca por séries com base em um termo (query) digitado pelo usuário
  searchTVShow(query: string): Observable<any> {
    return this.http.get(`${this.apiUrl}/search/tv?language=pt-BR&query=${query}`, {
      headers: this.getHeaders(),
    });
  }

// Favoritar filmes
  //funcionalidade diferente além de capturar os dados de uma API
  // Adiciona um filme aos favoritos, salvando no localStorage do navegador
  addToFavorites(filme: any) {

  const favoritos = this.getFavorites(); // Recupera os favoritos atuais

  favoritos.push(filme);// Adiciona o novo filme à lista

  localStorage.setItem('favoritos', JSON.stringify(favoritos));// Salva novamente no localStorage
}

 // Recupera os filmes favoritos do localStorage
//Busca os favoritos
  getFavorites(): any[] {
    return JSON.parse(localStorage.getItem('favoritos') || '[]');
  }

  // Busca detalhes de um filme específico com base no seu ID
  getMovieDetails(id: number): Observable<any> {
    return this.http.get(`${this.apiUrl}/movie/${id}?language=pt-BR`, {
      headers: this.getHeaders(), // Inclui o token no cabeçalho
    });
  }

}
