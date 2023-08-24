'use strict'

const player = (name, sign) => {
    return {name, sign}
}

const gameBoard = (() => {
    const gameBoard = [['','',''],['','',''],['','','']];
     
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

    return {gameBoard, checkWinner}
})();

const displayController = (() => {
    const p1 = player('player1', 'X');
    const p2 = player('player2', 'O');
    const header = document.querySelector('#header');
    let turn = 1;

    const changeTurn = () => (turn === 1) ? turn-- : turn++;

    const whosTurn = () => (turn === 1) ? displayController.p1 : displayController.p2

    const addEvents = () => {
        let count = 1;
        for(let i = 0; i < 3; i++) {
            for(let j = 0; j < 3; j++) {
                let currentSquare = document.querySelector(`#square${count}`)
                count++
                currentSquare.addEventListener('click', () => {
                if(currentSquare.textContent != '') {
                    alert('This square is taken choose another!')
                    return
                }
                if(displayController.whosTurn().sign == "X") {
                    currentSquare.textContent = 'X'
                    gameBoard.gameBoard[i].splice(j, 1, 'X');
                    displayController.changeTurn()
                    gameBoard.checkWinner()
                    if(gameBoard.checkWinner(displayController.p1.sign)) {
                        header.textContent = `${displayController.p1.name} is the winner!`
                    }
                    if(gameBoard.checkWinner(displayController.p2.sign)) {
                        header.textContent = `${displayController.p2.name} is the winner!`
                    }
                } else if(displayController.whosTurn().sign == "O") {
                    currentSquare.textContent = 'O'
                    gameBoard.gameBoard[i].splice(j, 1, 'O');
                    displayController.changeTurn()
                    if(gameBoard.checkWinner(displayController.p1.sign)) {
                        header.textContent = `${displayController.p1.name} is the winner`
                    }
                    if(gameBoard.checkWinner(displayController.p2.sign)) {
                        header.textContent = `${displayController.p2.name} is the winner!`
                    }
                }
            })
        }
    }
}
    return {p1, p2, changeTurn, whosTurn, addEvents}
})()

displayController.addEvents()
