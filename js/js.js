function start() { // Inicio da função start()

	$("#inicio").hide();
	
	$("#fundoGame").append("<div id='jogador' class='anima1'></div>");
	$("#fundoGame").append("<div id='inimigo1' class='anima2'></div>");
	$("#fundoGame").append("<div id='inimigo2'></div>");
	$("#fundoGame").append("<div id='placar'></div>");
	$("#fundoGame").append("<div id='energia'></div>");

    //Principais variáveis do jogo

	
	var fimdejogo=false;
	var pontos=0;
	var energiaAtual=3;
	var jogo = {}
	var velocidade=5;
	var posicaoY = 450; //parseInt(Math.random() * 34);
	var TECLA = {
		W: 87,
		S: 83,
		}

	jogo.pressionou = [];

	
	var somExplosao=document.getElementById("somExplosao");
	var musica=document.getElementById("musica");
	var somGameover=document.getElementById("somGameover");
	var somPerdido=document.getElementById("somPerdido");
	

	//Música em loop
	musica.addEventListener("ended", function(){ musica.currentTime = 0; musica.play(); }, false);
	musica.play();


	//Verifica se o usuário pressionou alguma tecla	
	
	$(document).keydown(function(e){
		jogo.pressionou[e.which] = true;
		});
	
	
		$(document).keyup(function(e){
		   jogo.pressionou[e.which] = false;
		});
	
	
	//Game Loop

	jogo.timer = setInterval(loop,30);
	
	function loop() {
	
	movefundo();
	movejogador();
	moveinimigo1();
	moveinimigo2();
	colisao();
	placar();
	energia();
	
	} // Fim da função loop()

    //Função que movimenta o fundo do jogo
	
	function movefundo() {
	
        esquerda = parseInt($("#fundoGame").css("background-position"));
        $("#fundoGame").css("background-position",esquerda-1);
        
        } // fim da função movefundo()

	function movejogador() {
	
		if (jogo.pressionou[TECLA.W]) {
			var topo = parseInt($("#jogador").css("top"));
			$("#jogador").css("top",topo-10);

			if (topo<=370) {
				$("#jogador").css("top",topo+10);
		}
			
	}	
			
	if (jogo.pressionou[TECLA.S]) {
				
		var topo = parseInt($("#jogador").css("top"));
		$("#jogador").css("top",topo+10);	

		if (topo>=530) {	
				$("#jogador").css("top",topo-10);
		}
	}
			
	} // fim da função movejogador()

		function moveinimigo1() {

			posicaoX = parseInt($("#inimigo1").css("left"));
			$("#inimigo1").css("left",posicaoX-velocidade);
			$("#inimigo1").css("button",posicaoY);
					
			if (posicaoX<=0) {
				//posicaoY = parseInt(Math.random() * 34);
				$("#inimigo1").css("left",900);
				$("#inimigo1").css("button",posicaoY);
						
					}
		} //Fim da função moveinimigo1()

		function moveinimigo2() {
			posicaoX = parseInt($("#inimigo2").css("left"));
			$("#inimigo2").css("left",posicaoX-3);
						
			if (posicaoX<=0) {
					
			$("#inimigo2").css("left",775);
							
			}

				
		} // Fim da função moveinimigo2()

		

		function colisao() {
			var colisao1 = ($("#jogador").collision($("#inimigo1")));
			var colisao2 = ($("#jogador").collision($("#inimigo2")));

			// jogador com o inimigo1
				
			if (colisao1.length>0) {
				
				pontos = pontos + 100;
				inimigo1X = parseInt($("#inimigo1").css("left"));
				inimigo1Y = parseInt($("#inimigo1").css("top"));
				//explosao1(inimigo1X,inimigo1Y);
			
				//posicaoY = parseInt(Math.random() * 134);
				$("#inimigo1").css("left",900);
				$("#inimigo1").css("top",posicaoY);
					}

				// jogador com o inimigo2 
			if (colisao2.length>0) {

				energiaAtual--;
				inimigo2X = parseInt($("#inimigo2").css("left"));
				inimigo2Y = parseInt($("#inimigo2").css("top"));
				explosao2(inimigo2X,inimigo2Y);
						
				$("#inimigo2").remove();
					
				reposicionaInimigo2();
				}

			
					
		} //Fim da função colisao()

	//Explosão 1

	function explosao1(inimigo1X,inimigo1Y) {
		
		somExplosao.play();
		$("#fundoGame").append("<div id='explosao1'></div");
		$("#explosao1").css("background-image", "url(imgs/explosao.png)");
		var div=$("#explosao1");
		div.css("top", inimigo1Y);
		div.css("left", inimigo1X);
		div.animate({width:200, opacity:0}, "slow");
	
		var tempoExplosao=window.setInterval(removeExplosao, 1000);
	
		function removeExplosao() {
			
			div.remove();
			window.clearInterval(tempoExplosao);
			tempoExplosao=null;
			
		}
		
	} // Fim da função explosao1()

	//Reposiciona Inimigo2
	
	function reposicionaInimigo2() {
	
		var tempoColisao4=window.setInterval(reposiciona4, 200);
			
			function reposiciona4() {
			window.clearInterval(tempoColisao4);
			tempoColisao4=null;
				
				if (fimdejogo==false) {
				
				$("#fundoGame").append("<div id=inimigo2></div");
				
				}
				
			}	
		}

	//Explosão2
	
	function explosao2(inimigo2X,inimigo2Y) {
	
		somExplosao.play();
		$("#fundoGame").append("<div id='explosao2'></div");
		$("#explosao2").css("background-image", "url(imgs/explosao.png)");
		var div2=$("#explosao2");
		div2.css("top", inimigo2Y);
		div2.css("left", inimigo2X);
		div2.animate({width:200, opacity:0}, "slow");
		
		var tempoExplosao2=window.setInterval(removeExplosao2, 1000);
		
			function removeExplosao2() {
				
				div2.remove();
				window.clearInterval(tempoExplosao2);
				tempoExplosao2=null;
				
			}
			
			
		} // Fim da função explosao2()

	
	//Explosão3
	
	function explosao3(amigoX,amigoY) {

		somPerdido.play();
		$("#fundoGame").append("<div id='explosao3' class='anima4'></div");
		$("#explosao3").css("top",amigoY);
		$("#explosao3").css("left",amigoX);
		var tempoExplosao3=window.setInterval(resetaExplosao3, 1000);
		function resetaExplosao3() {
		$("#explosao3").remove();
		window.clearInterval(tempoExplosao3);
		tempoExplosao3=null;
				
		}
	
	} // Fim da função explosao3
	
	function placar() {
	
		$("#placar").html("<h2> Pontos: " + pontos + /*" Salvos: " + salvos + " Perdidos: " + perdidos +*/ "</h2>");
		
	} //fim da função placar()

	//Barra de energia

	function energia() {
		
		if (energiaAtual==3) {
			
			$("#energia").css("background-image", "url(imgs/energia3.png)");
		}

		if (energiaAtual==2) {
			
			$("#energia").css("background-image", "url(imgs/energia2.png)");
		}

		if (energiaAtual==1) {
			
			$("#energia").css("background-image", "url(imgs/energia1.png)");
		}

		if (energiaAtual==0) {
			
			$("#energia").css("background-image", "url(imgs/energia0.png)");
			
			//Game Over
			gameOver();
		}

	} // Fim da função energia()

	//Função GAME OVER
	function gameOver() {
		fimdejogo=true;
		musica.pause();
		somGameover.play();
		
		window.clearInterval(jogo.timer);
		jogo.timer=null;
		
		$("#jogador").remove();
		$("#inimigo1").remove();
		$("#inimigo2").remove();
		$("#amigo").remove();
		
		$("#fundoGame").append("<div id='fim'></div>");
		
		$("#fim").html("<h1> Game Over </h1><p>Sua pontuação foi: " + pontos + "</p>" + "<div id='reinicia' onClick=reiniciaJogo()><h3>Jogar Novamente</h3></div>");
		} // Fim da função gameOver();

} // Fim da função start

//Reinicia o Jogo
		
function reiniciaJogo() {
	somGameover.pause();
	$("#fim").remove();
	start();
	
} //Fim da função reiniciaJogo
