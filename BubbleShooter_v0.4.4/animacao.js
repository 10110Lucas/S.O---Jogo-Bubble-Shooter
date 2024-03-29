let canvas = document.getElementById('mycanvas');
let ctx = canvas.getContext('2d');

let tela = document.getElementById('agulha');
let ponteiro = tela.getContext('2d');
const img = document.getElementById('indicador');
const imgBolas = document.getElementById('bola-de-lan');
const msg = document.getElementById('estado');
const filaProcessos = document.getElementById('titulo2');
const gato = document.getElementById('gato');

let loading = null;
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
//             0       1        2       3         4
let cores = ['azul', 'rosa', 'verde', 'roxo', 'amarelo'];
let alvos = [];
let alvo = {
	x: 0,
	y: 0,
	altura: 0,
	largura: 0,
	type: 0,
	cor: ''
}

criarMatriz(4, 8);

let bolha = {
	x: (canvas.width / 2) - 21,
	y: canvas.height - 80,
	altura: 42,
	largura: 42,
	type: 2,
	cor: cores[0],
	dirx: 0,
	diry: -1,
	speed: 20
};
let bolhas = []
bolhas.push(bolha);
addBolas(1);
bolhas[1].x = (canvas.width / 2) + 60;
addBolas(0);
addBolas(4);
addBolas(3);

//pegar a tecla do teclado
document.addEventListener('keydown', (e) => {
	teclas[e.keyCode] = true;
}, false);

document.addEventListener('keyup', (e) => delete teclas[e.keyCode], false);

function iniciaGame(){
	if(teclaStart == true){
		bolhas[0].x += bolhas[0].speed * bolhas[0].dirx;
		bolhas[0].y += bolhas[0].speed * bolhas[0].diry;
		msg.innerHTML = "Processo em Execução";
	} else {
		msg.innerHTML = "Processo Pronto";
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

function getRandomInt(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min)) + min;
}

function tiposRestantes(){
	//verificar ultimos timpos de alvos para preencher com tipos de bolas faltantes
	if(bolhas.length == 1 && alvos.length > 2){
		let existe = false;
		let tipos = [];
		let tipo = 0;

		//adicionar tipos sem repetição
		for(let i = alvos.length-1; i>-1;i = i-2){
				tipos.push(alvos[i].type);
				console.log('tipos:'+alvos[i].type);
				if(alvos[i].type != bolhas[0].type){
					addBolas(alvos[i].type);
					bolhas[1].x = (canvas.width / 2) + 60;
					break;
				}
		}
		/*for(let i = 1; i < alvos.length;i++){
			if(alvos[i-1].type != alvos[i].type){
				tipo = alvos[i-1].type;


				if(tipos.length < 3 && tipos.lengt >= 0){
					tipos.push(tipo);
				}
				else{
					for(let j = tipos.length-1; j > -1; j--){
						if(tipos[j] == tipo){
							existe = true;
							break;
						}
					}
					if(!existe && tipo != null){
						tipos.push(tipo);
					}
				}
			}
		}*/

		// existe = true;
		/*
		//ordena o array em ordem crescente
		tipos.sort((a, b) => a - b);
		//posicao zero é o menor numero(tipo), posicao maxima é o maior numero(tipo)
		tipo = getRandomInt(tipos[0], tipos[tipos.length - 1]);
		*/
		// let iterador = 0;
		//adicionar bola com tipo diferente da primeira bola da fila
		/*do{
			if(tipo != bolhas[0].type){
				addBolas(tipo);
				existe = false;
			}else{
				if(tipos[iterador]){
					tipo = tipos[iterador];
				}
			}
			iterador++;
		}while(existe);*/
	}
	else if(alvos.length < 2){
		msg.innerHTML = "Todos Processos Finalizados";
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
				ordenarMatriz(alvos[i], bolhas[0])
				// msg.innerHTML = "Processo Finalizado!!";
				// setTimeout(, 1000);
				// teclaStart = false;
		}
	}
	tiposRestantes();
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
		msg.innerHTML = "Processo Suspenso";
		setTimeout(clearTimeout(loading), 1000);
		loading = null;
		setTimeout(function () {
			loading = window.setInterval(main, 50);
		}, 1000);

		// setTimeout(function () {
		// }, 1000);
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
	if(bolhas.length >= 1){
		bolhas.shift();
	}
	//volta para o lançador
	bolhas[0].x = (canvas.width / 2) - 21;
	bolhas[0].y = canvas.height - 80;
	bolhas[0].dirx = 0;
	bolhas[0].diry = -1;
	bolhas[0].speed = 20;
	mira.grauInicio = 266 * (Math.PI / 180);
	mira.grauFim = 274 * (Math.PI / 180);
	mira.dirx = 0;
	teclaStart = false;
	//organizar a fila de espera
	organizaFila();
}

function organizaFila(){
	//tem um processo em espera?
	if(bolhas[1]){
		bolhas[1].x = (canvas.width / 2) + 60;
	}
	//tem mais de um processo em espera?
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
			}
			else if(linha == (yInicial+(50 * 2)) && coluna == (xInicial + (50 * 4))){
					addAlvo(coluna, linha, 0);
			}
			else if(linha == (yInicial+(50 * 2)) && coluna == (xInicial + (50 * 5))){
					addAlvo(coluna, linha, 0);
			}
			else{
				addAlvo(coluna, linha, alteraType);
			}
			coluna += 50;
			if(aux3 == 'impar'){
				addAlvo(coluna + aux, linha, alteraType);
			}
			else if(linha == (yInicial+(50 * 2)) && coluna == (xInicial + (50 * 4))){
					addAlvo(coluna, linha, 0);
			}
			else if(linha == (yInicial+(50 * 2)) && coluna == (xInicial + (50 * 5))){
					addAlvo(coluna, linha, 0);
			}
			else{
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

function ordenarMatriz(alvo, bola){
	let centroAlvo = (alvo.x + alvo.largura) / 2;
	let centroBola = (bola.x + bola.largura) / 2;

	if(centroBola > centroAlvo){
		bola.x = 0;
		bola.x = alvo.x + 25;
	}
	else if(centroBola < centroAlvo){
		bola.x = 0;
		bola.x = alvo.x - 25;
	}
	addAlvo(bola.x, bola.y, bola.type);
	cluster(bola);
	proximaJogada();
	teclaStart = false;
}

function cluster(bola){
	let linhas = 0;
	let colunas = 0;
	let grade = [[]];
	//cria uma nova matriz secundaria para referencia
	for(let i = 1; i < alvos.length; i++){
		if(alvos[i].y != alvos[i-1].y){
			grade[linhas].push(alvos[i-1]);
			grade.push([]);
			linhas++;
		}else{
			grade[linhas].push(alvos[i-1]);
			colunas++;
		}
	}
	// console.log('colunas: '+ grade[0].length +' --> linhas: '+ (grade.length-2));
	// console.log(`bola Type: ${bola.type} -> bola Y: ${bola.y} -> bola X: ${bola.x}`);

	let clusters = [];
	let index = 0;
	let xMaximo = bola.x + 25;
	let xMinimo = bola.x - 25;
	let vazios = 0;
	let contador = 0;
	let achou = false;
	for(let lin = grade.length - 2; lin > -1; lin--){
	// console.log(`Linha_${lin}`);
		for(let col = grade[lin].length - 1; col > -1; col--){
		// console.log(`   Coluna_${col}`);

			if(grade[lin][col].type == bola.type){
				vazios = 0;

				// console.log(`      0-xMaximo_${xMaximo}`);
				if(grade[lin][col].x <= xMaximo && grade[lin][col].x >= bola.x){

					//-----------------------------------------------------
					// console.log(`         1-xMaximo_${xMaximo}`);
					/*achou = true;
					xMaximo = grade[lin][col].x + 25;
					clusters.push(alvos.indexOf(grade[lin][col]));*/
					for(let i = col; i < grade[lin].length; i++){
						if(grade[lin][i].type == bola.type){
							// console.log(`            alvo.type_${grade[lin][i].type} - alvo.y_${grade[lin][i].y} - alvo.x_${grade[lin][i].x}`);
							xMaximo = grade[lin][i].x + 25;
							index = alvos.indexOf(grade[lin][i]);
							for(let i = clusters.length; i > -1;i--){
								if(clusters[i] == index){
									achou = true;
									break;
								}
							}
							if(!achou){
								clusters.push(index);
							}else{
								achou = false;
							}
						}
						else {
							break;
						}
					}
					//-----------------------------------------------------
					// console.log(`         2-xMaximo_${xMaximo}`);
				}
				/*if(grade[lin][col].x == xMaximo+50 && achou == true){

					console.log(`         2-xMaximo_${xMaximo}`);
					//-----------------------------------------------------
					for(let i = col; i <= grade[lin].length-1; i++){
						if(grade[lin][i].type == bola.type){
							xMaximo = grade[lin][col].x + 25;
							clusters.push(alvos.indexOf(grade[lin][i]));
						}
						else {
							break;
						}
					}
					achou = false;
					//-----------------------------------------------------
					console.log(`         3-xMaximo_${xMaximo}`);
				}*/
				if(grade[lin][col].x >= xMinimo && grade[lin][col].x < bola.x - 5){
					//-----------------------------------------------------
						/*xMinimo = grade[lin][col].x - 25;
						index = alvos.indexOf(grade[lin][col]);*/
						//-----------------------------------------------------
						for(let i = col; i >= 0; i--){
							if(grade[lin][i].type == bola.type){
								xMinimo = grade[lin][col].x - 25;
								index = alvos.indexOf(grade[lin][i]);
								// clusters.push(index);
								for(let i = clusters.length; i > -1;i--){
									if(clusters[i] == index){
										achou = true;
										break;
									}
								}
								if(!achou){
									clusters.push(index);
								}else{
									achou = false;
								}
							}
							else {
								break;
							}
						}
						//-----------------------------------------------------
					//-----------------------------------------------------
				}/*
				else if(grade[lin][col].x <= xMinimo - 25){
					//-----------------------------------------------------
					for(let i = col; i >= 0; i--){
						if(grade[lin][i].type == bola.type){
							// xMinimo = grade[lin][col].x - 25;
							clusters.push(alvos.indexOf(grade[lin][i]));
						}
						else {
							break;
						}
					}
					//-----------------------------------------------------
				}*/
			}
			// tipo do alvo é diferente do tipo da bola lancada
			else {
				vazios++;
			}
		}
		if(lin > -1 && lin < grade.length - 2 && vazios >= grade[lin].length - 1){
			break;
		}
	}
	//comparacao para excluir somente a ultima bola que foi lancada,
	//para evitar bug comparanda o tipo do ultimo objeto do array com o tipo da bola lancada
	if(clusters.length >= 2){
		for(let i = 0; i < clusters.length; i++){
			if(alvos[clusters[i]].type == bola.type){
				console.log(`apagar      alvo.type_${alvos[clusters[i]].type} - alvo.y_${alvos[clusters[i]].y} - alvo.x_${alvos[clusters[i]].x}`);
				alvos.splice(clusters[i], 1);
			}
		}
		alvos.pop();

		msg.innerHTML = "Processo Finalizado!";
		//tudo isso para poder bloquear todas as threads da pagina
		setTimeout(clearTimeout(loading), 1000);
		loading = null;
		setTimeout(function () {
			loading = window.setInterval(main, 50);
		}, 1000);
	}else {
		msg.innerHTML = "Processo Bloqueado!";
		setTimeout(clearTimeout(loading), 1000);
		loading = null;
		setTimeout(function () {
			loading = window.setInterval(main, 50);
		}, 1000);
	}
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
	bolha.speed = 20;
	bolhas.push(bolha);
}

function girarMira(x, y, r, angulo){
	tela.height = 104;
  tela.width = 104;
	// tela.style = `margin-top: ${y}px;margin-left: ${x}px;`;
	tela.style = `margin-top: ${y}px;padding-left: ${x - (tela.width/2) + 3}px;`;
	ponteiro.translate(img.width / 2 + tela.width / 2 - 4, img.height / 2 + 8);
	ponteiro.rotate(angulo * (Math.PI / 180));
	ponteiro.drawImage(img, -img.width / 2, -img.height / 2, 8, r);
}

function main(){

	filaProcessos.innerHTML = `${bolhas.length-1} Processos Suspensos`;

	ctx.clearRect(0, 0, canvas.width, canvas.height);
	moveBolha();

	// girarMira(661, 495, 50, mira.dirx * 3);
	girarMira(canvas.width / 2, 495, 50, mira.dirx * 3);
	//alvos
	for(let i = 0; i < alvos.length; i++){
		ctx.drawImage(imgBolas, alvos[i].type * 44, 0, 44, 44, alvos[i].x, alvos[i].y, 42, 42);
	}
	//bolha
	for(let i = 0; i < bolhas.length; i++){
		ctx.drawImage(imgBolas, bolhas[i].type * 44, 0, 44, 44, bolhas[i].x, bolhas[i].y, 42, 42);
	}
	ctx.drawImage(gato, 120, 385);
}

loading = window.setInterval(main, 50);

main();
