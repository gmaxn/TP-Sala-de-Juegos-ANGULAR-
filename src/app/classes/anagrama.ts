import { ThrowStmt } from '@angular/compiler';
import { IDictionary, IWord } from '../models/dictionary';
import { DictionaryService } from '../services/dictionary.service';
import { Juego } from './juego';

export class Anagrama extends Juego {


    randomSelection: IWord;
    shatteredSet: string[] = new Array<string>();
    errorMessage: string;
    words: IWord[];


    constructor(nombre?: string, gano?: boolean, jugador?: string) {
        super("Adivina el número", gano, jugador);

    }


    selectRandomWord(words: IWord[]): void {


        this.randomSelection = words[Math.floor((Math.random() * Math.floor(words.length)))];


    }

    shuffle(array) {
        var currentIndex = array.length, temporaryValue, randomIndex;

        // While there remain elements to shuffle...
        while (0 !== currentIndex) {

            // Pick a remaining element...
            randomIndex = Math.floor(Math.random() * currentIndex);
            currentIndex -= 1;

            // And swap it with the current element.
            temporaryValue = array[currentIndex];
            array[currentIndex] = array[randomIndex];
            array[randomIndex] = temporaryValue;
        }

        return array;
    }

    shatterWord(randomIWord: IWord) {

        this.shatteredSet = this.shuffle(randomIWord.letters);
    }

    public verificar(respuesta:any) {

        if (respuesta == this.randomSelection.name) {
            this.gano = true;
        }
        if (this.gano) {
            return true;
        } else {
            return false;
        }
        return true;
    }

    public start(words: IWord[]): void {
        this.words = words;
        this.selectRandomWord(this.words);
        this.shatterWord(this.randomSelection);

        //     this.value1 = Math.floor((Math.random() * 100) + 1);
        //     this.value2 = Math.floor((Math.random() * 100) + 1);
        //     this.selectedOperator = this.operators[Math.floor(Math.random() * Math.floor(4))];

        //     switch (this.selectedOperator) {
        //         case '+':
        //             this.result = this.value1 + this.value2;
        //             break;
        //         case '-':
        //             this.result = this.value1 - this.value2;
        //             break;
        //         case '*':
        //             this.result = this.value1 * this.value2;
        //             break;
        //         case '/':
        //             this.result = this.value1 / this.value2;
        //             break;
        //     }

        //     console.info('numero 1:' + this.value1);
        //     console.info('operador:' + this.selectedOperator);
        //     console.info('numero 2:' + this.value2);
        //     console.info('result:' + this.result);

        //     this.gano = false;
    }

    // public retornarAyuda():void {

    //     if (this.numeroIngresado < this.result) {

    //         return "Falta";
    //     }
    //     return "Te pasate";
    // }
}
