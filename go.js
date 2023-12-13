var board;
var currentPlayer;
function createBoard(){
    board = new Array(8);
    for(var i = 0; i < board.length; i++){
        board[i] = new Array(8);
    }
    for(var i = 0; i < board.length; i++){
        for(var j = 0; j < board[i].length; j++){
            board[i][j] = "O";
        }
    }
    board[3][3] = "W";
    board[3][4] = "B";
    board[4][3] = "B";
    board[4][4] = "W";
}
function printBoard(){
    var boardText = "";
    for(var i  = 0; i < board.length; i ++){
        boardText += "<p>";
        for(var j = 0; j < board[i].length; j++){
            boardText += board[i][j];
        }
        boardText += "</p>";
    }
    document.getElementById("board").innerHTML = boardText;
}
/*Takes piece being placed's row, collumn and color and returns true if there is a line of the opposite color
 that ends with the matching color from that location (play is valid)*/
function checkVerticalUp(pieceRow, pieceCol, colorCheck){
    if(pieceRow < 2){
        return false;
    }
    var curLoc = pieceRow-1;
    var currentSpot = board[curLoc][pieceCol];
    if(currentSpot == colorCheck){
        return false;
    }
    //Iterate upwards until currentspot matches the color being played (meaning the location is valid)
    while(currentSpot != colorCheck){
        //check that the current spot is not empty (nothing above so cannot play)
        if(currentSpot == "O"){
            return false;
        }
        //Go up 1
        curLoc--;
        //Went off the board
        if(curLoc < 0){
            return false;
        }
        currentSpot = board[curLoc][pieceCol];
    }
    //If it makes it through the while loop then it will return true (valid move)
    return true;
    
}
function checkVerticalDown(pieceRow, pieceCol, colorCheck){
    //Not enough room for it to be a possible play
    if(pieceRow > 5){
        return false;
    }
    var curLoc = pieceRow+1;
    var currentSpot = board[curLoc][pieceCol];
    if(currentSpot == colorCheck){
        return false;
    }
    //Iterate downwards until currentspot is the same as the color being played (meaning the location is valid)
    while(currentSpot != colorCheck){
        //check that the current spot is not empty (nothing above so cannot play)
        if(currentSpot == "O"){
            return false;
        }
        //Go down 1
        curLoc++;
        //Went off the board
        if(curLoc > 7){
            return false;
        }
        currentSpot = board[curLoc][pieceCol];
    }
    //If it makes it through the while loop then it will return true (valid move)
    return true;
}
function checkHorizontalLeft(pieceRow, pieceCol, colorCheck){
    if(pieceCol < 2){
        return false;
    }
    var curLoc = pieceCol-1;
    var currentSpot = board[pieceRow][curLoc];
    if(currentSpot == colorCheck){
        return false;
    }
    while(currentSpot != colorCheck){
        if(currentSpot == "O"){
            return false;
        }
        curLoc--;
        if(curLoc < 0){
            return false;
        }
        currentSpot = board[pieceRow][curLoc];
    }
    return true;
}
function checkHorizontalRight(pieceRow, pieceCol, colorCheck){
    if(pieceCol > 5){
        return false;
    }
    var curLoc = pieceCol+1;
    var currentSpot = board[pieceRow][curLoc];
    if(currentSpot == colorCheck){
        return false;
    }
    while(currentSpot != colorCheck){
        if(currentSpot == "O"){
            return false;
        }
        curLoc++;
        if(curLoc > 7){
            return false;
        }
        currentSpot = board[pieceRow][curLoc];
    }
    return true;
}
function checkDiagonalTopLeft(pieceRow, pieceCol, colorCheck){
    if(pieceCol < 2 || pieceRow < 2){
        return false;
    }
    var curCol = pieceCol--;
    var curRow = pieceRow--;
    var currentSpot = board[curCol][curRow];
    if(currentSpot == colorCheck){
        return false;
    }
    while(currentSpot != colorCheck){
        if(currentSpot){
            return false;
        }
        curCol--;
        curRow--;
        if(curCol < 0 || curRow < 0){
            return false;
        }
        currentSpot[curCol][curRow];
    }
    return true;
}
function checkDiagonalTopRight(pieceRow, pieceCol, colorCheck){
    if(pieceCol > 5 || pieceRow < 2){
        return false;
    }
    var curCol = pieceCol++;
    var curRow = pieceRow--;
    var currentSpot = board[curCol][curRow];
    if(currentSpot == colorCheck){
        return false;
    }
    while(currentSpot != colorCheck){
        if(currentSpot){
            return false;
        }
        curCol++;
        curRow--;
        if(curCol > 7 || curRow < 0){
            return false;
        }
        currentSpot[curCol][curRow];
    }
    return true;
}
function checkDiagonalBottomLeft(pieceRow, pieceCol, colorCheck){
    if(pieceCol > 5 || pieceRow < 2){
        return false;
    }
    var curCol = pieceCol--;
    var curRow = pieceRow++;
    var currentSpot = board[curCol][curRow];
    if(currentSpot == colorCheck){
        return false;
    }
    while(currentSpot != colorCheck){
        if(currentSpot){
            return false;
        }
        curCol--;
        curRow++;
        if(curCol < 0 || curRow > 7){
            return false;
        }
        currentSpot[curCol][curRow];
    }
    return true;
}
function checkDiagonalBottomRight(pieceRow, pieceCol, colorCheck){
    if(pieceCol > 5 || pieceRow > 5){
        return false;
    }
    var curCol = pieceCol++;
    var curRow = pieceRow++;
    var currentSpot = board[curCol][curRow];
    if(currentSpot == colorCheck){
        return false;
    }
    while(currentSpot != colorCheck){
        if(currentSpot){
            return false;
        }
        curCol++;
        curRow++;
        if(curCol > 7 || curRow > 7){
            return false;
        }
        currentSpot[curCol][curRow];
    }
    return true;
}
//Just uses all functions to see if a location is a valid move
function checkSurroundingLocations(pieceRow, pieceCol, colorCheck){
    if(checkVerticalUp(pieceRow, pieceCol, colorCheck) || checkVerticalDown(pieceRow, pieceCol, colorCheck) ||
    checkHorizontalLeft(pieceRow, pieceCol, colorCheck) || checkHorizontalRight(pieceRow, pieceCol, colorCheck) ||
    checkDiagonalTopLeft(pieceRow, pieceCol, colorCheck) || checkDiagonalTopRight(pieceRow, pieceCol, colorCheck) ||
    checkDiagonalBottomLeft(pieceRow, pieceCol, colorCheck) || checkDiagonalBottomRight(pieceRow, pieceCol, colorCheck)){
        return true;
    }
    else{
        return false;
    }
}
//Checks if the current player can make a move
function checkValidTurn(){
    //Check all spaces for a valid move
    for(var i = 0; i < board.length; i++){
        for(var j = 0; j < board.length; j++){
            if(checkSurroundingLocations(i, j, currentPlayer)){
                return true;
            }
        }
    }
    return false;
}
//Makes move at specified position
function makeMove(pieceRow, pieceCol){
    
}