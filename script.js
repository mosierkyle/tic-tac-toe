'use strict'

const player = (name, sign) => {
    const sayHello = () => console.log(`Hello ${name}`);
    const getRow = () => prompt("Enter the row")
    const getCol = () => prompt("Enter the row")
    return {name, sign, sayHello, getRow, getCol}
}

const gameBoard = (() => {
    const gameBoard = [['','',''],['','',''],['','','']];
    
    const getGameBoard = () => gameBoard; 
    const makeTurn = (row, col, sign) => gameBoard[row].splice(col, 1, sign);
    const checkEmpty = (row, col) => (gameBoard[row][col] === '') ? true : false;
    
    const checkWinner = (sign) => {
        for(let i = 0; i < gameBoard.length; i++) {
            if(gameBoard[i][0] === sign && gameBoard[i][1] === sign && gameBoard[i][2] === sign) {
                return true
            } else if (gameBoard[0][i] === sign && gameBoard[1][i] === sign && gameBoard[2][i] === sign) {
                return true
            }
        }
        if (gameBoard[0][0] === sign && gameBoard[1][1] === sign && gameBoard[2][2] === sign) {
            return true
        } else if (gameBoard[0][2] === sign && gameBoard[1][1] === sign && gameBoard[2][0] === sign) {
            return true
        }
        return false
    }

    return {getGameBoard, makeTurn, checkEmpty, checkWinner}
})();

const displayController = (() => {
    const p1 = player('bot', 'X');
    const p2 = player('player1', 'O');
    let turn = 1;
    let activePlayer = p1
    const gameContainer = document.querySelector('#game');
    
    const changeTurn = () => (turn === 1) ? turn-- : turn++;

    const whosTurn = () => {
        (turn === 1) ? activePlayer = p1 : activePlayer = p2
        return activePlayer
    }
    
    const displayBoard = () => gameContainer.textContent = gameBoard.getGameBoard();

    return {displayBoard, changeTurn, whosTurn}
})()

displayController.displayBoard()

console.log(gameBoard.checkWinner('X'));