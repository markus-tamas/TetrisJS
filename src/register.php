<html>
<head>
<?php echo file_get_contents("./_HTML/head.html"); ?>
<link rel="stylesheet" href="./_CSS/register.css">
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
						<div class="block" id="registerform">
							<a href="./"><button>&lt; Back</button></a>
							<form name="register" method="POST" action="">
								<label for="username">Username <span>*</span>:</label><br>
								<input id="username" class="text" name="username" type="text" required pattern="^[a-zA-Z0-9\-_]{3,45}$" title="Alphanumeric plus - and _ , 3-45 characters"><br>
								<label for="email">Email address <span>*</span>:</label><br>
								<input id="email" name="email" class="text" type="email" required pattern="^(?=([a-zA-Z0-9.\-\_+]+@[a-zA-Z0-9.\-_]+\.[a-zA-Z0-9.\-_]+))(.{8,45})$" title="Please use a valid email!"><br>
								<label for="password">Password <span>*</span>:</label><br>
								<input id="password" name="password" class="text" type="password" required pattern="^\S{8,45}$" title="No spaces, 3-45 characters"><br>
								<label for="confirmpassword">Confirm password <span>*</span>:</label><br>
								<input id="confirmpassword" name="confirmpassword" class="text" type="password" required><br>
								<label id="registerFeedback" class="feedback" for="submit"></label><br>
								<div><input id="register" type="submit" value="Register" ></div>
							</form>
							<div class="feedback">*: Required</div>
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