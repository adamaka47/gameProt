document.addEventListener('DOMContentLoaded', e => {
	let pts = 0;
	let time = 0;
	let i = 0;
	let btn = document.getElementById('btn');
	let container = document.querySelector('.container');
	let gameArea = document.querySelector('.gameArea');
	let startGame = false;
	btn.onclick = start;

	function start(e) {


		document.querySelector('.sost').classList.add('hide');
		time = parseFloat(document.querySelector('#timer').value);
		document.querySelector('#timer').value = ''
		document.querySelector('.points-over').classList.add('hide');
		startGame = true;
		try {
			if (time <= 0 || isNaN(time)) {
				throw new Error('Введите нормальное время!')
			}

			let a = setInterval(() => {

				if (time <= 0 && startGame) {
					clearInterval(a);
					endGame();
				} else {
					time = time.toFixed(2) - 0.1
					document.querySelector('.time-game span').textContent = time.toFixed(1);
				}


			}, 100)

			generateRect();

		} catch(e) {
			startGame = false;
			endGame()
		}
	}

	let uu = new Audio('classic_hurt.mp3');



	function generateRect() { 
		if (startGame) {

			gameArea.innerHTML = ''
			let div = document.createElement('div');
			let gameProperties = container.getBoundingClientRect();
			let gameSize = randomNum();
			div.classList.add('rotateAnim');
			div.style.width = div.style.height = gameSize + 'px';
			let gamePositionLeft = randomNum(0, gameProperties.width - gameSize);
			let gamePositionTop = randomNum(0, gameProperties.height - gameSize);
			div.style.position = 'absolute';
			div.style.left = gamePositionLeft + 'px';
			div.style.top = gamePositionTop + 'px';

			let a = setInterval(() => {

				if ((parseInt(div.style.top) < gameProperties.height - parseInt(div.style.height) - 7 && parseInt(div.style.left) < gameProperties.width - parseInt(div.style.width) - 7)) {
					i++;
				div.style.left = i + gamePositionLeft + 'px';
				div.style.top = i + gamePositionTop + 'px';

							}

							 else {
								clearInterval(a);
							}

			}, 10)



			div.style.background = `url(${randomNum(1, 3)}.jpg) center/cover no-repeat`
			div.style.borderRadius = '50%';
			div.style.cursor = `url("hand.cur"), text`
			gameArea.insertAdjacentElement('afterbegin', div);
			div.onclick = function() {
				uu.currentTime = 0;
				uu.play()
				generateRect();
				pts++;
				document.querySelector('.points span').innerHTML = `${pts}`
				i = 0;
			}

		}
	}

	function randomNum(min = 87, max = 290) {
		let size = min + Math.floor(Math.random() * (max - min + 1));
		return size;
	}


	function endGame() {
		gameArea.innerHTML = '';
		document.querySelector('.sost').classList.remove('hide');
		document.querySelector('.points-over').classList.remove('hide');
		document.querySelector('.points-over span').textContent = +pts;
		pts = 0;
		document.querySelector('.points span').textContent = '0';
		startGame = false;
	}

});