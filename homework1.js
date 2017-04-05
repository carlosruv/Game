



var board = []; 

for (var i = 0 ; i < 8; i++) {
    board[i] = []; 
    for (var j = 0; j < 8; j++) { 
        board[i][j] = shuffle();
    }
    
    
}

console.log(board);



function shuffle() {
var objList = ["wall", "monster", "life"];

   var randInt = Math.floor(Math.random() * 6); 
   
   
   for(var x = 0; x < board.length; x++){
	   for(var y = 0; y < board[x].length; y++){
   	
  
   
   if(objList[x] == board[x][y]){
   	break;
   	
   	return;
   }
   else {
   var item  = objList[randInt];
   break;
   }
   
   }
   }
    return item;
}




