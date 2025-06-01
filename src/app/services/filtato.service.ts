import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class FiltatoService {
  //Token de autenticação para acessar a API do TMDB (the Movie Database)
  private token = 'eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI4ZDFhYWNiNmJlMTA0NjUzOGQ4N2JlZTYzN2VmYWM1NSIsIm5iZiI6MS43NDcwNTQ4NTk2NTkwMDAyZSs5LCJzdWIiOiI2ODIxZjEwYjJkMzk0MGViYTU1YTJiY2IiLCJzY29wZXMiOlsiYXBpX3JlYWQiXSwidmVyc2lvbiI6MX0.UjrVM2CM0OCCke3WD33154PxvAJryHGakOkFpHRvsK4'
  
  //URL base da API
  private apiUrl = 'https://api.themoviedb.org/3'
  
  
  constructor(private http: HttpClient) { }



 // Ger a o cabeçalho de autorização com o token para autenticar as requisições
  private getHeaders(): HttpHeaders{
    return new HttpHeaders({
      Authorization: `Bearer ${this.token}`,
    });
  }


  // Faz uma requisição para a página inicial da API (retorna metadados gerais)// 
  getPaginaInicial(): Observable<any> {
  return this.http.get<any>('https://api.themoviedb.org/3');
}


  // Séries populares
    getPopularSeries(): Observable<any> {
    return this.http.get(`${this.apiUrl}/tv/popular?language=pt-BR&region=BR`, {
      headers: this.getHeaders(),
    });
  }


  // Filmes populares
  getPopularMovies(): Observable<any> {
    return this.http.get(`${this.apiUrl}/movie/popular?language=pt-BR&region=BR`, {
      headers: this.getHeaders(),
    });
  }

  
// Buscar filmes
  searchMovie(query: string): Observable<any> {
    return this.http.get(`${this.apiUrl}/search/movie?language=pt-BR&query=${query}`, {
      headers: this.getHeaders(),
    });
  }

  // Buscar séries
  searchTVShow(query: string): Observable<any> {
    return this.http.get(`${this.apiUrl}/search/tv?language=pt-BR&query=${query}`, {
      headers: this.getHeaders(),
    });
  }

// Favoritar filmes
  //funcionalidade diferente além de capturar os dados de uma API
  // Adiciona um filme aos favoritos, salvando no localStorage do navegador
  addToFavorites(filme: any) {
  const favoritos = this.getFavorites();
  favoritos.push(filme);
  localStorage.setItem('favoritos', JSON.stringify(favoritos));
}

 // Recupera os filmes favoritos do localStorage
//Busca os favoritos
  getFavorites(): any[] {
    return JSON.parse(localStorage.getItem('favoritos') || '[]');
  }

  // Busca detalhes de um filme específico com base no seu ID
  getMovieDetails(id: number): Observable<any> {
    return this.http.get(`${this.apiUrl}/movie/${id}?language=pt-BR`, {
      headers: this.getHeaders(),
    });
  }

}
