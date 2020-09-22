import { Arena } from './arena';
import { Player } from './player';

export class Tetris {

    private context: any;
    public arena: Arena;
    public player: Player;
    private colors: string[];

    constructor(private canvas: HTMLCanvasElement)
	{
		this.context = canvas.getContext('2d');
		this.context.scale(20, 20);
		
		this.arena = new Arena(12, 20);
		this.player = new Player(this);

		this.colors = [
			null,
			'#E32468',
			'#98E22B',
			'#67D8EF',
			'#E79622',
			'#7B76FF',
			'#90918B',
			'#F8F8F2',
		]

		let lastTime = 0;
		const update = (time = 0) => {
			
		    const deltaTime = time - lastTime;

		    lastTime = time;

		    this.player.update(deltaTime);

		    this.draw();
		    requestAnimationFrame(update);
		}
		update();
		this.updateScore(0);
	}

	draw()
	{
		this.context.fillStyle = '#000';
		this.context.fillRect(0, 0, this.canvas.width, this.canvas.height);

		this.drawMatrix(this.arena.matrix, {x: 0, y: 0});
		this.drawMatrix(this.player.matrix, this.player.pos);
	}

	drawMatrix(matrix, offset)
	{
		matrix.forEach( (row, y) =>
		{ 
			row.forEach( (value, x) => 
			{ 
				if(value !== 0) 
				{ 
					this.context.fillStyle = this.colors[value];
					this.context.fillRect( x + offset.x, 
									  y + offset.y, 
									  1, 1); 
				} 
			}); 
		});
	}

	public updateScore(score?):void
	{
		let aux = this.player.score;
	}

	createPiece(type)
	{
		if(type === 'T')
		{
			return [
			[0, 0, 0],
			[1, 1, 1],
			[0, 1, 0], ];
		}
		else if(type === 'O')
		{
			return [
			[2, 2],
			[2, 2], ];
		}
		else if(type === 'L')
		{
			return [
			[0, 3, 0],
			[0, 3, 0],
			[0, 3, 3], ];
		}
		else if(type === 'J')
		{
			return [
			[0, 4, 0],
			[0, 4, 0],
			[4, 4, 0], ];
		}
		else if(type === 'I')
		{
			return [
			[0, 5, 0, 0],
			[0, 5, 0, 0],
			[0, 5, 0, 0],
			[0, 5, 0, 0], ];
		}
		else if(type === 'S')
		{
			return [
			[0, 6, 6],
			[6, 6, 0],
			[0, 0, 0], ];
		}
		else if(type === 'Z')
		{
			return [
			[7, 7, 0],
			[0, 7, 7],
			[0, 0, 0], ];
		}
	}
}
