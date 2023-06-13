<?php
require_once "_connect.php";
require_once "_session.php";
// Check if data came in
if (isset($_POST['refresh'])) { // Check validity
	$str = $_SERVER['HTTP_USER_AGENT'];
	$pos = strlen($str)-strpos(strrev($str),'/');
	if (!$_SESSION['valid'] || !($_SESSION['browser']==substr($str,0,$pos-1))) {
		$out = array('result' => "Invalid!", 'message' => "_ERR_");
		$_SESSION['valid'] = false;
		$out = array('result' => "Invalid!", 'message' => "_ERR_");
		$sql0 = "UPDATE user SET LastActive=$t WHERE UserID=$uid";
		$_db->exec($sql0);
		echo json_encode($out);
	} else {
		$uid = $_SESSION['uid'];
		$t = time();
		$cutoff = 1800;
		$sql0 = "UPDATE session SET TerminationDate=$t WHERE ($t - session.Activity>$cutoff) AND TerminationDate IS NULL";
		$_db->exec($sql0);
		$sql1 = $_db->query("SELECT SessionUser FROM session WHERE SessionUser=$uid AND TerminationDate IS NULL");
		if ($sql1->rowCount()==0) {
			$_SESSION['valid'] = false;
			$out = array('result' => "Invalid!", 'message' => "_ERR_");
			$sql2 = "UPDATE user SET LastActive=$t WHERE UserID=$uid";
			$_db->exec($sql2);
			echo json_encode($out);
		} else {
			if ($_POST['refresh']) {
				$sql2 = "UPDATE session SET Activity=$t WHERE SessionUser=$uid AND TerminationDate IS NULL";
				$_db->exec($sql2);
			}
			$out = array('result' => "Valid!", 'message' => $_SESSION['username'], 'refreshed' => $_POST['refresh']);
			echo json_encode($out);
		} //*/
	} //*/
	exit(0);
} else {
	// This really should *not* happen, but you never know.
	die("ERROR : Data does not exist.");
} //*/
?>