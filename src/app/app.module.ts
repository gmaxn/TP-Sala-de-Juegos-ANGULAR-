import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavbarComponent } from './layout-components/navbar/navbar.component';
import { AsidenavComponent } from './layout-components/asidenav/asidenav.component';
import { GamesComponent } from './layout-components/games/games.component';
import { AgilidadAritmeticaComponent } from './agilidad-aritmetica/agilidad-aritmetica.component';
import { FormsModule } from '@angular/forms';
import { PiedraPapelTijeraComponent } from './piedra-papel-tijera/piedra-papel-tijera.component';
import { AdivinaElNumeroComponent } from './adivina-el-numero/adivina-el-numero.component';
import { AboutMeComponent } from './about-me/about-me.component';

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    AsidenavComponent,
    GamesComponent,
    AgilidadAritmeticaComponent,
    PiedraPapelTijeraComponent,
    AdivinaElNumeroComponent,
    AboutMeComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
