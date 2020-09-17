import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { Subscription } from 'rxjs';
import { JuegoAgilidad } from './../classes/juego-agilidad';

@Component({
  selector: 'app-agilidad-aritmetica',
  templateUrl: './agilidad-aritmetica.component.html',
  styleUrls: ['./agilidad-aritmetica.component.css']
})
export class AgilidadAritmeticaComponent implements OnInit {

  @Output()
  enviarJuego: EventEmitter<any>;
  juego: JuegoAgilidad;
  ocultarVerificar: boolean;
  timer: number;
  repetidor: any;
  private subscription: Subscription;

  constructor() {

    this.timer = 10;
    this.ocultarVerificar = true;
    this.juego = new JuegoAgilidad();
    this.enviarJuego = new EventEmitter<any>();
    console.info("Inicio agilidad");

    
  }

  ngOnInit() {
  }
  
  NuevoJuego() {
    this.ocultarVerificar = false;
    this.juego.newGame();

    this.repetidor = setInterval(() => {

      this.timer--;


      if (this.timer == 0) {

        clearInterval(this.repetidor);
        this.ocultarVerificar = true;
        this.timer = 10;
        alert('Perdiste no podes comprar mas dolares');

      }
    }, 900);
  }

  verificar(respuesta: number) {
    this.ocultarVerificar = false;
    //clearInterval(this.repetidor);
    this.juego.respuesta = respuesta;

    if(this.juego.verificar()){
      alert('Felicitaciones te ganaste un cepo');
    }
    else {
      alert(this.juego.retornarAyuda());
    }
  }
}
