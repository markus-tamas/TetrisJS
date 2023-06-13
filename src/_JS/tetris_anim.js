var canvasHeight;
var canvasWidth;
var canvas;
var ctx;
var arr;
const blockSize = 45;
const borderWidth = 3;
const sideColor = "#000000";
const shadowColor = "#000000";
const shadowX = 5;
const shadowY = 5;
const shadowBlur = 15;

window.addEventListener("load", initCanvas, false);

// Block coordinates
const _15b1l = -1.5*blockSize+1*borderWidth;
const _1b05l = -1*blockSize+0.5*borderWidth;
const _2b1l = -2*blockSize+1*borderWidth;
const _05l = -0.5*borderWidth;
const _3b2l = -3*blockSize+2*borderWidth;
const _15b2l = -1.5*blockSize+2*borderWidth;
const _1b15l = -1*blockSize+1.5*borderWidth;
const __1b_2l = blockSize-2*borderWidth;
const _05b1l = -0.5*blockSize+1*borderWidth;
const _05b = -0.5*blockSize;
const _2b15l = -2*blockSize+1.5*borderWidth;
const __4b_3l = 4*blockSize-3*borderWidth;
const _2b25l = -2*blockSize+2.5*borderWidth;

function initCanvas() {
	window.addEventListener("resize", resizeCanvas, false);
	
	canvas = document.getElementById("tetris_animate");
	ctx = canvas.getContext('2d');

	arr = new Array();
	setInterval(draw,31);
	resizeCanvas();
}

function draw() {
	if (Math.random()<(0.06/1920*canvasWidth))
	{
		var square = new Object();
		
		square.x = Math.floor(Math.random()*(canvasWidth-3*blockSize)+1.5*blockSize);
		square.y = -blockSize*2;
		square.speed = Math.random()*3+2;
		square.type = Math.floor(Math.random()*7+1);
		square.rotation = Math.random()*2*Math.PI;
		square.init = false;
		idx = Math.floor(Math.random()*arr.length);
		arr.splice(idx,0,square);
	}
	for (i=0; i<arr.length; i++)
		arr[i].y += arr[i].speed;
	drawBlocks();
	
}

function drawTetris(coordX, coordY, elementType, blockSize, lw=2, sideColor, th) {
	switch (elementType) {
	case 1: { // J
		ctx.translate(coordX, coordY);
		ctx.rotate(-th);
		ctx.fillStyle = sideColor;
		ctx.shadowBlur = shadowBlur;
		ctx.shadowOffsetX = shadowX;
		ctx.shadowOffsetY = shadowY;
		ctx.shadowColor = shadowColor;
		ctx.fillRect(_15b1l,_1b05l,blockSize,-_2b1l);
		ctx.fillRect(_15b1l,_05l,-_3b2l,blockSize);
		ctx.shadowColor = "transparent";
		ctx.fillStyle = colors[elementType-1];
		ctx.fillRect(_15b2l,_1b15l,__1b_2l,__1b_2l);
		ctx.fillRect(_15b2l,-_05l,__1b_2l,__1b_2l);
		ctx.fillRect(_05b1l,-_05l,__1b_2l,__1b_2l);
		ctx.fillRect(-_05b,-_05l,__1b_2l,__1b_2l);
		ctx.rotate(th);
		ctx.translate(-(coordX),-(coordY));
		break;
	}
	case 2: { // L
		ctx.translate(coordX, coordY);
		ctx.rotate(-th);
		ctx.fillStyle = sideColor;
		ctx.shadowBlur = shadowBlur;
		ctx.shadowOffsetX = shadowX;
		ctx.shadowOffsetY = shadowY;
		ctx.shadowColor = shadowColor;
		ctx.fillRect(-_05b1l,_1b05l,blockSize,-_2b1l);
		ctx.fillRect(_15b1l,_05l,-_3b2l,blockSize);
		ctx.shadowColor = "transparent";
		ctx.fillStyle = colors[elementType-1];
		ctx.fillRect(-_05b,_1b15l,__1b_2l,__1b_2l);
		ctx.fillRect(_15b2l,-_05l,__1b_2l,__1b_2l);
		ctx.fillRect(_05b1l,-_05l,__1b_2l,__1b_2l);
		ctx.fillRect(-_05b,-_05l,__1b_2l,__1b_2l);
		ctx.rotate(th);
		ctx.translate(-(coordX),-(coordY));
		break;
	}
	case 3: { // I
		ctx.translate(coordX, coordY);
		ctx.rotate(-th);
		ctx.fillStyle = sideColor;
		ctx.shadowBlur = shadowBlur;
		ctx.shadowOffsetX = shadowX;
		ctx.shadowOffsetY = shadowY;
		ctx.shadowColor = shadowColor;
		ctx.fillRect(_2b15l,_05b,__4b_3l,blockSize);
		ctx.shadowColor = "transparent";
		ctx.fillStyle = colors[elementType-1];
		ctx.fillRect(_2b25l,_05b1l,__1b_2l,__1b_2l);
		ctx.fillRect(_1b15l,_05b1l,__1b_2l,__1b_2l);
		ctx.fillRect(-_05l,_05b1l,__1b_2l,__1b_2l);
		ctx.fillRect(-_1b05l,_05b1l,__1b_2l,__1b_2l);
		ctx.rotate(th);
		ctx.translate(-(coordX),-(coordY));
		break;
	}
	case 4: { // O
		ctx.translate(coordX, coordY);
		ctx.rotate(-th);
		ctx.fillStyle = sideColor;
		ctx.shadowBlur = shadowBlur;
		ctx.shadowOffsetX = shadowX;
		ctx.shadowOffsetY = shadowY;
		ctx.shadowColor = shadowColor;
		ctx.fillRect(_1b05l,_1b05l,-_2b1l,-_2b1l);
		ctx.shadowColor = "transparent";
		ctx.fillStyle = colors[elementType-1];
		ctx.fillRect(_1b15l,_1b15l,__1b_2l,__1b_2l);
		ctx.fillRect(-_05l,_1b15l,__1b_2l,__1b_2l);
		ctx.fillRect(_1b15l,-_05l,__1b_2l,__1b_2l);
		ctx.fillRect(-_05l,-_05l,__1b_2l,__1b_2l);
		ctx.rotate(th);
		ctx.translate(-(coordX),-(coordY));
		break;
	}
	case 5: { // S
		ctx.translate(coordX, coordY);
		ctx.rotate(-th);
		ctx.fillStyle = sideColor;
		ctx.shadowBlur = shadowBlur;
		ctx.shadowOffsetX = shadowX;
		ctx.shadowOffsetY = shadowY;
		ctx.shadowColor = shadowColor;
		ctx.fillRect(_05b,_1b05l,-_2b1l,blockSize);
		ctx.fillRect(_15b1l,_05l,-_2b1l,blockSize);
		ctx.shadowColor = "transparent";
		ctx.fillStyle = colors[elementType-1];
		ctx.fillRect(_15b2l,-_05l,__1b_2l,__1b_2l);
		ctx.fillRect(_05b1l,-_05l,__1b_2l,__1b_2l);
		ctx.fillRect(_05b1l,_1b15l,__1b_2l,__1b_2l);
		ctx.fillRect(-_05b,_1b15l,__1b_2l,__1b_2l);
		ctx.rotate(th);
		ctx.translate(-(coordX),-(coordY));
		break;
	}
	case 6: { // T
		ctx.translate(coordX, coordY);
		ctx.rotate(-th);
		ctx.fillStyle = sideColor;
		ctx.shadowBlur = shadowBlur;
		ctx.shadowOffsetX = shadowX;
		ctx.shadowOffsetY = shadowY;
		ctx.shadowColor = shadowColor;
		ctx.fillRect(_05b,_1b05l,blockSize,blockSize);
		ctx.fillRect(_15b1l,_05l,-_3b2l,blockSize);
		ctx.shadowColor = "transparent";
		ctx.fillStyle = colors[elementType-1];
		ctx.fillRect(_05b1l,_1b15l,__1b_2l,__1b_2l);
		ctx.fillRect(_15b2l,-_05l,__1b_2l,__1b_2l);
		ctx.fillRect(_05b1l,-_05l,__1b_2l,__1b_2l);
		ctx.fillRect(-_05b,-_05l,__1b_2l,__1b_2l);
		ctx.rotate(th);
		ctx.translate(-(coordX),-(coordY));
		break;
	}
	case 7: { // Z
		ctx.translate(coordX, coordY);
		ctx.rotate(-th);
		ctx.fillStyle = sideColor;
		ctx.shadowBlur = shadowBlur;
		ctx.shadowOffsetX = shadowX;
		ctx.shadowOffsetY = shadowY;
		ctx.shadowColor = shadowColor;
		ctx.fillRect(_05b,_05l,-_2b1l,blockSize);
		ctx.fillRect(_15b1l,_1b05l,-_2b1l,blockSize);
		ctx.shadowColor = "transparent";
		ctx.fillStyle = colors[elementType-1];
		ctx.fillRect(_05b1l,-_05l,__1b_2l,__1b_2l);
		ctx.fillRect(-_05b,-_05l,__1b_2l,__1b_2l);
		ctx.fillRect(_15b2l,_1b15l,__1b_2l,__1b_2l);
		ctx.fillRect(_05b1l,_1b15l,__1b_2l,__1b_2l);
		ctx.rotate(th);
		ctx.translate(-(coordX),-(coordY));
		break;
	}
	default: {break;}
	}
}

function resizeCanvas() {
	canvas.width = 1;
	canvas.width = document.getElementById("fallingDominos").clientWidth;
	canvas.height = 1;
	canvas.height = document.getElementById("fallingDominos").clientHeight;
	canvasWidth = canvas.width;
	canvasHeight = canvas.height;
	drawBlocks();
}

function drawBlocks() {
	ctx.clearRect(0, 0, canvas.width, canvas.height);
	for (i=arr.length-1; i>=0;i--) {
		ctx.beginPath();
		if ((arr[i].y > canvasHeight+2*blockSize) || (arr[i].x > canvasWidth+2*blockSize)) {
			arr.splice(i,1);
		} else {
			drawTetris(arr[i].x, Math.floor(arr[i].y), arr[i].type, blockSize, borderWidth, sideColor, arr[i].rotation);
		}
	}
}