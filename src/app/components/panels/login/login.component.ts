import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from './../../../services/auth.service';
import { AngularFirestore } from '@angular/fire/firestore';
import { IUser } from 'src/app/models/user';
import { firestore } from 'firebase';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  email: string;
  password: string;

  constructor(private route: Router,
    private authService: AuthService,
    private db: AngularFirestore) { }

  ngOnInit(): void {
  }


  onLogin(): void {

    let usuario = {
      email: 'mguelpa@gmail.com',
      password: '123456'
    };


    this.authService.signIn(usuario).then(res => {
      console.log('login exitoso', res);

      this.db.collection('log-usuarios').add({
        email: usuario.email,
        fecha: firestore.Timestamp.fromDate(new Date())

      }).then(docRef => {
          localStorage.setItem('usuario', JSON.stringify(usuario));
          this.route.navigate(['home']);
          console.log('Document written with ID: ', docRef.id);
        }).catch(error => {
          console.error('Error adding document: ', error);
        });
    }).catch(error => {
      console.log('Login error: ', error);
      this.route.navigate(['error']);
    });
  }
}
