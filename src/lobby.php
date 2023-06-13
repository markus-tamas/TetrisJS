<html>
<head>
<?php echo file_get_contents("./_HTML/head.html"); ?>
<script src="./_JS/logout.js"></script>
<link rel="stylesheet" href="./_CSS/lobby.css">
<script type='text/javascript'>window.addEventListener("load",function(){validateSession(1,0)},false);</script>
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
					<div id="columnGames">
						<div class="block title">
							<div class="center"><h1>Games</h1></div>
						</div>
						<div class="block">
							<div>Stats</div>
							<table class="stattable settable" id="stats">
								<tr><td>Total games</td><td id="numGames">...</td></tr>
								<tr><td>Longest game</td><td id="longGame">...</td></tr>
								<tr><td>Total playtime</td><td id="playTime">...</td></tr>
							</table>
						</div>
						<div id="games" class="block">
							<div class="center"><a href="./tetris.php"><button id="playButton">Play!</button></a></div>
						</div>
					</div>
					<div id="columnScores">
						<div class="block title">
							<div class="center"><h1>Leaderboard</h1></div>
						</div>
						<div class="block">
							<table class="stattable" id="scores">
								<tr><td>¬.¬</td><td>¬.¬</td></tr>
							</table>
							<div class="center" id="gameType">
								<button type="button" id="scoreClassic">Classic</button>
								<button type="button" id="scoreTimed">Time Trial</button>
								<button type="button" id="scoreRows">Clear40</button>
								<button type="button" id="scorePVP" disabled>1v1</button>
							</div>
							<div class="center" id="refreshScores">
								<button type="button" id="scoreAlltime">All time</button>
								<button type="button" id="scoreMonthly">Monthly</button>
								<button type="button" id="scoreWeekly">Weekly</button>
								<button type="button" id="scoreDaily">Daily</button>
							</div>
						</div>
					</div>
					<div id="columnPlayers">
						<div class="block title">
							<div class="center"><h1>Online</h1></div>
						</div>
						<div class="block">
							<table class="stattable" id="online">
								<tr><td>¬.¬</td></tr>
							</table>
							<div class="right" id="refreshUsers"><button type="button">Refresh</button></div>
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