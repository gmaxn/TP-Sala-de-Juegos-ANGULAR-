import { Observable } from 'rxjs';
import { isElementAccessChain } from 'typescript';
import { Juego } from '../classes/juego';
import { ICard } from '../models/card';
import { MemotestService } from '../services/memotest.service';

export class Memotest extends Juego {

    shuffledCards: ICard[] = new Array<ICard>();
    discoveredCards: ICard[] = new Array<ICard>();

    errorMessage: string;

    machineSelection: string;
    userSelection: string;



    constructor(private ms: MemotestService, nombre?: string, gano?: boolean, jugador?: string) {
        super("Adivina el número", gano, jugador);

        this.initGame();

    }

    public initGame() {


        this.ms.getCards().subscribe({
            next: c => {
                this.shuffledCards = this.shuffle(c);
            },
            error: err => this.errorMessage = err
        });

    }

    getCardByIndex(index: number): ICard {

        return this.shuffledCards[index];
    }

    async getCardCoverCallback(array: ICard[]): Promise<string> {

        return new Promise<string>(resolve => {
            setTimeout(() => {

                if(!this.isMatch(array)) {

                    resolve('./../../assets/images/octopuss.jpg');
                }
                else {
                    resolve(null);
                }
            }, 1000);
        });
    }

    isMatch(array: ICard[]): boolean {
        
        if(array.length == 2){
            return (array[0].name === array[1].name && array[0].index !== array[1].index);
        }

        return false;
    }



    shuffle(set: ICard[]): ICard[] {

        var currentIndex = set.length, temporaryValue, randomIndex;

        // While there remain elements to shuffle...
        while (0 !== currentIndex) {

            // Pick a remaining element...
            randomIndex = Math.floor(Math.random() * currentIndex);
            currentIndex -= 1;

            // And swap it with the current element.
            temporaryValue = set[currentIndex];
            set[currentIndex] = set[randomIndex];
            set[randomIndex] = temporaryValue;
        }

        return set;
    }




    public verificar(respuesta?: any): boolean {
        throw new Error('Method not implemented.');
    }
}
