<html>
<head>
<?php echo file_get_contents("./_HTML/head.html"); ?>
<link rel="stylesheet" href="./_CSS/newpass.css">
<script type='text/javascript'>window.addEventListener("load",function(){validateSession(0,1)},false);</script>
</head>

<body>
<?php require_once "./_POST/_session.php"; if ($_SESSION['valid']) { header('Location:./lobby.php'); } ?>
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
						<div class="block" id="pswresetform">
							<a href="./"><button>&lt; Back</button></a>
							<form name="pswReset" method="POST" action="">
								<label for="username">Username <span>*</span>:</label><br>
								<input id="username" class="text" name="username" type="text" required pattern="^[a-zA-Z0-9]{3,45}$" title="Alphanumeric, 3-45 characters"><br>
								<label for="email">Email address <span>*</span>:</label><br>
								<input id="email" name="email" class="text" type="email" required pattern="^(?=([a-zA-Z0-9.]+@[a-zA-Z0-9]+\.[a-zA-Z0-9]+))(.{8,45})$" title="Please use a valid email!"><br>
								<label id="pswResetFeedback" class="feedback" for="submit"></label><br>
								<div><input id="pswReset" type="submit" value="Reset password" ></div>
							</form>
						</div>
					</div>
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