import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})

export class FilmesService {

   private token = "eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI4ZDFhYWNiNmJlMTA0NjUzOGQ4N2JlZTYzN2VmYWM1NSIsIm5iZiI6MS43NDcwNTQ4NTk2NTkwMDAyZSs5LCJzdWIiOiI2ODIxZjEwYjJkMzk0MGViYTU1YTJiY2IiLCJzY29wZXMiOlsiYXBpX3JlYWQiXSwidmVyc2lvbiI6MX0.UjrVM2CM0OCCke3WD33154PxvAJryHGakOkFpHRvsK4"

   private apiUrl = "https://api.themoviedb.org/3"

  constructor(private http: HttpClient) { }
  //metodos get:
  // Busca lista de gêneros: metodos que busca os filmes da api e retorna na pagina


  /*getGeneros(): Observable<any>

   - Busca a lista completa de gêneros de filmes

   - Retorna um Observable com o array de gêneros
   
   - Requer autenticação via token no header
   
   */


  getGeneros(): Observable<any>{
 
    const headers = new HttpHeaders().set('Authorization', `Bearer ${this.token}`);
  
    return this.http.get(`${this.apiUrl}/genre/movie/list`, {headers});

  }
    

// ==========================================================================================================
 

  buscarFilmesPorGenero(idGenero: number): Observable<any>{
    const headers = new HttpHeaders().set('Authorization', `Bearer ${this.token}`);
    return this.http.get(`${this.apiUrl}/discover/movie`, {
      headers,
      params: {
        with_genres: idGenero.toString(),
        language: 'pt-BR'
      }
    });
  }
  
  /* buscarFilmesPorGenero(idGenero: number): Observable<any>
    - Busca filmes filtrados por ID de gênero
    - Parâmetros:
    - idGenero: número ID do gênero (ex: 28 para Ação)
    - Configurações:
    - Idioma: pt-BR (português do Brasil)
    - Autenticação via token no header
    - Retorna Observable com array de filmes correspondentes
    
    Exemplo de uso no componente:
    this.filmesService.getGeneros().subscribe(generos => {...});
    this.filmesService.buscarFilmesPorGenero(28).subscribe(filmes => {...});
    
    */


// =====================================================================================================
    //adicionei o metedo getPaginaInicial
getPaginaInicial(): Observable<any> {
  return this.http.get<any>('https://api.themoviedb.org/3');
}

}
