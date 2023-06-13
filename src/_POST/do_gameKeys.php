<?php
require_once "_connect.php";
require_once "_session.php";

// Check if data came in
if (isset($_POST['type'])) {
	if (!$_SESSION['valid']) {
		die("ERROR. INVALID SESSION.");
	} else {
		if ($_POST['type']==="set") {
			$uid = $_SESSION['uid'];
			$rightKey = $_POST['rightKey'];
			$leftKey = $_POST['leftKey'];
			$rotateKey = $_POST['rotateKey'];
			$rotateccwKey = $_POST['rotateccwKey'];
			$fasterKey = $_POST['fasterKey'];
			$quickKey = $_POST['quickKey'];
			$storeKey = $_POST['storeKey'];
			$valid = true;
			if (!preg_match('/^[0-9a-zA-Z]{1,45}$/',$rightKey)) $valid = false;
			if (!preg_match('/^[0-9a-zA-Z]{1,45}$/',$leftKey)) $valid = false;
			if (!preg_match('/^[0-9a-zA-Z]{1,45}$/',$rotateKey)) $valid = false;
			if (!preg_match('/^[0-9a-zA-Z]{1,45}$/',$rotateccwKey)) $valid = false;
			if (!preg_match('/^[0-9a-zA-Z]{1,45}$/',$fasterKey)) $valid = false;
			if (!preg_match('/^[0-9a-zA-Z]{1,45}$/',$quickKey)) $valid = false;
			if (!preg_match('/^[0-9a-zA-Z]{1,45}$/',$storeKey)) $valid = false;
			if ($valid) {
				$sql1 = "UPDATE user SET
				rightKey='$rightKey', leftKey='$leftKey', rotateKey='$rotateKey',
				fasterKey='$fasterKey', quickKey='$quickKey', storeKey='$storeKey',
				rotateccwKey='$rotateccwKey'
				WHERE UserID=$uid";
				$_db->exec($sql1);
				echo "Success!";
			} else {
				echo "ERROR!!!";
			}
		} else if ($_POST['type']==="get") {
			$uid = $_SESSION['uid'];
			$sql1 = $_db->query("SELECT leftKey, rightKey, rotateKey, rotateccwKey,
			fasterKey, quickKey, storeKey FROM user WHERE UserID=$uid");
			$arr = [];
			$arr = $sql1->fetchAll();
			echo json_encode($arr);
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