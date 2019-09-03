let canvas = document.getElementById('mycanvas');
let ctx = canvas.getContext('2d');


let tela = document.getElementById('agulha');
let ponteiro = tela.getContext('2d');
const img = document.getElementById('indicador');

let teclas = {};
let teclaStart = false;

let mira = {
	x: (canvas.width / 2),
	y: canvas.height - 55,
	raio: 50,
	grauInicio: 266 * (Math.PI / 180),
	grauFim: 274 * (Math.PI / 180),
	dirx: 0,
	diry: 0
}


let alvo = {
	x: (canvas.width / 2) - 10,
	y: 10,
	altura: 20,
	largura: 20,
	cor: 'black'
}

let bola = {
	x: (canvas.width / 2) - 10,
	y: canvas.height - 50,
	altura: 20,
	largura: 20,
	dirx: 0,
	diry: -1,
	modificaVeloc: 0,
	speed: 9,
	cor: 'black'
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
	if(37 in teclas && mira.grauInicio >= 180 * (Math.PI / 180)){
		mira.grauInicio -= 0.04;
		mira.grauFim -= 0.04;
		bola.dirx -= (mira.grauFim - mira.grauInicio) + 0.04;
	}

	//tecla da mira sentido direita
	else if(39 in teclas && mira.grauFim <= 360 * (Math.PI / 180)){
		mira.grauInicio += 0.04;
		mira.grauFim += 0.04;
		bola.dirx += (mira.grauFim - mira.grauInicio) + 0.04;
	}

	//tecla de start
	if(32 in teclas && teclaStart == false){
		teclaStart = true;
	}
}

function atingeAlvo(){

	//quando atingir o alvo
	if(bola.y <= alvo.y + alvo.altura + 8 &&
		 bola.x + bola.largura >= alvo.x &&
		 bola.x <= alvo.x + alvo.largura){
		bola.dirx = 0;
		bola.diry = 0;
		modificaVeloc = 0;
		teclaStart = false;
	}
}

function moveBola(){

	iniciaGame();
	moveMira();
	atingeAlvo();
	//quando bater nas paredes
	if(bola.x <= 0 && bola.x + bola.largura >= canvas.width){
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
	bola.x = (canvas.width / 2) - 10;
	bola.y = canvas.height - 50;
	bola.dirx = 0;
	bola.diry = -1;
	bola.modificaVeloc = 0;
	bola.speed = 9;
	// mira.grauInicio = 1.48 * Math.PI;
	// mira.grauFim = 1.52 * Math.PI;
	mira.grauInicio = 266 * (Math.PI / 180);
	mira.grauFim = 274 * (Math.PI / 180);
	teclaStart = false;
}


function girarMira(x, y, r, angulo){
	tela.height = 104;
  tela.width = 104;
	tela.style = `margin-top: ${y}px;margin-left: ${x}px;`;
	ponteiro.translate(img.width / 2 + tela.width / 2 - 4, img.height / 2 + 8);
	ponteiro.rotate(angulo * Math.PI / 180);
	console.log(angulo);
	ponteiro.drawImage(img, -img.width / 2, -img.height / 2, 8, r);
}

function desenha(){

	ctx.clearRect(0, 0, canvas.width, canvas.height);

	girarMira(658.5, 495, 50, bola.dirx * 12);
	moveMira();
	moveBola();

	//cor geral
	ctx.fillStyle = 'white';

	//alvos
	ctx.fillRect(alvo.x, alvo.y, alvo.largura, alvo.altura);

	//arco da mira
	ctx.beginPath();
	ctx.arc(mira.x, mira.y, mira.raio, mira.grauInicio, mira.grauFim, false);
	ctx.stroke();

	//bola
	ctx.fillRect(bola.x, bola.y, bola.largura, bola.altura);
}

setInterval(desenha, 50);

desenha();