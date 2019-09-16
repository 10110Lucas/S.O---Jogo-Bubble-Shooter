let canvas = document.getElementById('mycanvas');
let paint = canvas.getContext('2d');

let bolaDeLan = document.getElementById('bola-de-lan');

let alvos = [];
let alvo = {
	x: 0,
	y: 0,
	altura: 0,
	largura: 0,
	cor: '',
	type: 0
}

//----------------------------------------------------------------------------------
let xInicial = 125;
let yInicial = 65;
let alteraCor = 0;
let x = xInicial + (50 * 6);
let y = yInicial + (50 * 4);
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
			addAlvo(coluna + aux, linha, alteraCor);
		} else {
			addAlvo(coluna, linha, alteraCor);
		}
		coluna += 50;
		if(aux3 == 'impar'){
			addAlvo(coluna + aux, linha, alteraCor);
		} else {
			addAlvo(coluna, linha, alteraCor);
		}
		if (alteraCor < 4) {
			alteraCor++;
		} else if (alteraCor > 3) {
			alteraCor = 0;
		}
  }
	i++;
	if (alteraCor < 4) {
		alteraCor++;
	} else if (alteraCor > 4) {
		alteraCor = 0;
	}
}


//---- Funções --------- Funções --------- Funções --------- Funções --------- Funções --------- Funções --------- Funções ----------

function addAlvo(x, y, type){
	alvo = {};
	alvo.x = x;
	alvo.y = y;
	alvo.largura = 20;
	alvo.altura = 20;
	alvo.type = type;
	alvos.push(alvo);
}

function desenha(){

	paint.clearRect(0, 0, canvas.width, canvas.height);

	//alvos
	for(let i = 0; i < alvos.length; i++){
		paint.drawImage(bolaDeLan, alvos[i].type * 44, 0, 44, 44, alvos[i].x, alvos[i].y, 44, 43);
	}
}

desenha();
