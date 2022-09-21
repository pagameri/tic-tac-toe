const Player = (name, sign, start, winCount, winner) => {
  const getSign = () => sign;
  // const getName = () => name;
  name: name;
  let board = ['', '', '', '', '', '', '', '', ''];
  start: start;
  winCount: winCount;
  winner: winner;

  return {getSign, name, board, start, winCount, winner};
}


const playerSetup = (() => {
  let player1 = Player('', 'X', true, 0, false);
  let player2 = Player('', 'O', false, 0, false);

  return { player1, player2 }
})();


const boardSetup = (() => {
  
  const resetBtn = document.querySelector('.reset-button');
  const playerModeBtns = document.querySelectorAll('.modal-trigger');
  const startGameBtn = document.querySelectorAll('.start-game-button');
  const roundCounterArea = document.querySelector('.rounds');
  const messageContainer = document.querySelector('.message-container');
  const nextRoundBtn = document.querySelector('.next-round-button');
  const mainNextRoundBtn = document.querySelector('.next-round-button-main');
  let round = 0;
  

  const startUp = () => {

    resetBtn.style.visibility = 'hidden';

    playerModeBtns.forEach((button) => {
      button.style.visibility = 'visible';
    });

    mainNextRoundBtn.style.visibility = 'hidden';
    roundCounterArea.style.visibility = 'hidden';

    messageContainer.innerText = 'Select type of game to start';
  };

  startUp();

  startGameBtn.forEach((button) => {
    button.addEventListener('click', e => {
      e.preventDefault();

      resetBtn.style.visibility = 'visible';

      playerModeBtns.forEach((button) => {
        button.style.visibility = 'hidden';
      });

      mainNextRoundBtn.style.visibility = 'visible';
      roundCounterArea.style.visibility = 'visible';
      
      if (e.target.id === 'sg-btn1') {
        let player1Input = document.querySelector('#player').value; 
        
        if (player1Input !== '') {
           playerSetup.player1.name = player1Input;
        } else {
          playerSetup.player1.name = 'Player 1';
        }

        playerSetup.player2.name = 'Computer';

        modalController.togglePlayerModal(e);
        
        messageContainer.innerText = `${playerSetup.player1.name}\'s turn`;

        gameControl.updateRoundCounter();
  
        gameFlow.playAgainstComputer();

      } else if (e.target.id === 'sg-btn2') {
        let player1Input = document.querySelector('#player1').value;
        let player2Input = document.querySelector('#player2').value;

        if (player1Input !== '') {
          playerSetup.player1.name = player1Input;
        } else {
          playerSetup.player1.name = 'Player 1';
        }

        if (player2Input !== '') {
          playerSetup.player2.name = player2Input;
        } else {
          playerSetup.player2.name = 'Player 2';
        }

        modalController.togglePlayerModal(e);

        messageContainer.innerText = `${playerSetup.player1.name}\'s turn`;

        gameControl.updateRoundCounter();

        gameFlow.playGame();
      }

     
    });
  });
 

  nextRoundBtn.addEventListener('click', () => {
    modalController.closeMessageModal();
    gameControl.nextRound();
  });


  mainNextRoundBtn.addEventListener('click', () => {
    gameControl.nextRound();
  });


  resetBtn.addEventListener('click', () => {
    gameControl.resetGame();



});

  return { startUp, messageContainer, resetBtn, round }

})();





const gameControl = (() => {

  let board = ['', '', '', '', '', '', '', '', ''];
  const cells = document.querySelectorAll('.cell');


  const render = () => {
    let index = 0;

    cells.forEach((cell) => {
      cell.innerText = gameControl.board[index];
      if (cell.innerText === 'X') {
        cell.style.color = 'red';
      } else {
        cell.style.color = 'blue';
      }
      index++;
    });
  }


  const emptyCells = () => {
    cells.forEach((cell) => {
      cell.innerText = '';
    });
  }


  const updateBoard = (player, index) => {
      let sign = player.getSign();
      if (player === playerSetup.player1) {
        boardSetup.messageContainer.innerText = `${playerSetup.player2.name}\'s turn`;
      } else {
        boardSetup.messageContainer.innerText = `${playerSetup.player1.name}\'s turn`;
      }
      gameControl.board[index] = sign;

      player.board.splice(index, 1, sign);
    } 

  
  const nextRound = () => {
    _clearStats();

    emptyCells();

    _swapStartingPlayer();
    
    updateRoundCounter();

    if (playerSetup.player1.start) {
      boardSetup.messageContainer.innerText = `${playerSetup.player1.name}\'s turn`;
    } else {
      boardSetup.messageContainer.innerText = `${playerSetup.player2.name}\'s turn`;
    }

    if (playerSetup.player2.name !== 'Computer') {
      gameFlow.playGame();
    } else {
      gameFlow.playAgainstComputer();
    }
  }


  const _clearStats = () => {
    // for (let i = 0; i < 9; i++) {
    //   gameControl.board[i] = '';
    // }
    gameControl.board = ['', '', '', '', '', '', '', '', ''];
    board = ['', '', '', '', '', '', '', '', ''];

    gameFlow.turnsCounter = 0;

    playerSetup.player1.board = ['', '', '', '', '', '', '', '', ''];
    playerSetup.player2.board = ['', '', '', '', '', '', '', '', ''];

    playerSetup.player1.winner = false;
    playerSetup.player2.winner = false;
  }
  

  const _swapStartingPlayer = () => {
    if (playerSetup.player1.start === true) {
      playerSetup.player1.start = false;
      playerSetup.player2.start = true;
    } else {
      playerSetup.player1.start = true;
      playerSetup.player2.start = false;
    }
  }


  const updateRoundCounter = () => {
    boardSetup.round++;
    const roundCounter = document.querySelector('.round-counter');
    const player1Container = document.querySelector('.player-1-container'); 
    const player2Container = document.querySelector('.player-2-container'); 
    const player1Counter = document.querySelector('.player-1-counter');
    const player2Counter = document.querySelector('.player-2-counter');

    roundCounter.innerText = boardSetup.round;

    player1Container.innerText = `${playerSetup.player1.name}:`;
    player1Container.style.color = 'red';
    player1Counter.innerText = playerSetup.player1.winCount;

    player2Container.innerText = `${playerSetup.player2.name}:`;
    player2Container.style.color = 'blue';
    player2Counter.innerText = playerSetup.player2.winCount;
  }
  

  const resetGame = () => {
    playerSetup.player1 = Player('', 'X', true, 0, false);
    playerSetup.player2 = Player('', 'O', false, 0, false);
    boardSetup.round = 0;

    gameFlow.boardContainer.onclick = '';

    emptyCells();

    _clearStats(); // check is can do without it

    boardSetup.startUp();
  }




  return { board, render, emptyCells, updateBoard, nextRound, updateRoundCounter, resetGame }

})();


const gameFlow = (() => {

  const boardContainer = document.querySelector('.board-container');
  let turnsCounter = 0;
  const winningPattern = [
    [0, 1, 2], [3, 4, 5], [6, 7, 8],
    [0, 3, 6], [1, 4, 7], [2, 5, 8],
    [0, 4, 8], [2, 4, 6]
  ];
  
  
  const playGame = () => {
    
    boardContainer.onclick = (event) => {
      let index = event.target.id;
      let cell = gameControl.board[index];

      if (cell === '') {
        if (gameFlow.turnsCounter % 2 === 0 && playerSetup.player1.start) {
          gameControl.updateBoard(playerSetup.player1, index);
        } else if (gameFlow.turnsCounter % 2 !== 0 && playerSetup.player1.start) {
          gameControl.updateBoard(playerSetup.player2, index);
        } else if (gameFlow.turnsCounter % 2 === 0 && !playerSetup.player1.start) {
          gameControl.updateBoard(playerSetup.player2, index);
        } else {
          gameControl.updateBoard(playerSetup.player1, index);
        }
      }

      gameControl.emptyCells();

      gameControl.render();

      _checkForWinner();
    }
  }


  const playAgainstComputer = () => {
    
    if (gameFlow.turnsCounter % 2 === 0 && playerSetup.player1.start || gameFlow.turnsCounter % 2 !== 0 && playerSetup.player2.start) {
      boardContainer.onclick = (event) => {
        _waitForPlayer(event);        
      } 
      
    } else if (gameFlow.turnsCounter % 2 === 0 && playerSetup.player2.start || gameFlow.turnsCounter % 2 !== 0 && playerSetup.player1.start) {
      _playComputer()
      if (!playerSetup.player2.winner) {
        playAgainstComputer();
      }
    };
    
  }

  
  const _waitForPlayer = (event) => {
    let index = event.target.id;
    let cell = gameControl.board[index];
    
    if (cell === '') {
      gameControl.updateBoard(playerSetup.player1, index);

      gameControl.emptyCells();

      gameControl.render();

      _checkForWinner();
    }
    if (!playerSetup.player1.winner) {
      _playComputer();
    }
  }

      
  const _playComputer = () => {
    let availableIndexes = [];
 
    for (let i = 0; i < 9; i++) {
      if (gameControl.board[i] === '') {
        availableIndexes.push(i);
      }
    }

    function getRandomNumber(indexes) {
      let randomNumber = indexes[Math.floor(Math.random()*indexes.length)];
      return randomNumber;
    }
    
    let computersMove = getRandomNumber(availableIndexes);

    gameControl.updateBoard(playerSetup.player2, computersMove);

    gameControl.emptyCells();

    gameControl.render();

    _checkForWinner();
  }  


  const _checkForWinner = () => {
    if (gameFlow.turnsCounter >= 4) {
      if (playerSetup.player1.start && gameFlow.turnsCounter % 2 === 0 || !playerSetup.player1.start && gameFlow.turnsCounter % 2 !== 0) {
        _checkPlayer(playerSetup.player1);
      } else if (playerSetup.player2.start && gameFlow.turnsCounter % 2 === 0 || !playerSetup.player2.start && gameFlow.turnsCounter !== 0) {
        _checkPlayer(playerSetup.player2);
      }

      function _checkPlayer(player) {
        let sign = player.getSign();

        for (let pattern of winningPattern) {
          let patternToMatch = [sign, sign, sign];
          let playersPattern = [];

          for (let element of pattern) {
            playersPattern.push(player.board[element]);
            }

          if (patternToMatch.toString() === playersPattern.toString()) {
            player.winCount++;

            player.winner = true;

            boardContainer.onclick = '';

            boardSetup.messageContainer.innerText = '';
            
            modalController.toggleGameMessageModal();
            
            return;
            }
          }

          if (gameFlow.turnsCounter <= 7) {
            gameFlow.turnsCounter++;
          } else {
            boardContainer.onclick = '';

            boardSetup.messageContainer.innerText = '';
            
            modalController.toggleTie();
          } 
        }
      } else {
        gameFlow.turnsCounter++;
      } 
    }


  return { playAgainstComputer, playGame, boardContainer, turnsCounter }

})();



const modalController = (() => {
  const onePlayerModal = document.querySelector('.one-player-modal');
  const twoPlayerModal = document.querySelector('.two-player-modal');
  const messageModal = document.querySelector('.message-modal');
  const modalTrigger = document.querySelectorAll('.modal-trigger');
  const closePlayerModal = document.querySelectorAll('.close-player-modal');
  const closeButton3 = document.querySelector('.close-button-3'); // btn 3??
  const messageHead = document.querySelector('.message-head');// ?
  const message = document.querySelector('.modal-content p');// ?
  

  const togglePlayerModal = (e) => {
    let onePlayerIDs = ['one-player-mode', 'sg-btn1', 'close-1'];
    let twoPlayerIDs = ['two-player-mode', 'sg-btn2', 'close-2'];

    if (onePlayerIDs.includes(e.target.id)) {
      onePlayerModal.classList.toggle('show-one-player-modal');
      boardSetup.messageContainer.innerText = 'Enter your name';
    } else if (twoPlayerIDs.includes(e.target.id)) {
      twoPlayerModal.classList.toggle('show-two-player-modal');
      boardSetup.messageContainer.innerText = 'Enter players\' name';
    }
  }
  

  const _windowOnClick = (e) => {
    if (e.target === messageModal) {
      closeMessageModal();
    } else if (e.target === onePlayerModal || e.target === twoPlayerModal) {
      togglePlayerModal();
    }
  }

  const toggleGameMessageModal = () => {
    messageModal.classList.toggle('show-message-modal');

    if (playerSetup.player2.name === 'Computer') {
      if (playerSetup.player2.winner) {
        messageHead.innerText = 'Game over!';
        message.innerText = 'You lose';
      } else {
        messageHead.innerText = 'Congratulations!';
        message.innerText = 'You win';
      }
    } else if (playerSetup.player1.winner) {
      messageHead.innerText = 'Congratulations!';
      message.innerText = `${playerSetup.player1.name} wins`;
    } else {
      messageHead.innerText = 'Congratulations!';
      message.innerText = `${playerSetup.player2.name} wins`;
    }
  }
  

  const  closeMessageModal = () => {
    messageModal.classList.toggle('show-message-modal');
    boardSetup.messageContainer.innerText = 'Click \'Next round\' to continue';
  }


  const toggleTie = () => {
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

  closeButton3.addEventListener('click', closeMessageModal);

  window.addEventListener('click', _windowOnClick);


  return { togglePlayerModal, toggleGameMessageModal, toggleTie, closeMessageModal };

})();
