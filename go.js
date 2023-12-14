//Double array of strings with B, W, or O for black, white and empty respectively
var board;
// Holds the current players variable so "W" if whites turn or "B" if blacks turn
var currentPlayer;
// initialize canvas
const canvas = document.getElementById("goCanvas");
const ctx = canvas.getContext("2d");

var spaces = [];
var spaces_i = [];
var spaces_j = [];
 
function drawCanvas() {
    // reset canvas and spaces
    canvas.removeEventListener('click', arguments.callee, false);
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    spaces = [];
    spaces_i = [];
    spaces_j = [];

    for (var i = 0; i < board.length; i++) {
        for(var j = 0; j < board[i].length; j++) {
            switch(board[i][j]) {
                case "O":
                    let space = new Path2D();
                    space.rect(j*80, i*80, 80, 80);
                    ctx.stroke(space);
                    space.closePath();
                    spaces.push(space);
                    spaces_i.push(i);
                    spaces_j.push(j);
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

    canvas.addEventListener("click", function(event) {
        spaces.forEach((space, index) => {
            if (ctx.isPointInPath(space, event.offsetX, event.offsetY)) {
                if(checkSurroundingLocations(spaces_i[index], spaces_j[index], currentPlayer)){
                    makeMove(spaces_i[index], spaces_j[index]);
                }
            }
        });
    });
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
    var curRow = pieceRow - 1;
    var currentSpot = board[curRow][pieceCol];
    while(currentSpot != colorCheck){
        if(colorCheck == "W"){
            board[curRow][pieceCol] = "W";
        }
        else{
            board[curRow][pieceCol] = "B";
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
            board[curRow][pieceCol] = "W";
        }
        else{
            board[curRow][pieceCol] = "B";
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
            board[pieceRow][curCol] = "W";
        }
        else{
            board[pieceRow][curCol] = "B";
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
            board[pieceRow][curCol] = "W";
        }
        else{
            board[pieceRow][curCol] = "B";
        }
        curCol++;
        currentSpot = board[pieceRow][curCol]; 
    }
}
function flipDiagonalTopLeft(pieceRow, pieceCol, colorCheck){
    var curCol = pieceCol-1;
    var curRow = pieceRow-1;
    var currentSpot = board[curRow][curCol];
    while(currentSpot != colorCheck){
        while(currentSpot != colorCheck){
            if(colorCheck == "W"){
                board[curRow][curCol] = "W";
            }
            else{
                board[curRow][curCol] = "B";
            }
            curCol--;
            curRow--;
            currentSpot = board[curRow][curCol];
        }
    }
}
function flipDiagonalTopRight(pieceRow, pieceCol, colorCheck){
    var curCol = pieceCol+1;
    var curRow = pieceRow-1;
    var currentSpot = board[curRow][curCol];
    while(currentSpot != colorCheck){
        while(currentSpot != colorCheck){
            if(colorCheck == "W"){
                board[curRow][curCol] = "W";
            }
            else{
                board[curRow][curCol] = "B";
            }
            curCol++;
            curRow--;
            currentSpot = board[curRow][curCol]; 
        }
    }
}
function flipDiagonalBottomLeft(pieceRow, pieceCol, colorCheck){
    var curCol = pieceCol - 1;
    var curRow = pieceRow + 1;
    var currentSpot = board[curRow][curCol];
    while(currentSpot != colorCheck){
        if(colorCheck == "W"){
            board[curRow][curCol] = "W";
        }
        else{
            board[curRow][curCol] = "B";
        }
        curCol--;
        curRow++;
        currentSpot = board[curRow][curCol];
    }
    //document.getElementById("flipdebug").innerHTML = "While loop over lol";
}
function flipDiagonalBottomRight(pieceRow, pieceCol, colorCheck){
    var curCol = pieceCol+1;
    var curRow = pieceRow+1;
    var currentSpot = board[curRow][curCol];
    while(currentSpot != colorCheck){
        while(currentSpot != colorCheck){
            if(colorCheck == "W"){
                board[curRow][curCol] = "W";
            }
            else{
                board[curRow][curCol] = "B";
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
    var curCol = pieceCol-1;
    var curRow = pieceRow-1;
    var currentSpot = board[curRow][curCol];
    if(currentSpot == colorCheck){
        return false;
    }
    while(currentSpot != colorCheck){
        if(currentSpot == "O"){
            return false;
        }
        curCol--;
        curRow--;
        if(curCol < 0 || curRow < 0){
            return false;
        }
        currentSpot = board[curRow][curCol];
    }
    return true;
}
function checkDiagonalTopRight(pieceRow, pieceCol, colorCheck){
    if(pieceCol > 5 || pieceRow < 2){
        return false;
    }
    var curCol = pieceCol+1;
    var curRow = pieceRow-1;
    var currentSpot = board[curRow][curCol];
    if(currentSpot == colorCheck){
        return false;
    }
    while(currentSpot != colorCheck){
        if(currentSpot == "O"){
            return false;
        }
        curCol++;
        curRow--;
        if(curCol > 7 || curRow < 0){
            return false;
        }
        currentSpot = board[curRow][curCol];
    }
    return true;
}
function checkDiagonalBottomLeft(pieceRow, pieceCol, colorCheck){
    if(pieceCol < 2 || pieceRow > 5){
        return false;
    }
    var curCol = pieceCol - 1;
    var curRow = pieceRow + 1;
    var currentSpot = board[curRow][curCol];
    if(currentSpot == colorCheck){
        return false;
    }
    while(currentSpot != colorCheck){
        if(currentSpot == "O"){
            return false;
        }
        curCol--;
        curRow++;
        if(curCol < 0 || curRow > 7){
            return false;
        }
        currentSpot = board[curRow][curCol];
    }
    return true;
}
function checkDiagonalBottomRight(pieceRow, pieceCol, colorCheck){
    if(pieceCol > 5 || pieceRow > 5){
        return false;
    }
    var curCol = pieceCol+1;
    var curRow = pieceRow+1;
    var currentSpot = board[curRow][curCol];
    if(currentSpot == colorCheck){
        return false;
    }
    while(currentSpot != colorCheck){
        if(currentSpot == "O"){
            return false;
        }
        curCol++;
        curRow++;
        if(curCol > 7 || curRow > 7){
            return false;
        }
        currentSpot = board[curRow][curCol];
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
                // document.getElementById("flipdebug").innerHTML = "moves";
                return true;
            }
        }
    }
    // document.getElementById("flipdebug").innerHTML = "No moves";
    return true;
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
        // document.getElementById("flip").innerHTML = "Flipping vertical down";
        flipVerticalDown(pieceRow, pieceCol, currentPlayer);
    }
    if(checkHorizontalLeft(pieceRow, pieceCol, currentPlayer)){
        flipHorizontalLeft(pieceRow, pieceCol, currentPlayer);
    }
    if(checkHorizontalRight(pieceRow, pieceCol, currentPlayer)){
        flipHorizontalRight(pieceRow, pieceCol, currentPlayer);
    }
    if(checkDiagonalBottomLeft(pieceRow, pieceCol, currentPlayer)){
        // document.getElementById("flip").innerHTML = "Flipping diagonal Bottom left";
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
            document.getElementById("turn").innerHTML = "Game Over";
            endGame();
        }
    }
    
}
function swapPlayer(){
    // alert("Switching players");
    if(currentPlayer == "B"){
        currentPlayer = "W";
        document.getElementById("turn").innerHTML = "White's turn";
        document.getElementById("turn").style.color = "black";
        document.getElementById("turn").style.backgroundColor = "white";
    }
    else if(currentPlayer == "W"){
        currentPlayer = "B";
        document.getElementById("turn").innerHTML = "Black's turn";
        document.getElementById("turn").style.color = "white";
        document.getElementById("turn").style.backgroundColor = "black";
    }
    printBoard();
    endGame();
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
    var oCount = 0;
    for(var i = 0;  i < board.length; i++){
        for(var j = 0; j < board[i].length; j++){
            if(board[i][j] == "B"){
                bCount++;
            }
            if(board[i][j] == "W"){
                wCount++;
            }
            if(board[i][j] == "O"){
                oCount++;
                break;
            }
        }
    }
    if(oCount > 0) {
    }
    else if(wCount > bCount){
        document.getElementById("turn").innerHTML = "White wins!";
        document.getElementById("turn").style.color = "black";
        document.getElementById("turn").style.backgroundColor = "white";
    }
    else{
        document.getElementById("turn").innerHTML = "Black wins!";
        document.getElementById("turn").style.color = "white";
        document.getElementById("turn").style.backgroundColor = "black";
    }
}