const Gameboard = (() => {
  const boardContainer = document.querySelector('.board-container');
  const cells = document.querySelectorAll('.cell');
  
  let board = ['', '', '', '', '', '', '', '', ''];
  
  const render = () => {
    let index = 0;
    cells.forEach((cell) => {
      cell.innerText = board[index];
      index++;
    });
  }

  const emptyCells = () => {
    cells.forEach((cell) => {
      cell.innerText = '';
    });
  }

  return {render, emptyCells, boardContainer, board}

})();

Gameboard.render();


const Player = (name, sign) => {
  const getSign = () => sign;
  const getName = () => name;
  let board = ['', '', '', '', '', '', '', '', ''];

  return {getSign, getName, board};
}


const displayController = (() => {
  let counter = 0;
  let winner, player1, player2;
  const onePlayer = document.querySelector('#sg-btn1');
  const twoPlayer = document.querySelector('#sg-btn2');

  onePlayer.addEventListener('click', e => {
    e.preventDefault();
    resetGame();
    player1 = Player(document. querySelector('#player').value, 'X');
    player2 = Player('Computer', 'O');
    modalController.toggleModal1();
    playGame();
  });

  twoPlayer.addEventListener('click', e => {
    e.preventDefault();
    resetGame();
    player1 = Player(document. querySelector('#player1').value, 'X');
    player2 = Player(document. querySelector('#player2').value, 'O');
    modalController.toggleModal2();
    playGame();
  });

  const resetGame = () => {
    for (let i = 0; i < 9; i++) {
      Gameboard.board[i] = '';
    }
    Gameboard.emptyCells();
    winner = undefined;
    counter = 0;
  }

  const playGame = () => {
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

      Gameboard.emptyCells();
      Gameboard.render();

      if (winner !== undefined) {
        let opponent = player2.getName();
        modalController.toggleMessageModal(winner, opponent);
        Gameboard.boardContainer.onclick = '';
      }
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

  const isTie = () => {
    modalController.toggleTie();
    Gameboard.boardContainer.onclick = '';
  }

  const winningPattern = [
    [0, 1, 2], [3, 4, 5], [6, 7, 8],
    [0, 3, 6], [1, 4, 7], [2, 5, 8],
    [0, 4, 8], [2, 4, 6]
  ];

})();


const modalController = (() => {
  const modal1 = document.querySelector('.modal-1');
  const modal2 = document.querySelector('.modal-2');
  const messageModal = document.querySelector('.message-modal');
  const trigger1 = document.querySelector('.trigger-1');
  const trigger2 = document.querySelector('.trigger-2');
  const closeButton1 = document.querySelector('.close-button-1');
  const closeButton2 = document.querySelector('.close-button-2');
  const closeButton3 = document.querySelector('.close-button-3');
  const messageHead = document.querySelector('.message-head');
  const message = document.querySelector('.modal-content p');
  
  function toggleModal1() {
    modal1.classList.toggle('show-modal-1');
  }
  
  function toggleModal2() {
    modal2.classList.toggle('show-modal-2');
  }
  
  function toggleMessageModal(winner, player2) {
    messageModal.classList.toggle('show-message-modal');
    if (player2 === 'Computer') {
      if (player2 === winner) {
        messageHead.innerText = 'Game over!';
        message.innerText = 'You lose';
      } else {
        messageHead.innerText = 'Congratulations!';
        message.innerText = 'You win';
      }
    } else {
      messageHead.innerText = 'Congratulations!';
      message.innerText = `${winner} wins`;
    }
  }

  function toggleTie() {
    messageModal.classList.toggle('show-message-modal');
    messageHead.innerText = 'It\'s a tie';
    message.innerText = 'Play again';
  }
  
  function closeMessageModal() {
    messageModal.classList.toggle('show-message-modal');
  }

  function windowOnClick(event) {
    if (event.target === modal1) {
      toggleModal1();
    } else if (event.target === modal2) {
      toggleModal2();
    } else if (event.target === messageModal) {
      toggleMessageModal();
    }
  }
  
  trigger1.addEventListener('click', toggleModal1);
  trigger2.addEventListener('click', toggleModal2);
  closeButton1.addEventListener('click', toggleModal1);
  closeButton2.addEventListener('click', toggleModal2);
  closeButton3.addEventListener('click', closeMessageModal);
  window.addEventListener('click', windowOnClick);

  return {toggleModal1, toggleModal2, toggleMessageModal, toggleTie};

})();
