window.addEventListener("load", initFunc, false);
//                   J         L         I         O         S         T         Z
var defColors = ["#2244DD","#DD7733","#22CCDD","#EEDD33","#22DD44","#CC22DD","#DD2244"];
var colors = defColors;
var _DAS = 100;
var _ARR = 50;
var _Drop = 50;
var leaderboardMode = "solo";
var leaderboardScope = 0;
var leaderboardType = 0;
var bonusWidth = 0;

function initFunc() {
	// Touch stuff
	window.addEventListener('touchstart', function(e) {limit(e)});
	window.addEventListener('touchmove', function(e) {limit(e)});
	document.querySelector("#contentbox>.flex-container:nth-child(2)").addEventListener('scroll', function(e) {limit(e)}, false);
	window.addEventListener('panstart', function(e){e.preventDefault()});
	window.addEventListener('pan', function(e){e.preventDefault()});
	
	// Misc events
	window.addEventListener('resize', handleResize, false);
	document.querySelector("#main *").addEventListener('click', uncheckMenu, false);
	if (document.querySelector("#menu *") != null) document.querySelector("#menu *").removeEventListener('click', uncheckMenu);
	document.querySelector("#footer *").addEventListener('click', uncheckMenu, false);
	if (document.querySelector("#burger") != null) document.querySelector("#burger, #burger nav, #burger nav label, #burger nav label div").addEventListener('click', function() {document.querySelector("#toggle1").click()}, false);
	
	// Buttons
	if (document.querySelector("#refreshUsers") != null) document.querySelector("#refreshUsers").addEventListener('click', handleRefreshUsers, false);
	if (document.querySelector("#refreshScores") != null) {
		document.querySelector("#scoreAlltime").addEventListener('click', function() {leaderboardScope=0;handleRefreshScores();}, false);
		document.querySelector("#scoreMonthly").addEventListener('click', function() {leaderboardScope=1;handleRefreshScores();}, false);
		document.querySelector("#scoreWeekly").addEventListener('click', function() {leaderboardScope=2;handleRefreshScores();}, false);
		document.querySelector("#scoreDaily").addEventListener('click', function() {leaderboardScope=3;handleRefreshScores();}, false);
	}
	if (document.querySelector("#gameType") != null) {
		document.querySelector("#scoreClassic").addEventListener('click', function() {leaderboardMode="solo";handleRefreshScores();}, false);
		document.querySelector("#scoreTimed").addEventListener('click', function() {leaderboardMode="timed";handleRefreshScores();}, false);
		document.querySelector("#scoreRows").addEventListener('click', function() {leaderboardMode="limit";handleRefreshScores();}, false);
		//document.querySelector("#scorePVP").addEventListener('click', function() {leaderboardMode="1v1";handleRefreshScores();}, false);
	}
	
	// Form handling events
	if (document.querySelector('#registerform>form') != null) document.querySelector('#registerform>form').addEventListener("submit", validateRegisterForm, false);
	if (document.querySelector('#loginform>form') != null) document.querySelector('#loginform>form').addEventListener("submit", validateLoginForm, false);
	if (document.querySelector('#pswresetform>form') != null) document.querySelector('#pswresetform>form').addEventListener("submit", validateResetForm, false);
	if (document.querySelector('#pswchangeform>form') != null) document.querySelector('#pswchangeform>form').addEventListener("submit", validateChangeForm, false);
	if (document.querySelector('#changeSettings') != null) document.querySelector('#changeSettings').addEventListener("click", validateSettingForm, false);
	if (document.querySelector('#rstBtn') != null) document.querySelector('#rstBtn').addEventListener("click", rstSttngs, false);
	
	// Onload todo
	handleResize();
	document.querySelectorAll(".hidden").forEach(e => e.style.display="none");
	if (document.getElementById("notifs") != null) getNotifs();
	if (document.getElementById("playButton") != null) loadMisc(0);
	if (document.getElementById("refreshUsers") != null) handleRefreshUsers();
	if (document.getElementById("refreshScores") != null) handleRefreshScores();
	if (document.getElementById("changeSettings") != null) {loadSettings(true);leaderboardType=1;handleRefreshScores();loadMisc(1);} else {loadSettings();}
	if(typeof loadButtons === "function") { loadButtons(); initAudio(); }
}

function limit(e) {
	e.preventDefault();
	const el = document.querySelector("#contentbox>.flex-container:nth-child(2)");
	if (el != null) {
		const modificant = document.querySelector("#contentbox");
		if (el.scrollHeight - Math.abs(el.scrollTop) === el.clientHeight) {
			modificant.classList.add("atBottom");
		} else {
			modificant.classList.remove("atBottom");
		}
	}
	//document.getElementById("games").innerHTML="Hello";
}

function handleResize() {
	// Welcome text visibility
	if (document.getElementById("welcome") != null) {
		if (window.innerWidth < 420) {
			document.getElementById("welcome").classList.add("smol");
		} else {
			document.getElementById("welcome").classList.remove("smol");
		}
	}
	
	// Content wrap direction
	const ctx = document.querySelector("#contentbox>.flex-container:nth-child(2)");
	const n = ctx.children.length;
	const divs = ctx.children;
	let sumWidth = 0;
	const winWidth = ctx.scrollWidth;
	const winHeight = ctx.scrollHeight;
	for (i=0;i<n;i++) {
		if ((typeof UIModify === "function") && (divs[i]===document.querySelector("#tetris"))) {
			sumWidth += 245;
		} else sumWidth += divs[i].scrollWidth;
	}
	if (sumWidth+bonusWidth>winWidth) { ctx.classList.add("column"); }
	else { ctx.classList.remove("column"); }
	//document.getElementById("games").innerHTML=sumWidth+"<br>"+winWidth;
	
	// Tetris ingame UI modification
	if(typeof UIModify === "function") UIModify(sumWidth, winWidth, divs, ctx);
}

function handleRefreshUsers(delay = true) {
	if (!delay) {
		var xmlhttp = new XMLHttpRequest();
		xmlhttp.open("POST","./_POST/do_onlineusers.php",true);
		xmlhttp.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');
		xmlhttp.onreadystatechange = function() {
			if (this.readyState == 4 && this.status == 200) {
				response = JSON.parse(this.responseText);
				if (response.length<11) {
					out = "";
					for (i=0;i<response.length;i++) {
						out += "<tr><td>" + response[i] + "</td></tr>";
					}
				} else {
					out = "";
					for (i=0;i<9;i++) {
						out += "<tr><td>" + response[i] + "</td></tr>";
					}
					out += "<tr><td>+" + (response.length-9) + " more</td></tr>";
				}
				document.getElementById("online").innerHTML = out;
			}
		}
		xmlhttp.send("yes=yes");
		return true;
	} else {
		setTimeout(function() {handleRefreshUsers(false);}, 100);
	}
}

function handleRefreshScores() {
	if (!leaderboardType && document.querySelector("#refreshScores") != null) { // Recolor buttons
		let buttons = document.querySelectorAll("#refreshScores>button");
		buttons.forEach(b => b.style.backgroundColor = "");
		buttons[leaderboardScope].style.backgroundColor = "#aaaaaa";
	}
	if (document.querySelector("#gameType") != null) { // Recolor buttons
		let buttons = document.querySelectorAll("#gameType>button");
		buttons.forEach(b => b.style.backgroundColor = "");
		if(leaderboardMode=="solo") buttons[0].style.backgroundColor = "#aaaaaa";
		if(leaderboardMode=="timed") buttons[1].style.backgroundColor = "#aaaaaa";
		if(leaderboardMode=="limit") buttons[2].style.backgroundColor = "#aaaaaa";
		//if(leaderboardMode=="1v1") buttons[3].style.backgroundColor = "#aaaaaa";
	}
	
	var xmlhttp = new XMLHttpRequest();
	xmlhttp.open("POST","./_POST/do_highscores.php",true);
	xmlhttp.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');
	xmlhttp.onreadystatechange = function() {
		if (this.readyState == 4 && this.status == 200) {
			response = JSON.parse(this.responseText);
			if (leaderboardType==0) {
				out = "";
				for (let i=0;i<response.length;i++) {
					out += '<tr><td>'+response[i][0]+"</td><td>"+response[i][1]+"</td></tr>";
				}
				document.getElementById("scores").innerHTML = out;
			} else {
				out = '<tr><th><a href="" id="p">Points</a></th><th><a href="" id="r">Rows</a></th><th><a href="" id="d">Date</a></th></tr>';
				for (i=0;i<response.length;i++) {
					let t = new Date(parseInt(response[i][2])*1000);
					date = t.getFullYear() + "." + (padTo(t.getMonth()+1,2)) + "." + padTo(t.getDate(),2) + ". " + padTo(t.getHours(),2) + ":" + padTo(t.getMinutes(),2);
					out += "<tr><td>"+response[i][0]+"</td><td>"+response[i][1]+"</td><td>"+date+"</td></tr>";
				}
				document.getElementById("hs").innerHTML = out;
				setCalls();
			}
		}
	}
	xmlhttp.send("yes=yes&scope="+leaderboardScope+"&type="+leaderboardType+"&mode="+leaderboardMode);
	return true;
}

function loadMisc(type=0) {
	var xmlhttp = new XMLHttpRequest();
	xmlhttp.open("POST","./_POST/do_miscstats.php",true);
	xmlhttp.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');
	xmlhttp.onreadystatechange = function() {
		if (this.readyState == 4 && this.status == 200) {
			resp = JSON.parse(this.responseText);
			switch (type) {
				case 0:
				case 1:
					document.getElementById("numGames").innerHTML=resp[0][0];
					document.getElementById("playTime").innerHTML=Math.floor(resp[0][2]/3600)+"h"+Math.floor((resp[0][2]%3600)/60)+"m";
					let gameLength = parseInt(resp[0][1]);
					if (!isNaN(gameLength)) {
						document.getElementById("longGame").innerHTML = Math.floor(gameLength/60)+"m"+padTo((gameLength%60),2)+"s";
					} else {
						document.getElementById("longGame").innerHTML = 0;
					}
					break;
			}
		}
	}
	xmlhttp.send("yes=yes&type="+type);
	return true;
}

function uncheckMenu() {
	let menuCheckbox = document.querySelector("#toggle1");
	if (menuCheckbox != null) {
		menuCheckbox.checked = true;
		menuCheckbox.click();
	}
}

function validateRegisterForm() {
	event.preventDefault();
	document.getElementById("registerFeedback").innerHTML="Processing...";
	let uname = document.getElementById("username").value;
	let email = document.getElementById("email").value;
	let psw = document.getElementById("password").value;
	let cpsw = document.getElementById("confirmpassword").value;
	if (psw != cpsw) {
		document.getElementById("registerFeedback").innerHTML="Passwords do not match!";
		return false;
	}
	var xmlhttp = new XMLHttpRequest();
	xmlhttp.open("POST","./_POST/do_register.php",true);
	xmlhttp.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');
	xmlhttp.onreadystatechange = function() {
		if (this.readyState == 4 && this.status == 200) {
			var response = this.responseText;
			document.getElementById("registerFeedback").innerHTML = response;
			if (response == "Done!") {
				window.location.href = './';
			}
		}
	};
	xmlhttp.send("uname="+uname+"&email="+email+"&psw="+psw);
	return false;
}

function validateLoginForm() {
	event.preventDefault();
	document.getElementById("loginFeedback").innerHTML="Processing...";
	let uname = document.getElementById("username").value;
	let psw = document.getElementById("password").value;
	var xmlhttp = new XMLHttpRequest();
	xmlhttp.open("POST","./_POST/do_login.php",true);
	xmlhttp.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');
	xmlhttp.onreadystatechange = function() {
		if (this.readyState == 4 && this.status == 200) {
			var response = this.responseText;
			document.getElementById("loginFeedback").innerHTML = response;
			if (response == "Logged in!") {
				window.location.href = './lobby.php';
			}
		}
	};
	xmlhttp.send("uname="+uname+"&psw="+psw+"&time="+Date.now());
	return false;
}

function validateResetForm() {
	event.preventDefault();
	document.getElementById("pswResetFeedback").innerHTML="Processing...";
	let uname = document.getElementById("username").value;
	let email = document.getElementById("email").value;
	var xmlhttp = new XMLHttpRequest();
	xmlhttp.open("POST","./_POST/do_newpass.php",true);
	xmlhttp.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');
	xmlhttp.onreadystatechange = function() {
		if (this.readyState == 4 && this.status == 200) {
			var response = this.responseText;
			document.getElementById("pswResetFeedback").innerHTML = response;
		}
	};
	xmlhttp.send("uname="+uname+"&email="+email);
	return false;
}

function validateChangeForm() {
	event.preventDefault();
	document.getElementById("pswChangeFeedback").innerHTML="Processing...";
	let psw = document.getElementById("oldpsw").value;
	let newpass = document.getElementById("password").value;
	let newpass2 = document.getElementById("confirmpassword").value;
	if (newpass != newpass2) {
		document.getElementById("pswChangeFeedback").innerHTML="Passwords do not match!";
		return false;
	}
	if (newpass == psw) {
		document.getElementById("pswChangeFeedback").innerHTML="Please use a new password!";
		return false;
	}
	var xmlhttp = new XMLHttpRequest();
	xmlhttp.open("POST","./_POST/do_changepass.php",true);
	xmlhttp.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');
	xmlhttp.onreadystatechange = function() {
		if (this.readyState == 4 && this.status == 200) {
			var response = this.responseText;
			document.getElementById("pswChangeFeedback").innerHTML = response;
		}
	};
	xmlhttp.send("psw="+psw+"&newpass="+newpass);
	return false;
}

function validateSettingForm() {
	document.getElementById("settingsFeedback").innerHTML="Processing...";
	let ColZ = document.getElementById("ColZ").value;
	let ColL = document.getElementById("ColL").value;
	let ColO = document.getElementById("ColO").value;
	let ColS = document.getElementById("ColS").value;
	let ColI = document.getElementById("ColI").value;
	let ColJ = document.getElementById("ColJ").value;
	let ColT = document.getElementById("ColT").value;
	let DAS = document.getElementById("DAS").value;
	let ARR = document.getElementById("ARR").value;
	let Drop = document.getElementById("Drop").value;
	var xmlhttp = new XMLHttpRequest();
	xmlhttp.open("POST","./_POST/do_settingsSet.php",true);
	xmlhttp.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');
	xmlhttp.onreadystatechange = function() {
		if (this.readyState == 4 && this.status == 200) {
			var response = this.responseText;
			document.getElementById("settingsFeedback").innerHTML = response;
			setTimeout(function() {document.getElementById("settingsFeedback").innerHTML = "";},5000);
			loadSettings();
		}
	};
	xmlhttp.send("ColZ="+ColZ+"&ColL="+ColL+"&ColO="+ColO+"&ColS="+ColS+"&ColI="+ColI+"&ColJ="+ColJ+"&ColT="+ColT+"&DAS="+DAS+"&ARR="+ARR+"&Drop="+Drop);
	return false;
}

function rstSttngs() {
	if(confirm("Are you sure you want to reset ALL settings?")) {
		document.getElementById("DAS").value = 100;
		document.getElementById("ARR").value = 50;
		document.getElementById("Drop").value = 50;
		document.getElementById("ColZ").value = defColors[6];
		document.getElementById("ColL").value = defColors[1];
		document.getElementById("ColO").value = defColors[3];
		document.getElementById("ColS").value = defColors[4];
		document.getElementById("ColI").value = defColors[2];
		document.getElementById("ColJ").value = defColors[0];
		document.getElementById("ColT").value = defColors[5];
		validateSettingForm();
	}
}

function loadSettings(fill = false) {
	var xmlhttp = new XMLHttpRequest();
	xmlhttp.open("POST","./_POST/do_settingsGet.php",true);
	xmlhttp.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');
	xmlhttp.onreadystatechange = function() {
		if (this.readyState == 4 && this.status == 200) {
			var r = JSON.parse(this.responseText);
			if (r==="Default") {
				// Ignore
			} else {
				_DAS = parseInt(r[0].DAS);
				_ARR = parseInt(r[0].ARR);
				_Drop = parseInt(r[0].Drop);
				colors = [r[0].ColJ,r[0].ColL,r[0].ColI,r[0].ColO,r[0].ColS,r[0].ColT,r[0].ColZ];
				if (fill) {
					document.getElementById("DAS").value = _DAS;
					document.getElementById("ARR").value = _ARR;
					document.getElementById("Drop").value = _Drop;
					document.getElementById("ColZ").value = r[0].ColZ;
					document.getElementById("ColL").value = r[0].ColL;
					document.getElementById("ColO").value = r[0].ColO;
					document.getElementById("ColS").value = r[0].ColS;
					document.getElementById("ColI").value = r[0].ColI;
					document.getElementById("ColJ").value = r[0].ColJ;
					document.getElementById("ColT").value = r[0].ColT;
				}
			}
		}
	};
	xmlhttp.send("yes=yes");
	return false;
}

function setCalls() {
	document.getElementById("p").addEventListener('click', function() {event.preventDefault(); leaderboardType=1; handleRefreshScores()});
	document.getElementById("r").addEventListener('click', function() {event.preventDefault(); leaderboardType=2; handleRefreshScores()});
	document.getElementById("d").addEventListener('click', function() {event.preventDefault(); leaderboardType=3; handleRefreshScores()});
}

function validateSession(refresh,login) {
	var xmlhttp = new XMLHttpRequest();
	xmlhttp.open("POST","./_POST/do_validate.php",true);
	xmlhttp.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');
	xmlhttp.onreadystatechange = function() {
		if (this.readyState == 4 && this.status == 200) {
			const response = JSON.parse(this.responseText);
			if (response.result == "Invalid!" && !login) {
				window.location.href = './';
			} else if (response.result == "Valid!" && login) {
				window.location.href = './lobby.php';
			}
			if (response.result == "Valid!") {
				if (document.getElementById("welcome") != null) document.getElementById("welcome").innerHTML="Welcome, <span>"+response.message+"</span>";
			}
			//document.getElementById("feedback").innerHTML=window.innerWidth;
		}
	}
	xmlhttp.send("refresh="+refresh);
	return true;
}

function doLogout() {
	event.preventDefault();
	var xmlhttp = new XMLHttpRequest();
	xmlhttp.open("POST","./_POST/do_logout.php",true);
	xmlhttp.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');
	xmlhttp.onreadystatechange = function() {
		if (this.readyState == 4 && this.status == 200) {
			window.location.href = './';
		}
	};
	xmlhttp.send("logout=1");
	return false;
}

function showMenu() {
	if (document.getElementById("toggle1").checked) {
		document.getElementById("menu").classList.add("open");
	} else {
		document.getElementById("menu").classList.remove("open");
	}
}

function padTo(num, length) {
	if (num != 0) {
		return "0".repeat(length-1-Math.floor(Math.log(Math.round(num))/Math.log(10))) + Math.round(num);
	} else {
		return "0".repeat(length);
	}
	
}

function addNotif(id,text1,update=false) {
	let not = document.getElementById("notifs");
	let con = document.createElement("div");
	con.id=update?"notif"+id:id;
	let txt = document.createElement("div");
	txt.innerHTML = text1;
	let X = document.createElement("div");
	X.addEventListener('click',function() {closeNotif(id,update);},false);
	X.innerHTML = "✖";
	con.appendChild(txt);
	con.appendChild(X);
	not.appendChild(con);
}

function getNotifs() {
	var xmlhttp = new XMLHttpRequest();
	xmlhttp.open("POST","./_POST/do_notifs.php",true);
	xmlhttp.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');
	xmlhttp.onreadystatechange = function() {
		if (this.readyState == 4 && this.status == 200) {
			var response = JSON.parse(this.responseText);
			for (let i=0;i<response.length;i++) {
				addNotif(response[i][0],response[i][1],true);
			}
		}
	};
	xmlhttp.send("action=retrieve");
}

function closeNotif(num,updateTime) {
	if (updateTime) {
		var xmlhttp = new XMLHttpRequest();
		xmlhttp.open("POST","./_POST/do_notifs.php",true);
		xmlhttp.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');
		xmlhttp.onreadystatechange = function() {
			if (this.readyState == 4 && this.status == 200) {
				// Nothing to do
			}
		};
		xmlhttp.send("action=update&id="+num);
		
		notif = "notif"+num;
	} else {
		notif = num;
	}
	if (document.querySelector("#notifs") != null) {
		document.querySelector("#notifs>#"+notif).classList.add("closed");
		document.querySelector("#notifs>#"+notif).addEventListener('transitionend', function temp() {
			setTimeout(function() {document.querySelector("#notifs>#"+notif).remove();}, 150);
		}, false);
	}
	if (document.querySelector("#pubnotifs") != null) {
		document.querySelector("#pubnotifs>#"+notif).classList.add("closed");
		document.querySelector("#pubnotifs>#"+notif).addEventListener('transitionend', function temp() {
			setTimeout(function() {document.querySelector("#pubnotifs>#"+notif).remove();}, 150);
		}, false);
	}
}