/*
Title: Connect four Game Script
Author: Refactored by Fabricio Ribero
Date: April 08, 2024
*/

/*
 * Connect Four
 *
 * Player 1 and 2 alternate turns. On each turn, a piece is dropped down a
 * column until a player gets four-in-a-row (horiz, vert, or diag) or until
 * board fills (tie)
 */

//Game class used to generate an instance of the game.
class Game {
    //Game setup - defines board size, creates a clear board array and sets player 1 as starting player
    constructor(height, width, player1, player2) {
        this.width = width;
        this.height = height;
        this.running = true;
        this.board = []; //array of rows, each row is array of cells  (board[y][x])
        this.player1 = player1;
        this.player2 = player2;
        this.currPlayer = this.player1; //active player: 1 or 2
        this.makeBoard();
        this.makeHtmlBoard();
        this.updateButton();
    }

    /*
     * updateButton: Update the button text to restart while the game is running.
     */
    updateButton() {
        if (this.running) {
            startButton.innerText = "Restart!";
        } else {
            startButton.innerText = "Play Again!";
        }
    }

    /*
     * makeBoard: create in-JS board structure:
     *   board = array of rows, each row is array of cells  (board[y][x])
     */
    makeBoard() {
        for (let y = 0; y < this.height; y++) {
            this.board.push(Array.from({ length: this.width }));
        }
    }

    /*
     *makeHtmlBoard: make HTML table and row of column tops.
     */
    makeHtmlBoard() {
        const board = document.getElementById("board");

        // make column tops (clickable area for adding a piece to that column)
        const top = document.createElement("tr");
        top.setAttribute("id", "column-top");
        top.addEventListener("click", this.handleClick.bind(this));

        for (let x = 0; x < this.width; x++) {
            const headCell = document.createElement("td");
            headCell.setAttribute("id", x);
            top.append(headCell);
        }

        board.append(top);

        // make main part of board
        for (let y = 0; y < this.height; y++) {
            const row = document.createElement("tr");

            for (let x = 0; x < this.width; x++) {
                const cell = document.createElement("td");
                cell.setAttribute("id", `${y}-${x}`);
                row.append(cell);
            }

            board.append(row);
        }
    }

    /*
     * findSpotForCol: given column x, return top empty y (null if filled)
     */

    findSpotForCol(x) {
        for (let y = this.height - 1; y >= 0; y--) {
            if (!this.board[y][x]) {
                return y;
            }
        }
        return null;
    }

    /*
     * placeInTable: update DOM to place piece into HTML table of board
     */

    placeInTable(y, x) {
        const piece = document.createElement("div");
        piece.style.backgroundColor = this.currPlayer.backgroundColor;
        piece.classList.add("piece");
        piece.style.top = -50 * (y + 2);
        const spot = document.getElementById(`${y}-${x}`);
        spot.append(piece);
    }

    /*
     * endGame: announce game end
     */
    endGame(msg) {
        alert(msg);
    }

    /*
     * handleClick: handle click of column top to play piece
     */
    handleClick(evt) {
        if (!this.running) {
            return;
        }
        // get x from ID of clicked cell
        const x = +evt.target.id;

        // get next spot in column (if none, ignore click)
        const y = this.findSpotForCol(x);
        if (y === null) {
            return;
        }

        // place piece in board and add to HTML table
        this.board[y][x] = this.currPlayer;
        this.placeInTable(y, x);

        // check for win
        if (this.checkForWin()) {
            return this.endGame(`${this.currPlayer.name} won!`);
        }

        // check for tie
        if (this.board.every((row) => row.every((cell) => cell))) {
            return this.endGame("Tie!");
        }

        // switch players
        this.currPlayer =
            this.currPlayer === this.player1 ? this.player2 : this.player1;
    }

    /*
     * checkForWin: check board cell-by-cell for "does a win start here?"
     */
    checkForWin() {
        function _win(cells) {
            // Check four cells to see if they're all color of current player
            //  - cells: list of four (y, x) cells
            //  - returns true if all are legal coordinates & all match currPlayer
            return cells.every(
                ([y, x]) =>
                    y >= 0 &&
                    y < this.height &&
                    x >= 0 &&
                    x < this.width &&
                    this.board[y][x] === this.currPlayer
            );
        }

        for (let y = 0; y < this.height; y++) {
            for (let x = 0; x < this.width; x++) {
                // get "check list" of 4 cells (starting here) for each of the different
                // ways to win
                const horiz = [
                    [y, x],
                    [y, x + 1],
                    [y, x + 2],
                    [y, x + 3],
                ];
                const vert = [
                    [y, x],
                    [y + 1, x],
                    [y + 2, x],
                    [y + 3, x],
                ];
                const diagDR = [
                    [y, x],
                    [y + 1, x + 1],
                    [y + 2, x + 2],
                    [y + 3, x + 3],
                ];
                const diagDL = [
                    [y, x],
                    [y + 1, x - 1],
                    [y + 2, x - 2],
                    [y + 3, x - 3],
                ];

                // find winner (only checking each win-possibility as needed)
                if (
                    _win.call(this, horiz) ||
                    _win.call(this, vert) ||
                    _win.call(this, diagDR) ||
                    _win.call(this, diagDL)
                ) {
                    this.running = false;
                    this.updateButton();
                    return true;
                }
            }
        }
    }
}

//Class for player object to store player information.
class Player {
    constructor(color, name) {
        this.backgroundColor = color;
        this.name = name;
    }
}

//Variables
const startButton = document.getElementById("StartButton");
const colorPlayer1 = document.getElementById("colorPlayer1");
const namePlayer1 = document.getElementById("namePlayer1");
const colorPlayer2 = document.getElementById("colorPlayer2");
const namePlayer2 = document.getElementById("namePlayer2");

//Function to clear the board before starting a new Game object.
function resetBoard() {
    const boardTRs = document.querySelectorAll("TR");
    boardTRs.forEach((tr) => tr.remove());
}

startButton.onclick = function () {
    resetBoard();
    const p1 = new Player(colorPlayer1.value, namePlayer1.value);
    const p2 = new Player(colorPlayer2.value, namePlayer2.value);
    new Game(6, 7, p1, p2);
};
