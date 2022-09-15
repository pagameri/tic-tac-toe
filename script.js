
// gameBoard // module

// displayController // module

// players // factory

const Gameboard = (() => {
  const boardContainer = document.querySelector('.board-container');
  const cells = document.querySelectorAll('.cell');
  
  const board = ['', '', '', '', '', '', '', '', ''];
  
  const render = () => {
    let index = 0;
    cells.forEach((cell) => {
      cell.innerText = board[index];
      index++;
    });
  }

  const clearBoard = () => {
    cells.forEach((cell) => {
      cell.innerText = '';
    });
  }

  return { render, clearBoard, boardContainer, board }

})();

Gameboard.render();


const displayController = (function() {
  let counter = 0;

  Gameboard.boardContainer.onclick = (event) => {
    let target = event.target;
    let index = target.getAttribute('id');
    let cell = Gameboard.board[index];


    if (cell === '') {
      if (counter % 2 === 0) {
        Gameboard.board[index] = gabi.getSign();
        counter++;
      } else {
        Gameboard.board[index] = tomi.getSign();
        counter++;
      }
    }

    Gameboard.clearBoard();
    Gameboard.render();
  }
})();

const Player = (name, sign) => {
  const getSign = () => sign;
  const getName = () => name;

  return {getSign, getName};
}
  

const gabi = Player('Gabi', 'X');
const tomi = Player('Tomi', 'O');
