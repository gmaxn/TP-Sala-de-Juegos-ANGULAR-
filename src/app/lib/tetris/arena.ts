export class Arena {

    public matrix:any;
    constructor(w:number, h:number)
	{
		const matrix = [];
		while (h--)
		{
			matrix.push(new Array(w).fill(0));
		}
		this.matrix = matrix;
	}
	sweep()
    {
        let rowCount = 1;
        let score = 0;
        outer: for (let y = this.matrix.length - 1; y > 0; --y) 
        {
            for (let x = 0; x < this.matrix[y].length; ++x) 
            {
                if (this.matrix[y][x] === 0) {
                    continue outer;
                }
            }

            const row = this.matrix.splice(y, 1)[0].fill(0);
            this.matrix.unshift(row);
            ++y;

            score += rowCount * 10;
            rowCount *= 2;
        }
        return score;
    }
	clear()
    {
        this.matrix.forEach(row => row.fill(0));
    }
	merge(player)
	{
	    player.matrix.forEach( (row, y) => 
	    {
	        row.forEach( (value, x) => 
	        {
	            if (value !== 0) 
	            {
	                this.matrix[y + player.pos.y][x + player.pos.x] = value;
	            }
	        });
	    });
	}
	collide(player)
	{
		const [matrix, offset] = [player.matrix, player.pos];

		for (let y = 0; y < matrix.length; ++y)
		{
			for(let x = 0; x < matrix[y].length; ++x)
			{
				if(matrix[y][x] !== 0)
				{
					if((this.matrix[y + offset.y] && this.matrix[y + offset.y][x + offset.x]) !== 0)
					{
						return true;
					}
				}
			}
		}
		return false;
	}
}
