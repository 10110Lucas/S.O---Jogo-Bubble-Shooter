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
let cores = ['black', 'red', 'yellow', 'black', 'red', 'yellow'];
let alvos = [];
let alvo = {
	x: 0,
	y: 0,
	altura: 0,
	largura: 0,
	cor: ''
}

addAlvo((canvas.width / 2) - 10, 120, cores[1]);
addAlvo((canvas.width / 2) - 40, 120, cores[0]);
addAlvo((canvas.width / 2) + 20, 120, cores[1]);
addAlvo((canvas.width / 2) - 70, 120, cores[0]);
addAlvo((canvas.width / 2) + 50, 120, cores[2]);
addAlvo((canvas.width / 2) + 80, 120, cores[2]);

let bolha = {
	x: (canvas.width / 2) - 10,
	y: canvas.height - 50,
	altura: 20,
	largura: 20,
	cor: cores[0],
	dirx: 0,
	diry: -1,
	speed: 9
};
let bolhas = []
bolhas.push(bolha);
addBolas(cores[2]);
bolhas[1].x = (canvas.width / 2) + 60;
addBolas(cores[1]);
addBolas(cores[2]);
addBolas(cores[0]);

//pegar a tecla do teclado
document.addEventListener('keydown', (e) => {
	teclas[e.keyCode] = true;
}, false);

document.addEventListener('keyup', (e) => delete teclas[e.keyCode], false);

function iniciaGame(){
	if(teclaStart == true){
		bolhas[0].x += bolhas[0].speed * bolhas[0].dirx;
		bolhas[0].y += bolhas[0].speed * bolhas[0].diry;
	} else {
		moveMira();
	}
}

function moveMira(){
	//tecla da mira sentido esquerda
	if(37 in teclas && mira.dirx >= -20){
		bolhas[0].dirx -= 0.035;
		mira.dirx -= 0.5;
	}

	//tecla da mira sentido direita
	else if(39 in teclas && mira.dirx <= 20){
		bolhas[0].dirx += 0.035;
		mira.dirx += 0.5;
	}

	//tecla de start
	if(32 in teclas && teclaStart == false){
		teclaStart = true;
	}
}

//quando atingir o alvo
function atingeAlvo(){
	for(let i = 0; i < alvos.length; i++){
		if(bolhas[0].y <= alvos[i].y + alvos[i].altura + 5 &&
			 bolhas[0].x + bolhas[0].largura >= alvos[i].x &&
			 bolhas[0].x <= alvos[i].x + alvos[i].largura){

						bolhas[0].dirx = 0;
						bolhas[0].diry = 0;
						teclaStart = false;
						addAlvo(bolhas[0].x, bolhas[0].y, bolhas[0].cor);
						proximaJogada();
		}
	}
}

function moveBola(){
	//inicia movimento de eixo x e y da bolha
	iniciaGame();
	//verificar se alvo foi atingido
	atingeAlvo();
	//quando bater na parede esquerda
	if(bolhas[0].x < 5){
		bolhas[0].dirx = 1;
	}
	//quando bater na parede direita
	else if(bolhas[0].x + bolhas[0].largura > canvas.height - 10){
		bolhas[0].dirx = -1;
	}
	//quando bater no teto ( y = 0 )
	else if(bolhas[0].y <= 0){
		acionarTeto();
	}
	//quando bater no chão ( y = +-600px OU y = canvas.height )
	else if(bolhas[0].y + bolhas[0].altura >= canvas.height){
		bolhas[0].diry = -1;
	}
}

function proximaJogada(){
	if(bolhas.length >= 1)
		bolhas.shift();
	//volta o ponto inicial
	bolhas[0].x = (canvas.width / 2) - 10;
	bolhas[0].y = canvas.height - 50;
	bolhas[0].dirx = 0;
	bolhas[0].diry = -1;
	bolhas[0].speed = 9;
	mira.grauInicio = 266 * (Math.PI / 180);
	mira.grauFim = 274 * (Math.PI / 180);
	mira.dirx = 0;
	teclaStart = false;
	organizaFila();
}

function acionarTeto(){
	addBolas(bolhas[0].cor);
	proximaJogada();
	organizaFila();
}

function organizaFila(){
	bolhas[1].x = (canvas.width / 2) + 60;
	if(bolhas.length >= 1){
		for(let i = 2; i < bolhas.length; i++){
			bolhas[i].x = bolhas[i-1].x + 35;
		}
	}
}

function addAlvo(x, y, cor){
	alvo = {};
	alvo.x = x;
	alvo.y = y;
	alvo.largura = 20;
	alvo.altura = 20;
	alvo.cor = cor;
	alvos.push(alvo);
}

function addBolas(cor){
	bolha = {};
	bolha.x = bolhas[bolhas.length - 1].x + 35;
	bolha.y = canvas.height - 35;
	bolha.altura = 20;
	bolha.largura = 20;
	bolha.cor = cor;
	bolha.dirx = 0;
	bolha.diry = -1;
	bolha.speed = 9;
	bolhas.push(bolha);
}

function girarMira(x, y, r, angulo){
	tela.height = 104;
  tela.width = 104;
	tela.style = `margin-top: ${y}px;margin-left: ${x}px;`;
	ponteiro.translate(img.width / 2 + tela.width / 2 - 4, img.height / 2 + 8);
	ponteiro.rotate(angulo * (Math.PI / 180));
	ponteiro.drawImage(img, -img.width / 2, -img.height / 2, 8, r);
}

function desenha(){

	ctx.clearRect(0, 0, canvas.width, canvas.height);

	girarMira(658, 495, 50, mira.dirx * 3);
	moveBola();

	//alvos
	for(let i = 0; i < alvos.length; i++){
		ctx.fillStyle = alvos[i].cor;
		ctx.fillRect(alvos[i].x, alvos[i].y, alvos[i].largura, alvos[i].altura)
	}

	//bolha
	for(let i = 0; i < bolhas.length; i++){
		ctx.fillStyle = bolhas[i].cor;
		ctx.fillRect(bolhas[i].x, bolhas[i].y, bolhas[i].largura, bolhas[i].altura);
	}
}

setInterval(desenha, 50);

desenha();
