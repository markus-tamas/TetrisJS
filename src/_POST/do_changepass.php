<?php
 require_once "_connect.php";
 
 // Check if data came in
if (isset($_POST['psw'])) { // Check for existing username
	$uname = $_SESSION['username'];
	$psw = hash('sha256',$_POST['psw']);
	$newpass = $_POST['newpass'];
	if (!preg_match('/^\S{8,45}$/',$newpass)) {
		echo "Invalid new<br>password!";
	} else {
		$sql1 = $_db->query("SELECT PasswordHash FROM user WHERE Username='$uname'");
		if(strcmp($psw,$sql1->fetchColumn())) {
			echo "Wrong password!";
		} else {
			$newpass = hash('sha256',$_POST['newpass']);
			$sql2 = "UPDATE user SET PasswordHash='$newpass' WHERE Username='$uname'";
			$_db->exec($sql2);
			echo "Password changed!";
		}
	}
	exit(0);
} else {
	// This really should *not* happen, but you never know.
	die("ERROR : Data does not exist.");
} //*/
 ?>