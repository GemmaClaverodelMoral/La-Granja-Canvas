var canvasVilla = document.getElementById("villa");
var mapa = canvasVilla.getContext("2d");
var teclas = 
{
	UP: 38,
	DOWN: 40,
	LEFT: 37,
	RIGHT: 39
};

var fondoMapa = 
{
	url: "tile.png",
	cargaOK: false
};

var vaca = 
{
	url: "vaca.png",
	cargaOK: false,
	x : [],//Creo una variable X y Y para vaca y pollo en arreglo y la de cerdo la inicializo en cero
	y : []
};

var cerdo = 
{
	url: "cerdo.png",
	cargaOK: false,
	x : 0,
	y : 0
};

var pollo = 
{
	url: "pollo.png",
	cargaOK: false,
	x : [],
	y : []
};
 
 
var qVacas = aleatorio(1,30);
var qPollos = aleatorio(1,60);

fondoMapa.imagen = new Image(); //creamos objeto
fondoMapa.imagen.src = fondoMapa.url;
fondoMapa.imagen.addEventListener("load", dibujarfondoMapa);//escuchamos el evento de carga del navegador

vaca.imagen = new Image();
vaca.imagen.src = vaca.url;
vaca.imagen.addEventListener("load", dibujarVaca);

cerdo.imagen = new Image();
cerdo.imagen.src = cerdo.url;
cerdo.imagen.addEventListener("load", dibujarCerdo);

pollo.imagen = new Image();
pollo.imagen.src = pollo.url;
pollo.imagen.addEventListener("load", dibujarPollo);

function dibujarfondoMapa ()//cuando ocurre el evento, se llama a estas funciones para que a su vez llamen la funcion de dibujar
{
	fondoMapa.cargaOK = true;
	dibujar();
}
 
 function dibujarVaca ()
{
	vaca.cargaOK = true;
	dibujar();
}

function dibujarCerdo ()
{
	cerdo.cargaOK = true;
	dibujar();
}

function dibujarPollo ()
{
	pollo.cargaOK = true;
	dibujar();
}

function dibujar()//aqui se evalua cual imagen ha cargado, para que siga el orden de carga que queremos
{
	if(fondoMapa.cargaOK)
	{
		mapa.drawImage(fondoMapa.imagen , 0 , 0);
	}
    if(pollo.cargaOK)
	{
		for(var p =0; p <qPollos ; p++)
		{
			var x = (aleatorio (0,6)*40);
			var y = (12 + aleatorio (0,7)*60);
			pollo.x [p] = x;
			pollo.y [p] = y;
			mapa.drawImage(pollo.imagen , x , y);
	}
	if(vaca.cargaOK)//si el objeto de la vaca ya cargo se ejecuta el ciclo en donde se colocan cantidadDees y posiciones aleatorias. Tambien se guardan en el arreglo las posiciones aleatorias que se generaron para posteriormente saber redibujar el objeto cuando movamos la vaca en el teclado
	{
		for( var v = 0; v < qVacas; v++)
		{
			var x = (aleatorio (0,7)*60);
			var y = (aleatorio (0,7)*60);
			vaca.x[v] = x;
			vaca.y[v] = y;
			mapa.drawImage(vaca.imagen , x , y);
		}
	}
	if(cerdo.cargaOK)
	{	
		var x = (aleatorio (0,7)*60);
		var y = (aleatorio (0,7)*60);
		cerdo.x = x;
		cerdo.y = y;
		mapa.drawImage(cerdo.imagen , x , y);	
	}
	}
}

function aleatorio(min , maxi)
{
	var resultado;
	resultado =  Math.floor(Math.random() * (maxi - min + 1)) + min;
	return resultado;
}

function moverCerdo(x,y)
{
	mapa.drawImage(cerdo.imagen,x,y);
}

function dibujarOtraVez()//redibujamos los objetos, solo que sin el ciclo y utilizando los numero aleatorios de la funcion dibujar
{
    if(fondoMapa.cargaOK){
		mapa.drawImage(fondoMapa.imagen , 0 , 0);
	}
    if(pollo.cargaOK){
        for( var p = 0; p < qPollos; p++){
           mapa.drawImage(pollo.imagen , pollo.x[p] , pollo.y[p]);
       }
    }
	 if(vaca.cargaOK){
	 	for( var v = 0; v < qVacas; v++){
			mapa.drawImage(vaca.imagen , vaca.x[v] , vaca.y[v]);
		}
	 }
}

document.addEventListener("keydown", moverTecla);//identificamos el evento del teclado y restamos o sumamos posicion, segun la tecla 

function moverTecla(evento)
{
		var movimiento = 5;
		switch (evento.keyCode)
	{
		case teclas.UP:
			dibujarOtraVez();
			moverCerdo(cerdo.x,cerdo.y);
			cerdo.y = cerdo.y - movimiento;
		break;
		case teclas.DOWN:
			dibujarOtraVez();
			moverCerdo(cerdo.x,cerdo.y);
			cerdo.y = cerdo.y + movimiento;				
		break;
		case teclas.LEFT:
			dibujarOtraVez();
			moverCerdo(cerdo.x,cerdo.y);
			cerdo.x = cerdo.x - movimiento;				
		break;
		case teclas.RIGHT:
			dibujarOtraVez();
			moverCerdo(cerdo.x,cerdo.y);
			cerdo.x = cerdo.x + movimiento;				
		break;
		default:
			console.log("Otra tecla");
		break;
	}	
}	