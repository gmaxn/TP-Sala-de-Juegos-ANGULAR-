import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AdivinaElNumeroComponent } from './components/games/adivina-el-numero/adivina-el-numero.component';
import { AgilidadAritmeticaComponent } from './components/games/agilidad-aritmetica/agilidad-aritmetica.component';
import { PiedraPapelTijeraComponent } from './components/games/piedra-papel-tijera/piedra-papel-tijera.component';
import { AnagramaComponent } from './components/games/anagrama/anagrama.component';
import { TetrisComponent } from './components/games/tetris/tetris.component';


import { AboutMeComponent } from './components/panels/about-me/about-me.component';
import { GamesComponent } from './components/panels/games/games.component';
import { LoginComponent } from './components/panels/login/login.component';

const routes: Routes = [
  // {path: 'login', component: LoginComponent},
  // {path: 'calc', component: CalcComponent },
  // {path: 'calc', component: CalcComponent },
  // {path: 'countries', component: CountriesListComponent},
  // {path: '', component: WelcomeComponent},
  {path: 'piedra-papel-tijera', component: PiedraPapelTijeraComponent},
  {path: 'adivina-el-numero', component: AdivinaElNumeroComponent},
  {path: 'games', component: GamesComponent},
  {path: 'agilidad-aritmetica', component: AgilidadAritmeticaComponent},
  {path: 'about-me', component: AboutMeComponent},
  {path: 'anagrama', component: AnagramaComponent},
  {path: 'tetris', component: TetrisComponent},
  {path: 'login', component: LoginComponent},
  // {path: '**', component: ErrorComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
