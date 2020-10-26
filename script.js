const app = (function () {
  const game = {};
  const suites = ["spades", "diamonds", "hearts", "clubs"];
  const ranks = ["A", 2, 3, 4, 5, 6, 7, 8, 9, 10, "J", "Q", "K"];

  function init() {
    console.log("init ready");
    gameBoardBuild();
    buildDeck();
  }

  function buildDeck() {
    game.deck = [];
    for (let i = 0; i < suites.length; i++) {
      for (let j = 0; j < ranks.length; j++) {
        let card = {};
        let cardValue = isNaN(ranks[j]) ? 10 : ranks[j];
        cardValue = ranks[j] == "A" ? 11 : cardValue;
        card.suite = suites[i];
        card.rank = ranks[j];
        card.value = cardValue;
        game.deck.push(card);
      }
    }
    console.log(game.deck);
  }

  function gameBoardBuild() {
    game.main = document.querySelector("#game-content");
    game.scoreboard = document.createElement("div");
    game.scoreboard.textContent = "Dealer Score: 0 || Player Score: 0";
    game.scoreboard.style.fontSize = "24px";
    game.main.append(game.scoreboard);

    game.table = document.createElement("div");
    game.table.classList.add("table");
    game.main.append(game.table);

    // Dealer
    game.dealer = document.createElement("div");
    game.dealer.classList.add("dealer");
    game.table.append(game.dealer);

    game.dealerCards = document.createElement("div");
    game.dealerCards.textContent = "Dealer Cards";
    game.dealer.append(game.dealerCards);

    game.dealerScore = document.createElement("div");
    game.dealerScore.textContent = "-";
    game.playerCards = document.createElement("div");
    game.dealerScore.classList.add("score");
    game.dealer.append(game.dealerScore);

    // Player
    game.player = document.createElement("div");
    game.player.classList.add("player");
    game.table.append(game.player);

    game.playerCards = document.createElement("div");
    game.playerCards.textContent = "Players Cards";
    game.player.append(game.playerCards);

    game.playerScore = document.createElement("div");
    game.playerScore.textContent = "-";
    game.playerCards = document.createElement("div");
    game.playerScore.classList.add("score");
    game.player.append(game.playerScore);

    // Game Dashboard
    game.dashboard = document.createElement("div");
    game.main.append(game.dashboard);

    game.status = document.createElement("div");
    game.status.classList.add("message");
    game.status.textContent = "Message for Player";
    game.dashboard.append(game.status);
    // Dashboard Buttons
    // Deal Cards
    game.dealBtn = document.createElement("button");
    game.dealBtn.textContent = "Deal";
    game.dealBtn.classList.add("btn");
    game.dashboard.append(game.dealBtn);
    // Hit
    game.hitBtn = document.createElement("button");
    game.hitBtn.textContent = "Hit";
    game.hitBtn.classList.add("btn");
    game.dashboard.append(game.hitBtn);
    // Stand
    game.standBtn = document.createElement("button");
    game.standBtn.textContent = "Stand";
    game.standBtn.classList.add("btn");
    game.dashboard.append(game.standBtn);
    // Bet Button
    game.betBtn = document.createElement("button");
    game.betBtn.textContent = "Bet";
    game.betBtn.classList.add("btn");

    // Players cash and bet input - bet buttton will be appended below for ordering purposes.
    game.playerCash = document.createElement("div");
    game.playerCash.classList.add("message");
    game.playerCash.textContent = "Bet Amount";
    game.dashboard.append(game.playerCash);
    // Input Bet
    game.betInput = document.createElement("input");
    game.betInput.setAttribute("type", "number");
    game.betInput.setAttribute("min", "0");
    game.betInput.setAttribute("value", "0");
    game.betInput.classList.add("input");
    game.dashboard.append(game.betInput);
    game.dashboard.append(game.betBtn);
  }

  return {
    init: init,
  };
})();
