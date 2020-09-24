import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { firestore } from 'firebase';


@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  usuario: string;
  clave: string;
  firstname:string;
  lastname:string;
  age:number;

  constructor(
    private router: Router,
    private authService: AuthService,
    private db: AngularFirestore) { }

  ngOnInit(): void {
  }



  onRegister():void {

    let usuario = {
      email: this.usuario,
      password: this.clave
    };

    this.authService.register(usuario).then(res => {
        console.log('login exitoso', res);
  
        this.db.collection('registro-usuarios').add({
          firstname: this.firstname,
          lastname: this.lastname,
          age: this.age,
          email: usuario.email,
          fecha: firestore.Timestamp.fromDate(new Date())
  
        }).then(docRef => {
            localStorage.setItem('usuario', JSON.stringify(usuario));
            this.router.navigate(['home']);
            console.log('Document written with ID: ', docRef.id);
          }).catch(error => {
            console.error('Error adding document: ', error);
          });
      }).catch(error => {
        console.log('Login error: ', error);
        this.router.navigate(['error']);
      });


  }

}
