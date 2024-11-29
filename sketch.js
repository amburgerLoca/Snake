//tamanho tela

let canvaW = 400;
let canvaH = 400;

// variaves da snake
let xCobra = 50;
let yCobra = 40;
let wCobra = 10;
let hCobra = 10;

//velocidade da movimentação 

let velocidadeMovimentacao = 4;

let direcao = "right";


let partes = 1;
let rabo = [];


posicaoXcomida = randomIntFromInterval(11, canvaW - 37);
posicaoYcomida = randomIntFromInterval(11, canvaH - 37);

let colidiu = false;
let comeu = false;

//paredes

// esquerda direita

let wParED = 10;
let hParED = 400;
let posXParE = 0;
let posYParE = 0;
let posXParD = 390;
let posYParD = 0;

// cima baixo

let wParCB = 400;
let hParCB = 10;
let posXParC = 0;
let posYParC = 0;
let posXParB = 0;
let posYParB = 390;

//pontos

let meusPontos = 0;
let Record = 0;

let cabeca;
let maca;
let azul;

function preload(){    
  cabeca = loadImage("Cabeça.png");
  maca = loadImage("Maça.png");
  azul = loadImage("azul.png");
}


function setup() {
  createCanvas(canvaW, canvaH);
  
}

function draw() {
  background(20);
  rect(xCobra, yCobra, wCobra,hCobra);
  desenhaCobra();
  controleMovimentacao();
  desenhaParedes();
  desenhaComida();  
  comer();
  pegarPosicaoAtual();
  colisaoNasParedes();
  incluirPontos();
  recorde();
}

function desenhaCobra(){
  
 
  
  image(cabeca, xCobra, yCobra, wCobra, hCobra);
  //rect(xCobra, yCobra, wCobra, hCobra);

  
  if (rabo.length > 0){
      
      for(var i = 0; i < rabo.length; i++){
        image(azul,rabo[i][0], rabo[i][1], wCobra, hCobra);
        
     
    }
  }  
}

function controleMovimentacao(){
  
  if(controleCobra()){
     
    direcao = controleCobra();
     
     }
  
  //keyIsDown(LEFT_ARROW )||keyIsDown(65) 
  //keyIsDown(RIGHT_ARROW )||keyIsDown(68)
  //keyIsDown(DOWN_ARROW )||keyIsDown(83)
  //keyIsDown(UP_ARROW)||keyIsDown(87)
  
  if(direcao == "left"){
     
     xCobra -= velocidadeMovimentacao;
     }
  if(direcao == "right"){
    
    xCobra += velocidadeMovimentacao;
  }

  if(direcao == "down"){
    
    yCobra += velocidadeMovimentacao;
    
  }
  
  if(direcao == "up"){
    
    yCobra -= velocidadeMovimentacao;
    
  }
  
}

function controleCobra(){
  
  if(keyIsDown(LEFT_ARROW )||keyIsDown(65)){
  return "left";
  }
  if(keyIsDown(RIGHT_ARROW )||keyIsDown(68)){
  return "right";
  }
  if(keyIsDown(DOWN_ARROW )||keyIsDown(83)){
  return "down";
  }
  if(keyIsDown(UP_ARROW)||keyIsDown(87)){
  return "up";
  }
  
}

function randomIntFromInterval(min, max){
  
  return Math.floor(Math.random()*(max - min + 1) + min);
  
  
}

function desenhaParedes(){
   
  let p = color(0,0,0);
  fill(p);
  rect(posXParE, posYParE, wParED, hParED);
  rect(posXParD, posYParD, wParED, hParED);
  rect(posXParC, posYParC, wParCB, hParCB);
  rect(posXParB, posYParB, wParCB, hParCB);

  
}

function desenhaComida(){
   
  //let cormida = color(200,0,0);
 // fill(cormida);
  image(maca,posicaoXcomida, posicaoYcomida, 20,25);

  
}

function colisaoComida() {
  var colisaoComida = collideRectRect( posicaoXcomida, posicaoYcomida, 20, 25, xCobra, yCobra, wCobra, hCobra );
  return colisaoComida;
}

function comer() {
  if (colisaoComida()) {
    posicaoXcomida = randomIntFromInterval(11, canvaW - 37);
    posicaoYcomida = randomIntFromInterval(11, canvaH - 37);
    partes += 1
    meusPontos += 1
    velocidadeMovimentacao += 0.3
  }
}

function pegarPosicaoAtual() {
 
  rabo.push([xCobra, yCobra]);
  if (rabo.length > partes) {
    rabo.shift();
  }
}

function colisaoNasParedes() {
  var colisaoDireita = collideRectRect( xCobra, yCobra, wCobra, hCobra, posXParD, posYParD, wParED, hParED );
   var colisaoEquerda = collideRectRect( xCobra, yCobra, wCobra, hCobra, posXParE, posYParE, wParED, hParED   );    
   var colisaoCima = collideRectRect( xCobra, yCobra, wCobra, hCobra, posXParC, posYParC, wParCB, hParCB   );    
   var colisaoBaixo = collideRectRect( xCobra, yCobra, wCobra, hCobra, posXParB, posYParB, wParCB, hParCB   );

  if ( colisaoCima == true || colisaoBaixo == true || colisaoDireita == true || colisaoEquerda == true) {
    xCobra = 200;
    yCobra = 200;
    rabo = [];
    partes = 0;
    meusPontos = 0;
    velocidadeMovimentacao = 4;
  }
}

function incluirPontos(){
  
  let pontin = color(200,0,0);
  stroke(255);
  textAlign(CENTER);
  textSize(20);
  fill(pontin);
  rect(200,10,20,20);
  text(meusPontos, 210,26);
 // text (velocidadeMovimentacao, 321, 26);
  rect (170,10,20,20);
  text (Record, 180, 26);
  

  
}

function recorde(){
  
  if(meusPontos > Record){
    
    Record = meusPontos;
    
  }
  
}

