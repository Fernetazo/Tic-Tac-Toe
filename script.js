const gameBoard = ['', '', '', '', '', '', '', '', ''];
let globalTurn = null;

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
    game.checkWinner();
}

const player = (name) => {

    const getName = () => name;
    
    return {getName, selectBlock};
};

const player1 = player('Fer');
const player2 = player('Vero');

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

const game = (() => {

    const getTurn = () => globalTurn;

    const setTurn = (turn) => globalTurn = turn;

    const checkWinner = () => {

        let checker = 0;
        
        for (let index = 0; index < 8;) {
            for (let subIndex = 0; subIndex < 3; subIndex++) {
                let block = gameBoard[index + subIndex];
                if (block === '❌') {
                    checker++;
                    if (checker === 3) {
                        display.textContent = `THE WINNER IS: ${player1.getName()}!!!`;
                        return (player1.getName());
                    }
                } else {
                    checker = 0;
                    break;
                }
            }
            index = index + 3;
        }
        
        checker = 0;

        for (let index = 0; index < 3; index++) {
            for (let subIndex = 0; subIndex < 8;) {
                let block = gameBoard[index + subIndex];
                if (block === '❌') {
                    checker++;
                    subIndex = subIndex + 3;
                    if (checker === 3) {
                        display.textContent = `THE WINNER IS: ${player1.getName()}!!!`;
                        return (player1.getName());
                    }
                } else {
                    checker = 0;
                    break;
                }
            }
        }
    };

    return {getTurn, setTurn, checkWinner};
})();

game.setTurn(player1.getName());

let display = document.querySelector('.display');
display.textContent = `Is the turn of: ${game.getTurn()}`;

renderBoard();