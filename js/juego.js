var juego={
    filas:[[],[],[]],
    espacioVacio:{
        fila:2,
        columna:2
    },
    crearPieza(numero, fila, columna){
        var nuevoElemento = $('<div>');
        nuevoElemento.addClass("pieza");
        nuevoElemento.css({
            backgroundImage:'url(piezas/' + numero + '.jpg)',
            top: fila*200,
            left: columna*200
        });        
        return{
            el:nuevoElemento,
            numero:numero,
            filaInicial:fila,
            columnaInicial:columna,
        };
    },
        
    instalarPieza(contenedor){
        var counter = 1;
        for (var fila = 0; fila < 3; fila ++){
            for(var columna = 0; columna< 3; columna++){
                if(fila == this.espacioVacio.fila && columna == this.espacioVacio.columna){
                    this.filas[fila][columna] = null;
                }else{
                    var pieza =  this.crearPieza(counter++, fila, columna);
                    contenedor.append(pieza.el);
                    this.filas[fila][columna] = pieza;
                }
            }
        }
        return contenedor;
    },
    moverHaciaLaIzquierda(){
        var filaOrigen = this.espacioVacio.fila;
        var columnaOrigen = this.espacioVacio.columna+1;
        this.intercambiarPosicionConEspacioVacio(filaOrigen, columnaOrigen);
    },
    moverHaciaLaDerecha(){
        var filaOrigen = this.espacioVacio.fila;
        var columnaOrigen = this.espacioVacio.columna-1;
        this.intercambiarPosicionConEspacioVacio(filaOrigen, columnaOrigen);
    },
    moverHaciaArriba(){
        var filaOrigen=this.espacioVacio.fila-1;
        var columnaOrigen=this.espacioVacio.columna;
        this.intercambiarPosicionConEspacioVacio(filaOrigen, columnaOrigen);
    },
    moverHaciaAbajo(){
        var filaOrigen=this.espacioVacio.fila+1;
        var columnaOrigen=this.espacioVacio.columna;
        this.intercambiarPosicionConEspacioVacio(filaOrigen, columnaOrigen);
    },
    guardarEspacioVacio(fila, columna){
        this.espacioVacio.fila=fila;
        this.espacioVacio.columna=columna;
        this.filas[fila][columna]=null;
    },
    moverEspacioFilaColumna(espacio,fila,columna){
        espacio.el.css({
            top:fila*200,
            left:columna*200
        })
    },
    intercambiarPosicionConEspacioVacio(fila,columna){
        var espacio = this.filas[fila] && this.filas[fila][columna];
        if (espacio) {
            this.filas[this.espacioVacio.fila][this.espacioVacio.columna] = espacio;
            this.moverEspacioFilaColumna(espacio,this.espacioVacio.fila, this.espacioVacio.columna);
            this.guardarEspacioVacio(fila,columna);
        }
    },
    capturarTecla(){
        var Si = this;
        $(document).keydown(function(evento){
            switch(evento.which){
            case 37:
              Si.moverHaciaLaIzquierda();
            break;

            case 40:
              Si.moverHaciaArriba();
            break;

            case 39:
              Si.moverHaciaLaDerecha();
            break;

            case 38:
              Si.moverHaciaAbajo();
            break;

            default: return;
            }
            Si.checkSiGano();
            evento.preventDefault();
        });
    },
    mezclarFichas(veces){
    if(veces<=0){return;}

    var that = this;
    var funciones = ['moverHaciaAbajo','moverHaciaArriba','moverHaciaLaIzquierda','moverHaciaLaDerecha'];
    var numeroRandom = Math.floor(Math.random() * 4);
    var nombreDeFuncion = funciones[numeroRandom];
    this[nombreDeFuncion]();

    setTimeout(function(){
           that.mezclarFichas(veces-1);
    },10);
    },

    checkSiGano(){
        for (var f = 0; f < this.filas.length; f++) {
            for (var c = 0; c < this.filas.length; c++) {
                var espacio = this.filas[f][c];
                if (espacio &&! (espacio.filaInicial==f && espacio.columnaInicial==c)){
                    return false;
                }
            }
        }
        return alert("Ganaste");
    },
    iniciar: function(el){
        this.instalarPieza(el);        
        this.mezclarFichas(200);
        this.capturarTecla();
    }
}
$(function(){
    var elemento = $('#juego');
    juego.iniciar(elemento);
})