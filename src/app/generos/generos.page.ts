

import { Component, OnInit } from '@angular/core'; //importação do component e OnInit
// Importa Component e OnInit do Angular. OnInit é uma interface usada para rodar algo ao iniciar o componente


import { FilmesService } from '../services/filmes.service';// Importa o serviço responsável por fazer requisições à API de filmes

import { Router} from '@angular/router'; //importação do serviço de requisição relacionadas a Filmes e series 
/*outras palavras, importa o serviço de navegação entre páginas */

/* Router serve, ao selecionar algum genero, ele manda requisição para mostrar os filmo ou serie daquele genero selecionado 

 Exemplo: voltar para a tela inicial ao clicar no título.

*/


@Component({
  selector: 'app-generos', // Nome do seletor HTML do componente
  templateUrl: './generos.page.html', // Caminho para o arquivo HTML (estrutura visual)
  styleUrls: ['./generos.page.scss'], // Caminho para o arquivo de estilos (CSS/SCSS)
  standalone: false // Define que o componente faz parte de um módulo e não é independente
})

// Classe principal do componente de gêneros
export class GenerosPage implements OnInit {

 generos: any[] = []; //Armazena a lista de gêneros vindos da API

 selecteGenero: number | null = null; // ID do gênero atualmente selecionado
 
 filmes: any [] = []; // Armazena os filmes filtrados pelo gênero selecionado

   // Construtor com injeção de dependências: serviço de filmes e roteador
 constructor(private filmesService: FilmesService, private router: Router) { }

 // Método que navega para a página inicial ("/home")
  voltarInicio() {

    this.router.navigate(['/home']);
  }

  //metodo executado automaticamente quando o componente é iniciado
  ngOnInit() {  // Método executado automaticamente quando o componente é carregado na tela

    //chama o metodo do serviço para obter a lista de generos
    this.filmesService.getGeneros().subscribe({ //Chama um método que retorna um Observable com os gêneros de filmes da API.
      
      next: (res) => this.generos = res.genres, //Quando os dados chegam com sucesso (res), ele guarda a lista de gêneros em this.generos.
      // Se a requisição for bem-sucedida, armazena a lista de gêneros
      
      
       // Se a requisição der erro, mostra mensagem no console
      error: (err) => console.error('Ops! sua busca por gêneros deu b.o ai visse', err) //Se a requisição falhar, exibe uma mensagem de erro no console.

    });
  }
  
//metodo de filtragem dos filmes com base no ID do genero selecionado
  filterFilmes(generoId: number){
    this.selecteGenero= generoId;
   
     // Chama o serviço para buscar filmes filtrados por esse gênero
    this.filmesService.buscarFilmesPorGenero(generoId).subscribe({ 


      // Se a resposta chegar com sucesso, guarda os filmes no array
      next: (res) => this.filmes = res.results,

     // Se der erro, exibe mensagem no console
      error: (err) => console.error('Ops! sua busca por filmes deu merda ai visse', err)
    });
  }

//metodo que monta a URL da imagem de um filme com base no caminho retornado da API
  getImagemUrl(path: string): string{
    return `https://image.tmdb.org/t/p/w500${path}`;
  }

   // Variável usada para exibir ou esconder a mensagem com os nomes do grupo
  mostrarMensagem = false;

  // Alterna o valor da variavel "mostrarMensagem" (true/false)
  toggleMensagem(){
    this.mostrarMensagem = !this.mostrarMensagem;
  }
 

}
