let canvas = document.getElementById('mycanvas');
let ctx = canvas.getContext('2d');

let alvos = [];
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
	diry: -1,
	modificaVeloc: 0,
	speed: 1.5
};

//pegar a tecla do teclado
document.addEventListener('keydown', (e) => {
	teclas[e.keyCode] = true;
	// alert(e.keyCode);
}, false);

document.addEventListener('keyup', (e) => delete teclas[e.keyCode], false);

function iniciaGame(){

	if(teclaStart == true){
		bola.x += (bola.speed + bola.modificaVeloc) * bola.dirx;
		bola.y += (bola.speed + bola.modificaVeloc) * bola.diry;
	}
}


function moveMira(){

	//tecla da mira sentido esquerda
	// if(37 in teclas && mira.grauInicio >= (1.02 * Math.PI)){
	// 	mira.grauInicio -= 0.05;
	// 	mira.grauFim -= 0.05;
	// 	if(bola.dirx >= -1){
	// 		bola.dirx -= 0.02 * Math.PI;
	// 		bola.diry -= 0.02 * Math.PI;
	// 	}
	// }

	//tecla da mira sentido direita
	// else if(39 in teclas && mira.grauFim <= (1.98 * Math.PI)){
	// 	mira.grauInicio += 0.05;
	// 	mira.grauFim += 0.05;

	// 	console.log(`direção x ->${bola.dirx} || direção y ->${bola.diry} || posições x, y ${bola.x},${bola.y}`);

	// 	bola.dirx += 0.05 * Math.PI;
	// 	bola.diry += 0.05 * Math.PI;
	// }

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

function atingeAlvo(){

	//quando atingir o alvo
	// if(bola.x + (bola.largura / 2) >= alvo.x && bola.y == alvo.y + alvo.altura + 1){
	// 	bola.dirx = 0;
	// 	bola.diry = 0;
	// 	teclaStart = false;
	// }
	// if(bola.x + (bola.largura / 2)  <= alvo.x + alvo.largura){
	// 	bola.dirx = 0;
	// 	bola.diry = 0;
	// 	teclaStart = false;
	// }
	if(bola.y == alvo.y + alvo.altura + 1 && bola.x >= alvo.x && 
		(bola.x + bola.largura) >= alvo.x){
		bola.dirx = 0;
		bola.diry = 0;
		teclaStart = false;
		// else if(bola.x < (alvo.x + alvo.largura)){
		// 	bola.dirx = 0;
		// 	bola.diry = 0;
		// 	teclaStart = false;
		// }
	} else if(bola.y == alvo.y + alvo.altura + 1 && bola.x <= alvo.x && 
		(bola.x + bola.largura) >= alvo.x){
		bola.dirx = 0;
		bola.diry = 0;
		teclaStart = false;
	} 
}

function moveBola(){

	iniciaGame();

	atingeAlvo();

	moveMira();



	//quando bater nas paredes
	if(bola.x == 0 && bola.x + bola.largura >= canvas.width){
		reiniciaPosicaoInicialDaBola();
	}
	//quando bater no teto ( y = 0 )
	else if(bola.y <= 0){
		reiniciaPosicaoInicialDaBola();
	}
	//quando bater no chão ( y = +-600px OU y = canvas.height )
	else if(bola.y + bola.altura >= canvas.height){
		bola.diry = -1;
	}
}

function reiniciaPosicaoInicialDaBola(){

	//reinicia posicao da bolinha
	bola.x = (canvas.width / 2) - 5;
	bola.y = canvas.height - 10;
	bola.dirx = 0;
	bola.diry = -1;
	bola.modificaVeloc = 0;
	bola.speed = 2;

	mira.grauInicio = 1.45 * Math.PI;
	mira.grauFim = 1.55 * Math.PI;

	teclaStart = false;
}

function desenha(){

	ctx.clearRect(0, 0, canvas.width, canvas.height);
	
	moveMira();
	moveBola();

	//cor geral
	ctx.fillStyle = 'white';

	//bola
	ctx.fillRect(bola.x, bola.y, bola.largura, bola.altura);

	//alvos
	ctx.fillRect(alvo.x, alvo.y, alvo.largura, alvo.altura);
	// ctx.fillRect(alvo.x + alvo.largura + 2, alvo.y, alvo.largura, alvo.altura);

	//arco da mira
	ctx.beginPath();
	ctx.arc(mira.x, mira.y, mira.raio, mira.grauInicio, mira.grauFim, false);
	ctx.stroke();
}

setInterval(desenha, 50);

desenha();