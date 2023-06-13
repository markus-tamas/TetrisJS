function doAdminStuff(type) {
	event.preventDefault();
	var xmlhttp = new XMLHttpRequest();
	
	xmlhttp.open("POST","./_POST/do_admin.php",true);
	xmlhttp.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');
	
	switch (type) {
		// NOTIFICATION HANDLING
		case 1:
			document.getElementById("notifFeedback").innerHTML="Processing...";
			let txt = document.getElementById("notifText").value;
			xmlhttp.onreadystatechange = function() {
				if (this.readyState == 4 && this.status == 200) {
					var response = this.responseText;
					if (response == "Done!") {
						document.getElementById("notifFeedback").innerHTML="Success!";
						setTimeout(function() {
							document.getElementById("notifFeedback").innerHTML="";
						}, 3000);
					} else {
						document.getElementById("notifFeedback").innerHTML="Error:<br>"+response;
						setTimeout(function() {
							document.getElementById("notifFeedback").innerHTML="";
						}, 30000);
					}
				}
			};
			xmlhttp.send("type="+type+"&txt="+txt);
			break;
		// INVALID TYPE HANDLING
		default:
			console.log("Oops.");
	}
	
	return false;
}