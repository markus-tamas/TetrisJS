<?php
require_once "_connect.php";
require_once "_session.php";

// Check if data came in
if (isset($_POST['yes'])) {
	if (!$_SESSION['valid']) {
		echo json_encode("Default");
	} else {
		$uid = $_SESSION['uid'];
		$sql1 = $_db->query("SELECT ColZ, ColL, ColO, ColS, ColI, ColJ, ColT, DAS, ARR, `Drop` FROM user WHERE UserID=$uid");
		$arr = [];
		$arr = $sql1->fetchAll();
		echo json_encode($arr); //*/
	}
	exit(1);
} else {
	// This really should *not* happen, but you never know.
	die("ERROR : Data does not exist.");
} //*/
?>