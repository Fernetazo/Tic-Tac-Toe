/* TO DO: 
        AI unbeatable    
        Nice UI
        Change neon style for X and O
*/

const player = (name) => {

    const getName = () => name;

    const setName = () => {

        player1 = player(document.querySelector('.P1name').value || 'Player 1')

        if (game.getMode() === 'vsCPU') {
            player2 = player(document.querySelector('.P2name').value || 'CPU')
        } else {
            player2 = player(document.querySelector('.P2name').value || 'Player 2')
        }
    };

    return {getName, setName};
};

const display = (() => {

    const prepare = () => {

        document.querySelector('.vsPlayerButton').addEventListener('click', () => {
            document.querySelector('.buttonsDiv').style.display = 'none';
            document.querySelector('.namesMenu').style.display = 'flex';
            game.setMode('vsHuman');
        });
        
        document.querySelector('.vsCPUButton').addEventListener('click', () => {
            document.querySelector('.buttonsDiv').style.display = 'none';
            document.querySelector('.difficultyMenu').style.display = 'flex';
            game.setMode('vsCPU');
        });

        document.querySelector('.easyButton').addEventListener('click', () => {
            document.querySelector('.difficultyMenu').style.display = 'none';
            document.querySelector('.namesMenu').style.display = 'flex';
            game.setDifficulty('easy');
        });

        document.querySelector('.unbeatableButton').addEventListener('click', () => {
            //document.querySelector('.difficultyMenu').style.display = 'none';
            //document.querySelector('.namesMenu').style.display = 'flex';
            //game.setDifficulty('unbeatable');
        });
        
        document.querySelector('.startButton').addEventListener('click', () => {

            player1.setName();
            player2.setName();
            
            game.setTurn(player1.getName());
            display.turnIndicator();

            document.querySelector('.namesMenu').style.display = 'none';
            document.querySelector('.selectMenu').style.display = 'none';
            document.querySelector('.gameZone').style.display = 'flex';
        });

        document.querySelector('.resetButton').addEventListener('click', game.resetGame);
    }

    const renderBoard = () => {

        let blocks = document.querySelectorAll('.block');
        
        blocks.forEach((element, index) => {
    
            element.textContent = gameBoard[index];
            element.addEventListener('click', game.selectBlock);
        });
    };

    const turnIndicator = () => {
        
        document.querySelector('.display').textContent = `Is the turn of: ${game.getTurn()}`;
    }

    const showWinner = (winner) => {
        
        document.querySelector('.display').textContent = `THE WINNER IS: ${winner}!!!`;
        
        let blocks = document.querySelectorAll('.block');
        
        blocks.forEach((element, index) => {
    
            element.textContent = gameBoard[index];
            element.removeEventListener('click', game.selectBlock);
        });
    }

    return {renderBoard, prepare, turnIndicator, showWinner};
})();

const game = (() => {

    const getTurn = () => globalTurn;

    const setTurn = (turn) => globalTurn = turn;

    const resetGame = () => {
        gameBoard = ['', '', '', '', '', '', '', '', ''];
        game.setTurn(player1.getName());
        display.turnIndicator();
        display.renderBoard();

        let blocks = document.querySelectorAll('.block');
        blocks.forEach((element) => {
            element.textContent = null;
            element.classList.remove('Xstyle') || element.classList.remove('Ostyle');
        });

        document.querySelector('.gameBoardContainer').style = 'pointer-events:auto';
    }

    const getMode = () => gameMode;

    const setMode = (mode) => {
        gameMode = mode;
    }

    const getDifficulty = () => difficulty;

    const setDifficulty = (dif) => {
        difficulty = dif;
    }

    const CPUplay = () => {
        if (game.getDifficulty() === 'easy') {
            let CPUelection = gameBoard.indexOf('', Math.floor(Math.random() * 8));
            
            // Escape UNICODE starting number problem
            // https://stackoverflow.com/questions/20306204/using-queryselector-with-ids-that-are-numbers
            return (document.querySelector(`.\\3${CPUelection} `).click());
        }
        if (game.getDifficulty() === 'unbeatable') {
            let CPUelection = game.unbeatableMove();
            console.log(CPUelection);
            return (document.querySelector(`.\\3${CPUelection} `).click());
        }
    }

    const unbeatableMove = () => {
        // TO DO
    }

    const minimax = () => {
        // TO DO
    }

    const selectBlock = (e) => {

        let block = e.target;
        if (gameBoard[block.classList[1]] === '') {
            if (game.getTurn() === player1.getName()) {
                block.textContent = '❌';
                block.classList.add('Xstyle');
                game.setTurn(player2.getName());
                gameBoard[block.classList[1]] = '❌';

                if (game.getMode() === 'vsCPU') {
                    document.querySelector('.gameBoardContainer').style = 'pointer-events:none;';
                }
        
            } else {
                block.textContent = '🔵';
                game.setTurn(player1.getName());
                gameBoard[block.classList[1]] = '🔵';
                block.classList.add('Ostyle');
            }
            display.turnIndicator();
        }
        
        if (game.checkWinner('❌') === player1.getName()) {
    
            display.showWinner(player1.getName());
            document.querySelector('.gameBoardContainer').style = 'pointer-events:auto';
    
        } else if (game.checkWinner('🔵') === player2.getName()) {
    
            display.showWinner(player2.getName());
    
        } else if (!gameBoard.includes("")) {
    
            document.querySelector('.display').textContent = 'TIE!!!';
        } else {
            
            if (game.getMode() === 'vsCPU' && game.getTurn() === player2.getName()) {
            
                setTimeout(() => {
                    game.CPUplay();
                    document.querySelector('.gameBoardContainer').style = 'pointer-events:auto';
                }, 500);
            }
        }
    }

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
    return {getTurn, setTurn, selectBlock, checkWinner, resetGame, CPUplay, getDifficulty, setDifficulty, getMode, setMode, unbeatableMove, minimax};
})();

let gameBoard = ['', '', '', '', '', '', '', '', ''];
let globalTurn = null;
let gameMode = null;
let difficulty = null;
let player1 = player();
let player2 = player();

display.prepare();
display.renderBoard();