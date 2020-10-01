import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { generate } from 'rxjs';
import { IRecord } from 'src/app/models/record';
import { IUser } from 'src/app/models/user';
import { MemotestService } from 'src/app/services/memotest.service';
import { RecordsService } from 'src/app/services/records.service';
import { isCaseOrDefaultClause } from 'typescript';
import { Memotest } from './../../../classes/memotest';
import { ICard } from './../../../models/card';


@Component({
  selector: 'app-memotest',
  templateUrl: './memotest.component.html',
  styleUrls: ['./memotest.component.css']
})
export class MemotestComponent implements OnInit {

  private records: IRecord[];
  private errorMessage: string;
  private currentUser:IUser;

  shuffledSet: ICard[];

  discoveredCards: ICard[];

  userSelection: ICard[];

  private imgTags: HTMLImageElement[];

  private gameEngine: Memotest;

  public min: number = 0;
  public sec: number = 0;
  public hr: number;
  private timer: any;
  private repetidor: any;
  private guessed: number=0;
  private errors: number=0;
  private user: any;



  constructor(private ms: MemotestService,
    private recordService: RecordsService,
    private db: AngularFirestore) {
    this.gameEngine = new Memotest(ms);
    this.userSelection = new Array<ICard>();
    this.currentUser = JSON.parse(localStorage.getItem('usuario'));

  }

  ngOnInit(): void {

    this.shuffledSet = this.generateDefaultMatrix();
    this.timer = setTimeout(this.stopWatch, 1000);

    this.user = JSON.parse(localStorage.getItem('usuario'));

    console.log(this.user);

    this.recordService.getRecordsObservable().subscribe({

      next: records => {
        this.records = records;
      },
      error: err => this.errorMessage = err
    });

  }

  onClickedCard(event: Event) {

    let disabled = (<HTMLImageElement>event.target).getAttribute("disabled");
    console.log(disabled);

    if (disabled === 'false') {

      let index = (<HTMLImageElement>event.target).name;
      let info = this.gameEngine.getCardByIndex(+index);

      this.userSelection.push({
        index: +index,
        name: info.name,
        imageUrl: info.imageUrl
      });

      if (this.userSelection.length < 2) {

        this.gameEngine.getCardCoverCallback(this.userSelection).then(imageUrl => {
          this.shuffledSet[index].imageUrl = imageUrl ?? this.gameEngine.getCardByIndex(+index).imageUrl;

        });

        this.shuffledSet[index].imageUrl = this.gameEngine.getCardByIndex(+index).imageUrl;
      }

      if (this.userSelection.length == 2 && !this.gameEngine.isMatch(this.userSelection)) {

        this.gameEngine.getCardCoverCallback(this.userSelection).then(imageUrl => {
          this.shuffledSet[index].imageUrl = imageUrl;
          this.userSelection = new Array<ICard>();
        });

        this.shuffledSet[index].imageUrl = this.gameEngine.getCardByIndex(+index).imageUrl;
      }

      if (this.userSelection.length == 2 && this.gameEngine.isMatch(this.userSelection)) {

        let image1 = this.userSelection[0];
        let image2 = this.userSelection[1];

        this.shuffledSet[image1.index].imageUrl = image1.imageUrl;
        this.shuffledSet[image2.index].imageUrl = image2.imageUrl;

        this.imgTags = Array.from(document.getElementsByTagName("img"));

        this.imgTags[image1.index].setAttribute("disabled", "true");
        this.imgTags[image2.index].setAttribute("disabled", "true");

        this.guessed++;

        if(this.guessed === 8) {
          this.endGame();

          if(this.currentUser) {

            let existRecord: IRecord = null;
    
            for(let i = 0; i<this.records.length; i++) {
              if(this.records[i].username === this.currentUser.email && this.records[i].game === "memotest") {
                console.log('refserferf');
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
                game: 'memotest',
                points: 10,
                username: this.currentUser.email
              });
            }
          } 
        }
        this.userSelection = new Array<ICard>();
      }
    }
  }

  endGame(): void {

      this.imgTags = Array.from(document.getElementsByTagName("img"));

      clearTimeout(this.repetidor);
      let newGame = document.getElementById("new-game");
      newGame.removeAttribute("disabled");

      this.min = 0;
      this.sec = 0;
      this.hr = 0;
      this.guessed = 0;

      this.gameEngine = new Memotest(this.ms);
      this.userSelection = new Array<ICard>();
      this.shuffledSet = this.generateDefaultMatrix();
      console.log("gano!!!!");

  }

  calculatePoints(): number {
    let seconds = this.sec + (this.min * 60) + (this.hr * 3600);

    return 1000 - this.errors / seconds;

  }

  onNewGame(): void {
    this.stopWatch();
    let newGameButton = document.getElementById("new-game");
    newGameButton.setAttribute("disabled", "true");
    let images = Array.from(document.getElementsByTagName("img"));

    images.forEach(img => {

      img.setAttribute("disabled", "false");

    });

    console.log(images);
  }

  stopWatch(): void {


    this.repetidor = setInterval(() => {

      this.timer--;

      this.sec++;

      if (this.sec > 59) {

        this.sec = 0;
        this.min++;

      } else if (this.min > 59) {

        this.min = 0;
        this.hr++;

      }
      // if (this.timer == 0) {

      //   clearInterval(this.repetidor);
      //   this.ocultarVerificar = true;
      //   this.timer = 10;
      //   alert('Perdiste');

      // }
    }, 900);

    // this.sec++;
    // if(this.sec > 59) {
    // this.sec = 0;
    // this.min++;
    // } else if(this.min > 59){
    // this.min = 0;
    // this.hr++;
    // }



  }
  //#region private helper methods

  // isMatch(array: ICard[]): boolean {

  //   return (array[0].name === array[1].name && array[0].index !== array[1].index);

  // }
  generateDefaultMatrix(): ICard[] {
    this.shuffledSet = new Array<ICard>();
    let defaultMatrix = new Array<ICard>();
    for (let i = 0; i < 16; i++) {
      let defaultCard: ICard = {
        index: i,
        name: i.toString(),
        imageUrl: "./../../assets/images/octopuss.jpg"
      }
      defaultMatrix.push(defaultCard);
    }
    return defaultMatrix;
  }


  //#endregion



}
