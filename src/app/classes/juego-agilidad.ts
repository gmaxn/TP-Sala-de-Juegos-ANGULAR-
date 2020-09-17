import { Juego } from '../classes/juego'

export class JuegoAgilidad extends Juego {

    value1: number;
    selectedOperator: string = '';
    value2: number;
    result: number = 0;
    respuesta: number;
    won: boolean;
    operators: string[] = ['+', '-', '*', '/'];
    numeroIngresado: number = 0;

    constructor(nombre?: string, gano?: boolean, jugador?: string) {
        super("Adivina el número", gano, jugador);
    }

    public verificar() {

        if (this.numeroIngresado == this.result) {
            this.gano = true;
        }
        if (this.gano) {
            return true;
        } else {
            return false;
        }
    }

    public newGame() {

        this.value1 = Math.floor((Math.random() * 100) + 1);
        this.value2 = Math.floor((Math.random() * 100) + 1);
        this.selectedOperator = this.operators[Math.floor(Math.random() * Math.floor(4))];

        switch (this.selectedOperator) {
            case '+':
                this.result = this.value1 + this.value2;
                break;
            case '-':
                this.result = this.value1 - this.value2;
                break;
            case '*':
                this.result = this.value1 * this.value2;
                break;
            case '/':
                this.result = this.value1 / this.value2;
                break;
        }

        console.info('numero 1:' + this.value1);
        console.info('operador:' + this.selectedOperator);
        console.info('numero 2:' + this.value2);
        console.info('result:' + this.result);

        this.gano = false;
    }

    public retornarAyuda() {

        if (this.numeroIngresado < this.result) {

            return "Falta";
        }
        return "Te pasate";
    }
}