/*
var nomes= ["Tiago", "Lenita", "Jefferson"];
nomes.push("Jubliscleudo")
nomes.push("Josinaldo")
nomes.push("XeroxPhotoscopiadora")
nomes.pop()
alert(nomes);
*/

var Motor = Matter.Engine;
var Mundo = Matter.World;
var Corpos = Matter.Bodies;
var Corpo = Matter.Body;

var motor;
var mundo;
var bola;
var chão;

var pedra;
var parede;

var bolinhas = [];
var limite_bolinhas = 100; // Limite de bolinhas para evitar sobrecarga



function setup() {
  createCanvas(400, 400);



  motor = Motor.create();
  mundo = motor.world;

  motor.world.gravity.y = 10;//Muda a gravidade do mundo

  var opcoes_bola = {
    restitution: 1,
    frictionAir: 0.1
  };

  var opcoes_pedra = {
    restitution: 2
  };
   
  var opcoes_chão = {
    isStatic: true
  };

  chão = Corpos.rectangle(200, 390, 400, 20, opcoes_chão);
  Mundo.add(mundo, chão);

  parede = Corpos.rectangle(400, 300, 100, 20, opcoes_chão);
  Mundo.add(mundo, parede);

  bola = Corpos.circle(100, 10, 20, opcoes_bola);
  Mundo.add(mundo, bola);
  
  pedra = Corpos.circle(250, 10, 20, opcoes_pedra);
  Mundo.add(mundo, pedra);

  

  // Inicializar bolinhas
  for (var j = 0; j < limite_bolinhas; j++) {
    adicionarBolinha();
  }

  rectMode(CENTER);
  ellipseMode(RADIUS);
}

function adicionarBolinha() {
  var opcoes_bolinhas = {
    restitution: random(0.5, 1),
    frictionAir: random(0.01, 0.1)
  };

  var bolinha = Corpos.circle(random(50, 350), random(50, 350), random(5, 10), opcoes_bolinhas);
  Mundo.add(mundo, bolinha);
  bolinhas.push(bolinha);
}

function draw() {
  background(0);
  Motor.update(motor);

  // Desenhar e colorir a bola
  fill(255, 0, 0);  // Vermelho
  ellipse(bola.position.x, bola.position.y, 50);
  
  // Desenhar e colorir o chão
  fill(19, 24, 125);  // Azul
  rect(chão.position.x, chão.position.y, 400, 20);

  // Desenhar e colorir a pedra
  fill(182, 10, 194);  // Rosa
  ellipse(pedra.position.x, pedra.position.y, 20);

  // Desenhar e colorir a parede
  fill(19, 24, 125);  // Verde claro
  rect(parede.position.x, parede.position.y, 150, 20);

  
 

  // Adicionar novas bolinhas se necessário
  if (bolinhas.length < limite_bolinhas) {
    adicionarBolinha();
  }

  // Desenhar e colorir bolinhas menores
  for (var j = 0; j < bolinhas.length; j++) {
    var bolinha = bolinhas[j];
    fill(random(100, 255), random(100, 255), random(100, 255));  // Cores aleatórias
    ellipse(bolinha.position.x, bolinha.position.y, bolinha.circleRadius);//circleRadius é o correto porque a bolinha só tem o raio.
  }

    // Controles da bola - Corpo.applyForce(bola, posição, força) aplica uma pequena força à bola, permitindo que ela se mova nas direções correspondentes.
    if (keyIsDown(LEFT_ARROW)) {
      Corpo.applyForce(bola, { x: bola.position.x, y: bola.position.y }, { x: -0.005, y: 0 });
    }
    if (keyIsDown(RIGHT_ARROW)) {
      Corpo.applyForce(bola, { x: bola.position.x, y: bola.position.y }, { x: 0.005, y: 0 });
    }
    if (keyIsDown(UP_ARROW)) {
      Corpo.applyForce(bola, { x: bola.position.x, y: bola.position.y }, { x: 0, y: -0.005 });
    }
    if (keyIsDown(DOWN_ARROW)) {
      Corpo.applyForce(bola, { x: bola.position.x, y: bola.position.y }, { x: 0, y: 0.005 });
    }
}
