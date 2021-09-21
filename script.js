const gameBoard = ["X", "O", "X", "X", "X", "O", "O", "O", "X"];

const player = (name) => {
    const getName = () => name;
    
    const play = () => {
        // PLAYER PLAYS
    }

    return {getName, play};
};

const displayController = (() => {
    const add = (a, b) => a + b;
    
    return {add};
})();

const renderBoard = () => {

}