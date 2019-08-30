let tela = document.getElementById('tela');
let pint = tela.getContext('2d');

let circulo = {
	x: tela.width / 2,
	y: tela.height / 2,
	raio: 100,
	grauIni: 0 * (Math.PI / 180),
	grauFinal: 45 * (Math.PI / 180)
}

function desenha(){

	// tela.clearRect(0, 0, tala.width, tela.height);

	pint.beginPath();
	pint.lineWidth = 10;
	pint.shadowBlur = 20;
	pint.shadowColor = "yellow";
	pint.arc(circulo.x, circulo.y, circulo.raio, 0, -90 * (Math.PI / 180), true);
	pint.strokeStyle = 'white';
	pint.stroke();
}

desenha();