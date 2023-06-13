<html>
<head>
<?php echo file_get_contents("./_HTML/head.html"); ?>
<script src="./_JS/logout.js"></script>
<link rel="stylesheet" href="./_CSS/profile.css">
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
					<div id="content">
						<div class="block title">
							<div class="center"><h1>Settings</h1></div>
						</div>
						<div class="block">
							<div>Movement Timings</div>
							<table id="timings" class="settable">
								<tr><td>DAS</td><td class="timing"><input id="DAS" type="number" min="10" max="420" value="100"></td><td>ms</td></tr>
								<tr><td>ARR</td><td class="timing"><input id="ARR" type="number" min="10" max="420" value="50"></td><td>ms</td></tr>
								<tr><td>Soft Drop</td><td class="timing"><input id="Drop" type="number" min="10" max="420" value="50"></td><td>ms</td></tr>
							</table>
						</div>
						<div class="block" id="settingForm">
							<div>
								<div>Tetromino colors</div>
								<table id="colors" class="settable">
									<tr><td class="collab"><label for="ColZ">Col Z</label></td><td><input name="ColZ" id="ColZ" type="color" value="#FF1212"></input></td>
									<td class="collab"><label for="ColL">Col L</label></td><td><input name="ColL" id="ColL" type="color" value="#FFB366"></input></td></tr>
									<tr><td class="collab"><label for="ColO">Col &#9634;</label></td><td><input name="ColO" id="ColO" type="color" value="#FFFA00"></input></td>
									<td class="collab"><label for="ColS">Col S</label></td><td><input name="ColS" id="ColS" type="color" value="#00F600"></input></td></tr>
									<tr><td class="collab"><label for="ColI">Col I</label></td><td><input name="ColI" id="ColI" type="color" value="#00DDEE"></input></td>
									<td class="collab"><label for="ColJ">Col J</label></td><td><input name="ColJ" id="ColJ" type="color" value="#0000CC"></input></td></tr>
									<tr><td class="collab"><label for="ColT">Col T</label></td><td><input name="ColT" id="ColT" type="color" value="#EE00EE"></input></td></tr>
								</table>
								<label id="settingsFeedback" class="feedback" for="submit"></label><br>
								<div class="right"><button id="rstBtn" class="button">Reset</button><button id="changeSettings" class="button">Save settings</button></div>
							</div>
						</div>
					</div>
					<div id="high2">
						<div class="block title">
							<div class="center"><h1>Highscores</h1></div>
						</div>
						<div class="block">
							<table id="hs" class="stattable">
								<tr><th><a href="" id="p">Points</a></th><th><a href="" id="r">Rows</a></th><th><a href="" id="d">Date</a></th></tr>
								<tr><td>¬.¬</td><td>¬.¬</td><td>¬.¬</td></tr>
								<tr><td>¬.¬</td><td>¬.¬</td><td>¬.¬</td></tr>
								<tr><td>¬.¬</td><td>¬.¬</td><td>¬.¬</td></tr>
							</table>
							<div class="center" id="gameType">
								<button type="button" id="scoreClassic">Classic</button>
								<button type="button" id="scoreTimed">Time Trial</button>
								<button type="button" id="scoreRows">Clear40</button>
							</div>
						</div>
						<div class="block">
							<div>Other stats</div>
							<table class="settable stattable">
								<tr><td>Games played</td><td id="numGames">...</td></tr>
								<tr><td>Longest game</td><td id="longGame">...</td></tr>
								<tr><td>Total playtime</td><td id="playTime">...</td></tr>
							</table>
						</div>
					</div>
				</div>
				<div id="notifs" class="foreground"></div>
			</div>
			<div id="menu" class="foreground">
				<div class="flex-container">
					<?php echo file_get_contents("./_HTML/menu.html"); ?>
					<?php echo $_SESSION['admin']==1?"<div><a href='./admin_panel.php'>Admin Panel</a></div>":"" ?>
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