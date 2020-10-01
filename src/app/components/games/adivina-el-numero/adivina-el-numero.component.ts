import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { IRecord } from 'src/app/models/record';
import { IUser } from 'src/app/models/user';
import { RecordsService } from 'src/app/services/records.service';
import { JuegoAdivina } from '../../../classes/juego-adivina';

@Component({
  selector: 'app-adivina-el-numero',
  templateUrl: './adivina-el-numero.component.html',
  styleUrls: ['./adivina-el-numero.component.css']
})
export class AdivinaElNumeroComponent implements OnInit {
  @Output() enviarJuego: EventEmitter<any> = new EventEmitter<any>();

  private errorMessage: string;
  private currentUser:IUser;
  private records:IRecord[];

  nuevoJuego: JuegoAdivina;
  Mensajes: string;
  contador: number;
  ocultarVerificar: boolean;

  constructor(private recordService: RecordsService) {
    this.nuevoJuego = new JuegoAdivina();
    console.info("numero Secreto:", this.nuevoJuego.numeroSecreto);
    this.ocultarVerificar = false;
    this.currentUser = JSON.parse(localStorage.getItem('usuario'));

  }
  generarnumero() {
    this.nuevoJuego.generarnumero();
    this.contador = 0;
  }
  verificar() {
    
    this.contador++;
    this.ocultarVerificar = true;
    console.info("numero Secreto:", this.nuevoJuego.gano);


    if (this.nuevoJuego.verificar()) {

      this.enviarJuego.emit(this.nuevoJuego);
      this.MostarMensaje("Sos un Genio!!!", true);
      this.nuevoJuego.numeroSecreto = 0;

      alert('Felicitaciones te ganaste!!!');

      if(this.currentUser) {

        let existRecord: IRecord = null;

        for(let i = 0; i<this.records.length; i++) {
          if(this.records[i].username === this.currentUser.email && this.records[i].game === "adivina-el-numero") {
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
            game: 'adivina-el-numero',
            points: 10,
            username: this.currentUser.email
          });
        }
      } 
    } else {

      let mensaje: string;
      switch (this.contador) {
        case 1:
          mensaje = "No, intento fallido, animo";
          break;
        case 2:
          mensaje = "No,Te estaras Acercando???";
          break;
        case 3:
          mensaje = "No es, Yo crei que la tercera era la vencida.";
          break;
        case 4:
          mensaje = "No era el  " + this.nuevoJuego.numeroIngresado;
          break;
        case 5:
          mensaje = " intentos y nada.";
          break;
        case 6:
          mensaje = "Afortunado en el amor";
          break;

        default:
          mensaje = "Ya le erraste " + this.contador + " veces";
          break;
      }
      this.MostarMensaje("#" + this.contador + " " + mensaje + " ayuda :" + this.nuevoJuego.retornarAyuda());


    }
    console.info("numero Secreto:", this.nuevoJuego.gano);
  }

  MostarMensaje(mensaje: string = "este es el mensaje", ganador: boolean = false) {
    this.Mensajes = mensaje;
    var x = document.getElementById("snackbar");
    if (ganador) {
      x.className = "show Ganador";
    } else {
      x.className = "show Perdedor";
    }
    var modelo = this;
    setTimeout(function () {
      x.className = x.className.replace("show", "");
      modelo.ocultarVerificar = false;
    }, 3000);
    console.info("objeto", x);

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

}
