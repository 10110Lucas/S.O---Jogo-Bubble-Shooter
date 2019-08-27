let canvas = document.getElementById('mycanvas');
let ctx = canvas.getContext('2d');

let teclas = {};
let teclaStart = false;

let mira = {
	x: (canvas.width / 2),
	y: canvas.height - 5,
	raio: 12,
	grauInicio: 1.45 * Math.PI,
	grauFim: 1.55 * Math.PI,
	dirx: 0,
	diry: 0
}

let alvo = {
	x: (canvas.width / 2) - 5,
	y: 10,
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
	diry: 0,
	modificaVeloc: 0,
	speed: 4
};

// let esquerda = {
// 	x: 5,
// 	y: (canvas.height / 2) - 20,
// 	altura: 30,
// 	largura: 15,
// 	score: 0,
// 	speed: 10
// };
// let direita = {
// 	x: 280,
// 	y: (canvas.height / 2) - 20,
// 	altura: 30,
// 	largura: 15,
// 	score: 0,
// 	speed: 10
// };

//pegar a tecla do teclado
document.addEventListener('keydown', (e) => {
	teclas[e.keyCode] = true;
	// alert(e.keyCode);
}, false);

document.addEventListener('keyup', (e) => delete teclas[e.keyCode], false);

function moveBloco(){

	//tecla da mira sentido esquerda
	if(37 in teclas && mira.grauInicio >= (1.02 * Math.PI)){
		mira.grauInicio -= 0.05;
		mira.grauFim -= 0.05;
		bola.dirx -= 0.05;
		bola.diry -= 0.038;
	}

	//tecla da mira sentido direita
	else if(39 in teclas && mira.grauFim <= (1.98 * Math.PI)){
		mira.grauInicio += 0.05;
		mira.grauFim += 0.05;
		bola.dirx += 0.05;
		bola.diry += 0.038;
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

	//quando atingir o alvo
	if(bola.y <= alvo.y + alvo.altura + 1 && bola.x + bola.largura >= alvo.x && bola.x <= alvo.x + alvo.largura){
		bola.dirx = 0;
		bola.diry = 0;
		bola.modificaVeloc = 0;
		teclaStart = false;
	}

	// //quando atingir a barra da direita, a bola volta para a direção oposta e almenta o speed
	// else if(bola.y + bola.altura >= direita.y && bola.y <= direita.y + direita.altura && bola.x + bola.largura >= direita.x){
	// 	bola.dirx = -1;
	// 	bola.modificaVeloc += 0.2;
	// }

	//quando bater no teto ( y = 0 )
	if(bola.y <= 0){
		bola.diry = 1;
	} 
	//quando bater no chão ( y = +-600px OU y = canvas.height )
	else if(bola.y + bola.altura >= canvas.height){
		bola.diry = -1;
	}

	iniciaGame();

	if(bola.x < 0 || bola.x + bola.largura > canvas.width){
		reiniciaPosicaoInicialDaBola();
	} else if(bola.y <= 0){
		reiniciaPosicaoInicialDaBola();
	}

	// //quando a bolinha passa do meio da barra esquerda
	// if(bola.x < esquerda.x + esquerda.largura - 15){
	// 	newgame('player 2');
	// }

	// //quando a bolinha passa do meio da barra direita
	// else if(bola.x + bola.largura > direita.x + 15){
	// 	newgame('player 1');
	// }
}

function reiniciaPosicaoInicialDaBola(){

	//reinicia posicao da bolinha
	bola.x = (canvas.width / 2) - 5;
	bola.y = canvas.height - 10;
	bola.dirx = 0;
	bola.diry = 0;
	bola.modificaVeloc = 0;
	bola.speed = 4;

	mira.grauInicio = 1.45 * Math.PI;
	mira.grauFim = 1.55 * Math.PI;

	teclaStart = false;
}

function desenha(){

	ctx.clearRect(0, 0, canvas.width, canvas.height);
	
	moveBloco();
	moveBola();

	//cor geral
	ctx.fillStyle = 'white';

	//bola
	ctx.fillRect(bola.x, bola.y, bola.largura, bola.altura);

	//alvos
	ctx.fillRect(alvo.x, alvo.y, alvo.largura, alvo.altura);
	ctx.fillRect(alvo.x + alvo.largura + 2, alvo.y, alvo.largura, alvo.altura);

	//arco da mira
	ctx.beginPath();
	ctx.arc(mira.x, mira.y, mira.raio, mira.grauInicio, mira.grauFim, false);
	ctx.stroke();
}

setInterval(desenha, 50);

desenha();