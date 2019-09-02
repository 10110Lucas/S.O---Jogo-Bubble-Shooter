let canvas = document.getElementById('mycanvas');
let ctx = canvas.getContext('2d');

let teclas = {};
let teclaStart = false;

let mira = {
	x: (canvas.width / 2) -0.5,
	y: canvas.height - 2,
	altura: 15,
	largura: 2,
	grauInicio: 1.48 * Math.PI,
	grauFim: 1.52 * Math.PI,
	dirx: 0,
	diry: 0
}

let alvo = {
	x: (canvas.width / 2) - 5,
	y: canvas.height - 10,
	altura: 5,
	largura: 10,
	cor: ''
}

let bola = {
	x: (canvas.width / 2) - 5,
	y: canvas.height - 10,
	altura: 5,
	largura: 10,
	dirx: 0,
	diry: -1,
	modificaVeloc: 0,
	speed: 8
};

let esquerda = {
	x: 5,
	y: (canvas.height / 2) - 20,
	altura: 30,
	largura: 15,
	score: 0,
	speed: 10
};
let direita = {
	x: 280,
	y: (canvas.height / 2) - 20,
	altura: 30,
	largura: 15,
	score: 0,
	speed: 10
};

//pegar a tecla do teclado
document.addEventListener('keydown', (e) => {
	teclas[e.keyCode] = true;
	// alert(e.keyCode);
}, false);

document.addEventListener('keyup', (e) => delete teclas[e.keyCode], false);

function moveBloco(){

	//teclas da barra esquerda
	if(87 in teclas && esquerda.y > 0){
		esquerda.y -= esquerda.speed;
	}
	else if(83 in teclas && esquerda.y + esquerda.altura < canvas.height){
		esquerda.y += esquerda.speed;
	}

	//teclas da barra direita
	if(38 in teclas && direita.y > 0){
		direita.y -= direita.speed;
	}
	else if(40 in teclas && direita.y + direita.altura < canvas.height){
		direita.y += direita.speed;
	}

	//tecla da mira sentido esquerda
	if(37 in teclas && mira.grauInicio >= (1 * Math.PI)){
		mira.grauInicio -= 0.12;
		mira.grauFim -= 0.12;
		bola.dirx -= (mira.grauFim - mira.grauInicio) + 0.12;
	}

	//tecla da mira sentido direita
	else if(39 in teclas && mira.grauFim <= (2 * Math.PI)){
		mira.grauInicio += 0.12;
		mira.grauFim += 0.12;
		bola.dirx += (mira.grauFim - mira.grauInicio) + 0.12;
	}

	//tecla de start
	if(32 in teclas && teclaStart == false){
		teclaStart = true;
	}
}

function iniciaGame(){

	if(teclaStart == true){
		bola.x += (bola.speed + bola.modificaVeloc) * bola.dirx;
		bola.y += (bola.speed + bola.modificaVeloc) * bola.diry;
	}
}

function moveBola(){

	//quando atingir a barra da esquerda, a bola volta para a direção oposta e almenta o speed
	if(bola.y + bola.altura >= esquerda.y && bola.y <= esquerda.y + esquerda.altura && bola.x <= esquerda.x + esquerda.largura){
		bola.dirx = 1;
		bola.modificaVeloc += 0.2;
	}

	//quando atingir a barra da direita, a bola volta para a direção oposta e almenta o speed
	else if(bola.y + bola.altura >= direita.y && bola.y <= direita.y + direita.altura && bola.x + bola.largura >= direita.x){
		bola.dirx = -1;
		bola.modificaVeloc += 0.2;
	}

	//quando bater no teto ( y = 0 )
	if(bola.y <= 0){
		bola.diry = 1;
	} 
	//quando bater no chão ( y = +-600px OU y = canvas.height )
	else if(bola.y + bola.altura >= canvas.height){
		bola.diry = -1;
	}

	iniciaGame();

	//quando a bolinha passa do meio da barra esquerda
	if(bola.x < esquerda.x + esquerda.largura - 15){
		newgame('player 2');
	}

	//quando a bolinha passa do meio da barra direita
	else if(bola.x + bola.largura > direita.x + 15){
		newgame('player 1');
	}
}

function newgame(winner){
	if(winner == 'player 1')
		++esquerda.score;
	else
		++direita.score;

	//reinicia posicao das barras laterais
	esquerda.y = canvas.height / 2 - esquerda.altura / 2;
	direita.y = esquerda.y;

	reiniciaPosicaoInicialDaBola();
}

function reiniciaPosicaoInicialDaBola(){

	//reinicia posicao da bolinha
	bola.y = canvas.height - (bola.altura + 2) ;
	bola.x = canvas.width / 2 - bola.largura / 2;
	bola.dirx = 0;
	bola.diry = 1;
	bola.modificaVeloc = 0;

	mira.grauInicio = 1.48 * Math.PI;
	mira.grauFim = 1.52 * Math.PI;

	teclaStart = false;
}

function desenha(){

	ctx.clearRect(0, 0, canvas.width, canvas.height);
	
	moveBloco();
	moveBola();

	ctx.fillStyle = 'white';
	ctx.fillRect(esquerda.x, esquerda.y, esquerda.largura, esquerda.altura);
	ctx.fillRect(direita.x, direita.y, direita.largura, direita.altura);
	ctx.fillRect(bola.x, bola.y, bola.largura, bola.altura);

	//mira
	ctx.fillRect(alvo.x, alvo.y, alvo.largura, alvo.altura);

	//arco da mira
	ctx.beginPath();
	ctx.arc(mira.x, mira.y, mira.altura, mira.grauInicio, mira.grauFim, false);
	// ctx.arc(canvas.width / 2, canvas.height - 14, 18, 1 * Math.PI, 0 * Math.PI, false);
	ctx.stroke();

	ctx.font = '10px Cortana 1px';
	ctx.fillText("Player 1: " + esquerda.score, 8, 8);
	ctx.fillText("Player 2: " + direita.score, canvas.width - 55, 8)
}

setInterval(desenha, 40);

desenha();

// https://www.youtube.com/watch?v=AQSi1qaWqec