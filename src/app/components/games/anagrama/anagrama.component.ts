import { HttpClient } from '@angular/common/http';
import { Component, EventEmitter, Input, OnChanges, OnInit, Output } from '@angular/core';
import { IWord } from 'src/app/models/dictionary';
import { IUser } from 'src/app/models/user';
import { RecordsService } from 'src/app/services/records.service';
import { DictionaryService } from 'src/app/services/dictionary.service';
import { TimerObservableServiceService } from 'src/app/services/timer-observable-service.service';
import { Anagrama } from '../../../classes/anagrama';
import { IRecord } from 'src/app/models/record';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';

@Component({
  selector: 'app-anagrama',
  templateUrl: './anagrama.component.html',
  styleUrls: ['./anagrama.component.css']
})
export class AnagramaComponent implements OnInit {


  private records: IRecord[];
  private errorMessage: string;
  private currentUser:IUser;


  shatteredletters: string[];
  timerDuration: number = 2500;
  words: IWord[];
  game: Anagrama;
  btnEnabled: boolean = true;
  btnAdivinar: boolean = false;

  inputEnabled: boolean = false;
  inputText:string = '';
  isRunning: boolean = false;


  constructor(
    private dicService: DictionaryService, 
    private observable: TimerObservableServiceService,
    private recordService: RecordsService,
    private db: AngularFirestore) {

    this.currentUser = JSON.parse(localStorage.getItem('usuario'));

    
    this.game = new Anagrama('Anagrama', false, (<IUser>this.currentUser).email);
  }

  ngOnInit(): void {

    this.dicService.getDictionary().subscribe({
      next: words => {
        this.words = words;
      },
      error: err => this.words = err
    });

    this.recordService.getRecordsObservable().subscribe({

      next: records => {
        this.records = records;
      },
      error: err => this.errorMessage = err
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

      if(this.currentUser) {

        let existRecord: IRecord = null;

        for(let i = 0; i<this.records.length; i++) {
          if(this.records[i].username === this.currentUser.email && this.records[i].game === "anagrama") {
            this.records[i].points += 10;
            existRecord = this.records[i];
          }
        }

        if(existRecord) {
          this.recordService.setRecordsDoc(existRecord);
        }
        else {
          this.recordService.addRecordDoc({
            docRefId: null,
            game: 'anagrama',
            points: 10,
            username: this.currentUser.email
          });
        }



        //this.db.collection('records').set(this.records);

      }
    } else {
      alert('Mala suerte proba de vuelta');
    }
  }
}
