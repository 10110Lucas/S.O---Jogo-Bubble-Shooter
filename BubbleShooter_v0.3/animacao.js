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
	dirx: 0
}

let alvos = [];
let alvo = {
	x: 0,
	y: 0,
	altura: 0,
	largura: 0
}

addAlvo((canvas.width / 2) - 10, 130);
addAlvo((canvas.width / 2) - 40, 130);
addAlvo((canvas.width / 2) + 20, 130);
addAlvo((canvas.width / 2) - 70, 130);
addAlvo((canvas.width / 2) + 50, 130);

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
	} else {
		moveMira();
	}
}

function moveMira(){
	//tecla da mira sentido esquerda
	if(37 in teclas && mira.grauInicio >= 180 * (Math.PI / 180)){
		mira.grauInicio -= 0.04;
		mira.grauFim -= 0.04;
		bola.dirx -= (mira.grauFim - mira.grauInicio) + 0.04;
		mira.dirx -= (mira.grauFim - mira.grauInicio) + 0.04;
	}

	//tecla da mira sentido direita
	else if(39 in teclas && mira.grauFim <= 360 * (Math.PI / 180)){
		mira.grauInicio += 0.04;
		mira.grauFim += 0.04;
		bola.dirx += (mira.grauFim - mira.grauInicio) + 0.04;
		mira.dirx += (mira.grauFim - mira.grauInicio) + 0.04;
	}

	//tecla de start
	if(32 in teclas && teclaStart == false){
		teclaStart = true;
	}
}

function atingeAlvo(){

	//quando atingir o alvo
	for(let i = 0; i < alvos.length; i++){
		if(bola.y <= alvos[i].y + alvos[i].altura + 10 &&
			 bola.x + bola.largura >= alvos[i].x &&
			 bola.x <= alvos[i].x + alvos[i].largura){

						bola.dirx = 0;
						bola.diry = 0;
						modificaVeloc = 0;
						teclaStart = false;
						addAlvo(bola.x, bola.y, bola.largura, bola.altura);
						reiniciaPosicaoInicialDaBola();
		}
	}
}

function moveBola(){
	iniciaGame();
	atingeAlvo();
	// moveMira();
	//quando bater na parede esquerda
	if(bola.x < 5){
		bola.dirx = 1;
	}
	//quando bater na parede direita
	else if(bola.x + bola.largura > canvas.height - 10){
		bola.dirx = -1;
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
	mira.grauInicio = 266 * (Math.PI / 180);
	mira.grauFim = 274 * (Math.PI / 180);
	teclaStart = false;
}

function addAlvo(x, y){
	alvo = {};
	alvo.x = x;
	alvo.y = y;
	alvo.largura = 20;
	alvo.altura = 20;
	alvos.push(alvo);
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

	girarMira(658, 495, 50, mira.dirx * 12);
	moveBola();

	//cor geral
	ctx.fillStyle = 'white';

	//alvos
	// ctx.fillRect(alvo.x, alvo.y, alvo.largura, alvo.altura);
	for(let i = 0; i < alvos.length; i++){
		ctx.fillRect(alvos[i].x, alvos[i].y, alvos[i].largura, alvos[i].altura)
	}

	//arco da mira
	ctx.beginPath();
	ctx.arc(mira.x, mira.y, mira.raio, mira.grauInicio, mira.grauFim, false);
	ctx.stroke();

	//bola
	ctx.fillRect(bola.x, bola.y, bola.largura, bola.altura);
}

setInterval(desenha, 50);

desenha();
