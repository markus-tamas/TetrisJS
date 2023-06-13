/*const cleveland = [4, 5, 15, 16]; 	  // 0, Z
const orangeRicky = [6, 14, 15, 16];  // 1, L
const smashBoy = [15, 16, 5, 6];      // 2, O
const rhode = [5, 6, 14, 15];         // 3, S
const hero = [14, 15, 16, 17];        // 4, I
const blueRicky = [4, 14, 15, 16];    // 5, J
const teewee = [4, 5, 6, 15];         // 6, T*/

const cleveland = [4, 5, 15, 16]; 	  // 0, Z
const orangeRicky = [6, 14, 15, 16];  // 1, L
const smashBoy = [5, 6, 15, 16];      // 2, O
const rhode = [5, 6, 14, 15];         // 3, S
const hero = [4, 5, 6, 7];        // 4, I
const blueRicky = [4, 14, 15, 16];    // 5, J
const teewee = [5, 14, 15, 16];         // 6, T
// const colors = ["#0000CC","#FFB366","#00DDDE","#FFFA00","#00F600","#EE00EE","#FF1212"]; // Already declared in tetris_anim.js

{ // Variables, defaults, etc.
	var dispmode = "Classic";
	var modes = ["Time Trial","Clear40"];
	var mode;
	var defnormal = 1010;
	var normal;
	var block;
	var nextBlock;
	var num = 0;
	var num2 = 0;
	var savedNum;
	var fast = _Drop;
	var needNewBlock = true;
	var activeColor = "";
	var ghostColor = "";
	var counter;
	var bbb;
	var savedGameScore;
	var activeCells = [];
	var activeCellIds = [];
	var plusTime = 1;
	var maxPlusTime = 1;
	var cellsBelow = [];
	var cellNumsBelow = [];
	var down = false;
	var gameIsOn = false;
	var pauseDate = 0;
	var PauseTime = 0;
	var num3 = 0;
	var interval;
	var musicChangeInterval;
	var notFast = true;
	var nextCells = [];
	var storageCells = [];
	var ghostCells = [];
	var state;
	var cellsToBeChecked = [];
	var lastEnter = Date.now();
	var lastFaster = Date.now();
	var remapping = 0;
	var num4 = 0;
	var illegals = [];
	var hardMode = false;
	var canStore = true;
	var canQuick = true;
	var storedBlock = 7;
	var two = 0;
	var three = 0;
	var four = 0;
	var blockBag = [];
	var downStep = true;
	var graceTime = 500;
	var maxGraceTime = 2000;
	var dist = 0;
	var combo = 0;
	var combostack = 0;
	var comboarr = [];
	var rowarr = [];
	var num5;
	var bb;
	
	var music;
	var musics = [];
	var musicnums = [];
	var successes = [];
	var click;
	var effVol = 0.5;
	var musVol = 0.5;
	
	var leftPressed = false;
	var rightPressed = false;

	var startDate = 0;
	var endDate = 0;
	var lastStart = 0;

	// Current points and other attributes
	var destroyedRows;
	var gameScore;
	var bbbb;
	var destroyedRowsNo;

	var cells = [];

	// Controls
	var rotateKey = 'ArrowUp';
	var leftKey = 'ArrowLeft';
	var rightKey = 'ArrowRight';
	var fasterKey = 'ArrowDown';
	var quickKey = 'Enter';
	var storeKey = 'Space';

	var invisible = false;
}

function changeMode() {
	modes.push(dispmode);
	dispmode = modes.shift();
	document.getElementById("mode").innerHTML="Gamemode: "+dispmode;
}

function initAudio() {
	click = new Audio;
	click.src = "./sound/click.wav";
	
	for (let i=0; i<4; i++) {
		let temp = new Audio;
		temp.src = "./sound/success"+(i+1)+".wav";
		successes.push(temp);
	}
	
	for (let i=0; i<4; i++) {
		music = new Audio();
		music.src = "./sound/Tetris"+(i+1)+".mp3";
		musics.push(music);
	}
}

function expandWindow() {
	if (!gameIsOn) {
		gameIsOn = true;
		if (document.querySelector("#tetris").innerHTML=="") {
			document.getElementById("tetriscontainer").classList.add("expand1");
			setTimeout(function() {
				document.getElementById("tetriscontainer").classList.add("expand2");
				setTimeout(function() {startGame();},1000);
			},1100);
		} else {
			document.getElementById("columnScores").classList.add("hidden");
			document.getElementById("columnScores").addEventListener('transitionend', function temp() {
				document.getElementById("columnScores").style.display = "none";
				document.getElementById("tetrisblock").style.display = "block";
				setTimeout(function() {document.getElementById("tetrisblock").classList.remove("hidden");}, 50);
				document.getElementById("tetrisblock").addEventListener('transitionend', function temp() {
					startGame();
					document.getElementById("tetrisblock").removeEventListener('transitionend', temp);
				}, false);
				document.getElementById("columnScores").removeEventListener('transitionend', temp);
			}, false);
		}
	}
}

function startGame() { // Initialise tables, start game, set up cycles, etc.
	window.addEventListener("beforeunload", stopUnload);
	//document.getElementById('faster').innerHTML = 'Faster!';
	document.getElementById('start').blur();
    
    cellNumber = 1;
    board = "";
	// Number of cells is hard-coded here to 200 (20-by-10)
	for (let i=0; i<20; i++) {
		row = "<tr>";
		cellsToAdd = "";
		for (let r=0; r<10; r++) {
			cell = "<td class='cell' id='cell" + cellNumber + "'></td>";
			cellNumber += 1;
			cellsToAdd += cell;
		}
		row += cellsToAdd + "</tr>";
		board += row;
	}
	
	document.getElementById("playtime").classList.remove("feedback");
	switch (String(dispmode)) {
		case "Classic":
			mode = "solo";
			break;
		case "Time Trial":
			mode = "timed";
			break;
		case "Clear40":
			mode = "limit";
			break;
		default:
			console.log("ERROR. INVALID GAMEMODE.");
			break;
	}
	
	cells = [];
    document.getElementById('tetris').innerHTML = board;
    for (let i=1; i<=200; i++) {
        cellToMakeInactive = "cell" + i;
		cTSet(cellToMakeInactive,"inactive");
		cells.push(document.getElementById(cellToMakeInactive));
    }
	
    cellNumber = 4;
	num5 = 0;
	nextBoard = "";
	nextCells = [];
    for (let i=0; i<2; i++) {
        row = "<tr>";
        cellsToAdd = "";
        for (let r=0; r<4; r++) {
            cell = "<td class='cell' id='nextCell" + cellNumber + "'></td>";
            nextCells.push("nextCell" + cellNumber);
            cellNumber += 1;
            cellsToAdd += cell;
        }
        cellNumber = 14;
        row += cellsToAdd + "</tr>";
        nextBoard += row;
    }
    document.getElementById("nextTable").innerHTML = nextBoard;
	
	cellNumber = 4;
	storageBoard = "";
	storageCells = [];
    for (let i=0; i<2; i++) {
        row = "<tr>";
        cellsToAdd = "";
        for (let r=0; r<4; r++) {
            cell = "<td class='storeCell' id='storageCell" + cellNumber + "'></td>";
            storageCells.push("nextCell" + cellNumber);
            cellNumber += 1;
            cellsToAdd += cell;
        }
        cellNumber = 14;
        row += cellsToAdd + "</tr>";
        storageBoard += row;
    }
    document.getElementById("storageTable").innerHTML = storageBoard;

	document.getElementById("gamemenu").style.display = "block";
    document.getElementById("tetrismenu").style.display = "none";
	document.getElementById("volume").style.display = "none";
	
	displayKeys();
	
	startDate = Math.floor(Date.now()/1000);
	ghostCells = [];
	gameIsOn = true;
	canStore = true;
	canQuick = true;
	leftPressed = false;
	rightPressed = false;
	graceTime = 500;
	savednum = 0;
	two = 0;
	three = 0;
	four = 0;
	combostack = 0;
	comboarr = [];
	rowarr = [];
	maxGraceTime = 2000;
	storedBlock = 7;
    destroyedRows = 0;
	savedGameScore = 0;
	gameScore = 0;
	PauseTime = 0;
    counter = 0;
	combo = 0;
	num = 0;
	num2 = 0;
	num3 = 0;
	num4 = 0;
	
	normal = defnormal;
	setGameSpeed(normal);
	
	document.getElementById("tetriscontainer").classList.remove("expand1");
	document.getElementById("tetriscontainer").classList.remove("expand2");
	document.getElementById("tetriscontainer").style.height="auto";
	document.getElementById("tetriscontainer").style.width="auto";
	document.getElementById("tetris").style.display="block";
	
	randomBlock(true);
	
	newMusic();
	
	displayScore();
	displaySpeed();
	displayTime();
	handleResize();
	validateSession(1,0);
	setTimeout(function() {pause(false); setTimeout(function() {pause(false)}, 15);}, 15);
}

function setGameSpeed(newspeed) {
	clearInterval(interval);
	interval = setInterval(gameCycle, newspeed);
}

function newMusic() {
	if (musicnums.length === 0) {
		musicnums = [0,1,2,3];
		shuffle(musicnums);
	}
	music = musics[musicnums.pop()].cloneNode();
	music.addEventListener('ended', newMusic, false);
	music.volume = musVol;
	music.play();
}

function displaySpeed(){ // Display current game speed to user
	if (!gameIsOn){
		speed.innerHTML = "Speed:&nbsp;Paused!";
	}
	else{
		speed.innerHTML = "Speed:&nbsp;" + normal + "ms";
	}
}

function displayKeys(){ // Display current input keys to user
	document.getElementById('keys').innerHTML = '<div>Go&nbsp;Left:&nbsp;'+leftKey+'</div><div>Go&nbsp;Right:&nbsp;'+rightKey+'</div><div>Rotate&nbsp;CW:&nbsp;'+rotateKey+'</div><div>Rotate&nbsp;CCW:&nbsp;'+rotateccwKey+'</div><div>Accelerate:&nbsp;'+fasterKey+'</div><div>Instant&nbsp;Fall:&nbsp;'+quickKey+'</div><div>Store:&nbsp;'+storeKey+'</div>';
}

function displayScore() { // Update score display
	let dispScore;
	if (gameScore<100000) {
		dispScore = padTo(gameScore,5);
	} else {
		dispScore = gameScore;
	}
	score.innerHTML = "Rows:&nbsp;" + destroyedRows + "<br>Score:&nbsp;" + dispScore;
}

function displayTime() {
	time = Math.floor(Date.now()/1000-startDate-PauseTime/1000);
	if (mode=="timed") {
		time = 180-time;
		if (time<30) document.getElementById("playtime").classList.add("feedback");
	}
	document.getElementById("playtime").innerHTML = "Time:&nbsp;"+Math.floor(time/60)+":"+padTo(time%60,2);
}

function paintNextBlock(nextBlock) { // Displays next block in minitable
    cleanNextBlock()
    switch (nextBlock) {
        case 0:
            nextBlockCells = cleveland;
            nextPaintColor = colors[6];
            break;
        case 1:
            nextBlockCells = orangeRicky;
            nextPaintColor = colors[1];
            break;
        case 2:
            nextBlockCells = smashBoy;
            nextPaintColor = colors[3];
            break;
        case 3:
            nextBlockCells = rhode;
            nextPaintColor = colors[4];
            break;
        case 4:
            nextBlockCells = hero;
            nextPaintColor = colors[2];
            break;
        case 5:
            nextBlockCells = blueRicky;
            nextPaintColor = colors[0];
            break;
        case 6:
            nextBlockCells = teewee;
            nextPaintColor = colors[5];
            break;
    }
    for (let i=0; i<nextBlockCells.length; i++) {
        document.getElementById("nextCell" + nextBlockCells[i]).style.background = nextPaintColor
    }
}

function cleanNextBlock() { // Clears the next block display
    cellID = 4;
    /*console.log("turning next block display black")*/
    for (let i=0; i<2; i++) {
        for (let r=0; r<4; r++) {
            document.getElementById("nextCell" + (cellID + r)).style.backgroundColor = "";
        }
        cellID = 14;
    }
}

function paintStorageBlock(nextBlock) { // Displays next block in minitable
    cleanStorageBlock();
    switch (storedBlock) {
        case 0:
            storageBlockCells = cleveland;
            storagePaintColor = colors[6];
            break;
        case 1:
            storageBlockCells = orangeRicky;
            storagePaintColor = colors[1];
            break;
        case 2:
            storageBlockCells = smashBoy;
            storagePaintColor = colors[3];
            break;
        case 3:
            storageBlockCells = rhode;
            storagePaintColor = colors[4];
            break;
        case 4:
            storageBlockCells = hero;
            storagePaintColor = colors[2];
            break;
        case 5:
            storageBlockCells = blueRicky;
            storagePaintColor = colors[0];
            break;
        case 6:
            storageBlockCells = teewee;
            storagePaintColor = colors[5];
            break;
		default:
			storageBlockCells=[];
			break;
    }
    for (let i=0; i<storageBlockCells.length; i++) {
        document.getElementById("storageCell" + storageBlockCells[i]).style.background = storagePaintColor;
    }
}

function cleanStorageBlock() { // Clears the next block display
    cellID = 4;
    /*console.log("turning next block display black")*/
    for (let i=0; i<2; i++) {
        for (let r=0; r<4; r++) {
            document.getElementById("storageCell" + (cellID + r)).style.backgroundColor = "";
        }
        cellID = 14;
    }
}

function randomBlock(init = false) { // Generates active block and new next block
	if (blockBag.length==0 || init) {
		blockBag = [0,1,2,3,4,5,6];
		shuffle(blockBag);
	}
	if (init) {
		block = blockBag.pop();
		nextBlock = blockBag.pop();
	} else {
		block = nextBlock;
		nextBlock = blockBag.pop();
	}
	num++;
    state = 1; // Rotation
    paintNextBlock(nextBlock);
	canStore = true;
	canQuick = true;
	savedGameScore = gameScore;
	savedNum = num2;
    if (spawnIfEmpty(block) && !(((Date.now()/1000-startDate-PauseTime/1000>180) && (mode=="timed") && (combo==0)) || ((destroyedRows>39) && (mode=="limit") && (combo==0)))) {
        needNewBlock = false;
		notFast = true;
		setGameSpeed(normal);
		plusTime = Math.max(Math.floor(graceTime/normal),1);
		maxPlusTime = Math.ceil(maxGraceTime/normal);
    } else {
        gameOver();
        }
}

function spawnIfEmpty(block) { // Try to put new block on playing field
    switch (block) {
        case 0:
			if (cTCheck("cell4","inactive") && cTCheck("cell5","inactive") && cTCheck("cell5","inactive") && cTCheck("cell16","inactive")) {
                paintBlock(cleveland, colors[6]); // Z
                return true;
            }
            else {
                return false;
            }
            break;
        case 1:
			if (cTCheck("cell6","inactive") && cTCheck("cell14","inactive") && cTCheck("cell5","inactive") && cTCheck("cell16","inactive")) {
                paintBlock(orangeRicky, colors[1]); // |_
                return true;
            }
            else {
                return false;
            }
            break;
        case 2:
			if (cTCheck("cell5","inactive") && cTCheck("cell6","inactive") && cTCheck("cell5","inactive") && cTCheck("cell16","inactive")) {
                paintBlock(smashBoy, colors[3]); // ||
                return true;
            }
            else {
                return false;
            }
            break;
        case 3:
			if (cTCheck("cell5","inactive") && cTCheck("cell6","inactive") && cTCheck("cell4","inactive") && cTCheck("cell15","inactive")) {
                paintBlock(rhode, colors[4]); // S
                return true;
            }
            else {
                return false;
            }
            break;
        case 4:
			if (cTCheck("cell14","inactive") && cTCheck("cell15","inactive") && cTCheck("cell16","inactive") && cTCheck("cell17","inactive")) {
                paintBlock(hero, colors[2]); // --
                return true;
            }
            else {
                return false;
            }
            break;
        case 5:
			if (cTCheck("cell4","inactive") && cTCheck("cell14","inactive") && cTCheck("cell5","inactive") && cTCheck("cell16","inactive")) {
                paintBlock(blueRicky, colors[0]); // _|
                return true;
            }
            else {
                return false;
            }
            break;
        case 6:
			if (cTCheck("cell4","inactive") && cTCheck("cell5","inactive") && cTCheck("cell6","inactive") && cTCheck("cell15","inactive")) {
                paintBlock(teewee, colors[5]); // _|_
                return true;
            }
            else {
                return false;
            }
            break;
        default:
            break;
    }
}

function paintBlock(block, color) { // Paints new block onto playing field and activates cells
    activeColor = color;
	temp = hexToRgb(color);
	ghostColor = "rgba("+temp.r/3+","+temp.g/3+","+temp.b/3+",1)";
    /*console.log("Painting these cells " + color + ": " + block)*/
    for (let i=0; i<block.length; i++) {
        cellToPaint = "cell" + block[i];
        document.getElementById(cellToPaint).style.background = color;
		cTSet(cellToPaint,"active");
    }
    activeCells = block;
    for (let i=0; i<activeCells.length; i++) {
        activeCellIds.push("cell" + activeCells[i]);
    }
	drawGhost(activeCells);
}

function move() { // Move blocks down
    /*console.log("These cells are active: " + activeCells)*/
    if (dist = emptyBelow()) {
        activeCells = [];
        plusTime = Math.max(Math.floor(graceTime/normal),1);
		maxPlusTime = Math.ceil(maxGraceTime/normal);
        for (let i=0; i<activeCellIds.length; i++) {
            document.getElementById(activeCellIds[i]).style.backgroundColor = "";
			cTSet(activeCellIds[i],"inactive");
        }
		drawGhost(cellNumsBelow, dist-1);
        for (let i=0; i<cellsBelow.length; i++) {
            document.getElementById(cellsBelow[i]).style.background = activeColor;
			cTSet(cellsBelow[i],"active");
        }
		num2++;
        activeCellIds = cellsBelow;
        activeCells = cellNumsBelow;
		if (notFast) { // Points per step
			gameScore += 1;
		} else {
			gameScore += 2;
		}
    } else {
        if (plusTime > 0 && maxPlusTime > 0) {
            /*console.log("one more step")*/
            plusTime--;
			maxPlusTime--;
        }
        else {
            for (let i=0; i<activeCellIds.length; i++) {
                /*console.log("changing these cells to inactive: " + activeCellIds)*/
				cTSet(activeCellIds[i],"inactiveColor");
				document.getElementById(activeCellIds[i]).style.backgroundColor = activeColor;
            }
			temp = click.cloneNode();
			temp.volume = effVol*0.75;
			temp.play();
			canStore = false;
			canQuick = false;
            needNewBlock = true;
            activeCellIds = [];
            activeCells = [];
        }
    }
}

function emptyBelow() { // Checks if space below active blocks is empty
	var i = 0;
	var stop = false;
	cellsBelow = [];
	cellNumsBelow = [];
	while(!stop && activeCells.length) {
		i++;
		for (let j=0; j<activeCells.length; j++) {
			cellToCheckNum = activeCells[j] + 10*i;
			cellToCheck = "cell" + cellToCheckNum;
			/*console.log("Checking cell " + cellToCheck)*/
			if (cellToCheckNum > 200 || cTCheck(cellToCheck,"inactiveColor")) {
				/*console.log("cell below is occupied")*/
				stop = true;
				break;
			}
			if (i==1) {
				cellsBelow.push(cellToCheck);
				cellNumsBelow.push(cellToCheckNum);
			}
		}
	}
	if (num>5) if (block == bb && bb == bbb && bbbb == bb) combostack++;
	if (i>1) {
		makeActiveCellIDs();
	}
    /*console.log("Nothing below")*/
    return i-1;
}

function moveLeft() { // Move active cells left
    /*console.log("movin Left")*/
    if (emptyLeft()) {
		plusTime = Math.ceil(graceTime/normal);
        oldCells = activeCells;
        oldCellIDs = activeCellIds;
        /*activeCells = [];
        activeCellIds = [];
        for (l = 0; l < oldCells.length; l++) {
            //console.log("moving cell left: " + oldCellIDs[l])
			cTSet(oldCellIDs[l],"inactive");
            document.getElementById(oldCellIDs[l]).style.backgroundColor = "";
			cTSet("cell" + (oldCells[l] - 1),"active");
            document.getElementById("cell" + (oldCells[l] - 1)).style.background = activeColor;
            activeCells.push(oldCells[l] - 1);
            activeCellIds.push("cell" + (oldCells[l] - 1));
        }*/
		activeCells = oldCells.map(n => n-1);
		activeCellIds = activeCells.map(n => "cell"+n);
		changeClass(oldCellIDs, "", "inactive");
		changeClass(activeCellIds, activeColor, "active");
		drawGhost(activeCells);
    }
    else {
        /*console.log("can't move left")*/
    }
}

function emptyLeft() { // Checks for empty cells to the left
	if (activeCells.length) {
		for (let l=0; l<activeCells.length; l++) {
			if (activeCells[l] % 10 == 1 || cTCheck("cell" + (activeCells[l] - 1),"inactiveColor")) {
				return false;
			}
		}
		return true;
	}
	return false;
}

function moveRight() { // Move active cells right
    /*console.log("movin Right")*/
    if (emptyRight()) {
		plusTime = Math.ceil(graceTime/normal);
        oldCells = activeCells;
        oldCellIDs = activeCellIds;
        /*activeCells = [];
        activeCellIds = [];
        cellNumToThrowBack = -1;
        for (let l=oldCells.length-1; l>=0; l--) {
            //console.log("moving cell right: " + oldCellIDs[l])
			cTSet(oldCellIDs[l],"inactive");
            document.getElementById(oldCellIDs[l]).style.background = "";
			cTSet("cell" + (oldCells[l] + 1),"active");
            document.getElementById("cell" + (oldCells[l] + 1)).style.background = activeColor;
            cellNumToThrowBack += 1;
            activeCells.push(oldCells[cellNumToThrowBack] + 1);
            activeCellIds.push("cell" + (oldCells[cellNumToThrowBack] + 1));
        }*/
		activeCells = oldCells.map(n => n+1);
		activeCellIds = activeCells.map(n => "cell"+n);
		changeClass(oldCellIDs, "", "inactive");
		changeClass(activeCellIds, activeColor, "active");
		drawGhost(activeCells);
    } else {
        /*console.log("can't move left")*/
    }
}

function emptyRight() { // Checks for empty cells to the right
	if (activeCells.length) {
		for (let l=0; l<activeCells.length; l++) {
			if (activeCells[l] % 10 == 0 || cTCheck("cell" + (activeCells[l] + 1),"inactiveColor")) {
				return false;
			}
		}
		return true;
	}
	return false;
}

function gameCycle() { // Execute periodic game functions
	displayTime();
    displayScore();
    cellNumsBelow = [];
    cellsBelow = [];
    if (needNewBlock) {
		if (normal > 600) {
            normal -= 20;
        }
        if (normal > 400) {
            normal -= 10;
        } else if (normal <= 400 && normal > 300) {
            normal -= 3;
        } else if (normal <=300 && normal > 150) {
			normal -= 2;
		} else if (normal <=150 && normal > 100) {
			normal -= 1;
		} else if (normal <=100 && normal > 30) {
			maxGraceTime -= 4;
			downStep = !downStep;
			if (downStep) {
				graceTime -= 1;
				normal -= 1;
			}
		} else if (graceTime > 150 || maxGraceTime > 500) {
			downStep = !downStep;
			if (downStep) {
				graceTime -= 1;
				maxGraceTime -= 3;
			}
		}
		normal = Math.max(normal,30);
		graceTime = Math.max(graceTime,150);
		maxGraceTime = Math.max(maxGraceTime,500);
        displaySpeed();
		if (notFast) {
			setGameSpeed(normal);
		} else {
			setGameSpeed(fast);
		}
        checkRows();
        randomBlock();
        counter = 0;
    } else {
        counter += 1;
        move();
    }
}

function checkRows() { // Check for and clear full rows, move blocks down
    /*console.log("checking rows")*/
	bbbb = bbb;
	destroyedRowsNo = 0;
    for (let i=0; i<20; i++) {
        row = [];
        for (let r=1; r<=10; r++) {
            cellID = "cell" + (i * 10 + r);
			if (cTCheck(cellID,"inactiveColor")) {
                row.push(cellID);
            }
        }
        if (row.length == 10) {
            destroyedRows += 1;
			if ((destroyedRows % 50) === 0) validateSession(1,0);
			destroyedRowsNo += 1;
            /*console.log("found a colored row")*/
            for (let o=i*10; o>0; o--) {
                /*console.log("moving this cell down: cell" + o)*/
                targetCell = o + 10
                colorToMove = document.getElementById("cell" + o).style.backgroundColor;
				classToMove = cTGet("cell"+o);
                document.getElementById("cell" + o).style.backgroundColor = "";
				cTSet("cell"+o,"inactive");
                document.getElementById("cell" + targetCell).style.backgroundColor = colorToMove;
				cTSet("cell"+targetCell,classToMove);
            }
        }
    }
	bbb = bb;
	let rowScore = 0;
	if (destroyedRowsNo==1) {
		rowScore = 150;
	} else if (destroyedRowsNo == 2) {
		rowScore = 350;
		two++;
	} else if (destroyedRowsNo == 3) {
		rowScore = 650;
		three++;
	} else if (destroyedRowsNo == 4) {
		rowScore = 1000;
		four++;
	}
	if (destroyedRowsNo > 0) {
		let temp = successes[destroyedRowsNo-1].cloneNode();
		temp.volume = effVol;
		temp.play();
		combo++;
		combostack++;
	} else {
		num3 += combo;
		if (combo) num4++;
		combo = 0;
	}
	comboarr.push(combostack);
	rowarr.push(destroyedRows);
	let rowScore2 = Math.floor(rowScore*Math.pow(1.5,combo-1));
	gameScore += rowScore2;
	num2 += Math.ceil((rowScore2-rowScore)/2);
	num5 += Math.ceil((rowScore2-rowScore)/2);
	bb = block;
}

document.addEventListener('keyup', function (event) { // Fire events on keypresses
    if (event.defaultPrevented) {
        return;
    }

    var key = event.key || event.keyCode;
	if (key===" ") key = "Space";
	
    if (gameIsOn) {
		if (key === leftKey && leftPressed) leftPressed=false;
		if (key === rightKey && rightPressed) rightPressed=false;
        if (key === quickKey) quickFall();
		if (key === storeKey) storeActiveBlock();
		if (key === fasterKey) {
			notFast = true;
			setGameSpeed(normal);
		}
    }
})

document.addEventListener('keydown', function (event) { // Fire events on keypresses
    if (event.defaultPrevented) {
        return;
    }

    var key = event.key || event.keyCode;
	if (key===" ") key = "Space";
	
	if (remapping != 0){
		remap(remapping, key)
	}
	
	if (gameIsOn){
		if (key === leftKey && !leftPressed) {
			leftPressed = true;
			leftLoop(true);
			
		} else if (key === rightKey) {
			rightPressed = true;
			rightLoop(true);
		} else if (key === rotateKey) {
			rotate();
		} else if (key === rotateccwKey) {
			rotate(((state+1)%4)+1);
		} else if (notFast && (key === fasterKey) && (fast<normal)) {
            notFast = false;
			setGameSpeed(fast);
        }
	}
})

function quickFall() {
	if (lastEnter > Date.now() - 200 || lastFaster > Date.now() - 100 || !canQuick){
		return;
	}
	lastEnter = Date.now();
	let space = emptyBelow();
	gameScore += 2*space;
	num2 += space;
	num5 += space;
	changeClass(activeCellIds, "", "inactive");
	changeClass(ghostCells, activeColor, "active");
	activeCells=[];
	for (let i=0; i<ghostCells.length; i++) activeCells.push(parseInt(/\d+/.exec(ghostCells[i])));
	makeActiveCellIDs();
	setGameSpeed(2);
}

function storeActiveBlock() {
	if (canStore) {
		canStore = false;
		gameScore = savedGameScore;
		num2 = savedNum;
		for (let i=0; i<activeCellIds.length; i++) {
			cTSet(activeCellIds[i],"inactive");
			document.getElementById(activeCellIds[i]).style.backgroundColor = "";
		}
		activeCellIds = [];
		activeCells = [];
		if (storedBlock > 6) {
			storedBlock = block;
			needNewBlock = true;
			setGameSpeed(5);
		} else {
			if (spawnIfEmpty(storedBlock)) {
				notFast = true;
				setGameSpeed(normal);
				let temp = storedBlock;
				storedBlock = block;
				block = temp;
				counter = 0;
				state = 1;
			} else {
				gameOver();
			}
		}
		paintStorageBlock();
		drawGhost(activeCells);
	}
}

function mobileQuick() {
	if (gameIsOn) quickFall();
}

function mobileStore() {
	if (gameIsOn) storeActiveBlock();
}

function mobileMoveRight() {
	if (gameIsOn) moveRight();
}

function mobileMoveLeft() {
	if (gameIsOn) moveLeft();
}

function mobileRotate() {
	if (gameIsOn) rotate();
}

function mobileFall() {
	if (notFast && gameIsOn && (fast<normal)) {
		notFast = false;
		setGameSpeed(fast);
		setTimeout(function() {
			notFast = true;
			setGameSpeed(normal);
		},fast*4);
	}
}

function rightLoop(first = false) {
	if (first && rightPressed) {
		moveRight();
		setTimeout(function() {rightLoop();},_DAS);
	} else if (rightPressed) {
		moveRight();
		setTimeout(function() {rightLoop();},_ARR);
	}
}

function leftLoop(first = false) {
	if (first && leftPressed) {
		moveLeft();
		setTimeout(function() {leftLoop();},_DAS);
	} else if (leftPressed) {
		moveLeft();
		setTimeout(function() {leftLoop();},_ARR);
	}
}

function checkAndRotate(color) { // Check for space and rotate if available
        if (isInactive(checkIds)) {
			changeClass(checkIds, color, "active");
            changeClass(blacken, "", "inactive");
            makeActiveCellIDs();
            if (state === 4) {
                state = 1;
            } else {
                state++;
            }
			plusTime = Math.ceil(graceTime/normal);
			drawGhost(activeCells);
        } else {
            activeCells = temp;
        }
}

function canRotate() { // Check if rotation is possible
    if (cellsToBeChecked[0] <= 0) {
          return false;
    }
    for (let i=0; i<temp.length; i++) {
        if (temp[i] % 10 === 0 && activeCells[i] % 10 > 7) {
			;
        } else if (temp[i] % 10 < 4 && activeCells[i] % 10 > 7) {
            return false;
        } else if (temp[i] % 10 < 4 && activeCells[i] % 10 === 0) {
            return false;
        }
        if (temp[i] % 10 > 7 && activeCells[i] % 10 < 4) {
            if (activeCells[i] % 10 == 0) {
				;
            } else {
                return false;
            }
        }
    }
    //console.log("Can rotate")
     return true;
}

function rotate(currentstate = state) { // Determine cells to rotate to, check if rotation is available, and execute if possible
	let newCells = [];
	
	switch (block) {
		case 0:
			switch (currentstate) {
				case 1:
					newCells = [activeCells[2]-9, activeCells[2]+1, activeCells[2], activeCells[2]+10];
					break;
				case 2:
					newCells = [activeCells[2]+11, activeCells[2]+10, activeCells[2], activeCells[2]-1];
					break;
				case 3:
					newCells = [activeCells[2]+9, activeCells[2]-1, activeCells[2], activeCells[2]-10];
					break;
				case 4:
					newCells = [activeCells[2]-11, activeCells[2]-10, activeCells[2], activeCells[2]+1];
					break;
				default:
					console.log("Invalid state!");
					break;
			}
			break;
		case 1:
			switch (currentstate) {
				case 1:
					newCells = [activeCells[2]+11, activeCells[2]+10, activeCells[2], activeCells[2]-10];
					break;
				case 2:
					newCells = [activeCells[2]+9, activeCells[2]-1, activeCells[2], activeCells[2]+1];
					break;
				case 3:
					newCells = [activeCells[2]-11, activeCells[2]-10, activeCells[2], activeCells[2]+10];
					break;
				case 4:
					newCells = [activeCells[2]-9, activeCells[2]+1, activeCells[2], activeCells[2]-1];
					break;
				default:
					console.log("Invalid state!");
					break;
			}
			break;
		case 2:
			// We don't do that here.
			break;
		case 3:
			switch (currentstate) {
				case 1:
					newCells = [activeCells[3]+1, activeCells[3]+11, activeCells[3]-10, activeCells[3]];
					break;
				case 2:
					newCells = [activeCells[3]+10, activeCells[3]+9, activeCells[3]+1, activeCells[3]];
					break;
				case 3:
					newCells = [activeCells[3]-1, activeCells[3]-11, activeCells[3]+10, activeCells[3]];
					break;
				case 4:
					newCells = [activeCells[3]-10, activeCells[3]-9, activeCells[3]-1, activeCells[3]];
					break;
				default:
					console.log("Invalid state!");
					break;
			}
			break;
		case 4:
			switch (currentstate) {
				case 1:
					newCells = [activeCells[2]-10, activeCells[2], activeCells[2]+10, activeCells[2]+20];
					break;
				case 2:
					newCells = [activeCells[2]+1, activeCells[2], activeCells[2]-1, activeCells[2]-2];
					break;
				case 3:
					newCells = [activeCells[2]+10, activeCells[2], activeCells[2]-10, activeCells[2]-20];
					break;
				case 4:
					newCells = [activeCells[2]-1, activeCells[2], activeCells[2]+1, activeCells[2]+2];
					break;
				default:
					console.log("Invalid state!");
					break;
			}
			break;
		case 5:
			switch (currentstate) {
				case 1:
					newCells = [activeCells[2]-9, activeCells[2]-10, activeCells[2], activeCells[2]+10];
					break;
				case 2:
					newCells = [activeCells[2]+11, activeCells[2]+1, activeCells[2], activeCells[2]-1];
					break;
				case 3:
					newCells = [activeCells[2]+9, activeCells[2]+10, activeCells[2], activeCells[2]-10];
					break;
				case 4:
					newCells = [activeCells[2]-11, activeCells[2]-1, activeCells[2], activeCells[2]+1];
					break;
				default:
					console.log("Invalid state!");
					break;
			}
			break;
		case 6:
			switch (currentstate) {
				case 1:
					newCells = [activeCells[2]+1, activeCells[2]-10, activeCells[2], activeCells[2]+10];
					break;
				case 2:
					newCells = [activeCells[2]+10, activeCells[2]+1, activeCells[2], activeCells[2]-1];
					break;
				case 3:
					newCells = [activeCells[2]-1, activeCells[2]+10, activeCells[2], activeCells[2]-10];
					break;
				case 4:
					newCells = [activeCells[2]-10, activeCells[2]-1, activeCells[2], activeCells[2]+1];
					break;
				default:
					console.log("Invalid state!");
					break;
			}
			break;
		default:
			console.log("Invalid block tried to rotate!");
			break;
	}
	
	const x = [0,-1, 1, 0,-1, 1, 0,-2, 2,-1, 1, 0,-1, 1];
	const y = [0, 0, 0, 1, 1, 1,-1, 0, 0,-1,-1, 2, 2, 2];
	
	if (newCells.length) for(let i=0; i<x.length; i++) {
		var checkCells = newCells.map(n => n+x[i]);
		checkCells = checkCells.map(n => n+10*y[i]);
		
		var min1 = 9; var max1 = 0; var min2 = 9; var max2 = 0; var min3 = 200; var max3 = 1;
		for (let j=0;j<4;j++) {
			if ((activeCells[j]-1)%10 < min1) min1 = (activeCells[j]-1)%10;
			if ((activeCells[j]-1)%10 > max1) max1 = (activeCells[j]-1)%10;
			if ((checkCells[j]-1)%10 < min2) min2 = (checkCells[j]-1)%10;
			if ((checkCells[j]-1)%10 > max2) max2 = (checkCells[j]-1)%10;
			if (checkCells[j] < min3) min3 = checkCells[j];
			if (checkCells[j] > max3) max3 = checkCells[j];
		}
		if (!(((min1 < 2) && (max2 > 7)) || ((max1 > 7) && (min2 < 2)) || ((min2 < 2) && (max2 > 7)) || (min3 < 1) || (max3 > 200)) && isValid(checkCells.map(n => "cell"+n))) {
			gameScore += 2*y[i];
			changeClass(activeCellIds, "", "inactive");
			changeClass(checkCells.map(n => "cell"+n), activeColor, "active");
			activeCells = checkCells;
			activeCellIds = activeCells.map(n => "cell"+n);
			state = (state===currentstate) ? ((state%4)+1) : (((state+2)%4)+1);
			plusTime = Math.ceil(graceTime/normal);
			drawGhost(activeCells);
			return;
		}
	}
	return;
}

function makeActiveCellIDs() { // Make array of cell IDs from numbers
    activeCellIds = [];
    for (let i=0; i<activeCells.length; i++) {
        activeCellIds.push("cell" + activeCells[i]);
    }
}

function isInactive(array) { // Check if received cells are inactive
    for (let i=0; i<array.length; i++) {
        if (!cTCheck(array[i],"inactive")) {
            return false;
        }
    }
    return true;
}

function isValid(array) { // Check if received cells are valid for rotation
    for (let i=0; i<array.length; i++) {
        if (!cTCheck(array[i],"inactive") && !cTCheck(array[i],"active")) {
            return false;
        }
    }
    return true;
}

function changeClass(array, color, newClass) { // Change cell class
    for (let i=0; i<array.length; i++) {
        document.getElementById(array[i]).style.backgroundColor = color;
		cTSet(array[i],newClass);
    }
}

function pause(show = true){ // Pause and unpause game
	document.getElementById('pause').blur();
	gameIsOn = !gameIsOn;
	if (!gameIsOn){
		clearInterval(interval);
		music.pause();
		pauseDate = Date.now();
		if (show) document.getElementById("volume").style.display = "";
		handleResize();
	} else {
		PauseTime += Date.now() - pauseDate;
		notFast = true;
		setGameSpeed(normal);
		music.volume = musVol;
		musics[2].pause(); clearInterval(musicChangeInterval);
		music.play();
		if (show) document.getElementById("volume").style.display = "none";
		handleResize();
	}
	displaySpeed();
}

function error() { // Let this never happen
    console.log("An \"unexpected\" error occured /shrug")
}

function remap(boop = 0, key = ''){ // Remap input buttons
	document.getElementById("remap").blur();
	if (illegals.includes(key)){
		alert('Please use a different key.');
		return;
	}
	illegals.push(key);
	switch(boop){
		case 0:
			illegals = [];
			info('Press the key to go left with.');
			break;
		case 1:
			leftKey = key;
			info('Press the key to go right with.');
			break;
		case 2:
			rightKey = key;
			info('Press the key to rotate with.');
			break;
		case 3:
			rotateKey = key;
			info('Press the key to rotate<br>counterclockwise with.');
			break;
		case 4:
			rotateccwKey = key;
			info('Press the key to accelerate with.');
			break;
		case 5:
			fasterKey = key;
			info('Press the key to instantly place with.');
			break;
		case 6:
			quickKey = key;
			info('Press the key to store with.');
			break;
		case 7:
			storeKey = key;
			displayKeys();
			remapping = 0;
			var xmlhttp = new XMLHttpRequest();
			xmlhttp.open("POST","./_POST/do_gameKeys.php", true);
			xmlhttp.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');
			xmlhttp.onreadystatechange = function() {
				if(this.readyState == 4 && this.status == 200) {
					response = this.responseText;
					if (response == "Success!") {
						info("Keys saved!");
					} else {
						info("There was an error.<br>Your keys were not saved.");
					}
					setTimeout(function() {info("");}, 3000);
				}
			}
			xmlhttp.send("type=set&leftKey="+leftKey+"&rightKey="+rightKey+"&rotateKey="+rotateKey+"&rotateccwKey="+rotateccwKey+"&fasterKey="+fasterKey+"&quickKey="+quickKey+"&storeKey="+storeKey);
			return;
			break;
	}
	
	remapping++;
	return
}

function info(txt,error = false){ // Relay info to user
	if (error) {
		document.getElementById('info').classList.add("feedback");
	} else {
		document.getElementById('info').classList.remove("feedback");
	}
	document.getElementById('info').innerHTML = txt;
}

function goFaster(){ // Increase game speed!
	if (normal>100) {
		normal -= 100;
		if (normal<30) normal = 30;
	}
	msg = 'get me a switch';
	switch(Math.floor(normal / 100)){
		case 9:
			msg = 'Faster!';
			break;
		case 8:
			msg = 'MORE!';
			break;
		case 7:
			msg = 'FAASTEEER!!';
			break;
		case 6:
			msg = 'AGAIN.';
			break;
		case 5:
			msg = 'SENIC';
			break;
		case 4:
			msg = 'nEEED MOAR SPEED!';
			break;
		case 3:
			msg = 'THIS IS NOT EVEN MY FINAL FORM';
			break;
		case 2:
			msg = 'BINGBONG LEVEL';
			break;
		case 1:
			msg = '<i>I AM SPEED</i>';
			break;
	}

	setGameSpeed(normal);
	displaySpeed();
	document.getElementById('faster').innerHTML = msg;
}

function gameOver() { // Handle gameover
	if (lastStart != startDate) {
		lastStart = startDate;
		window.removeEventListener("beforeunload", stopUnload);
		music.removeEventListener("ended", newMusic);
		music.pause();
		music.src = "./sound/GameOver.mp3";
		music.volume = 0.3*effVol;
		music.play();
		clearInterval(interval);
		document.getElementById("scoreboop").innerHTML = "GAME OVER<br>Rows:&nbsp;" + destroyedRows + "<br>Score:&nbsp;" + gameScore;
		gameIsOn = false;
		endDate = Date.now();
		sendData();
		document.getElementById("gamemenu").style.display = "";
		
		document.getElementById("scoreboop").style.display = "block";
		document.getElementById("tetrismenu").style.display = "block";
		document.getElementById("volume").style.display = "";
		
		for(let i=19;i>=0;i--) {
			let arr = cells.slice(10*i,10*i+10);
			setTimeout(function() {
				for (let i=0;i<arr.length;i++) {
					arr[i].style.backgroundColor = "";
					arr[i].classList.remove("inactiveColor");
					arr[i].classList.remove("inactive");
				}
			}, 75*(20-i));
		}
		setTimeout(function() {
			handleRefreshScores();
			document.getElementById("tetrisblock").classList.add("hidden");
			document.getElementById("tetrisblock").addEventListener('transitionend', function temp() {
				document.getElementById("tetrisblock").removeEventListener('transitionend', temp);
				document.getElementById("tetrisblock").style.display = "none";
				document.getElementById("columnScores").style.display = "block";
				setTimeout(function() {document.getElementById("columnScores").classList.remove("hidden");}, 50);
			}, false);
		}, 1500);
		
		handleResize();
	}
}

function sendData() { // Send data to database
	var xmlhttp = new XMLHttpRequest();
	xmlhttp.open("POST","./_POST/do_addGame.php", true);
	xmlhttp.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');
	xmlhttp.onreadystatechange = function() {
		if(this.readyState == 4 && this.status == 200) {
			response = JSON.parse(this.responseText);
			if (response == "Done!") {
				info("Game saved!");
				setTimeout(function() {info("");}, 3000);
			} else {
				info("There was an error.<br>Your game was not saved.",true);
				setTimeout(function() {info("");}, 30000);
			}
		}
	}
	xmlhttp.send("gameScore="+(17*gameScore-7500)+"&destroyedRows="+(destroyedRows*7+243)+"&startDate="+(startDate+15)+"&endDate="+(endDate+10000)+"&gametype="+mode+"&num="+((num+42)*13)+"&num2="+(num2*3-59)+"&num3="+(num3-2)+"&num4="+(num4*7-37)+"&num5="+((num5-375)*31)+"&PauseTime="+PauseTime+"&grace="+graceTime+"&normal="+normal+"&two="+two+"&three="+three+"&four="+four+"&combostack="+combostack+"&comboarr="+JSON.stringify(rowarr)+"&rowarr="+JSON.stringify(comboarr));
	return false;
}

function stopUnload(e) { // Warn leaving user if game is in progress
	e.preventDefault();
}

function cTSet(cell, type) { // Manage cell type classes
	c = document.getElementById(cell);
	c.classList.remove("active");
	c.classList.remove("inactive");
	c.classList.remove("inactiveColor");
	c.classList.add(type);
}

function cTCheck(cell, type) { // Check if cell is of type
	return document.getElementById(cell).classList.contains(type);
}

function cTGet(cell) { // Return cell type
	c = document.getElementById(cell);
	return c.classList[0] === "cell" ? c.classList[1] : c.classList[0];
}

function UIModify(sumWidth, winWidth, divs, ctx) {
	if (sumWidth+bonusWidth>winWidth) {
		displayScore();
		document.getElementById("controlblock").style.display = "";
		bonusWidth = document.getElementById("controlblock").scrollWidth;
		document.getElementById("gameinfo").classList.remove("vert");
		document.getElementById("menutitleblock").style.display = "none";
		document.getElementById("remap").style.display = "none";
		document.getElementById("controlblock").style.display = "none";
		document.getElementById("mobilekeys").style.display = "block";
		document.getElementById("tetrisblock").style.marginTop = "auto";
		n = divs.length-1;
		if (divs[n].scrollHeight+500>ctx.clientHeight) {
			size = ((ctx.clientHeight-divs[n].scrollHeight-45)/20);
			if (size>20) size=20;
			size2 = 3/4*size+"px";
			size = size+"px";
		} else {
			size = "20px";
			size2 = "15px";
		}
		r = document.styleSheets[2].rules[0].style;
		r.minHeight = size; r.minWidth = size; r.height = size; r.width = size;
		r = document.styleSheets[2].rules[1].style;
		r.minHeight = size2; r.minWidth = size2; r.height = size2; r.width = size2;
	} else {
		bonusWidth = 0;
		displayScore();
		document.getElementById("gameinfo").classList.add("vert");
		document.getElementById("menutitleblock").style.display = "";
		document.getElementById("remap").style.display = "";
		document.getElementById("controlblock").style.display = "";
		document.getElementById("mobilekeys").style.display = "";
		document.getElementById("tetrisblock").style.marginTop = "";
	}
}

function shuffle(array) {
  let currentIndex = array.length,  randomIndex;

  // While there remain elements to shuffle...
  while (currentIndex != 0) {

    // Pick a remaining element...
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex--;

    // And swap it with the current element.
    [array[currentIndex], array[randomIndex]] = [
      array[randomIndex], array[currentIndex]];
  }

  return array;
}

function hexToRgb(hex) {
  var result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
  return result ? {
    r: parseInt(result[1], 16),
    g: parseInt(result[2], 16),
    b: parseInt(result[3], 16)
  } : null;
}

function drawGhost(actives, distance = emptyBelow()) {
	for (let i=0; i<ghostCells.length; i++) {
		if (document.getElementById(ghostCells[i]).classList.contains("inactive")) {
			document.getElementById(ghostCells[i]).style.backgroundColor = "";
		}
	}
	ghostCells = [];
	for (let i=0; i<actives.length; i++) {
		ghostCells.push("cell" + (actives[i] + 10*distance));
		if (!cTCheck(ghostCells[i],"active")) document.getElementById(ghostCells[i]).style.background = ghostColor;
	}
}

function loadButtons() {
	var xmlhttp = new XMLHttpRequest();
	xmlhttp.open("POST","./_POST/do_gameKeys.php", true);
	xmlhttp.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');
	xmlhttp.onreadystatechange = function() {
		if(this.readyState == 4 && this.status == 200) {
			r = JSON.parse(this.responseText);
			if (r == "ERROR!!!") {
				info("Controls failed<br>to load!");
				setTimeout(function() {info("");}, 3000);
			} else {
			leftKey = r[0].leftKey; rightKey = r[0].rightKey; rotateKey = r[0].rotateKey;
			fasterKey = r[0].fasterKey; quickKey = r[0].quickKey; storeKey = r[0].storeKey;
			rotateccwKey = r[0].rotateccwKey;
			displayKeys();
			}
		}
	}
	xmlhttp.send("type=get");
	return false;
}

function changeVol(eff) {
	musVol = document.getElementById("vol1").value / 100;
	effVol = document.getElementById("vol2").value / 100;
	if (eff) {
		click.volume = effVol*0.75;
		click.play();
	} else {
		musics[2].volume = musVol;
		musics[2].play();
		//setTimeout(function() {musics[1].pause();}, 2000);
		clearInterval(musicChangeInterval);
		musicChangeInterval = setInterval(function() {clearInterval(musicChangeInterval); musics[2].pause(); }, 2000);
	}
}
