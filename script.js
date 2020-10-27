const app = (function () {
  const game = {};
  const suites = ["spades", "diams", "hearts", "clubs"];
  const ranks = ["A", 2, 3, 4, 5, 6, 7, 8, 9, 10, "J", "Q", "K"];

  function init() {
    console.log("init ready");
    gameBoardBuild();
    turnBtnOff(game.hitBtn);
    turnBtnOff(game.standBtn);
    buildDeck();
    shuffleDeck();
    addClick();
  }

  //Build Deck
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
  }
  //Shuffle Deck
  function shuffleDeck() {
    game.deck.sort(() => Math.random() - 0.5);
    console.log(game.deck);
  }

  // Adding on click functions
  function addClick() {
    game.dealBtn.addEventListener("click", dealHand);
    game.hitBtn.addEventListener("click", playerHit);
    game.standBtn.addEventListener("click", playerStand);
    // game.betBtn.addEventListener('click', bet)
  }
  // click functions below
  function dealHand() {
    game.dealerHand = [];
    game.playerHand = [];
    game.start = true;
    turnBtnOff(game.dealBtn);
    game.dealerCards.innerHTML = "";
    game.playerCards.innerHTML = "";
    drawCard(game.dealerHand, game.dealerCards, true);
    drawCard(game.dealerHand, game.dealerCards, false);
    drawCard(game.playerHand, game.playerCards, false);
    drawCard(game.playerHand, game.playerCards, false);
    updateCounter();
  }

  // functions to keep track of the game and hand count
  function findWinner() {
    turnBtnOff(game.hitBtn);
    turnBtnOff(game.standBtn);
    let player = score(game.playerHand);
    let dealer = score(game.dealerHand);
    if (player > 21) {
      game.status.textContent = "You busted with " + player;
    }
    if (dealer > 21) {
      game.status.textContent = "The dealer has busted with " + dealer;
    }

    if (player == dealer) {
      game.status.textContent = "Push";
    } else if ((player < 22 && player > dealer) || dealer > 21) {
      game.status.textContent = "The player has won with " + player + ". ";
    } else {
      game.status.textContent = "The dealer wins with " + dealer;
    }
    turnBtnOn(game.dealBtn);
  }

  function dealerPlay() {
    let dealer = score(game.dealerHand);
    game.status.textContent = "Dealer has " + dealer;
    if (dealer >= 17) {
      game.dealerScore.textContent = "The dealers score is " + dealer;
      findWinner();
    } else {
      drawCard(game.dealerHand, game.dealerCards, false);
      game.dealerScore.textContent = "The dealers score is " + dealer;
      dealerPlay();
    }
  }

  function updateCounter() {
    let player = score(game.playerHand);
    let dealer = score(game.dealerHand);
    console.log(player, dealer);
    game.playerScore.textContent = "The players current hand total " + player;
    game.dealerScore.textContent = "";
    if (player < 21) {
      turnBtnOn(game.hitBtn);
      turnBtnOn(game.standBtn);
      game.status.textContent =
        "Stand at " + player + " or hit for another card";
    } else if (player > 21) {
      findWinner();
    } else {
      dealerPlay(dealer);
      removeHidden();
    }
  }

  function scoreAce(value, aces) {
    if (value < 21) {
      return value;
    } else if (aces > 0) {
      aces--;
      value = value - 10; // subtracts 10 from the ace
      return scoreAce(value, aces);
    } else {
      return value;
    }
  }

  function score(hand) {
    let total = 0;
    let ace = 0;
    hand.forEach(function (card) {
      if (card.rank == "A") {
        ace++;
      }
      total += Number(card.value);
    });
    if (ace > 0 && total > 21) {
      total = scoreAce(total, ace);
    }

    return Number(total);
  }

  //Player options during game
  function playerHit() {
    drawCard(game.playerHand, game.playerCards, false);
    updateCounter();
  }

  function playerStand() {
    removeHidden();
    dealerPlay();
    turnBtnOff(game.standBtn);
    turnBtnOff(game.hitBtn);
  }

  //functions for drawing the cards to start the game
  function drawCard(hand, el, h) {
    let firstCard = game.deck.shift();
    hand.push(firstCard);
    showCard(firstCard, el, h);
  }

  function showCard(card, el, h) {
    if (card != undefined) {
      el.style.backgroundColor = "white";
      let cardDiv = document.createElement("div");
      cardDiv.classList.add("card");
      if (card.suite === "hearts" || card.suite === "diams") {
        cardDiv.classList.add("red");
      }
      if (h) {
        cardDiv.classList.add("hidden");
      }
      let cardSpan = document.createElement("div");
      cardSpan.innerHTML = card.rank + "&" + card.suite + ";";
      cardSpan.classList.add("tiny");
      cardDiv.appendChild(cardSpan);

      let rankSpan = document.createElement("div");
      rankSpan.innerHTML = card.rank;
      rankSpan.classList.add("big");
      cardDiv.appendChild(rankSpan);

      let suiteSpan = document.createElement("div");
      suiteSpan.innerHTML = "&" + card.suite + ";";
      suiteSpan.classList.add("big");
      cardDiv.appendChild(suiteSpan);

      el.appendChild(cardDiv);
    }
  }

  function removeHidden() {
    let hidden = document.getElementsByClassName("hidden");
    hidden[0].classList.remove("hidden");
  }

  // functions to disable and enable the hit / stand / deal / bet buttons at certain times
  function turnBtnOff(btn) {
    btn.disabled = true;
    btn.style.backgroundColor = "#ddd";
  }
  function turnBtnOn(btn) {
    btn.disabled = false;
    btn.classList.add("btn");
  }

  //Build Gameboard
  function gameBoardBuild() {
    game.main = document.querySelector("#game-content");
    game.scoreboard = document.createElement("div");
    game.scoreboard.textContent = "Welcome to BLACKJACK";
    game.scoreboard.style.fontSize = "24px";
    game.scoreboard.classList.add("header");
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
    game.playerScore.classList.add("score");
    game.player.append(game.playerScore);

    // Game Dashboard
    game.dashboard = document.createElement("div");
    game.dashboard.classList.add("dashboard");
    game.main.append(game.dashboard);

    game.status = document.createElement("div");
    game.status.classList.add("message");
    game.status.textContent = "Click Deal to being";
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
