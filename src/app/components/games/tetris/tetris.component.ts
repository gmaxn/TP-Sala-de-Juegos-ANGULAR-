import { Component, OnChanges, OnInit } from '@angular/core';
import { Player } from 'src/app/lib/tetris/player';
import { Tetris } from 'src/app/lib/tetris/tetris';

@Component({
  selector: 'app-tetris',
  templateUrl: './tetris.component.html',
  styleUrls: ['./tetris.component.css']
})
export class TetrisComponent implements OnChanges {

  private canvas: HTMLCanvasElement;
  private tetris: Tetris;
  private player: Player;
  public score: number;


  private colors: string[] = [
    null,
    '#E32468',
    '#98E22B',
    '#67D8EF',
    '#E79622',
    '#7B76FF',
    '#90918B',
    '#F8F8F2',
  ]

  constructor() {
    // this.canvas = <HTMLCanvasElement>document.getElementById('tetris');
    // this.tetris = new Tetris(this.canvas);
  }

  ngOnChanges(): void {

  }

  update():void {

  }

  ngOnInit(): void {
    // document.addEventListener('keydown', event => {
    //   this.player = this.tetris.player;
    //   if (event.keyCode === 37) {
    //     this.player.move(-1);
    //   }
    //   else if (event.keyCode === 39) {
    //     this.player.move(+1);
    //   }
    //   else if (event.keyCode === 32) {
    //     this.player.drop();
    //   }
    //   else if (event.keyCode === 38) {
    //     this.player.rotate(-1);
    //   }
    //   else if (event.keyCode === 40) {
    //     this.player.rotate(+1);
    //   }
    // });
  }

}
