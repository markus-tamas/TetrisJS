<html>
<head>
<?php echo file_get_contents("./_HTML/head.html"); ?>
<script src="./_JS/logout.js"></script>
<script src="./_JS/admin.js"></script>
<link rel="stylesheet" href="./_CSS/admin_panel.css">
<script type='text/javascript'>window.addEventListener("load",function(){validateSession(1,0)},false);</script>
</head>

<body>
<?php require_once "./_POST/_session.php"; if (!$_SESSION['valid'] || !$_SESSION['admin']) { header('Location:./'); } ?>
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
					<div id="columnNotif">
						<div class="block title"><h1 class="center">Notifications</h1></div>
						<div class="block">
							<div>Post New</div>
							<form class="settable" name="register" method="POST" onsubmit="doAdminStuff(1)" action="">
								<label for="username">Text:</label><br>
								<textarea id="notifText" rows="5" cols="25"></textarea><br>
								<label id="notifFeedback" class="feedback"></label>
								<div class="right"><input id="register" type="submit" value="Post it!" ></div>
							</form>
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