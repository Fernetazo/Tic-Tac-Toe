const gameBoard = ["", "", "", "", "", "", "", "", ""];
let globalTurn = null;

const selectBlock = (e) => {

    let block = e.target;
    
    if (gameBoard[block.classList[1]] === "") {
        if (game.getTurn() === player1.getName()) {
            block.textContent = "❌";
            game.setTurn(player2.getName());
            display.textContent = `Is the turn of: ${game.getTurn()}`;
            gameBoard[block.classList[1]] = "❌";
    
        } else {
            block.textContent = "🔵";
            game.setTurn(player1.getName());
            display.textContent = `Is the turn of: ${game.getTurn()}`;
            gameBoard[block.classList[1]] = "🔵";
        }
    }
    console.log(gameBoard);
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

    let blocks = document.querySelectorAll(".block");
    
    blocks.forEach((element, index) => {

        element.textContent = gameBoard[index];
        element.addEventListener('click', selectBlock);
    });
};

const game = (() => {

    const getTurn = () => globalTurn;

    const setTurn = (turn) => globalTurn = turn;

    return {getTurn, setTurn};
})();

game.setTurn(player1.getName());

let display = document.querySelector(".display");
display.textContent = `Is the turn of: ${game.getTurn()}`;

renderBoard();