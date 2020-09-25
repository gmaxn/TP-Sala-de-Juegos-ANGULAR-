import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppComponent } from './app.component';
import { FormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { HttpClientModule } from '@angular/common/http';

import { NavbarComponent } from './components/layout/navbar/navbar.component';
import { AsidenavComponent } from './components/layout/asidenav/asidenav.component';

import { AboutMeComponent } from './components/panels/about-me/about-me.component';
import { GamesComponent } from './components/panels/games/games.component';

import { AgilidadAritmeticaComponent } from './components/games/agilidad-aritmetica/agilidad-aritmetica.component';
import { PiedraPapelTijeraComponent } from './components/games/piedra-papel-tijera/piedra-papel-tijera.component';
import { AdivinaElNumeroComponent } from './components/games/adivina-el-numero/adivina-el-numero.component';
import { AnagramaComponent } from './components/games/anagrama/anagrama.component';
import { TimerComponent } from './components/games/timer/timer.component';
import { TetrisComponent } from './components/games/tetris/tetris.component';
import { environment } from 'src/environments/environment';

import { AngularFireModule } from '@angular/fire';
import { AngularFirestoreModule } from '@angular/fire/firestore';
import { AngularFireAuthModule } from '@angular/fire/auth';
import { AngularFireStorageModule } from '@angular/fire/storage';
import { LoginComponent } from './components/panels/login/login.component';
import { HomeComponent } from './components/panels/home/home.component';
import { ErrorComponent } from './components/panels/error/error.component';
import { RegisterComponent } from './components/panels/register/register.component';
import { WelcomeComponent } from './components/panels/welcome/welcome.component';
import { ContactsComponent } from './components/panels/contacts/contacts.component';



@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    AsidenavComponent,
    GamesComponent,
    AgilidadAritmeticaComponent,
    PiedraPapelTijeraComponent,
    AdivinaElNumeroComponent,
    AboutMeComponent,
    AnagramaComponent,
    TimerComponent,
    TetrisComponent,
    LoginComponent,
    HomeComponent,
    ErrorComponent,
    RegisterComponent,
    WelcomeComponent,
    ContactsComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFirestoreModule,
    AngularFireAuthModule,
    AngularFireStorageModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
