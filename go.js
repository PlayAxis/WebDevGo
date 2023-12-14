//Double array of strings with B, W, or O for black, white and empty respectively
var board;
// Holds the current players variable so "W" if whites turn or "B" if blacks turn
var currentPlayer;
// initialize canvas
const canvas = document.getElementById("goCanvas");
const ctx = canvas.getContext("2d");

function drawCanvas() {
    // reset canvas
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    for (var i = 0; i < board.length; i++) {
        for(var j = 0; j < board[i].length; j++) {
            switch(board[i][j]) {
                case "O":
                    let space = new Path2D();
                    let space_i = i;
                    let space_j = j;
                    space.rect(j*80, i*80, 80, 80);
                    ctx.stroke(space);
                    space.closePath();
                    canvas.addEventListener("click", e => {
                        if (ctx.isPointInPath(space, e.offsetX, e.offsetY)) {
                            makeMove(space_i, space_j);   
                        }
                    });
                    break;
                case "W":
                    ctx.beginPath();
                    ctx.rect(j*80, i*80, 80, 80);
                    ctx.stroke();
                    ctx.closePath();

                    ctx.beginPath();
                    ctx.arc(j * 80 + 40, i * 80 + 40, 40, 0, 2 * Math.PI);
                    ctx.fillStyle = "white";
                    ctx.fill()
                    ctx.stroke();
                    ctx.closePath();
                    break;
                case "B":
                    ctx.beginPath();
                    ctx.rect(j*80, i*80, 80, 80);
                    ctx.stroke();
                    ctx.closePath();
                    
                    ctx.beginPath();
                    ctx.arc(j * 80 + 40, i * 80 + 40, 40, 0, 2 * Math.PI);
                    ctx.fillStyle = "black";
                    ctx.fill()
                    ctx.stroke();
                    ctx.closePath();
                    break;
            }
        }
    }
}

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

//TODO: Implement this so its not just crappy UI, or not idc lol
function printBoard(){
    var boardText = "";
    for(var i  = 0; i < board.length; i ++){
        boardText += "<p>";
        for(var j = 0; j < board[i].length; j++){
            boardText += board[i][j];
        }
        boardText += "</p>";
    }

    drawCanvas();

    document.getElementById("board").innerHTML = boardText;
}

/*The following functions flip the pieces in the specified direction takes in the piece being played and the location it is played
DOES NOT CHECK IF THE SPOT IS VALID needs to be used with the check functions when implemented*/
function flipVerticalUp(pieceRow, pieceCol, colorCheck){
    curRow = pieceRow - 1;
    currentSpot = board[curRow][pieceCol];
    while(currentSpot != colorCheck){
        if(colorCheck == "W"){
            board[curRow][pieceCol] = "B";
        }
        else{
            board[curRow][pieceCol] = "W";
        }
        curRow--;
        currentSpot = board[curRow][pieceCol];
    }
}
function flipVerticalDown(pieceRow, pieceCol, colorCheck){
    curRow = pieceRow + 1;
    currentSpot = board[curRow][pieceCol];
    while(currentSpot != colorCheck){
        if(colorCheck == "W"){
            board[curRow][pieceCol] = "B";
        }
        else{
            board[curRow][pieceCol] = "W";
        }
        curRow++;
        currentSpot = board[curRow][pieceCol];
    }
}
function flipHorizontalLeft(pieceRow, pieceCol, colorCheck){
    curCol = pieceCol - 1;
    currentSpot = board[pieceRow][curCol];
    while(currentSpot != colorCheck){
        if(colorCheck == "W"){
            board[pieceRow][curCol] = "B";
        }
        else{
            board[pieceRow][curCol] = "W";
        }
        curCol--;
        currentSpot = board[pieceRow][curCol];
    }
}
function flipHorizontalRight(pieceRow, pieceCol, colorCheck){
    curCol = pieceCol + 1;
    currentSpot = board[pieceRow][curCol];
    while(currentSpot != colorCheck){
        if(colorCheck == "W"){
            board[pieceRow][curCol] = "B";
        }
        else{
            board[pieceRow][curCol] = "W";
        }
        curCol++;
        currentSpot = board[pieceRow][curCol]; 
    }
}
function flipDiagonalTopLeft(pieceRow, pieceCol, colorCheck){
    var curCol = pieceCol--;
    var curRow = pieceRow--;
    var currentSpot = board[curRow][curCol];
    while(currentSpot != colorCheck){
        while(currentSpot != colorCheck){
            if(colorCheck == "W"){
                board[curRow][curCol] = "B";
            }
            else{
                board[curRow][curCol] = "W";
            }
            curCol--;
            curRow--;
            currentSpot = board[curRow][curCol]; 
        }
    }
}
function flipDiagonalTopRight(pieceRow, pieceCol, colorCheck){
    var curCol = pieceCol++;
    var curRow = pieceRow--;
    var currentSpot = board[curRow][curCol];
    while(currentSpot != colorCheck){
        while(currentSpot != colorCheck){
            if(colorCheck == "W"){
                board[curRow][curCol] = "B";
            }
            else{
                board[curRow][curCol] = "W";
            }
            curCol++;
            curRow--;
            currentSpot = board[curRow][curCol]; 
        }
    }
}
function flipDiagonalBottomLeft(pieceRow, pieceCol, colorCheck){
    var curCol = pieceCol--;
    var curRow = pieceRow++;
    var currentSpot = board[curRow][curCol];
    while(currentSpot != colorCheck){
        while(currentSpot != colorCheck){
            if(colorCheck == "W"){
                board[curRow][curCol] = "B";
            }
            else{
                board[curRow][curCol] = "W";
            }
            curCol--;
            curRow++;
            currentSpot = board[curRow][curCol]; 
        }
    }
}
function flipDiagonalBottomRight(pieceRow, pieceCol, colorCheck){
    var curCol = pieceCol++;
    var curRow = pieceRow++;
    var currentSpot = board[curRow][curCol];
    while(currentSpot != colorCheck){
        while(currentSpot != colorCheck){
            if(colorCheck == "W"){
                board[curRow][curCol] = "B";
            }
            else{
                board[curRow][curCol] = "W";
            }
            curCol++;
            curRow++;
            currentSpot = board[curRow][curCol]; 
        }
    }
}

/*Takes piece being placed's row, collumn and color and returns true if there is a line of the opposite color
 that ends with the matching color from that location (play is valid)*/
function checkVerticalUp(pieceRow, pieceCol, colorCheck){
    if(pieceRow < 2){
        return false;
    }
    var curLoc = pieceRow - 1;
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
    var curLoc = pieceCol - 1;
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
    var curLoc = pieceCol + 1;
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
    var currentSpot = board[curRow][curCol];
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
        currentSpot[curRow][curCol];
    }
    return true;
}
function checkDiagonalTopRight(pieceRow, pieceCol, colorCheck){
    if(pieceCol > 5 || pieceRow < 2){
        return false;
    }
    var curCol = pieceCol++;
    var curRow = pieceRow--;
    var currentSpot = board[curRow][curCol];
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
        currentSpot[curRow][curCol];
    }
    return true;
}
function checkDiagonalBottomLeft(pieceRow, pieceCol, colorCheck){
    if(pieceCol > 5 || pieceRow < 2){
        return false;
    }
    var curCol = pieceCol--;
    var curRow = pieceRow++;
    var currentSpot = board[curRow][curCol];
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
        currentSpot[curRow][curCol];
    }
    return true;
}
function checkDiagonalBottomRight(pieceRow, pieceCol, colorCheck){
    if(pieceCol > 5 || pieceRow > 5){
        return false;
    }
    var curCol = pieceCol++;
    var curRow = pieceRow++;
    var currentSpot = board[curRow][curCol];
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
        currentSpot[curRow][curCol];
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
    if (currentPlayer == "B") {
        board[pieceRow][pieceCol] = "B";
    }
    else {
        board[pieceRow][pieceCol] = "W";
    }
    
    //check each direction and if it works then call the respective flip function
    if(checkVerticalUp(pieceRow, pieceCol, currentPlayer)){
        flipVerticalUp(pieceRow, pieceCol, currentPlayer);
    }
    if(checkVerticalDown(pieceRow, pieceCol, currentPlayer)){
        flipVerticalDown(pieceRow, pieceCol, currentPlayer);
    }
    if(checkHorizontalLeft(pieceRow, pieceCol, currentPlayer)){
        flipHorizontalLeft(pieceRow, pieceCol, currentPlayer);
    }
    if(checkHorizontalRight(pieceRow, pieceCol, currentPlayer)){
        flipHorizontalRight(pieceRow, pieceCol, currentPlayer);
    }
    if(checkDiagonalBottomLeft(pieceRow, pieceCol, currentPlayer)){
        flipDiagonalBottomLeft(pieceRow, pieceCol, currentPlayer);
    }
    if(checkDiagonalBottomRight(pieceRow, pieceCol, currentPlayer)){
        flipDiagonalBottomRight(pieceRow, pieceCol, currentPlayer);
    }
    if(checkDiagonalTopLeft(pieceRow, pieceCol, currentPlayer)){
        flipDiagonalTopLeft(pieceRow, pieceCol, currentPlayer);
    }
    if(checkDiagonalTopRight(pieceRow, pieceCol, currentPlayer)){
        flipDiagonalTopRight(pieceRow, pieceCol, currentPlayer);
    }
    //Swap turn so now it is the other players turn
    swapPlayer();
    //Check if the new player can make a move, if not then see if the other player can make a move, if not then the game ends
    if(!checkValidTurn()){
        swapPlayer();
        if(!checkValidTurn()){
            endGame();
        }
    }
    
}
function swapPlayer(){
    if(currentPlayer == "B"){
        currentPlayer = "W";
        document.getElementById("turn").innerHTML = "White's turn";
    }
    if(currentPlayer == "W"){
        currentPlayer = "B";
        document.getElementById("turn").innerHTML = "Black's turn";
    }
    printBoard();
}
//Starts the game, black always goes first
function startGame(){
    currentPlayer = "B";
    document.getElementById("turn").innerHTML = "Black's turn";
    createBoard();
    printBoard();
}

//TODO Make things happen when they win
function endGame(){
    var wCount = 0;
    var bCount = 0;
    for(var i = 0;  i < board.length; i++){
        for(var j = 0; j < board[i].length; j++){
            if(board[i][j] == "B"){
                bCount++;
            }
            if(board[i][j] == "W"){
                wCount++;
            }
        }
    }
    if(wCount > bCount){
        //White wins! implement please (:
    }
    else{
        //Black wins1 implement pretty please (:
    }
}