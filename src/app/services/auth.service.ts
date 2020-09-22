import { Injectable } from '@angular/core';
import { IUser } from '../models/user';
import { AngularFireAuth } from '@angular/fire/auth';
import * as firebase from 'firebase';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private afAuth: AngularFireAuth,
              private router: Router) { }


  public async signIn(user: IUser) {
    return this.afAuth.signInWithEmailAndPassword(user.email, user.password);
  }

  public async signOut(){
    await this.afAuth.signOut();
    this.router.navigate(['/']);
  }

  public async register(user: IUser) {
    return this.afAuth.createUserWithEmailAndPassword(user.email, user.password);
  }
}
