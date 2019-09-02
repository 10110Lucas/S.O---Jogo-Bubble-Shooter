const tela = document.getElementById('tela');
let pint = tela.getContext('2d');

const img = document.getElementById('indicador');

let circulo = {
	x: tela.width / 2,
	y: tela.height / 2,
	raio: 50,
	grauIni: 0,
	grauFinal: -360
}

function rotacionar(x, y, r, angulo){
	canvas.height = 104;
  canvas.width = 104;
	canvas.style = `margin-top: ${y}px;margin-left: ${x}px;`;
	ponteiro.translate(img.width / 2 + canvas.width / 2 - 4, img.height / 2 + 8);
	ponteiro.rotate(angulo * Math.PI / 180);
	ponteiro.drawImage(img, -img.width / 2, -img.height / 2, 8, r);
}

function rotacionar2(idd, x, y, r, angulo){
	let canvas = document.createElement('canvas');
	canvas.setAttribute('id', idd);
	document.body.appendChild(canvas);
	canvas.height = 104;
  canvas.width = 104;
	canvas.style = `margin-top: ${y}px;margin-left: ${x}px;`;
	let ponteiro = canvas.getContext('2d');
	ponteiro.translate(img.width / 2 + canvas.width / 2 - 4, img.height / 2 + 8);
	ponteiro.rotate((90 - angulo) * (Math.PI / 180));
	ponteiro.drawImage(img, -img.width / 2, -img.height / 2, 8, r);
}

function desenha(tex, x, y, r, ini, fim){
	pint.beginPath();
	pint.lineWidth = 5;
	pint.shadowBlur = 20;
	pint.shadowColor = "black";
	pint.arc(x, y, r, ini * (Math.PI / 180), fim * (Math.PI / 180), true);
	pint.strokeStyle = 'white';
	pint.stroke();

	pint.font = "20px Times";
	pint.fillStyle = "white"
	pint.fillText(tex, x - 50, y + 80);
}

//pegar a tecla do teclado
let teclas = {};
var tecla = 0;
document.addEventListener('keydown', (e) => {
	teclas[e.keyCode] = true;
	//alert(e.keyCode);

	//tecla da mira sentido esquerda
	if(37 in teclas){
		tecla -= 3;
	}
	//tecla da mira sentido direita
	else if(39 in teclas){
		tecla += 3;
	}
	teste();
}, false);

//------------------------------------------------------------------------
//esquerda cima
desenha("Angulo 45°", 80, 75, circulo.raio, 0, -45);
// rotacionar(430, 27, circulo.raio, 0);
rotacionar2("tela2", 438, 28, circulo.raio, 45 + tecla);

//meio cima
desenha("Angulo 90°", tela.width / 2, 75, circulo.raio, 0, -90);
rotacionar2("tela3", 658, 28, circulo.raio, 90 + tecla);

//direita cima
desenha("Angulo 135°", tela.width - 75, 75, circulo.raio, 0, -135);
rotacionar2("tela4", 883, 28, circulo.raio, 135 + tecla);

//------------------------------------------------------------------------
//esquerda meio
desenha("Angulo 180°", 80, tela.height / 2, circulo.raio, 0, -180);
rotacionar2("tela5", 438, 253, circulo.raio, 180 + tecla);

//meio meio
desenha("Angulo 360°", circulo.x, circulo.y,
	                     circulo.raio, circulo.grauIni, circulo.grauFinal);
rotacionar2("tela6", 658, 253, circulo.raio, 360 + tecla);

//direita meio
desenha("Angulo 225°", tela.width - 75, tela.height / 2, circulo.raio, 0, -225);
rotacionar2("tela7", 883, 253, circulo.raio, 225 + tecla);

//------------------------------------------------------------------------
//esquerda baixo
desenha("Angulo 270°", 80, tela.height - 90, circulo.raio, 0, -270);
rotacionar2("tela8", 438, 463, circulo.raio, 270 + tecla);

//meio baixo
desenha("Angulo 315°", tela.width / 2, tela.height - 90, circulo.raio, 0, -315);
rotacionar2("tela9", 658, 463, circulo.raio, 315 + tecla);

//direita baixo
desenha("Angulo 360°", tela.width - 75, tela.height - 90, circulo.raio, 0, -360);
rotacionar2("tela10", 883, 463, circulo.raio, 360 + tecla);

function teste(){
	for(let i = 2; i < 11; i++){
		document.getElementById('tela'+i).parentNode.removeChild(document.getElementById('tela'+i));
	}
	rotacionar2("tela2", 438, 28, circulo.raio, 45 + tecla);
	rotacionar2("tela3", 658, 28, circulo.raio, 90 + tecla);
	rotacionar2("tela4", 883, 28, circulo.raio, 135 + tecla);
	rotacionar2("tela5", 438, 253, circulo.raio, 180 + tecla);
	rotacionar2("tela6", 658, 253, circulo.raio, 360 + tecla);
	rotacionar2("tela7", 883, 253, circulo.raio, 225 + tecla);
	rotacionar2("tela8", 438, 463, circulo.raio, 270 + tecla);
	rotacionar2("tela9", 658, 463, circulo.raio, 315 + tecla);
	rotacionar2("tela10", 883, 463, circulo.raio, 360 + tecla);
}

document.addEventListener('keyup', (e) => delete teclas[e.keyCode], false);
