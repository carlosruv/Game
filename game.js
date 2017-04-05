function makeGame()
{
	var gameBoard = [
		new Array(8),
		new Array(8),
		new Array(8),
		new Array(8),
		new Array(8),
		new Array(8),
		new Array(8),
		new Array(8),
	];
	
	gameBoard[randomNumber(8)][randomNumber(8)] = "S";
	
	while (true) {
		var row = randomNumber(8);
		var column = randomNumber(8);
		
		if (gameBoard[row][column] == undefined) {
			gameBoard[row][column] = "G";
			break;
		}
	}

	var challenges = [
		{monsterName: "Big Foot", 
		health: 20, 
		runChallenge: function() {
		var damage; 
		while (true) { 
		damage = randomNumber(7); 
		if (damage >= 5) { break;} } 
		document.write("Big Foot smashes " + damage + " from your health."); 
		return damage;}},
		{monsterName: "Werewolf", 
		health: 16, runChallenge: function() {
		var damage; 
		while (true) { damage = randomNumber(12); 
		if (damage >= 7) { break;} } 
		document.write("Werewolf bites " + damage + " from your health.");
		 return damage;}},
		{monsterName: "Ghost", 
		health: 13, 
		runChallenge: function() {var damage; 
		while (true) { damage = randomNumber(10); 
		if (damage >= 5) { break;} } 
		document.write("Ghost possesses " + damage + " from your health."); 
		return damage;}}
	];
	
	var numberOfChallenges;
	while (true) {
		numberOfChallenges = randomNumber(5);
		
		if (numberOfChallenges >= 2) {
			break;
		}
	}
	
	for (var i = 1; i <= numberOfChallenges; i++) {
		while (true) {
			var row = randomNumber(8);
			var column = randomNumber(8);
			
			if (gameBoard[row][column] == undefined) {
				gameBoard[row][column] = challenges[randomNumber(challenges.length)];
				break;
			}
		}
	}
	
	var obstacles = [
		{obstacleName: "Wall"},
		{obstacleName: "QuickSand"},
		{obstacleName: "Mud"}
	];
	
	var numberOfWalls;
	while (true) {
		numberOfWalls = randomNumber(5);
		
		if (numberOfWalls >= 2) {
			break;
		}
	}
	
	for (var i = 1; i <= numberOfWalls; i++) {
		while (true) {
			var row = randomNumber(8);
			var column = randomNumber(8);
			
			if (gameBoard[row][column] == undefined) {
				gameBoard[row][column] = obstacles[randomNumber(obstacles.length)];
				break;
			}
		}
	}
	
	var prizes = [
		{objectName: "Health Potion", 
		effect: function() {
		document.write("Restore 20 health."); 
		return 20;}},
		{objectName: "Super Health Potion", 
		effect: function() {
		document.write("Restores 50 health."); 
		return 50;}}
	];
	
	
	for (var i = 1; i <= 2; i++) {
		while (true) {
			var row = randomNumber(8);
			var column = randomNumber(8);
			
			if (gameBoard[row][column] == undefined) {
				gameBoard[row][column] = prizes[randomNumber(prizes.length)];
				break;
			}
		}
	}
	
	return gameBoard;
}

function randomNumber(number) 
{ 
	return Math.floor((Math.random() * number));
}

function checkStartingPoint(gameBoard)
{
	var coordinates = {};
	
	for (var i = 0; i < gameBoard.length; i++) {
		for (var j = 0; j < gameBoard[i].length; j++) {
			if (gameBoard[i][j] == "S") {
				coordinates["x"] = i;
				coordinates["y"] = j;
			}
		}
	}
	
	return coordinates;
}

function validateOutOfBounds(playerX, playerY, gameBoard)
{
	if (playerX < 0 || playerX > 7 || playerY < 0 || playerY > 7) {
		return true;
	}
	else {
		return false;
	}
}

function validateChallenge(playerX, playerY, gameBoard)
{
	if (gameBoard[playerX][playerY].hasOwnProperty("monsterName")) {
		return true;
	}
	else {
		return false;
	}
}

function validatePrize(playerX, playerY, gameBoard)
{
	if (gameBoard[playerX][playerY].hasOwnProperty("objectName")) {
		return true;
	}
	else {
		return false;
	}
}

function validateWall(playerX, playerY, gameBoard)
{
	if (gameBoard[playerX][playerY].hasOwnProperty("obstacleName")) {
		return true;
	}
	else {
		return false;
	}
}

function validateChoice(choice) {
	if (choice.toLowerCase() == "up" || 
	choice.toLowerCase() == "down" || 
	choice.toLowerCase() == "left" || 
	choice.toLowerCase() == "right") {
		return true;
	}
	else {
		return false;
	}
 }

function checkGoal(gameBoard)
{
	var goalCoordinates = {};
	
	for (var i = 0; i < gameBoard.length; i++) {
		for (var j = 0; j < gameBoard[i].length; j++) {
			if (gameBoard[i][j] == "G") {
				goalCoordinates["x"] = i;
				goalCoordinates["y"] = j;
			}
		}
	}
	
	return goalCoordinates;
}


function checkVictory(playerX, playerY, gameBoard, prizeArray)
{	
	var goalCoordinates = {};
		
		for (var i = 0; i < gameBoard.length; i++) {
			for (var j = 0; j < gameBoard[i].length; j++) {
				if (gameBoard[i][j] == "G") {
					goalCoordinates["x"] = i;
					goalCoordinates["y"] = j;
				}
			}
		}
	
	var prizeCounter = 0;
	
	for (var i = 0; i < prizeArray.length; i++) {
		if (prizeArray[i] != undefined) {
			prizeCounter++;
		}
	}
	
	if (goalCoordinates["x"] == playerX && goalCoordinates["y"] == playerY && prizeCounter == 2) {
		return 1;
	}
	else if (goalCoordinates["x"] == playerX && goalCoordinates["y"] == playerY && prizeCounter != 2){
		return 0;
	}
	else if (goalCoordinates["x"] != playerX && goalCoordinates["y"] != playerY && prizeCounter == 2){
		return -1;
	}
	
	return -2;
}


function makePlayer() 
{
	var adventurers = [
		{playerName: "Warrior", 
		health: 35, 
		runChallenge: function() {
		var damage; 
		while (true) {damage = randomNumber(12); 
		if (damage >= 7) { 
		break;} } 
		document.write("You apply" + damage + " to the monster. "); 
		return damage;}},
		{playerName: "Archer", 
		health: 30, 
		runChallenge: function() {
		var damage; 
		while (true) {damage = randomNumber(10); 
		if (damage >= 7) { 
		break;} } 
		document.write("You apply " + damage + " to the monster. "); 
		return damage;}},
		{playerName: "Wizard", 
		health: 25, 
		runChallenge: function() {
		var damage; 
		while (true) {damage = randomNumber(9);
		 if (damage >= 5) { 
		 break;} } 
		 document.write("You apply " + damage + " to the monster. "); 
		 return damage;}}
	];
	
	var player = adventurers[randomNumber(adventurers.length)];
	
	return player;
}

function playGame()
{
	while (true) {
		var gameBoard = makeGame();
		
		var player = makePlayer();
		
		var coordinatesOfStartingPoint = checkStartingPoint(gameBoard);
		var goalX = undefined;
		var goalY = undefined;
		
		var playerX = coordinatesOfStartingPoint["x"];
		var playerY = coordinatesOfStartingPoint["y"];
		
		var arrayOfPrizes = new Array(2);
		
		var prizeCounter = 0;
		
		
		while (true) {
		
			document.getElementById("playerHealth").innerHTML = "Player Health: " + player.health;
			document.getElementById("playerCoordinates").innerHTML = "Player Coordinates: " + playerX + "," + playerY;
			document.getElementById("goalCoordinates").innerHTML = "Goal Coordinates: " + goalX + "," + goalY;
			document.getElementById("prizes").innerHTML = "Prizes: " + arrayOfPrizes[0] + "," + arrayOfPrizes[1];
			if (player.health <= 0) {
				document.getElementById("gameState").innerHTML = "Player lost!";
				break;
			}
			
			var choice = prompt("Your move: Up, Down, Left, or Right?");
		
			if (validateChoice(choice)) {
				if (choice.toLowerCase() == "up") {
					if (validateOutOfBounds(playerX - 1, playerY, gameBoard)) {
						alert("Encountered out of bounds. Your choices should be: Down, Left, or Right.");
					}
					else if (gameBoard[playerX - 1][playerY] == undefined || 
								   gameBoard[playerX - 1][playerY] == "G" || 
					               gameBoard[playerX - 1][playerY] == "S") {
						playerX = playerX - 1;
						if (checkVictory(playerX, playerY, gameBoard, arrayOfPrizes) == 1) {
							document.getElementById("gameState").innerHTML = "You found all the prizes and the goal.";
							goalX = playerX;
							goalY = playerY;
							break;
							
						}
						else if (checkVictory(playerX, playerY, gameBoard, arrayOfPrizes) == 0) {
							document.getElementById("gameState").innerHTML = "You found the goal but not the prizes.";
							goalX = playerX;
							goalY = playerY;
						}
						else if (checkVictory(playerX, playerY, gameBoard, arrayOfPrizes) == -1) {
							document.getElementById("gameState").innerHTML = "You found all prizes but not the goal.";
						}
					}
					else if (validateWall(playerX - 1, playerY, gameBoard)) {
						alert("Encountered Wall. Your choices should be: Down, Left, or Right.");
					}
					else if (validatePrize(playerX - 1, playerY, gameBoard)) {
						playerX = playerX - 1;
						arrayOfPrizes[prizeCounter] = gameBoard[playerX][playerY].objectName;
						prizeCounter++;
						player.health += gameBoard[playerX][playerY].effect();
						alert("You picked up a " + gameBoard[playerX][playerY].objectName + ".");
						gameBoard[playerX][playerY] = undefined;
					}
					else if (validateChallenge(playerX - 1, playerY, gameBoard)) {
						choice = prompt("Monster encountered! Do you want to challenge the monster? (yes or no)");
						if (choice.toLowerCase() == "yes") {
							document.write(player.playerName + " engages with " + gameBoard[playerX - 1][playerY].monsterName + "!");
							
							while(true) {
								gameBoard[playerX - 1][playerY].health -= player.runChallenge();
								
								if (gameBoard[playerX - 1][playerY].health <= 0) {
									document.write(player.playerName + " wins the battle against " + gameBoard[playerX - 1][playerY].monsterName + "!");
									gameBoard[playerX - 1][playerY] == undefined;
									playerX = playerX - 1;
									break;
								}
								player.health -= gameBoard[playerX - 1][playerY].runChallenge();
								
								if (player.health <= 0) {
									player.health = 0;
									document.write(player.playerName + " loses the battle against " + gameBoard[playerX - 1][playerY].monsterName + "!");
									break;
								}
							}
							
						}
						else if (choice.toLowerCase() == "no"){
							alert("Player decides not to fight with challenger.");
						}
					}
				}
				else if (choice.toLowerCase() == "down") {
					if (validateOutOfBounds(playerX + 1, playerY, gameBoard)) {
						alert("Encountered out of bounds. Your choices should be: Up, Left, or Right.");
					}
					else if (gameBoard[playerX + 1][playerY] == undefined || 
								   gameBoard[playerX + 1][playerY] == "G" || 
								   gameBoard[playerX + 1][playerY] == "S") {
						playerX = playerX + 1;
						if (checkVictory(playerX, playerY, gameBoard, arrayOfPrizes) == 1) {
							document.getElementById("gameState").innerHTML = "You found all the prizes and the goal.";
							goalX = playerX;
							goalY = playerY;
							break;											
						}
						else if (checkVictory(playerX, playerY, gameBoard, arrayOfPrizes) == 0) {
							document.getElementById("gameState").innerHTML = "You found the goal but not the prizes.";
							goalX = playerX;
							goalY = playerY;
						}
						else if (checkVictory(playerX, playerY, gameBoard, arrayOfPrizes) == -1) {
							document.getElementById("gameState").innerHTML = "You found all prizes but not the goal.";
						}
					}
					else if (validateWall(playerX + 1, playerY, gameBoard)) {
						alert("Encountered Wall. Your choices should be: Up, Left, or Right.");
					}
					else if (validatePrize(playerX + 1, playerY, gameBoard)) {
						playerX = playerX + 1;
						arrayOfPrizes[prizeCounter] = gameBoard[playerX][playerY].objectName;
						prizeCounter++;
						player.health += gameBoard[playerX][playerY].effect();
						alert("You picked up a " + gameBoard[playerX][playerY].objectName + ".");
						gameBoard[playerX][playerY] = undefined;
					}
					else if (validateChallenge(playerX + 1, playerY, gameBoard)) {
						choice = prompt("Monster encountered! Do you want to challenge the monster? (yes or no)");
						if (choice.toLowerCase() == "yes") {
							while(true) {
								gameBoard[playerX + 1][playerY].health -= player.runChallenge();
								
								if (gameBoard[playerX + 1][playerY].health <= 0) {
									document.write(player.playerName + " wins the battle against " + gameBoard[playerX + 1][playerY].monsterName + "!");
									gameBoard[playerX + 1][playerY] == undefined;
									playerX = playerX + 1;
									break;
								}
								player.health = player.health - gameBoard[playerX + 1][playerY].runChallenge();
								
								if (player.health <= 0) {
									player.health = 0;
									document.write(player.playerName + " loses the battle against " + gameBoard[playerX + 1][playerY].monsterName + "!");
									break;
								}
							}
							
						}
						else if (choice.toLowerCase() == "no"){
							alert("Player decides not to fight.");
						}
					}
				}
				else if (choice.toLowerCase() == "left") {
					if (validateOutOfBounds(playerX, playerY - 1, gameBoard)) {
						alert("Encountered out of bounds. Your choices should be: Up, Down, or Right.");
					}
					else if (gameBoard[playerX][playerY - 1] == undefined || 
								   gameBoard[playerX][playerY - 1] == "G" || gameBoard[playerX][playerY - 1] == "S") {
						playerY = playerY - 1;
						if (checkVictory(playerX, playerY, gameBoard, arrayOfPrizes) == 1) {
							document.getElementById("gameState").innerHTML = "You found all the prizes and the goal.";
							goalX = playerX;
							goalY = playerY;
							break;
						}
						else if (checkVictory(playerX, playerY, gameBoard, arrayOfPrizes) == 0) {
							document.getElementById("gameState").innerHTML = "You found the goal but not the prizes.";
							goalX = playerX;
							goalY = playerY;
						}
						else if (checkVictory(playerX, playerY, gameBoard, arrayOfPrizes) == -1) {
							document.getElementById("gameState").innerHTML = "You found all prizes but not the goal.";
						}
					}
					else if (validateWall(playerX, playerY - 1, gameBoard)) {
						alert("Encountered Wall. Your choices should be: Down, Left, or Right.");
					}
					else if (validatePrize(playerX, playerY - 1, gameBoard)) {
						playerY = playerY - 1;
						arrayOfPrizes[prizeCounter] = gameBoard[playerX][playerY].objectName;
						prizeCounter++;
						player.health += gameBoard[playerX][playerY].effect();
						alert("You picked up a " + gameBoard[playerX][playerY].objectName + ".");
						gameBoard[playerX][playerY] = undefined;
					}
					else if (validateChallenge(playerX, playerY - 1, gameBoard)) {
						choice = prompt("Monster encountered! Do you want to challenge the monster? (yes or no)");
						if (choice.toLowerCase() == "yes") {
							while(true) {
								gameBoard[playerX][playerY - 1].health -= player.runChallenge();
								
								if (gameBoard[playerX][playerY - 1].health <= 0) {
									document.write(player.playerName + " wins the battle against " + gameBoard[playerX][playerY - 1].monsterName + "!");
									gameBoard[playerX][playerY - 1] == undefined;
									playerY = playerY - 1;
									break;
								}
								player.health -= gameBoard[playerX][playerY - 1].runChallenge();
								
								if (player.health <= 0) {
									player.health = 0;
									document.write(player.playerName + " loses the battle against " + gameBoard[playerx][playerY - 1].monsterName + "!");
									break;
								}
							}
							
						}
						else if (choice.toLowerCase() == "no"){
							alert("Player decides not to fight with challenger.");
						}
					}
				}
				else if (choice.toLowerCase() == "right") {
					if (validateOutOfBounds(playerX, playerY + 1, gameBoard)) {
						alert("out of bounds. Your choices should be: Up, Down, or Left.");
					}
					else if (gameBoard[playerX][playerY + 1] == undefined ||
								   gameBoard[playerX][playerY + 1] == "G" || 
								   	gameBoard[playerX][playerY + 1] == "S") {
						playerY = playerY + 1;
						if (checkVictory(playerX, playerY, gameBoard, arrayOfPrizes) == 1) {
							document.getElementById("gameState").innerHTML = "You found all the prizes and the goal.";
							goalX = playerX;
							goalY = playerY;
							break;
						}
						else if (checkVictory(playerX, playerY, gameBoard, arrayOfPrizes) == 0) {
							document.getElementById("gameState").innerHTML = "You found the goal but not the prizes.";
							goalX = playerX;
							goalY = playerY;
						}
						else if (checkVictory(playerX, playerY, gameBoard, arrayOfPrizes) == -1) {
							document.getElementById("gameState").innerHTML = "You found all but not the goal.";
						}
					}
					else if (validateWall(playerX, playerY + 1, gameBoard)) {
						alert("Encountered Wall. Your choices should be: Down, Left, or Left.");
					}
					else if (validatePrize(playerX, playerY + 1, gameBoard)) {
						playerY = playerY + 1;
						arrayOfPrizes[prizeCounter] = gameBoard[playerX][playerY].objectName;
						prizeCounter++;
						player.health += gameBoard[playerX][playerY].effect();
						alert("You picked up a " + gameBoard[playerX][playerY].objectName + ".");
						gameBoard[playerX][playerY] = undefined;
					}
					else if (validateChallenge(playerX, playerY + 1, gameBoard)) {
						choice = prompt("Monster encountered! Do you want to challenge the monster? (yes or no)");
						if (choice.toLowerCase() == "yes") {
							while(true) {
								gameBoard[playerX][playerY + 1].health -= player.runChallenge();
								
								if (gameBoard[playerX][playerY + 1].health <= 0) {
									document.write(player.playerName + " wins the battle against " + gameBoard[playerX][playerY + 1].monsterName + "!");
									gameBoard[playerX][playerY + 1] == undefined;
									playerY = playerY + 1
									break;
								}
								player.health -= gameBoard[playerX][playerY + 1].runChallenge();
								
								if (player.health <= 0) {
									player.health = 0;
									document.write(player.playerName + " loses the battle against " + gameBoard[playerX][playerY + 1].monsterName + "!");
									break;
								}
							}
							
						}
						else if (choice.toLowerCase() == "no"){
							alert("Player decides not to fight with challenger.");
						}
					}
				}
			}
			else {
				document.getElementById("text").innerHTML = "Invalid Move. Your choices should be: Up, Down, Left, or Right.";
			}
			
		}
		
		var choice2 = prompt("Do you want to replay the game? (yes or no)?");
		if (choice2.toLowerCase() == "yes") {
			continue;
		}
		else if (choice2.toLowerCase() == "no") {
			break;
		}
		
	}
}

playGame();