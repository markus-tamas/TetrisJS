<html>
<head>
<?php echo file_get_contents("./_HTML/head.html"); ?>
<script src="./_JS/logout.js"></script>
<link rel="stylesheet" href="./_CSS/rules.css">
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
							<div class="center"><h1>Rules</h1></div>
						</div>
						<div class="block">
							<ul>
								<li>Use the controls to place the blocks at the bottom of the playing field!</li>
								<li>Complete rows to earn more points!</li>
								<li>The more blocks you place, the faster the game will become.</li>
								<li>In Classic mode, the game ends when the board fills up and no new block can be placed.</li>
								<li>In Time Trial mode you have 3 minutes to score as high as you can.</li>
								<li>In Clear40 mode you have to complete 40 rows in total.</li>
								<li>"Time Trial" and "Clear40" games end only when you lose your combo.</li>
							</ul>
						</div>
					</div>
					<div id="high2">
						<div class="block title">
							<div class="center"><h1>Scoring</h1></div>
						</div>
						<div class="block">
							<ul>
								<li>You earn 1 point per survived step, 2 points if you accelerate or instant drop. (Points based on instant drop distance.)</li>
								<li>You earn points for destroying rows:<br>150/350/650/1000 for 1/2/3/4 concurrently destroyed rows.</li>
								<li>You can build combos! The second continuously destroyed set of rows will be worth x1.5 the points, the third x2.25, and so on.</li>
							</ul>
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