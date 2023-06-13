<html>
<head>
<?php echo file_get_contents("./_HTML/head.html"); ?>
<link rel="stylesheet" href="./_CSS/index.css">
<script type='text/javascript'>window.addEventListener("load",function(){validateSession(0,1)},false);</script>
</head>

<body>
<?php /*require_once "./_POST/_session.php"; if ($_SESSION['valid']) { header('Location:./lobby.php'); }*/ ?>
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
						<div class="block" id="loginform">
							<form name="login" method="POST" action="">
								<label for="username">Username:</label><br>
								<input class="text" type="text" id="username" name="username" required pattern="^[a-zA-Z0-9\-_]{3,45}$" title="Alphanumeric plus - and _ , 3-45 characters"><br>
								<label for="username">Password:</label><br>
								<input type="password" class="text" id="password" name="password" required pattern="^\S{8,45}$" title="No spaces, 8-45 characters"><br>
								<label id="loginFeedback" class="feedback" for="login"></label><br>
								<div><input id="login" name="login" type="submit" value="Login"></div>
							</form>
							<a href="./newpass.php">Forgotten password?</a><br>
							<a href="./register.php">Don't have an account?</a>
						</div>
					</div>
				</div>
				<div id="pubnotifs" class="foreground">
					<div id="clearcookie">
						<div>This site uses a Session cookie. <span class="feedback">If you have trouble logging in, clear cookies!</span></div>
						<div onclick="closeNotif('clearcookie',false);">✖</div>
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