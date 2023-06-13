<?php
require_once "_connect.php";

// Check if data came in
if (isset($_POST['uname'])) {
	// Check username validity
	$username = $_POST['uname'];
	$psw = $_POST['psw'];
	$email = $_POST['email'];
	$valid = true;
	if(!preg_match('/^[a-zA-Z0-9\-_]{3,45}$/',$username)) {
		echo "Invalid username! ";
		$valid = false;
	}
	if(!preg_match('/^\S{8,45}$/',$psw)) {
		echo "Invalid password! ";
		$valid = false;
	}
	if(!preg_match('/^(?=([a-zA-Z0-9.\-\_+]+@[a-zA-Z0-9.\-_]+\.[a-zA-Z0-9.\-_]+))(.{8,45})$/',$email)) {
		echo "Invalid email! ";
		$valid = false;
	}
	
	// Check for duplicate username
	$sql1 = $_db->query("SELECT * FROM user WHERE Username='$username'");
	if($sql1->rowCount() > 0) {
		echo "Username already exists! ";
	}
	
	// Check for duplicate email address
	$sql2 = $_db->query("SELECT * FROM user WHERE Email='$email'");
	if($sql2->rowCount() > 0) {
		if ($sql1->rowCount() > 0) {
			echo "<br>";
		}
		echo "E-mail address is already registered!";
	}
	
	// If all is good, add new record
	if($sql1->rowCount() == 0 && $sql2->rowCount() == 0 && $valid) {
		$password = hash('sha256', $psw);
		try {
			// Fetch highest ID user and add 1
			$id = $_db->query("SELECT MAX(userid) FROM user");
			$id = $id->fetchColumn();
			if ($id === null) {
				$id = 1;
			} else {
				$id = $id + 1;
			}
			
			// Add record
			$t = time();
			$sql = "INSERT INTO user
			(UserID, Username, PasswordHash, Email, RegisteredDate, LastActive, NotifDate)
			VALUES ($id, '$username', '$password', '$email', $t, 0, $t)";
			$_db->exec($sql);
			echo "Done!";
		} catch(PDOException $e) { // Catch exceptions and throw error
			die($sql . "<br>" . $e->getMessage());
		} catch(Exception $e) {
			die($sql . "<br>" . $e->getMessage());
		}
	}
	exit(0);
} else {
	// This really should *not* happen, but you never know.
	die("ERROR : Data does not exist.");
}
?>