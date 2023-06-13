<?php
 require_once "_connect.php";
 
 // Check if data came in
if (isset($_POST['uname'])) { // Check for existing username
	$uname = $_POST['uname'];
	$email = $_POST['email'];
	if (!preg_match('/^[a-zA-Z0-9]{3,45}$/',$uname)) {
		echo "Invalid username!";
	} else {
		$sql1 = $_db->query("SELECT Email FROM user WHERE Username='$uname'");
		if($sql1->rowCount() != 1) {
			echo "Invalid username!";
		} else { // Check for right email address
			$email2 = $sql1->fetchColumn();
			if(strcmp($email,$email2)) { // If all is good, generate new password
				echo "Username/email mismatch!";
			} else {
				$newpsw = bin2hex(random_bytes(5));
				$newhash = hash('sha256',$newpsw);
				$sql2 = "UPDATE user SET PasswordHash='$newhash' WHERE Username='$uname'";
				$_db->exec($sql2);
				echo "Can't send emails, so...<br>";
				echo "New password: " . $newpsw . "<br>";
				echo "Please change soon.";
			}
		}
		exit(0);
	}
} else {
	// This really should *not* happen, but you never know.
	die("ERROR : Data does not exist.");
} //*/
 ?>