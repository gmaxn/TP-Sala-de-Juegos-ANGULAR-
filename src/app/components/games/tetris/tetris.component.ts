import { DOCUMENT } from '@angular/common';
import { Component, Inject, OnChanges, OnInit, Renderer2 } from '@angular/core';
import { Player } from 'src/app/lib/tetris/player';
import { Tetris } from 'src/app/lib/tetris/tetris';

@Component({
  selector: 'app-tetris',
  templateUrl: './tetris.component.html',
  styleUrls: ['./tetris.component.css']
})
export class TetrisComponent implements OnInit {

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

  constructor(private renderer2: Renderer2,
        @Inject(DOCUMENT) private _document)  {
  }

  ngOnInit(): void {
    const s1 = this.renderer2.createElement('script');
    // s1.onLoad = this.loadScript2.bind(this);
    s1.type = 'text/javascript';
    s1.src = '/assets/games/tetris/arena.js';
    s1.text = ``;
    this.renderer2.appendChild(this._document.body, s1);

    const s2 = this.renderer2.createElement('script');
    // s2.onLoad = this.loadScript3.bind(this);

    s2.type = 'text/javascript';
    s2.src = '/assets/games/tetris/player.js';
    s2.text = ``;
    this.renderer2.appendChild(this._document.body, s2);
 
    const s3 = this.renderer2.createElement('script');
    // s3.onLoad = this.loadScript4.bind(this);

    s3.type = 'text/javascript';
    s3.src = '/assets/games/tetris/tetris.js';
    s3.text = ``;
    this.renderer2.appendChild(this._document.body, s3);


    const s4 = this.renderer2.createElement('script');
    s4.type = 'text/javascript';
    s4.src = '/assets/games/tetris/main.js';
    s4.text = ``;
    this.renderer2.appendChild(this._document.body, s4);
  }

  loadScript2() {
    const s2 = this.renderer2.createElement('script');
    s2.onLoad = this.loadScript3.bind(this);

    s2.type = 'text/javascript';
    s2.src = '/assets/games/tetris/player.js';
    s2.text = ``;
    this.renderer2.appendChild(this._document.body, s2);
  }

  loadScript3() {
    const s3 = this.renderer2.createElement('script');
    s3.onLoad = this.loadScript4.bind(this);

    s3.type = 'text/javascript';
    s3.src = '/assets/games/tetris/tetris.js';
    s3.text = ``;
    this.renderer2.appendChild(this._document.body, s3);
  }

  loadScript4() {
    const s4 = this.renderer2.createElement('script');
    s4.type = 'text/javascript';
    s4.src = '/assets/games/tetris/main.js';
    s4.text = ``;
    this.renderer2.appendChild(this._document.body, s4);
  }

  update():void {

  }



}
