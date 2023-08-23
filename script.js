'use strict'

const player = (name, sign) => {
    const sayHello = () => console.log(`Hello ${name}`);
    return {name, sign, sayHello}
}

const gameBoard = (() => {
    const gameBoard = [['','',''],['','',''],['','','']];
     
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

    return {gameBoard, makeTurn, checkEmpty, checkWinner}
})();

const displayController = (() => {
    const p1 = player('player1', 'X');
    const p2 = player('player2', 'O');
    let turn = 1;
    const gameContainer = document.querySelector('#game');
    
    const changeTurn = () => (turn === 1) ? turn-- : turn++;

    const whosTurn = () => (turn === 1) ? displayController.p1 : displayController.p2

    const getRow = () => prompt("Enter the row")
    const getCol = () => prompt("Enter the col")
    
    const displayBoard = () => gameContainer.textContent = gameBoard.gameBoard;

    const playGame = () => {
        console.log(`The game has begun`);
        for(let i = 0; i < 9; i++) {
            console.log(gameBoard.gameBoard[0])
            console.log(gameBoard.gameBoard[1])
            console.log(gameBoard.gameBoard[2])
            if(gameBoard.checkWinner(displayController.p1.sign)) {
                console.log(`${displayController.p1.name} is the winner`)
            }
            if(gameBoard.checkWinner(displayController.p2.sign)) {
                console.log(`${displayController.p2.name} is the winner`)
            }
            
            alert(`it is ${displayController.whosTurn().name}'s turn`);

            let row = displayController.getRow()
            let col = displayController.getCol()
            if(!(gameBoard.checkEmpty(row,col))) {
                alert("that spot is taken enter new numbers")
                row = displayController.getRow()
                col = displayController.getCol()
                gameBoard.makeTurn(row, col, displayController.whosTurn().sign)
            } else if (gameBoard.checkEmpty(row,col)) {
                gameBoard.makeTurn(row, col, displayController.whosTurn().sign)
            }
            console.log(`---------------------------`);
            displayController.changeTurn()
        }
        console.log(`Its a tie!`);
    }

    return {p1, p2, getRow, getCol, displayBoard, changeTurn, whosTurn, playGame}
})()

displayController.playGame()