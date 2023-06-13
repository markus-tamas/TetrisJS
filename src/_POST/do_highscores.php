<?php
require_once "_connect.php";
require_once "_session.php";

// Check if data came in
if (isset($_POST['yes'])) {
	if (!$_SESSION['valid']) {
		die(json_encode("ERROR. INVALID SESSION."));
	} else {
		$mode = $_POST['mode'];
		$modes = array("solo","timed","limit");
		if ($_POST['type'] == 0) {
			if (!in_array($mode,$modes)) die("ERROR: Invalid gamemode!");
			if ($_POST['scope'] == 0) {
				$sql1 = $_db->query("SELECT user.Username AS User, max(whoplayed.points) AS Points FROM user
				INNER JOIN whoplayed ON user.UserID = whoplayed.UserID
				INNER JOIN game ON game.GameID = whoplayed.GameID
				WHERE game.GameType='$mode'
				GROUP BY user.Username
				ORDER BY max(whoplayed.points) DESC
				LIMIT 10");
				$arr = [];
				$arr = $sql1->fetchAll();
				echo json_encode($arr); //*/
			} else {
				switch (intval($_POST['scope'])) {
					case 1:
						$cutoff = 2592000;
						break;
					case 2:
						$cutoff = 604800;
						break;
					case 3:
						$cutoff = 86400;
						break;
					default:
						echo json_encode("ERROR: Type out of bounds.");
						exit(1);
						break;
				}
				$t = time();
				$sql1 = $_db->query("SELECT user.Username AS User, max(whoplayed.points) AS Points FROM user
				INNER JOIN whoplayed ON user.UserID = whoplayed.UserID
				INNER JOIN game ON game.GameID = whoplayed.GameID
				WHERE game.EndDate>($t-$cutoff) AND game.GameType='$mode'
				GROUP BY user.Username
				ORDER BY max(whoplayed.points) DESC
				LIMIT 10");
				$arr = [];
				$arr = $sql1->fetchAll();
				echo json_encode($arr);
			}
		} else {
			$uid = $_SESSION['uid'];
			switch (intval($_POST['type'])) {
				case 1:
					$sql1 = "SELECT whoplayed.points AS Points, whoplayed.rowCount AS `Rows`, game.StartDate AS Date FROM user
							INNER JOIN whoplayed ON whoplayed.UserID = user.UserID
							INNER JOIN game ON whoplayed.GameID = game.GameID
							WHERE user.UserID=$uid AND game.GameType='$mode'
							ORDER BY whoplayed.points DESC
							LIMIT 10";
					break;
				case 2:
					$sql1 = "SELECT whoplayed.points AS Points, whoplayed.rowCount AS `Rows`, game.StartDate AS Date FROM user
							INNER JOIN whoplayed ON whoplayed.UserID = user.UserID
							INNER JOIN game ON whoplayed.GameID = game.GameID
							WHERE user.UserID=$uid AND game.GameType='$mode'
							ORDER BY whoplayed.rowCount DESC
							LIMIT 10";
					break;
				case 3:
					$sql1 = "SELECT whoplayed.points AS Points, whoplayed.rowCount AS `Rows`, game.StartDate AS Date FROM user
							INNER JOIN whoplayed ON whoplayed.UserID = user.UserID
							INNER JOIN game ON whoplayed.GameID = game.GameID
							WHERE user.UserID=$uid AND game.GameType='$mode'
							ORDER BY game.StartDate DESC
							LIMIT 10";
					break;
				default:
					echo json_encode("ERROR: Type out of bounds.");
					break;
			}
			$sql1 = $_db->query($sql1);
			$arr = [];
			$arr = $sql1->fetchAll();
			echo json_encode($arr);
		}
	}
	exit(1);
} else {
	// This really should *not* happen, but you never know.
	die("ERROR : Data does not exist.");
} //*/
?>