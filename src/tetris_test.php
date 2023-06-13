<html>
<head>
<?php echo file_get_contents("./_HTML/head.html"); ?>
<script src="./_JS/logout.js"></script>
<script src="./_JS/tetris__.js"></script>
<link rel="stylesheet" href="./_CSS/tetris.css">
<script>window.addEventListener("load",function(){validateSession(1,0)},false);</script>
</head>

<body>
<?php require_once "./_POST/_session.php"; if (!$_SESSION['valid']) { header('Location:./'); } ?>
<div id="root" class="grid-container">
	<div id="header" class="foreground">
		<?php require_once "./_POST/_session.php"; echo $_SESSION['valid'] ? file_get_contents("./_HTML/header_login.html") : file_get_contents("./_HTML/header.html"); ?>
	</div>
	<div id="main">
		<div class="flex-container">
			<div id="contentbox">
				<div class="flex-container">
					<div id="fallingDominos">
						<canvas id="tetris_animate"></canvas>
					</div>
					<div id="static"></div>
				</div>
				<div class="flex-container foreground">
					<div id="controlblock">
						<div class="block title">
							<div id="controlstitle" class="center"><h1>Controls</h1></div>
						</div>
						<div id="keys" class="block">
							<div>Go Left: ArrowLeft</div>
							<div>Go Right: ArrowRight</div>
							<div>Rotate CW: ArrowUp</div>
							<div>Rotate CCW: Control</div>
							<div>Accelerate: ArrowDown</div>
							<div>Instant Fall: Enter</div>
							<div>Store: Space</div>
						</div>
					</div>
					<div id="columnScores" class="hidden">
						<div class="block title">
							<div class="center"><h1>Highscores</h1></div>
						</div>
						<div class="block">
							<table class="stattable" id="scores">
								<tr><td>¬.¬</td><td>¬.¬</td></tr>
							</table>
							<div class="center" id="refreshScores">
								<button type="button" id="scoreAlltime">All time</button>
								<button type="button" id="scoreMonthly">Monthly</button>
								<button type="button" id="scoreWeekly">Weekly</button>
								<button type="button" id="scoreDaily">Daily</button>
							</div>
						</div>
					</div>
					<div id="tetrisblock">
						<div id="tetriscontainer" onclick="mobileQuick()" class="block">
							<table id="tetris"></table>
						</div>
					</div>
					<div>
						<div class="block" id="mobilekeys">
							<table>
								<tr>
									<td><button id="btnLeft" onclick="mobileMoveLeft()">&lt;</button></td>
									<td><button id="btnRot" onclick="mobileRotate()">Rot</button></td>
									<td><button id="btnStore" onclick="mobileStore()">Store</button></td>
									<td><button id="btnFall" onclick="mobileFall()">Fall</button></td>
									<td><button id="btnRight" onclick="mobileMoveRight()">&gt;</button></td>
								</tr>
							</table>
						</div>
						<div id="menutitleblock" class="block title">
							<div id="menutitle" class="center"><h1>Menu</h1></div>
						</div>
						<div id="infocontainer" class="block">
							<div id="tetrismenu">
								<div id ="buttons" class="center">
									<button id="start" onclick="expandWindow()" >Start Game</button>
									<button id="remap" onclick="remap()">Remap Keys</button>
									<br><button id="mode" onclick="changeMode()">Gamemode: Classic</button>
								</div>
								<div id="info" class="center"></div>
								<div id="scoreboop" class="center"></div>
							</div>
							<div id="gamemenu">
								<div id="gameinfo">
									<div>
										<table>
											<tr><td>Next:</td><td><table id="nextTable"></table></td></tr>
											<tr><td>Stored:</td><td><table id="storageTable"></table></td></tr>
										</table>
									</div>
									<div>
										<div id="score">Rows:&nbsp;0&nbsp;&nbsp;Score:&nbsp;0</div>
										<div id="playtime">Time:&nbsp;0:00</div>
										<div id="speed">Speed:&nbsp;1010ms</div>
									</div>
								</div>
								<div class="center">
									<button id="pause" onclick="pause()">Pause</button>
								</div>
							</div>
							<div id="volume">
								<table>
									<tr><td><label for="vol1">Music Volume</label><br></td></tr>
									<tr><td><input type="range" name="vol1" id="vol1" min="0" max ="100" value="50" onchange="changeVol(false)"></td></tr>
									<tr><td><label for="vol">Effect Volume</label><br></td></tr>
									<tr><td><input type="range" name="vol2" id="vol2" min="0" max ="100" value="50" onchange="changeVol(true)"></td></tr>
								</table>
							</div>
						</div>
					</div>
				</div>
				<div id="notifs" class="foreground"></div>
			</div>
			<div id="menu" class="foreground">
				<div class="flex-container">
					<?php echo file_get_contents("./_HTML/menu.html"); ?>
				</div>
			</div>
		</div>
	</div>
	<div id="footer" class="foreground">
		<?php echo file_get_contents("./_HTML/footer.html"); ?>
	</div>
</div>
</body>
</html>