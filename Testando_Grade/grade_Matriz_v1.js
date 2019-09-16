let canvas = document.getElementById('mycanvas');
let paint = canvas.getContext('2d');

let cores = ['black', 'red', 'yellow'];
// let matrizAlvos = [][];
let alvos = [];
let alvo = {
	x: 0,
	y: 0,
	altura: 0,
	largura: 0,
	cor: ''
}

//----------------------------------------------------------------------------------
let xInicial = 70;
let yInicial = 120;
let alteraCor = 0;
let x = xInicial + (30 * 6);
let y = yInicial + (30 * 3);
let linha = yInicial;
let coluna = 0;
let aux = 0;
let aux2 = 0;
let aux3 = '';
let i = 0;

console.log(` Y: ${y}   -> X: ${x}`);

for(linha; linha < y; linha += 30){
	console.log(`linha: ${linha}`);
	if(i % 2 == 0){
		aux3 = 'par'
		aux = 0;
	} else{
		aux3 = 'impar'
		aux = 10;
	}
  for(coluna = xInicial; coluna < x; coluna += 30){
		console.log(`Coluna: ${coluna} -> cor: ${alteraCor}`);
		if(aux3 == 'impar'){
			addAlvo(coluna + aux, linha, cores[alteraCor]);
		} else {
			addAlvo(coluna, linha, cores[alteraCor]);
		}
		if (alteraCor < 2) {
			alteraCor++;
		} else if (alteraCor > 1) {
			alteraCor = 0;
		}
  }
	i++;
	if (alteraCor < 2) {
		alteraCor++;
	} else if (alteraCor > 1) {
		alteraCor = 0;
	}
	console.log(`Cor: ${alteraCor}`);
}

/*
	primeiro coluna recebe valor de xInicial
	entra no loop das colunas
	addAlvo
	vai incrementando coluna durante o loop enquanto valor é menor que x
	saindo do loop das colunas
	altera a cor
	incrementa a linha

do{
  coluna = xInicial;

  do{

    addAlvo(coluna, linha, cores[alteraCor]);
    coluna += 30;

  }while(coluna < x);// x = 7vezes

  alteraCor++;
	 linha += 30;

}while(linha < y);// y = 3 vezes
addAlvo(xInicial, yInicial, cores[0]);//cor black
addAlvo(xInicial + 30, yInicial, cores[0]);// cor black
addAlvo(xInicial + 30 + 30, yInicial, cores[1]);//cor vermelha
addAlvo(xInicial + 30 + 30 + 30, yInicial, cores[1]);//cor vermelha
addAlvo(xInicial + 30 + 30 + 30 + 30, yInicial, cores[2]);//cor amarela
addAlvo(xInicial + 30 + 30 + 30 + 30 + 30, yInicial, cores[2]);//cor amarela
*/


//---- Funções --------- Funções --------- Funções --------- Funções --------- Funções --------- Funções --------- Funções ----------

function addAlvo(x, y, cor){
	alvo = {};
	alvo.x = x;
	alvo.y = y;
	alvo.largura = 20;
	alvo.altura = 20;
	alvo.cor = cor;
	alvos.push(alvo);
}

function desenha(){

	paint.clearRect(0, 0, canvas.width, canvas.height);

	//alvos
	for(let i = 0; i < alvos.length; i++){
		paint.fillStyle = alvos[i].cor;
		paint.fillRect(alvos[i].x, alvos[i].y, alvos[i].largura, alvos[i].altura)
	}
}


desenha();
