import { HttpClient } from '@angular/common/http';
import { Component, EventEmitter, Input, OnChanges, OnInit, Output } from '@angular/core';
import { IWord } from 'src/app/models/dictionary';
import { DictionaryService } from 'src/app/services/dictionary.service';
import { TimerObservableServiceService } from 'src/app/services/timer-observable-service.service';
import { Anagrama } from '../../../classes/anagrama';

@Component({
  selector: 'app-anagrama',
  templateUrl: './anagrama.component.html',
  styleUrls: ['./anagrama.component.css']
})
export class AnagramaComponent implements OnInit {


  shatteredletters: string[];
  timerDuration: number = 2500;
  words: IWord[];
  game: Anagrama;
  btnEnabled: boolean = true;
  btnAdivinar: boolean = false;

  inputEnabled: boolean = false;
  inputText:string = '';
  isRunning: boolean = false;

  constructor(private dicService: DictionaryService, private observable: TimerObservableServiceService) {
    this.game = new Anagrama();
  }

  ngOnInit(): void {

    this.dicService.getDictionary().subscribe({
      next: words => {
        this.words = words;
      },
      error: err => this.words = err
    });

    this.observable.isActiveChanged.subscribe(isRunning => this.switcher(isRunning));
  }

  private switcher(isRunning: boolean) {

    if(isRunning) {
      this.btnEnabled = false;
      this.inputEnabled = true;
      this.btnAdivinar = true;
    } else {
      this.btnEnabled = true;
      this.inputEnabled = false;
      this.inputText = '';
      this.btnAdivinar = false;
    }
  }

  onNewGame(): void {

    this.observable.isRunning(true);

    this.game.start(this.words);

    this.shatteredletters = this.game.shatteredSet;
  }

  onVerificar(): void {

    let rta = this.inputText;
    console.log(rta);
    let gano = this.game.verificar(rta);

    if(gano){
      alert('Felicitaciones adivinaste la palabra!!')
    } else {
      alert('Mala suerte proba de vuelta');
    }
  }
}
