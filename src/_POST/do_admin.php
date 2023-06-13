<?php
 require_once "_connect.php";
 
 // Check if data came in
if (isset($_POST['type'])) { // Check for existing username
	$uid = $_SESSION['uid'];
	$sql0 = $_db->query("SELECT admin FROM user WHERE UserID=$uid");
	$type = $_POST['type'];
	if ($sql0->fetchColumn() == 1) {
		switch ($type) {
			case 1:
				$txt = $_POST['txt'];
				$t = time();
				
				if (preg_match('/^[a-zA-Z0-9\!\.\,\:\(\)\ ]{3,500}$/',$txt)) {
					try {
						"INSERT INTO session (SessionUser,StartDate,PHPID,Activity)	VALUES ($uid, $t, '" . session_id() . "', $t)";
						$sql1 = "INSERT INTO notification (PostedBy, Text, PostTime) VALUES ($uid, '$txt', $t)";
						$_db->exec($sql1);
						echo "Done!";
					} catch (PDOException $e) {
						echo "SQL: " . $e->getMessage();
					}
				} else {
					echo "Invalid message.";
				}
				
				break;
			default:
				echo "Invalid type.";
				break;
		}
	} else {
		echo "Not admin.";
	}
	exit(0);
} else {
	// This really should *not* happen, but you never know.
	die("Data does not exist.");
} //*/
 ?>