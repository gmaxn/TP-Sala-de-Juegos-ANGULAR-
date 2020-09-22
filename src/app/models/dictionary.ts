import { StringLiteral } from 'typescript';

export interface IDictionary {
    words: IWord;
    wordQty: number;
}

export interface IWord {
    name: string;
    letters: string[]
}
export class Dictionary {
}
