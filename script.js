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
    const resetBtn = document.querySelector(`#reset`);
    const playAgainBtn = document.querySelector(`#play-again`);

    const resetBoard = () => {
        let counter = 1;
        for(let i = 0; i < 3; i++) {
            for(let j = 0; j < 3; j++) {
                let current = document.querySelector(`#square${counter}`)
                gameBoard.gameBoard[i].splice(j, 1, '');
                current.textContent = ''
                counter++
            }
        }
    }

    const resetBoardBtn = () => resetBtn.addEventListener('click', () => {
        displayController.resetBoard()
    })

    const hideReset= () => {
        resetBtn.style.display = 'none'
        playAgainBtn.style.display = 'block'
        playAgainBtn.addEventListener('click', ()=> {
            displayController.resetBoard()
            header.textContent = 'Tic Tac Toe'
            resetBtn.style.display = 'block'
            playAgainBtn.style.display = 'none'
        })
    }

    const getBotMove = () => {
        let move = (Math.floor(Math.random() * 9) + 1);
        let square = document.querySelector(`#square${move}`)
        let r;
        let c;
        if(square.textContent != '') {
            getBotMove()
        } 
        switch(move) {
            case 1:
                r = 0    
                c = 0
                break
            case 2:
                r = 0    
                c = 1
                break
            case 3:
                r = 0    
                c = 2
                break
            case 4:
                r = 1   
                c = 0
                break
            case 5:
                r = 1    
                c = 1
                break
            case 6:
                r = 1    
                c = 2
                break
            case 7:
                r = 2   
                c = 0
                break
            case 8:
                r = 2    
                c = 1
                break
            case 9:
                r = 2    
                c = 2
                break
        }
        if (square.textContent == '') {
            square.textContent = displayController.p2.sign
            gameBoard.gameBoard[r].splice(c, 1, displayController.p2.sign);
            if(gameBoard.checkWinner(displayController.p2.sign)) {
                displayController.hideReset()
                header.textContent = `${displayController.p2.name} is the winner!`
                return
            }
        }
    }

    const addEvents = () => {
        let count = 1;
        displayController.resetBoardBtn()
        for(let i = 0; i < 3; i++) {
            for(let j = 0; j < 3; j++) {
                let currentSquare = document.querySelector(`#square${count}`)
                count++
                currentSquare.addEventListener('click', () => {
                    if(currentSquare.textContent != '') {
                        alert('This square is taken choose another!')
                        return
                    }
                    currentSquare.textContent = displayController.p1.sign
                    gameBoard.gameBoard[i].splice(j, 1, displayController.p1.sign);
                    if(gameBoard.checkWinner(displayController.p1.sign)) {
                        displayController.hideReset()
                        header.textContent = `${displayController.p1.name} is the winner!`
                        return
                    }
                    window.setTimeout(() => {
                        displayController.getBotMove()
                    }, 500);
                })
            }
        }
    }
    return {p1, p2, addEvents, resetBoard, resetBoardBtn, hideReset, getBotMove}
})()

displayController.addEvents()
