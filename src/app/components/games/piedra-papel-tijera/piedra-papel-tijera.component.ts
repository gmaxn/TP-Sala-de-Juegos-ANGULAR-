import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { Subscription } from 'rxjs';
import { Ppt } from '../../../classes/ppt';

@Component({
  selector: 'app-piedra-papel-tijera',
  templateUrl: './piedra-papel-tijera.component.html',
  styleUrls: ['./piedra-papel-tijera.component.css']
})
export class PiedraPapelTijeraComponent implements OnInit {

  @Output()
  enviarJuego: EventEmitter<any>;
  juego: Ppt;
  ocultarVerificar: boolean;
  timer: any;
  repetidor: any;
  private subscription: Subscription;
  showTimer: boolean;
  cardImageUrl: string;
  private MachineSelection: string;

  machineCard: string = "./../../assets/images/card-back.jpg";
  hide1: boolean = false;
  hide2: boolean = false;
  hide3: boolean = false;
  newGame: boolean = false;

  constructor() {

    this.showTimer = false;
    this.timer = 3;
    this.ocultarVerificar = true;
    this.juego = new Ppt();
    this.enviarJuego = new EventEmitter<any>();
    this.cardImageUrl = "./../../assets/images/card-back.jpg";



  }

  ngOnInit(): void {
  }

  NuevoJuego() {
    this.ocultarVerificar = false;
    this.showTimer = true;
    this.newGame = true;
    this.juego.newGame();

    this.repetidor = setInterval(() => {

      this.timer--;


      if (this.timer == 0) {
        this.showTimer = false;

        this.restoreDefaults();

        clearInterval(this.repetidor);
        this.ocultarVerificar = true;
        this.timer = 3;
        alert('Perdiste no podes comprar mas dolares');

      }
    }, 900);
  }

  restoreDefaults() {


    this.hide1 = false;
    this.hide2 = false;
    this.hide3 = false;
    this.machineCard = this.cardImageUrl;
    this.newGame = false;
  }
  verificar(respuesta: string) {


    console.log('res' + respuesta);
    this.ocultarVerificar = false;
    this.showTimer = false;
    //clearInterval(this.repetidor);
    this.juego.userSelection = respuesta;

    if (this.juego.verificar()) {
      alert('Felicitaciones te ganaste un cepo');
    }
  }



  onChooseCard(card: Event) {


    if (this.newGame) {

      switch (this.juego.machineSelection) {
        case 'rock':
          this.machineCard = "./../../assets/images/rock.jpg";
          break;
        case 'paper':
          this.machineCard = "./../../assets/images/paper.jpg";
          break;
        case 'scissors':
          this.machineCard = "./../../assets/images/scissors.jpg";
          break;
      }

      switch ((<HTMLInputElement>card.target).name) {
        case 'rock':
          this.hide1 = false;
          this.hide2 = true;
          this.hide3 = true;
          this.verificar('rock');
          break;
        case 'paper':
          this.hide1 = true;
          this.hide2 = false;
          this.hide3 = true;
          this.verificar('paper');
          break;
        case 'scissors':
          this.hide1 = true;
          this.hide2 = true;
          this.hide3 = false;
          this.verificar('scissors');
          break;
      }
    }
  }
}
