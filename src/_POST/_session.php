<?php
function sql_terminate_session($userID = null) : bool {
	try {
		$t = time();
		$sid = session_id();
		if (is_null($userID)) {
			$sql = "UPDATE session SET TerminationDate=$t WHERE PHPID='$sid'";
		} else {
			$sql = "UPDATE session SET TerminationDate=$t WHERE SessionUser=$userID AND TerminationDate IS NULL";
		}
		$GLOBALS['_db']->exec($sql);
		return true;
	} catch(Exception $e) {
		return false;
	}
}

function session_replace($oldID, $uID) : bool {
	try {
		session_commit();
		session_id($oldID);
		sql_terminate_session($uID);
		session_start();
		session_regenerate_id(true);
		session_start();
		
		return true;
	} catch(Exception $e) {
		return false;
	}
}

//Implement Session handling
class FileSessionHandler {
    private $savePath;

    function open($savePath, $sessionName) {
        $this->savePath = $savePath;
        if (!is_dir($this->savePath)) {
            mkdir($this->savePath, 0777);
        }
        return true;
    }

    function close() {
		sql_terminate_session();
        return true;
    }

    function read($id) {
        return (string)@file_get_contents("$this->savePath/sess_$id");
    }

    function write($id, $data) {
        return file_put_contents("$this->savePath/sess_$id", $data) === false ? false : true;
    }

    function destroy($id) {
		sql_terminate_session();
        $file = "$this->savePath/sess_$id";
        if (file_exists($file)) {
            unlink($file);
        }
        return true;
    }

    function gc($maxlifetime) {
		sql_terminate_session();
        foreach (glob("$this->savePath/sess_*") as $file) {
            if (filemtime($file) + $maxlifetime < time() && file_exists($file)) {
                unlink($file);
            }
        }
        return true;
    }
}

$handler = new FileSessionHandler();
session_set_save_handler(
    array($handler, 'open'),
    array($handler, 'close'),
    array($handler, 'read'),
    array($handler, 'write'),
    array($handler, 'destroy'),
    array($handler, 'gc')
    );
register_shutdown_function('session_write_close');

session_write_close();
session_set_cookie_params([
	'lifetime' => 86400,
	'path' => '/',
	'domain' => 'wurmcw.ddns.net',
	'secure' => true,
	'httponly' => false,
	'samesite' => 'Lax'
]);
session_start();
?>