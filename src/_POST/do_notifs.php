<?php
require_once "_connect.php";
require_once "_session.php";

// Check if data came in
if (isset($_POST['action'])) {
	if (!$_SESSION['valid']) {
		die("ERROR. INVALID SESSION.");
	} else {
		$uid = $_SESSION['uid'];
		if ($_POST['action']==="update") {
			$id = intval($_POST['id']);
			$sql0 = $_db->query("SELECT PostTime FROM notification WHERE NotifID=$id");
			$t = $sql0->fetchColumn();
			$sql1 = "UPDATE user SET NotifDate=$t WHERE UserID=$uid";
			$_db->exec($sql1);
		} else if ($_POST['action']==="retrieve") {
			$t = time();
			$sql0 = $_db->query("SELECT NotifDate FROM user WHERE UserID=$uid");
			$nd = $sql0->fetchColumn();
			$sql1 = $_db->query("SELECT NotifID, Text FROM notification WHERE PostTime>$nd AND PostTime>($t-1209600) ORDER BY PostTime LIMIT 3");
			$arr = [];
			$arr = $sql1->fetchAll();
			echo json_encode($arr);
		} else {
			echo "ERROR: Invalid action!";
		}
	}
	exit(1);
} else {
	// This really should *not* happen, but you never know.
	die("ERROR : Data does not exist.");
} //*/
?>