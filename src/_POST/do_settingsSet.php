<?php
require_once "_connect.php";
require_once "_session.php";

// Check if data came in
if (isset($_POST['ColZ'])) {
	if (!$_SESSION['valid']) {
		die(json_encode("ERROR. INVALID SESSION."));
	} else {
		$uid = $_SESSION['uid'];
		$ColZ = $_POST['ColZ'];
		$ColL = $_POST['ColL'];
		$ColO = $_POST['ColO'];
		$ColS = $_POST['ColS'];
		$ColI = $_POST['ColI'];
		$ColJ = $_POST['ColJ'];
		$ColT = $_POST['ColT'];
		$DAS = intval($_POST['DAS']);
		$ARR = intval($_POST['ARR']);
		$Drop = intval($_POST['Drop']);
		$valid = true;
		if (!preg_match('/^#[0-9a-fA-F]{6}$/',$ColZ)) $valid = false;
		if (!preg_match('/^#[0-9a-fA-F]{6}$/',$ColL)) $valid = false;
		if (!preg_match('/^#[0-9a-fA-F]{6}$/',$ColO)) $valid = false;
		if (!preg_match('/^#[0-9a-fA-F]{6}$/',$ColS)) $valid = false;
		if (!preg_match('/^#[0-9a-fA-F]{6}$/',$ColI)) $valid = false;
		if (!preg_match('/^#[0-9a-fA-F]{6}$/',$ColJ)) $valid = false;
		if (!preg_match('/^#[0-9a-fA-F]{6}$/',$ColT)) $valid = false;
		if (gettype($DAS) != "integer") $valid = false;
		if (gettype($ARR) != "integer") $valid = false;
		if (gettype($Drop) != "integer") $valid = false;
		if (($DAS<10) || ($ARR<10) || ($Drop<10)) $valid = false;
		if (($DAS>420) || ($ARR>420) || ($Drop>420)) $valid = false;
		if ($valid) {
			$sql1 = "UPDATE user SET
			ColZ='$ColZ', ColL='$ColL', ColO='$ColO', ColS='$ColS',
			ColI='$ColI', ColJ='$ColJ', ColT='$ColT', DAS=$DAS,
			ARR=$ARR, `Drop`=$Drop WHERE UserID=$uid";
			$_db->exec($sql1);
			echo "Success!";
		} else {
			echo "ERROR!!!";
		}
	}
	exit(1);
} else {
	// This really should *not* happen, but you never know.
	die("ERROR : Data does not exist.");
} //*/
?>