import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from './../../../services/auth.service';
import { AngularFirestore } from '@angular/fire/firestore';
import { IUser } from 'src/app/models/user';
import { firestore } from 'firebase';
import { Subscription } from 'rxjs';
import { timer } from 'rxjs';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  private subscription: Subscription;
  usuario = '';
  clave = '';
  progreso: number;
  progresoMensaje = "esperando...";
  logeando = true;
  ProgresoDeAncho: string;

  clase = "progress-bar progress-bar-info progress-bar-striped ";

  constructor(
    private router: Router,
    private authService: AuthService,
    private db: AngularFirestore) {
    this.progreso = 0;
    this.ProgresoDeAncho = "0%";

  }

  ngOnInit() {
  }

  Entrar() {

    
    let usuario = {
      email: this.usuario,
      password: this.clave
    };



    this.authService.signIn(usuario).then(res => {
      console.log('login exitoso', res);

      this.db.collection('log-usuarios').add({
        email: usuario.email,
        fecha: firestore.Timestamp.fromDate(new Date())

      }).then(docRef => {
          localStorage.setItem('usuario', JSON.stringify(usuario));
          this.router.navigate(['welcome']);
          console.log('Document written with ID: ', docRef.id);
        }).catch(error => {
          console.error('Error adding document: ', error);
        });
    }).catch(error => {
      console.log('Login error: ', error);
      this.router.navigate(['error']);
    });

  }
  MoverBarraDeProgreso() {

    this.logeando = false;
    this.clase = "progress-bar progress-bar-danger progress-bar-striped active";
    this.progresoMensaje = "NSA spy...";
    let myTimer = timer(200, 50);
    this.subscription = myTimer.subscribe(t => {


      console.log("inicio");
      this.progreso = this.progreso + 1;
      this.ProgresoDeAncho = this.progreso + 20 + "%";


      switch (this.progreso) {
        case 15:
          this.clase = "progress-bar progress-bar-warning progress-bar-striped active";
          this.progresoMensaje = "Verificando ADN...";
          break;
        case 30:
          this.clase = "progress-bar progress-bar-Info progress-bar-striped active";
          this.progresoMensaje = "Adjustando encriptación..";
          break;
        case 60:
          this.clase = "progress-bar progress-bar-success progress-bar-striped active";
          this.progresoMensaje = "Recompilando Info del dispositivo..";
          break;
        case 75:
          this.clase = "progress-bar progress-bar-success progress-bar-striped active";
          this.progresoMensaje = "Recompilando claves facebook, gmail, chats..";
          break;
        case 85:
          this.clase = "progress-bar progress-bar-success progress-bar-striped active";
          this.progresoMensaje = "Instalando KeyLogger..";
          break;

        case 100:
          console.log("final");
          this.subscription.unsubscribe();
          this.Entrar();
          break;
      }
    });
    //this.logeando=true;
  }

}