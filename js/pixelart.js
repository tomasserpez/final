var myPixelDraw={
	colorPicked:0,
	cellColor:'#ecf0f1',
	defaultCells:30,
	coloring: false,

	init:function(container){
		      	this.container = container;
      	this.fns.calcSize(document.getElementById('resize').value);
      	myPixelDraw.fns.detectMouseUp();
		myPixelDraw.fns.disableRightClick();

		myPixelDraw.fns.pickColor();
		myPixelDraw.fns.colorIt();

      	$("#sizeit").attr("onclick","myPixelDraw.fns.reSize();")
        $("#reset").attr("onclick","myPixelDraw.fns.reset();")
        $("#toggle-border").attr("onclick","myPixelDraw.fns.toggleBorders();")
        
	},
	fns:{
		calcSize:function(cant){
		
			if (cant ==0){
				cant = myPixelDraw.defaultCells;
			}
			var cantCuad = cant * cant;
			$("#container").empty();
			for (var i = 0; i <= cantCuad; i++) {					
				$("#container").append(nuevoSocotroco);
				var nuevoSocotroco = $("<div class='cell' draggable>");		
			}
			var size=$("#container").width()/cant;
			$(".cell").css({
				"height":size,
				"width":size,
				"background-color":"#ecf0f1",
				"outline":"grey dotted 1px",
				"float":"left",
				"cursor":"progress"
			});
		},
		reSize:function(){
			var valor = document.getElementById('resize').value;
			if(valor>0 && valor <50){
				myPixelDraw.fns.calcSize(valor);
			}
			else{
				alert("El Numero ingresado es invalido, intente nuevamente.");
			}
		},
		detectMouseUp:function(){
			$(document).mouseup(function(){
				coloring=false;
			});
		},
		colorPalette:function(){
			$("#color-pick > div").each(function(){
				var porquepuedo = $(this).attr("id");
				$("color-pick #"+porquepuedo).css({
					backgroundcolor: porquepuedo
				});
			});
		},
		pickColor:function(){
			$("#color-pick > div").click(function(){
				$("#color-pick > div").removeClass("select");
				$(this).attr("class","select");
				var porquepuedo = $(this).attr("id");
				myPixelDraw.colorPicked=porquepuedo;
				myPixelDraw.fns.colorPalette();
			});
		},
		colorIt:function(){
			$("#container").mousedown(function(ev){
				if (ev.which == 1) {
					coloring=true;
					var posX = event.clientX, posY = event.clientY;
					var elem = document.elementFromPoint(posX, posY);
					var color="#"+myPixelDraw.colorPicked;
					elem.style.backgroundColor=color;
					myPixelDraw.fns.colorOnDrag();
				}
				if (ev.which == 3) {
					coloring=true;
					var posX = event.clientX, posY = event.clientY;
					var elem = document.elementFromPoint(posX, posY);
					elem.style.backgroundColor=myPixelDraw.cellColor;
					myPixelDraw.fns.colorOnDrag();
				}
				event.preventDefault();
			});
		},
		colorOnDrag:function(){
			$("#container").mousemove(function(ev){
				if(ev.which == 1){
					var posX = event.clientX, posY = event.clientY;
					var elem = document.elementFromPoint(posX, posY);
					var color="#"+myPixelDraw.colorPicked;
					elem.style.backgroundColor=color;
				}
				if (ev.which == 3) {
					var posX = event.clientX, posY = event.clientY;
					var elem = document.elementFromPoint(posX, posY);
					elem.style.backgroundColor=myPixelDraw.cellColor;
				}
				event.preventDefault();
			});
		},
		reset:function(){
			$(".cell").css({
				"backgroundColor":myPixelDraw.cellColor
			});
		},
		toggleBorders:function () {
                var porquepuedo=$(".cell").attr("class");
                
                if(porquepuedo=="cell no-border"){
                    $(".cell.no-border").removeClass("no-border");
                }else{
                    $(".cell").addClass("no-border");
                }
		},
		disableRightClick:function(){
			$("#container").contextmenu(function(){
				return false;
			});
		}
	}
}
$(document).ready(function(){
	var elemento = $("#container");
	myPixelDraw.init(elemento);
});
