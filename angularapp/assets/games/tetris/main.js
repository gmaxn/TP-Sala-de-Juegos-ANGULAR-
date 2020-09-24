const canvas = document.getElementById('tetris');

const newGame = document.getElementById('newGame');

newGame.addEventListener('click', () => {

	newGame.setAttribute('disabled', 'true');
	$('#tetris').remove();

	let canvas = document.createElement("canvas");
	
	canvas.width = "240";
	canvas.height = "400";
	canvas.id = "tetris";

	$("#tetris-border").append(canvas);

	let tetris = null;

	if (tetris === null) 
	{
		tetris = new Tetris(canvas);

		tetris.init();

		document.addEventListener('keydown', event => {
			const player = tetris.player;
			if (event.keyCode === 37) {
				player.move(-1);
			}
			else if (event.keyCode === 39) {
				player.move(+1);
			}
			else if (event.keyCode === 32) {
				player.drop();
			}
			else if (event.keyCode === 38) {
				player.rotate(-1);
			}
			else if (event.keyCode === 40) {
				player.rotate(+1);
			}
		});
	}

});