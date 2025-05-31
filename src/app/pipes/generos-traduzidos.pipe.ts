import { Pipe, PipeTransform } from '@angular/core'; // Importa os decoradores e interfaces necessários para criar um Pipe no Angular

@Pipe({
  name: 'generosTraduzido', // Nome usado no template: {{ 'Action' | generosTraduzido }}
  standalone: false
 // Define se esse pipe é independente ou não (aqui está dentro de um módulo)
})


// Declaração da classe do Pipe, que implementa a interface PipeTransform
export class  GeneroTraduzidoPipe implements PipeTransform {
 private traducoes: {[key: string]: string} = {

  // Objeto com pares chave-valor, onde a chave é o nome do gênero em inglês
  // e o valor é a tradução correspondente em português
    'Action': 'Ação',
    'Comedy': 'Comédia',
    'Horror': 'Terror',
    'Thriller': 'Suspense',
    'Drama': 'Drama',
    'Science Fiction': 'Ficção Científica',
    'Animation': 'Animação',
    'Fantasy': 'Fantasia',
    'Adventure': 'Aventura',
    'Crime': 'Crime',
    'Romance': 'Romance',
    'Documentary': 'Documentário',
    'Music': 'Musical',
    'History': 'História',
    'Family': 'Família',
    'Mystery': 'Mistério',
    'TV Movie': 'Filme de TV',
    'War': 'Guerra',
    'Western': 'Faroeste'
 }
 // Método obrigatório da interface PipeTransform
  // Recebe o valor (gênero em inglês) e retorna a tradução, se existir
   transform(value: string): string {

    return this.traducoes[value] || value; // Retorna a tradução se houver, senão retorna o valor original
  }
}
