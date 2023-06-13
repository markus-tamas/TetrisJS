<html>
<head>
<?php echo file_get_contents("./_HTML/head.html"); ?>
<script src="./_JS/logout.js"></script>
<link rel="stylesheet" href="./_CSS/changepass.css">
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
						<div class="block" id="pswchangeform">
							<a href="./lobby.php"><button>&lt; Back</button></a>
							<form name="pswReset" method="POST" action="">
								<label for="oldpsw">Current Password <span>*</span>:</label><br>
								<input id="oldpsw" class="text" name="oldpsw" type="password" required pattern="^\S{8,45}$" title="No spaces, 8-45 characters"><br>
								<label for="password">New password <span>*</span>:</label><br>
								<input id="password" name="password" class="text" type="password" required pattern="^\S{8,45}$" title="No spaces, 8-45 characters"><br>
								<label for="confirmpassword">New password again <span>*</span>:</label><br>
								<input id="confirmpassword" name="confirmpassword" class="text" type="password" required pattern="^\S{8,45}$" title="No spaces, 8-45 characters"><br>
								<label id="pswChangeFeedback" class="feedback" for="submit"></label><br>
								<div><input id="pswChange" type="submit" value="Change password" ></div>
							</form>
							<div class="feedback">*: Required</div>
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