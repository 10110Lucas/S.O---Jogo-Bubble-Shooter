let tela = document.getElementById('tela');
let pint = tela.getContext('2d');

let img = document.getElementById('indicador');

let circulo = {
	x: tela.width / 2,
	y: tela.height / 2,
	raio: 50,
	grauIni: 0,
	grauFinal: -360
}

function desenha(tex, x, y, r, ini, fim){

	pint.beginPath();
	pint.lineWidth = 5;
	pint.shadowBlur = 20;
	pint.shadowColor = "black";
	pint.arc(x, y, r, ini * (Math.PI / 180), fim * (Math.PI / 180), true);
	pint.strokeStyle = 'white';
	pint.stroke();

	// document.write('<img id="indicador" src="img/Agulha.v2.fw.png"/>');
	// let img = document.getElementById('indicador');

	pint.drawImage(img, x, y - 50);

	pint.font = "20px Times";
	pint.fillStyle = "white"
	pint.fillText(tex, x - 50, y + 80);

}

//------------------------------------------------------------------------
//esquerda cima
desenha("Angulo 45°", 60, 60, circulo.raio, 0, -45);

//meio cima
desenha("Angulo 90°", tela.width / 2, 75, circulo.raio, 0, -90);

//direita cima
desenha("Angulo 135°", tela.width - 75, 75, circulo.raio, 0, -135);

//------------------------------------------------------------------------
//esquerda meio
desenha("Angulo 180°", 75, tela.height / 2, circulo.raio, 0, -180);

//meio meio
desenha("Angulo 360°", circulo.x, circulo.y,
	                     circulo.raio, circulo.grauIni, circulo.grauFinal);
//direita meio
desenha("Angulo 225°", tela.width - 75, tela.height / 2, circulo.raio, 0, -225);

//------------------------------------------------------------------------
//esquerda baixo
desenha("Angulo 270°", 75, tela.height - 90, circulo.raio, 0, -270);

//meio baixo
desenha("Angulo 315°", tela.width / 2, tela.height - 90, circulo.raio, 0, -315);

//direita baixo
desenha("Angulo 360°", tela.width - 75, tela.height - 90, circulo.raio, 0, -360);

//------------------------------------------------------------------------
