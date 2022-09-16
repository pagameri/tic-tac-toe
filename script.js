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



const displayController = (() => {
  const Player = (name, sign) => {
    const getSign = () => sign;
    const getName = () => name;
    let board = ['', '', '', '', '', '', '', '', ''];
  
    return {getSign, getName, board};
  }
  
  const player1 = Player('Gabi', 'X');
  const player2 = Player('Tomi', 'O');
  let counter = 0;
  let winner;

  Gameboard.boardContainer.onclick = (event) => {
    let target = event.target;
    let index = target.getAttribute('id');
    let cell = Gameboard.board[index];


    if (cell === '') {
      if (counter % 2 === 0) {
        drawBoard(player1, index);
      } else {
        drawBoard(player2, index);
      }

      if (counter <= 7) {
        counter++;
      } else if (winner === undefined) {
        isTie();
      } 
    }
    Gameboard.clearBoard();
    Gameboard.render();
    if (winner !== undefined) {
      console.log(winner);
    }
  }

  const drawBoard = (player, index) => {
    let sign = player.getSign();
    Gameboard.board[index] = sign;
    player.board.splice(index, 1, sign);
    if (counter >= 4) {
      winner = checkPlayer(player, sign);
    }
  }

  const checkPlayer = (player, sign) => {
    for (let pattern of winningPattern) {
      let patternToMatch = [sign, sign, sign];
      let playersPattern = [];
      for (let element of pattern) {
        playersPattern.push(player.board[element]);
      }
      if (patternToMatch.toString() === playersPattern.toString()) {
        return player.getName();
      }
    }
  }

  const declareWinner = (player) => {
    Gameboard.clearBoard();
    Gameboard.render();
    console.log(`Winner is: ${player.getName()}`);
  } 

  const isTie = () => {
    console.log("It's a tie!");
  }


  const winningPattern = [
    [0, 1, 2], [3, 4, 5], [6, 7, 8],
    [0, 3, 6], [1, 4, 7], [2, 5, 8],
    [0, 4, 8], [2, 4, 6]
  ];

})();





