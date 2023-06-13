<?php
require_once "_connect.php";
require_once "_session.php";

// Check if data came in
if (isset($_POST['yes'])) {
	if (!$_SESSION['valid']) {
		die(json_encode("ERROR. INVALID SESSION."));
	} else {
		$sql1 = $_db->query("SELECT Username FROM session
		INNER JOIN user ON SessionUser=UserID
		WHERE TerminationDate IS NULL
		GROUP BY Username");
		$arr = [];
		while($temp=$sql1->fetchColumn()) {
			array_push($arr,$temp);
		}
		echo json_encode($arr); //*/
	}
	exit(1);
} else {
	// This really should *not* happen, but you never know.
	die("ERROR : Data does not exist.");
} //*/
?>