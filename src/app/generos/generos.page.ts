import { Component, OnInit } from '@angular/core'; //importação do component e OnInit
import { FilmesService } from '../services/filmes.service'; //Importação do service Filmes
import { Router} from '@angular/router'; //importação do serviço de requisição relacionadas a Filmes


@Component({
  selector: 'app-generos',
  templateUrl: './generos.page.html',
  styleUrls: ['./generos.page.scss'],
  standalone: false
})

export class GenerosPage implements OnInit {
 generos: any[] = []; //Generos de filmes
 selecteGenero: number | null = null; //Genero selecionado
 filmes: any [] = []; //Filmes filtrados por genero

  
 constructor(private filmesService: FilmesService, private router: Router) { }

 //metodo de voltar a pagina inicial
  voltarInicio() {
    this.router.navigate(['/home']);
  }

  //metodo executado automaticamente quando o componente é iniciado
  ngOnInit() {
    //chama o metodo do serviço para obter a lista de generos
    this.filmesService.getGeneros().subscribe({
      next: (res) => this.generos = res.genres,
      error: (err) => console.error('Ops! sua busca por gêneros deu b.o ai visse', err)

    });
  }
  
//metodo de filtragem dos filmes com base no ID do genero selecionado
  filterFilmes(generoId: number){
    this.selecteGenero= generoId;
   
    //Buscar filmes pelo genero
    this.filmesService.buscarFilmesPorGenero(generoId).subscribe({
      next: (res) => this.filmes = res.results,
      error: (err) => console.error('Ops! sua busca por filmes deu merda ai visse', err)
    });
  }

//metodo que monta a URL da imagem de um filme com base no caminho retornado da API
  getImagemUrl(path: string): string{
    return `https://image.tmdb.org/t/p/w500${path}`;
  }

  //  Variavel para exibir ou esconder uma mensagem no HTML
  mostrarMensagem = false;

  // Alterna o valor da variavel "mostrarMensagem" (true/false)
  toggleMensagem(){
    this.mostrarMensagem = !this.mostrarMensagem;
  }
 

}
