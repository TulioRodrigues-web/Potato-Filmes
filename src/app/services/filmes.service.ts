
import { Injectable } from '@angular/core';// Importa o decorador Injectable para permitir a injeção de dependência deste serviço em outros componentes

import { HttpClient, HttpHeaders } from '@angular/common/http'; // Importa classes para fazer requisições HTTP e configurar cabeçalhos

import { Observable } from 'rxjs'; // Importa a classe Observable do RxJS para trabalhar com respostas assíncronas


@Injectable({
  providedIn: 'root'
})

export class FilmesService {

   private token = "eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI4ZDFhYWNiNmJlMTA0NjUzOGQ4N2JlZTYzN2VmYWM1NSIsIm5iZiI6MS43NDcwNTQ4NTk2NTkwMDAyZSs5LCJzdWIiOiI2ODIxZjEwYjJkMzk0MGViYTU1YTJiY2IiLCJzY29wZXMiOlsiYXBpX3JlYWQiXSwidmVyc2lvbiI6MX0.UjrVM2CM0OCCke3WD33154PxvAJryHGakOkFpHRvsK4"

   private apiUrl = "https://api.themoviedb.org/3"

  constructor(private http: HttpClient) { }
  /*Método: getGeneros()
    - Busca a lista de gêneros de filmes da API
    - Retorna um Observable com os dados dos gêneros
    - Adiciona o token de autenticação no header da requisição



   SOBRE OBSERVABLE:
    ------------------
    - Um Observable funciona como uma "entrega de dados assíncronos"

    - Ele espera os dados chegarem da API e depois te avisa quando estiverem prontos

    - Para acessar os dados de um Observable, usamos .subscribe(), como:
    this.filmesService.getGeneros().subscribe(dados => { ... });

    - É como se você "assinasse" uma revista: ela chega quando estiver pronta
   
   */


  getGeneros(): Observable<any>{
 
    const headers = new HttpHeaders().set('Authorization', `Bearer ${this.token}`);
  
    return this.http.get(`${this.apiUrl}/genre/movie/list`, {headers});
    
    /*Método: getGeneros()
    - Busca a lista de gêneros de filmes da API
    - Retorna um Observable com os dados dos gêneros
    - Adiciona o token de autenticação no header da requisição
    */
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

    /*Método: buscarFilmesPorGenero(idGenero)
    - Busca filmes filtrados por um ID de gênero específico
    - Adiciona o token no header e envia o parâmetro with_genres e language
    - Retorna um Observable com a lista de filmes
  */
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
 /*
    Método: getPaginaInicial()
    - Retorna o conteúdo padrão da URL base da API
    - Pode ser usado para testar se a API está acessível
    - Também retorna um Observable, ou seja: os dados virão de forma assíncrona e você acessa com .subscribe()
  */
}
