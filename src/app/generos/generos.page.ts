import { Component, OnInit } from '@angular/core';
import { FilmesService } from '../services/filmes.service';
import { Router} from '@angular/router';


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

  voltarInicio() {
    this.router.navigate(['/home']);
  }
  
  ngOnInit() {
    this.filmesService.getGeneros().subscribe({
      next: (res) => this.generos = res.genres,
      error: (err) => console.error('Ops! sua busca por gêneros deu b.o ai visse', err)

    });
  }

  filterFilmes(generoId: number){
    this.selecteGenero= generoId;

    this.filmesService.buscarFilmesPorGenero(generoId).subscribe({
      next: (res) => this.filmes = res.results,
      error: (err) => console.error('Ops! sua busca por filmes deu merda ai visse', err)
    });
  }


  getImagemUrl(path: string): string{
    return `https://image.tmdb.org/t/p/w500${path}`;
  }
   
  mostrarMensagem = false;

  toggleMensagem(){
    this.mostrarMensagem = !this.mostrarMensagem;
  }
 

}
