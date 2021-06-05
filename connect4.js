/** TYLER GETTEL
 * Connect Four
 *
 * Player 1 and 2 alternate turns. On each turn, a piece is dropped down a
 * column until a player gets four-in-a-row (horiz, vert, or diag) or until
 * board fills (tie)
 */

const WIDTH = 7;
const HEIGHT = 6;

let currPlayer = 1; // active player: 1 or 2
let board = []; // array of rows, each row is array of cells  (board[y][x])

/** makeBoard: create in-JS board structure:
 *    board = array of rows, each row is array of cells  (board[y][x])
 */

function makeBoard() {
  // TODO: set "board" to empty HEIGHT x WIDTH matrix array
    for (let y = 0; y < HEIGHT; y++) {
      board.push(Array.from({ length: WIDTH }));
    }
  }

/** makeHtmlBoard: make HTML table and row of column tops. */

function makeHtmlBoard() {
  // TODO: get "htmlBoard" variable from the item in HTML w/ID of "board"
  const htmlBoard = document.querySelector("#board");
  // TODO: add comment for this code

  //creates a new row for the game table, sets as top variable
  let top = document.createElement("tr");
  //sets attributes 'id' and 'column-top' to top variable
  top.setAttribute("id", "column-top");
  //adds eventlistener for the click of the top row
  top.addEventListener("click", handleClick);

  //sets the initiation, condition and expression for x or width
  for (let x = 0; x < WIDTH; x++) {
    //makes new data table cell in headCell variable
    let headCell = document.createElement("td");
    //adds id attribute of x to headCell
    headCell.setAttribute("id", x);
    //adds headCell td element to top
    top.append(headCell);
  }
  //adds top tr element to htmlBoard
  htmlBoard.append(top);

  // TODO: add comment for this code
  //sets initiation, condition, and expression for y or height
  for (let y = 0; y < HEIGHT; y++) {
    //makes new table row into variable row
    const row = document.createElement("tr");
    //sets initiation, condition, and expression for x or width, again
    for (let x = 0; x < WIDTH; x++) {
      //makes new table data cell in cell variable
      const cell = document.createElement("td");
      //sets id attribute for each cell with y/x coordinates
      cell.setAttribute("id", `${y}-${x}`);
      //adds cells to rows
      row.append(cell);
    }
    //adds rows to htmlboard
    htmlBoard.append(row);
  }
}

/** findSpotForCol: given column x, return top empty y (null if filled) */

function findSpotForCol(x) {
  // TODO: write the real version of this, rather than always returning 0
    
    for (let y = HEIGHT - 1; y >= 0; y--) {
      if (!board[y][x]) {
        return y;
      }
    }
    return null;
  }

/** placeInTable: update DOM to place piece into HTML table of board */

function placeInTable(y, x) {
  // TODO: make a div and insert into correct table cell
  //makes new pieceDiv 
  const pieceDiv = document.createElement("div");
  //adds class 'piece' to div
  pieceDiv.classList.add("piece");
  //adds current player class to div
  pieceDiv.classList.add(`p${currPlayer}`);
  //pieceDiv.style.top = -50 * (y + 2);
  //makes spot variable for y/x point of piece
  const spot = document.getElementById(`${y}-${x}`);
  //adds piecediv to spot
  spot.append(pieceDiv);
  
  
}

/** endGame: announce game end */

function endGame(msg) {
  // TODO: pop up alert message
  alert("GAME OVER! Thanks for playing!");
}

/** handleClick: handle click of column top to play piece */

function handleClick(evt) {
  // get x from ID of clicked cell
  let x = +evt.target.id;

  // get next spot in column (if none, ignore click)
  let y = findSpotForCol(x);
  if (y === null) {
    return;
  }

  // place piece in board and add to HTML table
  // TODO: add line to update in-memory board
  board[y][x] = currPlayer;
  placeInTable(y, x);

  // check for win
  if (checkForWin()) {
    return endGame(`Player ${currPlayer} won!`);
  }

  // check for tie
  // TODO: check if all cells in board are filled; if so call, call endGame
  if (board.every(row => row.every(cell => cell))) {
    return endGame('Tie!');
  }
  // switch players
  // TODO: switch currPlayer 1 <-> 2
  currPlayer = currPlayer === 1 ? 2 : 1;
}

/** checkForWin: check board cell-by-cell for "does a win start here?" */

function checkForWin() {
  function _win(cells) {
    // Check four cells to see if they're all color of current player
    //  - cells: list of four (y, x) cells
    //  - returns true if all are legal coordinates & all match currPlayer

    return cells.every(
      ([y, x]) =>
        y >= 0 &&
        y < HEIGHT &&
        x >= 0 &&
        x < WIDTH &&
        board[y][x] === currPlayer
    );
  }

  // TODO: read and understand this code. Add comments to help you.

  for (let y = 0; y < HEIGHT; y++) {
    for (let x = 0; x < WIDTH; x++) {
      let horiz = [[y, x], [y, x + 1], [y, x + 2], [y, x + 3]];
      let vert = [[y, x], [y + 1, x], [y + 2, x], [y + 3, x]];
      let diagDR = [[y, x], [y + 1, x + 1], [y + 2, x + 2], [y + 3, x + 3]];
      let diagDL = [[y, x], [y + 1, x - 1], [y + 2, x - 2], [y + 3, x - 3]];

      if (_win(horiz) || _win(vert) || _win(diagDR) || _win(diagDL)) {
        return true;
      }
    }
  }
}

makeBoard();
makeHtmlBoard();
