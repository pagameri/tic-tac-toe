const gameBoard = (() => {
  
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

  return { render, emptyCells, boardContainer, board }

})();



const Player = (name, sign, start, wins) => {
  const getSign = () => sign;
  const getName = () => name;
  let board = ['', '', '', '', '', '', '', '', ''];
  start: start;
  wins: wins;

  return {getSign, getName, board, start, wins};
}


const displayController = (() => {
  
  // _startUp();

  // function _startUp() {
  //   modalController.trigger1.style.visibility = 'hidden';
  //   modalController.trigger2.style.visibility = 'hidden';
  // }
  
  
  
  
  
  
  
  
  let turnsCounter = 0;
  let winner, player1, player2;
  const chooseModeBtn = document.querySelectorAll('.start-game-button');
  const roundCounter = document.querySelector('.round-counter');
  const player1Container = document.querySelector('.player-1-container'); 
  const player2Container = document.querySelector('.player-2-container'); 
  const player1Counter = document.querySelector('.player-1-counter');
  const player2Counter = document.querySelector('.player-2-counter');
  const nextRoundBtn = document.querySelector('.next-round');
  const resetBtn = document.querySelector('.reset');
  const mainNextRoundBtn = document.querySelector('.next-round-main');
  const messageContainer = document.querySelector('.message-container');
  let round = 1;

  chooseModeBtn.forEach((button) => {
    button.addEventListener('click', e => {
      e.preventDefault();
      modalController.modalTrigger.forEach((trigger) => {
        trigger.style.visibility = 'hidden';
      });
      // modalController.modalTrigger.style.visibility = 'hidden';
      // modalController.trigger2.style.visibility = 'hidden';
      resetBtn.style.visibility = 'visible';
      mainNextRoundBtn.style.visibility = 'visible';
      let id = e.target.id;
      if (id === 'sg-btn1') {
        player1 = Player(document. querySelector('#player').value, 'X', true, 0);
        player2 = Player('Computer', 'O', false, 0);
        modalController.togglePlayerModal(e);
      } else if (id === 'sg-btn2') {
        player1 = Player(document. querySelector('#player1').value, 'X', true, 0);
        player2 = Player(document. querySelector('#player2').value, 'O', false, 0);
        modalController.togglePlayerModal(e);
      }
      messageContainer.innerText = `${player1.getName()} make your move`;
      updateRoundCounter();
      playGame();
    });
  });
  
  nextRoundBtn.addEventListener('click', e => {
    nextRound();
    modalController.toggleMessageModal();
  });
  
  mainNextRoundBtn.addEventListener('click', e => {
    nextRound();
  });

  resetBtn.addEventListener('click', e => {

  })
  
  const updateRoundCounter = () => {
    roundCounter.innerText = round;
    player1Container.innerText = `${player1.getName()}:`;
    player1Counter.innerText = player1.wins;
    player2Container.innerText = `${player2.getName()}:`;
    player2Counter.innerText = player2.wins;
  }
  
  const nextRound = () => {
    round++;
    resetBoard();
    if (player1.turn === true) {
      player1.turn = false;
      player2.turn = true;
    } else {
      player1.turn = true;
      player2.turn = false;
    }
    player1.board = ['', '', '', '', '', '', '', '', ''];
    player2.board = ['', '', '', '', '', '', '', '', ''];
    updateRoundCounter();
    playGame();
  }

  const resetBoard = () => {
    for (let i = 0; i < 9; i++) {
      gameBoard.board[i] = '';
    }
    gameBoard.emptyCells();
    winner = undefined;
    turnsCounter = 0;
  }

  const playGame = () => {

    gameBoard.boardContainer.onclick = (event) => {
      let target = event.target;
      let index = target.getAttribute('id');
      let cell = gameBoard.board[index];


      if (cell === '') {
        if (turnsCounter % 2 === 0) {
          drawBoard(player1, index);
        } else {
          drawBoard(player2, index);
        }

        if (turnsCounter <= 7) {
          turnsCounter++;
        } else if (winner === undefined) {
          isTie();
        } 
      }

      gameBoard.emptyCells();
      gameBoard.render();

      if (winner !== undefined) {
        let opponent = player2.getName();
        modalController.toggleMessageModal(winner, opponent);
        gameBoard.boardContainer.onclick = '';
      }
    }
  }

  const drawBoard = (player, index) => {
    let sign = player.getSign();
    if (player === player1) {
      messageContainer.innerText = `${player2.getName()} make your move`;
    } else {
      messageContainer.innerText = `${player1.getName()} make your move`;
    }
    gameBoard.board[index] = sign;
    player.board.splice(index, 1, sign);
    if (turnsCounter >= 4) {
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
        player.wins++;
        return player.getName();
      }
    }
  }

  const isTie = () => {
    modalController.toggleTie();
    gameBoard.boardContainer.onclick = '';
  }

  const winningPattern = [
    [0, 1, 2], [3, 4, 5], [6, 7, 8],
    [0, 3, 6], [1, 4, 7], [2, 5, 8],
    [0, 4, 8], [2, 4, 6]
  ];

})();


const modalController = (() => {
  const onePlayerModal = document.querySelector('.one-player-modal');//
  const twoPlayerModal = document.querySelector('.two-player-modal');//
  const messageModal = document.querySelector('.message-modal');
  const modalTrigger = document.querySelectorAll('.modal-trigger');//
  const closePlayerModal = document.querySelectorAll('.close-player-modal');
  // const closeButton1 = document.querySelector('.close-button-1');
  // const closeButton2 = document.querySelector('.close-button-2');
  const closeButton3 = document.querySelector('.close-button-3');
  const messageHead = document.querySelector('.message-head');
  const message = document.querySelector('.modal-content p');
  
  function togglePlayerModal(e) {
    let onePlayerIDs = ['one-player-mode', 'sg-btn1', 'close-1'];
    let twoPlayerIDs = ['two-player-mode', 'sg-btn2', 'close-2'];
    if (onePlayerIDs.includes(e.target.id)) {
      onePlayerModal.classList.toggle('show-one-player-modal');
    } else if (twoPlayerIDs.includes(e.target.id)) {
      twoPlayerModal.classList.toggle('show-two-player-modal');
    }
  }
  
  function windowOnClick(event) {
    if (event.target === messageModal) {
      toggleMessageModal();
    } else if (event.target === onePlayerModal || event.target === twoPlayerModal) {
      togglePlayerModal();
    }
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
  
  function closeMessageModal() {
    messageModal.classList.toggle('show-message-modal');
  }

  function toggleTie() {
    messageModal.classList.toggle('show-message-modal');
    messageHead.innerText = 'It\'s a tie';
    message.innerText = 'Play again';
  }
  

  modalTrigger.forEach((trigger) => {
    trigger.addEventListener('click', togglePlayerModal);
  });
  closePlayerModal.forEach((button) => {
    button.addEventListener('click', togglePlayerModal);
  });
  // closeButton1.addEventListener('click', togglePlayerModal);
  // closeButton2.addEventListener('click', togglePlayerModal);

  closeButton3.addEventListener('click', closeMessageModal);
  window.addEventListener('click', windowOnClick);

  return {togglePlayerModal, toggleMessageModal, toggleTie, modalTrigger};

})();
