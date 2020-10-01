import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { Subscription } from 'rxjs';
import { IRecord } from 'src/app/models/record';
import { IUser } from 'src/app/models/user';
import { RecordsService } from 'src/app/services/records.service';
import { JuegoAgilidad } from '../../../classes/juego-agilidad';

@Component({
  selector: 'app-agilidad-aritmetica',
  templateUrl: './agilidad-aritmetica.component.html',
  styleUrls: ['./agilidad-aritmetica.component.css']
})
export class AgilidadAritmeticaComponent implements OnInit {

  private errorMessage: string;
  private currentUser:IUser;
  private records:IRecord[];
  
  @Output()
  enviarJuego: EventEmitter<any>;
  juego: JuegoAgilidad;
  ocultarVerificar: boolean;
  timer: number;
  repetidor: any;
  private subscription: Subscription;

  constructor(private recordService: RecordsService) {

    this.timer = 10;
    this.ocultarVerificar = true;
    this.juego = new JuegoAgilidad();
    this.enviarJuego = new EventEmitter<any>();
    console.info("Inicio agilidad");
    this.currentUser = JSON.parse(localStorage.getItem('usuario'));


    
  }

  ngOnInit() {
    this.currentUser = JSON.parse(localStorage.getItem('usuario'));

    console.log(this.currentUser);

    this.recordService.getRecordsObservable().subscribe({

      next: records => {
        this.records = records;
      },
      error: err => this.errorMessage = err
    });

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
        alert('Perdiste');

      }
    }, 900);
  }

  verificar(respuesta: number) {
    this.ocultarVerificar = false;
    //clearInterval(this.repetidor);
    this.juego.respuesta = respuesta;

    if(this.juego.verificar()){
      alert('Felicitaciones ganaste');

      if(this.currentUser) {

        let existRecord: IRecord = null;

        for(let i = 0; i<this.records.length; i++) {
          if(this.records[i].username === this.currentUser.email && this.records[i].game === "agilidad-aritmetica") {
            this.records[i].points += 10;
            existRecord = this.records[i];
          }
        }

        if(!existRecord) {
          this.recordService.setRecordsDoc(existRecord);
        }
        else {
          console.log(this.currentUser);
          this.recordService.addRecordDoc({
            docRefId: null,
            game: 'agilidad-aritmetica',
            points: 10,
            username: this.currentUser.email
          });
        }
      } 
    }
    else {
      alert(this.juego.retornarAyuda());
    }
  }
}
