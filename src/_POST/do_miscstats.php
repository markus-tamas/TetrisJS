<?php
require_once "_connect.php";
require_once "_session.php";

// Check if data came in
if (isset($_POST['yes'])) {
	if (!$_SESSION['valid']) {
		die(json_encode("ERROR. INVALID SESSION."));
	} else {
		$type = $_POST['type'];
		switch ($type) {
			case 0:
				$sql1 = $_db->query("SELECT count(game.GameID), max(game.EndDate-game.StartDate-game.PauseTime),
				sum(game.EndDate-game.StartDate-game.PauseTime)
				FROM game INNER JOIN whoplayed ON whoplayed.GameID=game.GameID");
				break;
			case 1:
				$uid = $_SESSION['uid'];
				$sql1 = $_db->query("SELECT count(game.GameID), max(game.EndDate-game.StartDate-game.PauseTime),
				sum(game.EndDate-game.StartDate-game.PauseTime)
				FROM game INNER JOIN whoplayed ON whoplayed.GameID=game.GameID
				WHERE whoplayed.UserID=$uid");
				break;
		}
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