const player = (name) => {

    const getName = () => name;
    
    return {getName, selectBlock};
};

const displayController = (() => {

    const add = (a, b) => a + b;
    
    return {add};
})();

const renderBoard = () => {

    let blocks = document.querySelectorAll('.block');
    
    blocks.forEach((element, index) => {

        element.textContent = gameBoard[index];
        element.addEventListener('click', selectBlock);
    });
};

const selectBlock = (e) => {

    let block = e.target;
    
    if (gameBoard[block.classList[1]] === '') {
        if (game.getTurn() === player1.getName()) {
            block.textContent = '❌';
            game.setTurn(player2.getName());
            display.textContent = `Is the turn of: ${game.getTurn()}`;
            gameBoard[block.classList[1]] = '❌';
    
        } else {
            block.textContent = '🔵';
            game.setTurn(player1.getName());
            display.textContent = `Is the turn of: ${game.getTurn()}`;
            gameBoard[block.classList[1]] = '🔵';
        }
    }
    
    if (game.checkWinner('❌') === player1.getName()) {

        display.textContent = `THE WINNER IS: ${player1.getName()}!!!`;

    } else if (game.checkWinner('🔵') === player2.getName()) {

        display.textContent = `THE WINNER IS: ${player2.getName()}!!!`;

    } else if (!gameBoard.includes("")) {

        display.textContent = 'TIE!!!';
    }
}

const game = (() => {

    const getTurn = () => globalTurn;

    const setTurn = (turn) => globalTurn = turn;

    const checkWinner = (symbol) => {

        let checker = 0;
        
        for (let index = 0; index <= 6;) {
            for (let subIndex = 0; subIndex <= 2; subIndex++) {
                let block = gameBoard[index + subIndex];
                if (block === symbol) {
                    checker++;
                    if (checker === 3) {
                        if (symbol === "❌") {
                            return (player1.getName());
                        } else {
                            return (player2.getName());
                        }
                    }
                } else {
                    checker = 0;
                    break;
                }
            }
            index = index + 3;
        }
        
        for (let index = 0; index <= 2; index++) {
            for (let subIndex = 0; subIndex <= 6;) {
                let block = gameBoard[index + subIndex];
                if (block === symbol) {
                    checker++;
                    subIndex = subIndex + 3;
                    if (checker === 3) {
                        if (symbol === "❌") {
                            return (player1.getName());
                        } else {
                            return (player2.getName());
                        }
                    }
                } else {
                    checker = 0;
                    break;
                }
            }
        }

        for (let index = 0; index <= 8;) {
            let block = gameBoard[index];
            if (block === symbol) {
                checker++;
                index = index + 4;
                if (checker === 3) {
                    if (symbol === "❌") {
                        return (player1.getName());
                    } else {
                        return (player2.getName());
                    }
                }
            } else {
                checker = 0;
                break;
            }
        }

        for (let index = 2; index <= 6;) {
            let block = gameBoard[index];
            if (block === symbol) {
                checker++;
                index = index + 2;
                if (checker === 3) {
                    if (symbol === "❌") {
                        return (player1.getName());
                    } else {
                        return (player2.getName());
                    }
                }
            } else {
                checker = 0;
                break;
            }
        }
    };
    return {getTurn, setTurn, checkWinner};
})();

const gameBoard = ['', '', '', '', '', '', '', '', ''];

let globalTurn = null;

const player1 = player('Fer');
const player2 = player('Vero');

game.setTurn(player1.getName());

let display = document.querySelector('.display');
display.textContent = `Is the turn of: ${game.getTurn()}`;

renderBoard();