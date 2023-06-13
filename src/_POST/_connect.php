<?php
if(!session_id()) session_start();

$dbhost 	= "localhost";
$port       = "3307";
$dbname		= "tetris";
$dbuser		= "root";
$dbpass		= "kecske";
 
// database connection
try{
	// Open connection
	$_db = new PDO("mysql:host=$dbhost;port=$port;dbname=$dbname", $dbuser, $dbpass);
	// Set the PDO error mode to exception
	$_db->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
} catch(PDOException $e) {
	die("ERROR : ".$e->getMessage());
}
?>
