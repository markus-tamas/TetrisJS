<?php
require_once "_connect.php";
require_once "_session.php";

// Check if data came in
if (isset($_POST['logout'])) { // Check for existing username
	$uname = $_SESSION['username'];
	$_SESSION['valid'] = false;
	session_destroy();
	$t = time();
	$sql1 = "UPDATE user SET LastActive=$t WHERE Username='$uname'";
	$_db->exec($sql1);
	//die("ded " . $t);
	$sql2 = $_db->query("SELECT UserID FROM user WHERE Username='$uname'");
	$uid = $sql2->fetchColumn();
	$sql3 = "UPDATE session SET TerminationDate=$t WHERE SessionUser=$uid AND TerminationDate IS NULL";
	$_db->exec($sql3);
} else {
	// This really should *not* happen, but you never know.
	die("ERROR : Data does not exist.");
} //*/
?>