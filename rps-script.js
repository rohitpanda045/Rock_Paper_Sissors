class RockPaperScissors {
  constructor() {
    this.playerScore = 0;
    this.computerScore = 0;
    this.rounds = [];
    this.choices = ['rock', 'paper', 'scissors'];
    
    this.initializeElements();
    this.addEventListeners();
  }
  
  initializeElements() {
    this.playerScoreEl = document.getElementById('player-score');
    this.computerScoreEl = document.getElementById('computer-score');
    this.playerChoiceEl = document.getElementById('player-choice');
    this.computerChoiceEl = document.getElementById('computer-choice');
    this.roundResultEl = document.getElementById('round-result');
    this.resultsEl = document.getElementById('results');
    this.resultsContentEl = document.getElementById('results-content');
    
    this.rockBtn = document.getElementById('rock');
    this.paperBtn = document.getElementById('paper');
    this.scissorsBtn = document.getElementById('scissors');
    this.playAgainBtn = document.getElementById('play-again');
    this.endGameBtn = document.getElementById('end-game');
    this.newGameBtn = document.getElementById('new-game');
  }
  
  addEventListeners() {
    this.rockBtn.addEventListener('click', () => this.playRound('rock'));
    this.paperBtn.addEventListener('click', () => this.playRound('paper'));
    this.scissorsBtn.addEventListener('click', () => this.playRound('scissors'));
    
    this.playAgainBtn.addEventListener('click', () => this.resetRound());
    this.endGameBtn.addEventListener('click', () => this.endGame());
    this.newGameBtn.addEventListener('click', () => this.newGame());
  }
  
  playRound(playerChoice) {
    const computerChoice = this.getComputerChoice();
    
    // Display choices
    this.displayChoice('player', playerChoice);
    this.displayChoice('computer', computerChoice);
    
    // Determine winner
    const result = this.determineWinner(playerChoice, computerChoice);
    
    // Update scores
    if (result === 'player') {
      this.playerScore++;
      this.playerScoreEl.textContent = this.playerScore;
    } else if (result === 'computer') {
      this.computerScore++;
      this.computerScoreEl.textContent = this.computerScore;
    }
    
    // Record round
    this.rounds.push({
      playerChoice,
      computerChoice,
      result,
      round: this.rounds.length + 1
    });
    
    // Show round result
    this.showRoundResult(result);
  }
  
  getComputerChoice() {
    const randomIndex = Math.floor(Math.random() * this.choices.length);
    return this.choices[randomIndex];
  }
  
  determineWinner(player, computer) {
    if (player === computer) {
      return 'draw';
    }
    
    if (
      (player === 'rock' && computer === 'scissors') ||
      (player === 'paper' && computer === 'rock') ||
      (player === 'scissors' && computer === 'paper')
    ) {
      return 'player';
    }
    
    return 'computer';
  }
  
  displayChoice(type, choice) {
    const element = type === 'player' ? this.playerChoiceEl : this.computerChoiceEl;
    element.innerHTML = `
      <div class="choice-icon">
        <span style="font-size: 3rem;">${this.getChoiceEmoji(choice)}</span>
        <p style="margin-top: 10px; font-size: 1.2rem; text-transform: uppercase;">${choice}</p>
      </div>
    `;
  }
  
  getChoiceEmoji(choice) {
    switch(choice) {
      case 'rock': return '✊';
      case 'paper': return '✋';
      case 'scissors': return '✌️';
      default: return '';
    }
  }
  
  showRoundResult(result) {
    let resultText = '';
    let resultClass = '';
    
    switch(result) {
      case 'player':
        resultText = 'You Win! 🎉';
        resultClass = 'winner';
        break;
      case 'computer':
        resultText = 'Computer Wins! 💻';
        resultClass = 'loser';
        break;
      case 'draw':
        resultText = 'It\'s a Draw! 🤝';
        resultClass = 'draw';
        break;
    }
    
    this.roundResultEl.textContent = resultText;
    this.roundResultEl.className = `round-result ${resultClass}`;
  }
  
  resetRound() {
    this.playerChoiceEl.innerHTML = '<span>Select an option</span>';
    this.computerChoiceEl.innerHTML = '<span>Waiting...</span>';
    this.roundResultEl.textContent = '';
    this.roundResultEl.className = 'round-result';
  }
  
  endGame() {
    this.displayResults();
    this.resultsEl.style.display = 'block';
    
    // Disable choice buttons
    this.rockBtn.disabled = true;
    this.paperBtn.disabled = true;
    this.scissorsBtn.disabled = true;
    this.playAgainBtn.disabled = true;
  }
  
  displayResults() {
    const totalRounds = this.rounds.length;
    const playerWins = this.rounds.filter(round => round.result === 'player').length;
    const computerWins = this.rounds.filter(round => round.result === 'computer').length;
    const draws = this.rounds.filter(round => round.result === 'draw').length;
    
    let resultsHTML = `
      <p>Total Rounds Played: <strong>${totalRounds}</strong></p>
      <p>Player Wins: <strong class="winner">${playerWins}</strong></p>
      <p>Computer Wins: <strong class="loser">${computerWins}</strong></p>
      <p>Draws: <strong class="draw">${draws}</strong></p>
    `;
    
    if (playerWins > computerWins) {
      resultsHTML += `<p class="winner">🎉 Congratulations! You won the game! 🎉</p>`;
    } else if (computerWins > playerWins) {
      resultsHTML += `<p class="loser">💻 Computer won the game! Better luck next time!</p>`;
    } else {
      resultsHTML += `<p class="draw">🤝 It's a tie! Great game!</p>`;
    }
    
    // Show detailed round history
    if (totalRounds > 0) {
      resultsHTML += `<h3>Round Details:</h3>`;
      resultsHTML += `<div class="round-history">`;
      
      this.rounds.forEach((round, index) => {
        let resultText = '';
        let resultClass = '';
        
        switch(round.result) {
          case 'player': 
            resultText = 'Player Win'; 
            resultClass = 'winner'; 
            break;
          case 'computer': 
            resultText = 'Computer Win'; 
            resultClass = 'loser'; 
            break;
          case 'draw': 
            resultText = 'Draw'; 
            resultClass = 'draw'; 
            break;
        }
        
        resultsHTML += `
          <p>
            Round ${index + 1}: You chose ${round.playerChoice}, Computer chose ${round.computerChoice} - 
            <span class="${resultClass}">${resultText}</span>
          </p>
        `;
      });
      
      resultsHTML += `</div>`;
    }
    
    this.resultsContentEl.innerHTML = resultsHTML;
  }
  
  newGame() {
    // Reset all game state
    this.playerScore = 0;
    this.computerScore = 0;
    this.rounds = [];
    
    // Update UI
    this.playerScoreEl.textContent = '0';
    this.computerScoreEl.textContent = '0';
    this.playerChoiceEl.innerHTML = '<span>Select an option</span>';
    this.computerChoiceEl.innerHTML = '<span>Waiting...</span>';
    this.roundResultEl.textContent = '';
    this.roundResultEl.className = 'round-result';
    
    // Hide results
    this.resultsEl.style.display = 'none';
    
    // Enable buttons
    this.rockBtn.disabled = false;
    this.paperBtn.disabled = false;
    this.scissorsBtn.disabled = false;
    this.playAgainBtn.disabled = false;
  }
}

// Initialize the game when the page loads
document.addEventListener('DOMContentLoaded', () => {
  new RockPaperScissors();
});