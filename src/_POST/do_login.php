<?php
//session_start();
require_once "_connect.php";
require_once "_session.php";

// Check if data came in
if (isset($_POST['uname'])) { // Check for existing username
	$uname = $_POST['uname'];
	if (!preg_match('/^[a-zA-Z0-9\-_]{3,45}$/',$uname)) {
		echo "Invalid username!";
	} else {
		$sql1 = $_db->query("SELECT UserID FROM user WHERE Username='$uname'");
		if($sql1->rowCount() != 1) {
			echo "Invalid username or password!";
		} else { // Check for right password
			$uid = $sql1->fetchColumn();
			$psw = hash('sha256', $_POST['psw']);
			$time = floor(intval($_POST['time'])/1000);
			$t = time();
			$sql2 = $_db->query("SELECT PasswordHash FROM user WHERE Username='$uname'");
			$pswh = $sql2->fetchColumn();
			if(strcmp($pswh, $psw)) { // If all is good, log in user and start session
				echo "Invalid username or password!";
			} else {
				$sql3 = $_db->query("SELECT session.PHPID FROM session
				INNER JOIN user ON user.UserID=session.SessionUser
				WHERE user.UserID=$uid
				AND session.TerminationDate IS NULL");
				if ($sql3->rowCount() > 0) {
					$oldid = $sql3->fetchColumn();
					session_replace($oldid, $uid);
				}
				while(true) {
					$sql4 = $_db->query("SELECT SessionUser FROM session WHERE PHPID='" . session_id() . "'");
					if ($sql4->rowCount() == 0) {
						break;
					} else {
						session_regenerate_id(true);
					}
				}
				$sql5 = "INSERT INTO session (SessionUser,StartDate,PHPID,Activity)	VALUES ($uid, $t, '" . session_id() . "', $t)";
				$_db->exec($sql5);
				$sql6 = "UPDATE user SET LastActive=" . time() . " WHERE UserID=$uid";
				$_db->exec($sql6);
				$sql7 = $_db->query("SELECT admin FROM user WHERE UserID=$uid");
				$str = $_SERVER['HTTP_USER_AGENT'];
				$pos = strlen($str)-strpos(strrev($str),'/');
				$_SESSION['browser'] = substr($str,0,$pos-1);
				$_SESSION['admin'] = $sql7->fetchColumn();
				$_SESSION['ut'] = $time;
				$_SESSION['st'] = $t;
				$_SESSION['username'] = $uname;
				$_SESSION['uid'] = $uid;
				$_SESSION['valid'] = true;
				echo "Logged in!";
			}
		}
		exit(0);
	}
} else {
	// This really should *not* happen, but you never know.
	die("ERROR : Data does not exist.");
} //*/
?>