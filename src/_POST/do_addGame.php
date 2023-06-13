<?php
 require_once "_connect.php";
 require_once "_session.php";
 
 // Check if data came in
try {
	if (isset($_POST['gameScore'])) { // Check for existing username "gameScore="+gameScore+"&destroyedRows="+destroyedRows+"&startDate="+startDate+"&endDate="+endDate+"&gametype=solo"
		if ($_SESSION['valid']) {
			//Valid gamemodes
			$types = array("solo","timed","limit");
			$type = $_POST['gametype'];
			$tc = $_SESSION['ut'] - $_SESSION['st']; // Time correction
			$uid = $_SESSION['uid']; // User ID
			$score = (intval($_POST['gameScore'])+7500)/17;
			$rows = (intval($_POST['destroyedRows'])-243)/7;
			$start = intval($_POST['startDate'])-15;
			$end = floor((intval($_POST['endDate'])-10000)/1000);
			$pauseTime = intval($_POST['PauseTime']);
			$two = intval($_POST['two']); // # of double breaks
			$three = intval($_POST['three']); // # of triple breaks
			$four = intval($_POST['four']); // # of quad breaks
			$num = (intval($_POST['num'])/13)-42; // # of elements dropped
			$num2 = (intval($_POST['num2'])+59)/3; // # of steps taken
			$num3 = intval($_POST['num3'])+2; // total combo count
			$num4 = (intval($_POST['num4'])+37)/7; // streak count
			$num5 = (intval($_POST['num5']))/31+375; // bonus points
			$grace = intval($_POST['grace']);
			$normal = intval($_POST['normal']);
			$combostack = intval($_POST['combostack']); // also total combo count
			$comboarr = json_decode($_POST['rowarr']);
			$rowarr = json_decode($_POST['comboarr']);
			
			
			
			$valid = true;
			$code = 0;
			if ($pauseTime == 0) { $valid = false; goto evaluate; } // 0
			else { $code++; $pauseTime = floor($_POST['PauseTime']/1000); }
			if (!in_array($type,$types)) { $valid = false; goto evaluate; }
			$code++;
			if ($start < 1638642350) { $valid = false; goto evaluate; }
			$code++;
			if ($end < $start) { $valid = false; goto evaluate; }
			$code++;
			if ($end-$tc > time()+5) { $valid = false; goto evaluate; }
			$code++;
			if ($end-$tc < time()-5) { $valid = false; goto evaluate; } // 5
			$code++;
			if ($num > 3*($end-$start)) { $valid = false; goto evaluate; }
			$code++;
			if ($num > 50+2.5*$rows) { $valid = false; goto evaluate; }
			$code++;
			if ($rows > $num/2.5) { $valid = false; goto evaluate; }
			$code++;
			if ($rows > $score/150) { $valid = false; goto evaluate; }
			$code++;
			if ($score > 2*$num2+250*$rows) { $valid = false; goto evaluate; } // 10
			$code++;
			if ($score > 2*$num2+150*($rows-2*$two-3*$three-4*$four)+350*$two+650*$three+1000*$four) { $valid = false; goto evaluate; }
			$code++;
			if ($normal > 1010) { $valid = false; goto evaluate; }
			$code++;
			if (($num > 35) && ($normal > 400)) { $valid = false; goto evaluate; }
			$code++;
			if (($num > 70) && ($normal > 300)) { $valid = false; goto evaluate; }
			$code++;
			if (($num > 150) && ($normal > 150)) { $valid = false; goto evaluate; } // 15
			$code++;
			if (($num > 200) && ($num < 320) && ($normal > 100-floor(($num-200)/2))) { $valid = false; goto evaluate; }
			$code++;
			if (($num > 350) && ($normal != 30)) { $valid = false; goto evaluate; }
			$code++;
			if (($end-$start-$pauseTime > 120) && ($num > 35) && ($num < ($end-$start-$pauseTime)/7)) { $valid = false; goto evaluate; }
			$code++;
			if ($grace > 500) { $valid = false; goto evaluate; }
			$code++;
			if (($num > 270) && ($grace > 465)) { $valid = false; goto evaluate; } // 20
			$code++;
			if (($num > 340) && ($grace > 465-floor(($num-270)/2) && ($grace != 150))) { $valid = false; goto evaluate; }
			$code++;
			if ($score>500000) { $valid = false; goto evaluate; }
			$code++;
			if ($comboarr[0] || $rowarr[0] || $comboarr[1] || $rowarr[1]) { $valid = false; goto evaluate; }
			$code++;
			if ($num4 > $num3) { $valid = false; goto evaluate; }
			$code++;
			if (($combostack != $num3) && $type == "solo") { $valid = false; goto evaluate; } // 25
			$code++;
			//if (($combostack != $num3+1) && ($type == "limit")) { $valid = false; goto evaluate; }
			$code++;
			if (($type == "timed") && ($end-$start-$pauseTime>200)) { $valid = false; goto evaluate; }
			$code++;
			if (($type == "limit") && ($rows>60)) { $valid = false; goto evaluate; }
			$code++;
			if ($num2-$num5 > 20*$num) { $valid = false; goto evaluate; }
			$code++;
			if (count($rowarr) != count($comboarr)) { $valid = false; goto evaluate; } // 30
			$code++;
			if ($num > count($comboarr)+2 || $num < count($comboarr)-2) { $valid = false; goto evaluate; }
			$code++;
			
			// Array validation
			//$maxScore = ceil(2.5*($num2-$num5));
			$maxScore = 40*$num;
			$combo = 0; $rone = 0; $rtwo = 0; $rthree = 0; $rfour = 0;
			for ($i=1;$i<count($rowarr);$i++) {
				if ($comboarr[$i] > $rowarr[$i]) { $valid = false; goto evaluate; }
				if ($comboarr[$i]-$comboarr[$i-1] > 1) { $valid = false; $code++; goto evaluate; }
				if ($rowarr[$i]-$rowarr[$i-1] > 4) { $valid = false; $code+=2; goto evaluate; }
				if (($rowarr[$i]==$rowarr[$i-1] && $comboarr[$i]!=$comboarr[$i-1]) || ($rowarr[$i]!=$rowarr[$i-1] && $comboarr[$i]==$comboarr[$i-1])) { $valid = false; $code+=3; goto evaluate; }
				if ($rowarr[$i] > $i/2.5+5) { $valid = false; $code+=4; goto evaluate; } // 36
				if ($comboarr[$i]>$comboarr[$i-1]) $combo++;
				if ($combo>33) { $valid = false; $code+=5; goto evaluate; }
				if ($comboarr[$i]==$comboarr[$i-1]) $combo = 0;
				switch ($rowarr[$i]-$rowarr[$i-1]) {
					case 1: $base = 150; $rone++; break;
					case 2: $base = 350; $rtwo++; break;
					case 3: $base = 650; $rthree++; break;
					case 4: $base = 1000; $rfour++; break;
					default: $base = 0; break;
				}
				$maxScore += $base*pow(1.5, $combo-1);
			}
			$code+=6;
			if ($score > $maxScore+500) { $valid = false; goto evaluate; }
			$code++;
			if (($two != $rtwo) || ($three != $rthree) || ($four != $rfour)) { $valid = false; goto evaluate; }
			$code++;
			if (max($rowarr) > $rows+3 || max($rowarr) < $rows-3) { $valid = false; goto evaluate; } // 40
			$code++;
			if (($num5 > ($maxScore-20*$num-1000*$rfour-650*$rthree-350*$rtwo-150*$rone)/2) && ($num2>3000)) { $valid = false; goto evaluate; }
			$code++;
			
			evaluate:
			if (!$valid) {
				echo json_encode("ERROR");
				if (filesize('C:\.webstuff\logs\invalid.log') < 65536) {
					$myfile = fopen('C:\.webstuff\logs\invalid.log', 'a') or die('');
				} else {
					$myfile = fopen('C:\.webstuff\logs\invalid.log', 'w') or die('');
					fwrite($myfile,"uid;type;error;tc;score;rows;start;end;pause;two;three;four;num;num2;num3;num4;num5;grace;normal;combostack\n");
				}
				fwrite($myfile, $_SESSION['uid'].";$type;$code;$tc;$score;$rows;$start;$end;$pauseTime;$two;$three;$four;$num;$num2;$num3;$num4;$num5;$grace;$normal;$combostack\n");
				fclose($myfile);
			} else {
				$sql1 = $_db->query("SELECT GameID FROM game WHERE WinnerID=$uid AND StartDate=$start");
				if ($sql1->rowCount()>0) {
					$gid = $sql1->fetchColumn();
				} else {
					$start = $start-$tc;
					$end = $end-$tc;
					$sql2 = "INSERT INTO game (WinnerID, StartDate, EndDate, GameType, PauseTime)
					VALUES ($uid, $start, $end, '$type', $pauseTime)";
					$_db->exec($sql2);
					$gid = $_db->lastInsertId();
				}
				$sql3 = $_db->query("SELECT * FROM whoplayed WHERE GameID=$gid AND UserID=$uid");
				if ($sql3->rowCount()>0) {
					//Ignore
				} else {
					$sql4 = "INSERT INTO whoplayed (GameID,UserID,points,rowCount)
					VALUES ($gid, $uid, $score, $rows)";
					$_db->exec($sql4);
				}
				echo json_encode("Done!");
				if ($score>100000) {
					if (filesize('C:\.webstuff\logs\invalid.log') < 65536) {
						$myfile = fopen('C:\.webstuff\logs\veryhigh.log', 'a') or die('');
					} else {
						$myfile = fopen('C:\.webstuff\logs\veryhigh.log', 'w') or die('');
						fwrite($myfile,"uid;type;error;tc;score;rows;start;end;pause;two;three;four;num;num2;num3;num4;num5;grace;normal;combostack\n");
					}
					fwrite($myfile, $_SESSION['uid'].";$type;$code;$tc;$score;$rows;$start;$end;$pauseTime;$two;$three;$four;$num;$num2;$num3;$num4;$num5;$grace;$normal;$combostack\n");
					fclose($myfile);
				}
			}
		} else echo json_encode(array("ERROR.",-1));
		exit(0);
	} else {
		// This really should *not* happen, but you never know.
		die("ERROR : Data does not exist.");
	} //*/
} catch (Exception $e) {
	//echo "ERROR: ".$e->getMessage();
	echo "ERROR.";
}
 ?>