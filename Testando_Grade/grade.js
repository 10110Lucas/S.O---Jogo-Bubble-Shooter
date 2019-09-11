let canvas = document.getElementById('mycanvas');
let paint = canvas.getContext('2d');

let cores = ['black', 'red', 'yellow'];
let alvos = [];
let alvo = {
	x: 0,
	y: 0,
	altura: 0,
	largura: 0,
	cor: ''
}

// let xInicial = (canvas.width / 2) - 70;
let xInicial = 70;
let yInicial = 120;
let alteraCor = 0;
let x = xInicial + (30 * 6);
let y = yInicial + (30 * 3);
let linha = 0;
let coluna = yInicial;

// for(linha = xInicial; linha < ?; linha += 30){
//   for(coluna; coluna < ?;linha += 30){
//
//   }
// }

do{
  linha = xInicial;
  coluna += 30;

  do{

    addAlvo(linha, coluna, cores[alteraCor]);
    linha += 30;

  }while(linha < x);// x = 7vezes

  alteraCor++;

}while(coluna < y);// y = 3 vezes
// addAlvo(xInicial, yInicial, cores[0]);//cor black
// addAlvo(xInicial + 30, yInicial, cores[0]);// cor black
// addAlvo(xInicial + 30 + 30, yInicial, cores[1]);//cor vermelha
// addAlvo(xInicial + 30 + 30 + 30, yInicial, cores[1]);//cor vermelha
// addAlvo(xInicial + 30 + 30 + 30 + 30, yInicial, cores[2]);//cor amarela
// addAlvo(xInicial + 30 + 30 + 30 + 30 + 30, yInicial, cores[2]);//cor amarela


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

// setInterval(desenha, 50);

desenha();
