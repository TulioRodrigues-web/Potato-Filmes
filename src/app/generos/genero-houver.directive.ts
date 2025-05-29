import { Directive, HostBinding, HostListener } from '@angular/core';

@Directive({
  selector: '[appGeneroHouver]',
  standalone: false
})
export class GeneroHouverDirective {
   
  
  @HostBinding('style.background-color') backgroundColor: string = 'transparent'; //fundo transparente
  @HostBinding('style.color') color:string = 'white'; //letras brancas padrão

  @HostListener('mouseenter') onMouseEnter(){
    this.backgroundColor = 'white'; //fundo branco ao passar o mouse
    this.color = 'black'; //Letras pretas ao passar o mouse

  }

  @HostListener('mouseleave') onMouseLeave(){
    this.backgroundColor = 'transparent'; //fundo volta a ser transparente ao remevor o mouse
    this.color = 'white'; //Letras voltam a ser brancas ao remover o mouse

  }
  
  

}
