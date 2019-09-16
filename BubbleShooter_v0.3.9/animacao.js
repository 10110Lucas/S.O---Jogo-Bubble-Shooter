let canvas = document.getElementById('mycanvas');
let ctx = canvas.getContext('2d');

let tela = document.getElementById('agulha');
let ponteiro = tela.getContext('2d');
const img = document.getElementById('indicador');
const imgBolas = document.getElementById('bola-de-lan');

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
let cores = ['black', 'red', 'yellow'];
let alvos = [];
let alvo = {
	x: 0,
	y: 0,
	altura: 0,
	largura: 0,
	type: 0,
	cor: ''
}

criarMatriz(2, 2);

let bolha = {
	x: (canvas.width / 2) - 21,
	y: canvas.height - 80,
	altura: 42,
	largura: 42,
	type: 0,
	cor: cores[0],
	dirx: 0,
	diry: -1,
	speed: 9
};

let bolhas = []
bolhas.push(bolha);
addBolas(2);
bolhas[1].x = (canvas.width / 2) + 60;
addBolas(1);
addBolas(2);
addBolas(0);

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
		mira.dirx -= 0.6;
	}

	//tecla da mira sentido direita
	else if(39 in teclas && mira.dirx <= 20){
		bolhas[0].dirx += 0.035;
		mira.dirx += 0.6;
	}

	//tecla de start
	if(32 in teclas && teclaStart == false){
		teclaStart = true;
	}
}

function explodir(combo){
	alvos.splice(alvos.indexOf(combo), 1);
}

function grupoType(acertou){
	let coresIguais = [];
	for(let i = 0; i < alvos.length; i++){
		if(alvos[i].type == acertou.type){
			coresIguais.push(alvos[i]);
			if(coresIguais.length > 2){
				// alert(`Total cores iguais: ${coresIguais.length}\n`+
				// 			`Posicao.x: ${acertou.x}\n`+
				// 			`Posicao.y: ${acertou.y}\n`+
				// 			`Cor.cor: ${acertou.cor}\n\n`+
				// 						`x: ${coresIguais[0].x}\n`+
				// 						`y: ${coresIguais[0].y}\n`+
				// 						`cor: ${coresIguais[0].cor}\n\n`+
				// 									`x: ${coresIguais[1].x}\n`+
				// 									`y: ${coresIguais[1].y}\n`+
				// 									`cor: ${coresIguais[1].cor}`);
			}
			explodir(alvos[i]);
			// if(acertou.x+10 > coresIguais[1].x && acertou.x < coresIguais[0].x){
			// 	alert('explodirá aqui');
			// }
		}
	}
}

//quando atingir o alvo
function atingeAlvo(){
	for(let i = 0; i < alvos.length; i++){

		if(bolhas[0].y <= alvos[i].y + alvos[i].altura + 10 &&
			 bolhas[0].y >= alvos[i].y + alvos[i].altura - 20 &&
			 bolhas[0].x <= alvos[i].x + alvos[i].largura &&
			 bolhas[0].x + bolhas[0].largura >= alvos[i].x){
						bolhas[0].dirx = 0;
						bolhas[0].diry = 0;
						teclaStart = false;
						addAlvo(bolhas[0].x, bolhas[0].y, bolhas[0].type);
						// if(bolhas[0].type == alvos[i].type){
						// 	grupoType(bolhas[0]);
						// }
						mapearMatriz();
						proximaJogada();
		}
	}
}

function moveBolha(){
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

function acionarTeto(){
	addBolas(bolhas[0].type);
	proximaJogada();
	organizaFila();
}

function proximaJogada(){
	if(bolhas.length >= 1)
		bolhas.shift();
	//volta o ponto inicial
	bolhas[0].x = (canvas.width / 2) - 21;
	bolhas[0].y = canvas.height - 80;
	bolhas[0].dirx = 0;
	bolhas[0].diry = -1;
	bolhas[0].speed = 9;
	mira.grauInicio = 266 * (Math.PI / 180);
	mira.grauFim = 274 * (Math.PI / 180);
	mira.dirx = 0;
	teclaStart = false;
	organizaFila();
}

function organizaFila(){
	bolhas[1].x = (canvas.width / 2) + 60;
	if(bolhas.length >= 1){
		for(let i = 2; i < bolhas.length; i++){
			bolhas[i].x = bolhas[i-1].x + 50;
		}
	}
}

function criarMatriz(lin, col){
	let xInicial = 125;
	let yInicial = 65;
	let alteraType = 0;
	let x = xInicial + (50 * col);
	let y = yInicial + (50 * lin);
	let linha = yInicial;
	let coluna = 0;
	let aux = 0;
	let aux2 = 0;
	let aux3 = '';
	let i = 0;

	for(linha; linha < y; linha += 50){
		if(i % 2 == 0){
			aux3 = 'par'
			aux = 0;
		} else{
			aux3 = 'impar'
			aux = 25;
		}
	  for(coluna = xInicial; coluna < x; coluna += 50){
			if(aux3 == 'impar'){
				addAlvo(coluna + aux, linha, alteraType);
			} else {
				addAlvo(coluna, linha, alteraType);
			}
			coluna += 50;
			if(aux3 == 'impar'){
				addAlvo(coluna + aux, linha, alteraType);
			} else {
				addAlvo(coluna, linha, alteraType);
			}
			if (alteraType < 4) {
				alteraType++;
			} else if (alteraType > 3) {
				alteraType = 0;
			}
	  }
		i++;
		if (alteraType < 4) {
			alteraType++;
		} else if (alteraType > 4) {
			alteraType = 0;
		}
	}
}

function reOrdenarMatriz(linhas, colunas){
	let diferencaEntreLinhas = 0;
	let deferencaEntreColunas = 0;
	for(let i = 1; i < linhas.length; i++){
		if(linhas[i - 1] != linhas[i]){
			diferencaEntreLinhas = linhas[i] - linhas[i - 1];
		}
	}
	for(let j = 1; j < colunas.length; j++){
		if(colunas[j - 1] != colunas[j]){
			diferencaEntreColunas = colunas[j] - colunas[j - 1];
		}
	}
	for(let c = 1; c < colunas.length; c++){
		if(colunas[colunas.length - 1] > colunas[c - 1]){
			console.log(`Teste: ${colunas[c]}\nFoi maior que: ${colunas[c - 1]}`);
			// alvos[alvos.length - 1].x = colunas[c] + 25;
		}
	}
	console.log(`Linhas: ${linhas}\nDif.Linhas: ${diferencaEntreLinhas}\n`+
		`Colunas: ${colunas}\nDif.Colunas: ${diferencaEntreColunas}`);
}

function mapearMatriz(){
	let centerPositionY = 0;
	let centerPositionX = 0;
	let totalLinhas = 0;
	let totalColunas = 0;
	let linhas = [];
	let colunas = [];

	for(let i = 0; i < alvos.length; i++){
		if(alvos[i].y && alvos[i].x && i == 0){
			centerPositionY = (alvos[i].y + alvos[i].altura) / 2;
			totalLinhas++;
			linhas.push(centerPositionY);
			centerPositionX = (alvos[i].x + alvos[i].largura) / 2;
			totalColunas++;
			colunas.push(centerPositionX);
		}
		else if(alvos[0].y != alvos[i].y){
			centerPositionY = (alvos[i].y + alvos[i].altura) / 2;
			totalLinhas++;
			linhas.push(centerPositionY);
		}
		if(i > 0){
			if(alvos[i - 1].x != alvos[i].x){
				centerPositionX = (alvos[i].x + alvos[i].largura) / 2;
				totalColunas++;
				colunas.push(centerPositionX);
			}
		}
	}
	reOrdenarMatriz(linhas, colunas);
}

function addAlvo(x, y, type){
	alvo = {};
	alvo.x = x;
	alvo.y = y;
	alvo.largura = 42;
	alvo.altura = 42;
	alvo.type = type;
	alvos.push(alvo);
}

function addBolas(type){
	bolha = {};
	bolha.x = bolhas[bolhas.length - 1].x + 50;
	bolha.y = canvas.height - 45;
	bolha.altura = 42;
	bolha.largura = 42;
	bolha.type = type;
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

	girarMira(661, 495, 50, mira.dirx * 3);
	moveBolha();

	//alvos
	for(let i = 0; i < alvos.length; i++){
		ctx.drawImage(imgBolas, alvos[i].type * 44, 0, 44, 44, alvos[i].x, alvos[i].y, 42, 42);
	}

	//bolha
	for(let i = 0; i < bolhas.length; i++){
		ctx.drawImage(imgBolas, bolhas[i].type * 44, 0, 44, 44, bolhas[i].x, bolhas[i].y, 42, 42);
	}
}

setInterval(desenha, 50);

desenha();
