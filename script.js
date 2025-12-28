/**
 * UNO DARE! - Complete Game Logic
 * A chaotic family card game where you play cards or perform dares
 */

// ===========================================
// DARE DATA
// ===========================================
const DARES = {
    "Family": [
        "Talk like a sports announcer and narrate the game until your next turn.",
        "Show your best dance moves until your next turn.",
        "Talk like a space alien until your next turn.",
        "Pretend everything makes you cry until your next turn.",
        "No talking until your next turn.",
        "Talk like Mom or Dad until your next turn.",
        "Let someone mess up your hair.",
        "Talk with your belly button until your next turn.",
        "Make up a cheer about the player on your left.",
        "End every sentence by saying 'hippity hop' until your next turn.",
        "Baby talk until your next turn.",
        "Remain perfectly frozen until your next turn.",
        "Make a funny face until your next turn.",
        "Sing instead of talk until your next turn.",
        "Act like a cat until your next turn.",
        "Answer everything by clapping your hands and saying 'I believe in fairies' until your next turn."
    ],
    "Daredevil": [
        "Put a card between your knees and walk around the other players.",
        "Balance one card on your head until your next turn.",
        "Pin a card against the wall with your nose until your next turn.",
        "Stand on 1 foot until your next turn.",
        "Dance like a ballerina until your next turn.",
        "Try to blow ONLY one card off the top of the Draw Pile.",
        "Do 10 push ups in 10 seconds.",
        "Spin around 5 times then walk 10 paces in a straight line.",
        "Balance one card on each shoulder until your next turn.",
        "Hold your cards in your feet until your next turn.",
        "Draw exactly 10 cards from the Draw Pile in one grab.",
        "Hop like a bunny until your next turn.",
        "Put your foot above your head until your next turn.",
        "Don't smile until your next turn.",
        "Hold your cards in your arm pit until your next turn.",
        "Correctly guess the color of the top card of the Draw Pile."
    ],
    "Show-Off": [
        "Act like a dog until your next turn.",
        "Do a runway model walk across the room.",
        "Pretend you are underwater until your next turn.",
        "Impersonate your favorite singer.",
        "Dance like a robot until your next turn.",
        "Talk like a princess until your next turn.",
        "Speak only in grunts until your next turn.",
        "Talk to the player on your left like they're your celebrity crush.",
        "Talk like a mouse until your next turn.",
        "Act like a total Diva until your next turn.",
        "No laughing until your next turn.",
        "Talk like a super villain until your next turn.",
        "Pretend all your clothes itch until your next turn.",
        "Talk like a pirate until your next turn.",
        "Pretend to put on your make-up using an UNO card.",
        "Do an impersonation of your favorite cartoon character."
    ],
    "House Rules": [
        "Yodel like a mountain goat before drawing your next card.",
        "Do the Macarena dance until your next turn.",
        "Speak only in questions until your next turn.",
        "Act like a dog until your next turn.",
        "Balance a pencil on your upper lip until your next turn.",
        "Impersonate a T-Rex (tiny arms!) until your next turn.",
        "Beatbox 'Boots and Cats' until the next player completes their turn.",
        "Sing Baby Shark until your next turn.",
        "Pretend you're riding an invisible bull until your next turn.",
        "Act and speak like Jim Carrey until your next turn.",
        "Hopscotch for 10 seconds before your turn.",
        "Make animal noises for every card anyone plays.",
        "Recite the ABCs backwards until your next turn.",
        "Do the worm or crabwalk on the floor once.",
        "Talk like a caveman (Unga bunga!) until your next turn.",
        "Strike a superhero pose and declare your powers before playing."
    ]
};

// ===========================================
// GAME STATE
// ===========================================
const GameState = {
    // Setup
    players: [],
    dareCategory: "Family",
    
    // Game
    deck: [],
    discardPile: [],
    currentPlayerIndex: 0,
    direction: 1, // 1 = clockwise, -1 = counter-clockwise
    round: 1,
    
    // Turn state
    hasDrawnThisTurn: false,
    pendingDare: null,
    pendingColorChoice: null,
    
    // Scores
    scores: [],
    
    // UNO tracking
    playerSaidUno: [],
    
    // Constants
    WINNING_SCORE: 500
};

// ===========================================
// DOM ELEMENTS
// ===========================================
const DOM = {
    // Screens
    setupScreen: document.getElementById('setup-screen'),
    gameScreen: document.getElementById('game-screen'),
    
    // Setup
    playerCount: document.getElementById('player-count'),
    playerNames: document.getElementById('player-names'),
    startGameBtn: document.getElementById('start-game-btn'),
    
    // Game Header
    roundNumber: document.getElementById('round-number'),
    directionIndicator: document.getElementById('direction-indicator'),
    scoreboardBtn: document.getElementById('scoreboard-btn'),
    unoCallBtn: document.getElementById('uno-call-btn'),
    
    // Play Area
    opponentsArea: document.getElementById('opponents-area'),
    drawPile: document.getElementById('draw-pile'),
    drawCount: document.getElementById('draw-count'),
    discardPile: document.getElementById('discard-pile'),
    currentPlayerName: document.getElementById('current-player-name'),
    currentPlayerBanner: document.getElementById('current-player-banner'),
    
    // Hand Area
    handPlayerName: document.getElementById('hand-player-name'),
    handCardCount: document.getElementById('hand-card-count'),
    playerHand: document.getElementById('player-hand'),
    
    // Action Buttons
    actionButtons: document.getElementById('action-buttons'),
    drawCardBtn: document.getElementById('draw-card-btn'),
    passBtn: document.getElementById('pass-turn-btn'),
    
    // Modals
    colorModal: document.getElementById('color-modal'),
    dareModal: document.getElementById('dare-modal'),
    scoreboardModal: document.getElementById('scoreboard-modal'),
    roundEndModal: document.getElementById('round-end-modal'),
    gameOverModal: document.getElementById('game-over-modal'),
    unoPenaltyModal: document.getElementById('uno-penalty-modal'),
    
    // Dare Modal
    darePlayerName: document.getElementById('dare-player-name'),
    dareNumber: document.getElementById('dare-number'),
    dareText: document.getElementById('dare-text'),
    doDareBtn: document.getElementById('do-dare-btn'),
    skipDareBtn: document.getElementById('skip-dare-btn'),
    dareResult: document.getElementById('dare-result'),
    dareCompleteBtn: document.getElementById('dare-complete-btn'),
    dareFailedBtn: document.getElementById('dare-failed-btn'),
    
    // Scoreboard Modal
    scoreboardList: document.getElementById('scoreboard-list'),
    closeScoreboardBtn: document.getElementById('close-scoreboard-btn'),
    
    // Round End Modal
    roundWinnerText: document.getElementById('round-winner-text'),
    pointsEarned: document.getElementById('points-earned'),
    roundScores: document.getElementById('round-scores'),
    nextRoundBtn: document.getElementById('next-round-btn'),
    
    // Game Over Modal
    gameWinnerText: document.getElementById('game-winner-text'),
    finalScore: document.getElementById('final-score'),
    finalStandings: document.getElementById('final-standings'),
    newGameBtn: document.getElementById('new-game-btn'),
    
    // Penalty Modal
    penaltyText: document.getElementById('penalty-text'),
    acceptPenaltyBtn: document.getElementById('accept-penalty-btn'),
    
    // Toast
    toastContainer: document.getElementById('toast-container')
};

// ===========================================
// DECK MANAGEMENT
// ===========================================
function createDeck() {
    const deck = [];
    const colors = ['red', 'yellow', 'green', 'blue'];
    let cardId = 0;
    
    colors.forEach(color => {
        // One 0 per color
        deck.push({ id: cardId++, color, type: 'number', value: 0 });
        
        // Two of each 1-9
        for (let num = 1; num <= 9; num++) {
            deck.push({ id: cardId++, color, type: 'number', value: num });
            deck.push({ id: cardId++, color, type: 'number', value: num });
        }
        
        // Two Reverse per color
        deck.push({ id: cardId++, color, type: 'reverse', value: 'reverse' });
        deck.push({ id: cardId++, color, type: 'reverse', value: 'reverse' });
        
        // Two Skip per color
        deck.push({ id: cardId++, color, type: 'skip', value: 'skip' });
        deck.push({ id: cardId++, color, type: 'skip', value: 'skip' });
        
        // Two Dare per color (numbered 1-16 for dare lookup)
        const dareNum1 = Math.floor(Math.random() * 16) + 1;
        const dareNum2 = Math.floor(Math.random() * 16) + 1;
        deck.push({ id: cardId++, color, type: 'dare', value: 'dare', dareNumber: dareNum1 });
        deck.push({ id: cardId++, color, type: 'dare', value: 'dare', dareNumber: dareNum2 });
    });
    
    // 8 Wild Dare cards
    for (let i = 0; i < 8; i++) {
        const dareNum = Math.floor(Math.random() * 16) + 1;
        deck.push({ id: cardId++, color: 'wild', type: 'wild-dare', value: 'wild-dare', dareNumber: dareNum });
    }
    
    return deck;
}

function shuffleDeck(deck) {
    const shuffled = [...deck];
    for (let i = shuffled.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
    }
    return shuffled;
}

function drawCard(count = 1) {
    const drawn = [];
    for (let i = 0; i < count; i++) {
        if (GameState.deck.length === 0) {
            // Reshuffle discard pile (except top card)
            if (GameState.discardPile.length > 1) {
                const topCard = GameState.discardPile.pop();
                GameState.deck = shuffleDeck(GameState.discardPile);
                // Reset wild colors
                GameState.deck.forEach(card => {
                    if (card.type === 'wild-dare') {
                        card.chosenColor = null;
                    }
                });
                GameState.discardPile = [topCard];
                showToast("Deck reshuffled!");
            } else {
                showToast("No more cards to draw!", "warning");
                break;
            }
        }
        if (GameState.deck.length > 0) {
            drawn.push(GameState.deck.pop());
        }
    }
    updateDrawCount();
    return drawn;
}

function updateDrawCount() {
    DOM.drawCount.textContent = GameState.deck.length;
}

// ===========================================
// CARD RENDERING
// ===========================================
function createCardElement(card, isPlayable = false, showFace = true) {
    const cardEl = document.createElement('div');
    cardEl.className = `uno-card ${card.color}`;
    
    if (card.type !== 'number') {
        cardEl.classList.add(card.type);
    }
    
    // For wild cards with chosen color
    if (card.type === 'wild-dare' && card.chosenColor) {
        cardEl.style.background = `var(--uno-${card.chosenColor})`;
    }
    
    // Set data attribute for display
    if (card.type === 'number') {
        cardEl.setAttribute('data-value', card.value);
    }
    
    // Add corners
    const cornerValue = card.type === 'number' ? card.value : 
                        card.type === 'skip' ? '⊘' :
                        card.type === 'reverse' ? '⇄' :
                        card.type === 'dare' ? '🎭' :
                        card.type === 'wild-dare' ? '🎭' : '';
    
    cardEl.innerHTML = `
        <span class="card-corner top-left">${cornerValue}</span>
        <span class="card-corner bottom-right">${cornerValue}</span>
        <span class="colorblind-symbol"></span>
        ${(card.type === 'dare' || card.type === 'wild-dare') ? `<span class="dare-num">#${card.dareNumber}</span>` : ''}
    `;
    
    // Playability
    if (isPlayable) {
        cardEl.classList.add('playable');
    } else if (!isPlayable && showFace) {
        cardEl.classList.add('not-playable');
    }
    
    // Store card data
    cardEl.dataset.cardId = card.id;
    
    return cardEl;
}

function getTopCard() {
    return GameState.discardPile[GameState.discardPile.length - 1];
}

// ===========================================
// GAME LOGIC
// ===========================================
function canPlayCard(card) {
    const topCard = getTopCard();
    if (!topCard) return true;
    
    // Wild dare can always be played
    if (card.type === 'wild-dare') return true;
    
    // Check if player must respond to a dare (can only draw 2 or do dare)
    if (GameState.pendingDare) return false;
    
    const matchColor = topCard.chosenColor || topCard.color;
    
    // Match color
    if (card.color === matchColor) return true;
    
    // Match value/type
    if (card.type === 'number' && topCard.type === 'number' && card.value === topCard.value) return true;
    if (card.type === topCard.type && card.type !== 'number') return true;
    
    return false;
}

function playCard(card, playerIndex) {
    const player = GameState.players[playerIndex];
    const cardIndex = player.hand.findIndex(c => c.id === card.id);
    
    if (cardIndex === -1) return false;
    
    // Remove from hand
    player.hand.splice(cardIndex, 1);
    
    // Add to discard
    GameState.discardPile.push(card);
    
    // Check UNO
    if (player.hand.length === 1 && !GameState.playerSaidUno[playerIndex]) {
        // Player forgot to say UNO - mark for penalty if caught
        player.forgotUno = true;
    }
    
    // Handle action cards
    handleCardAction(card, playerIndex);
    
    // Check for win
    if (player.hand.length === 0) {
        endRound(playerIndex);
        return true;
    }
    
    // Move to next turn (if not waiting for color/dare)
    if (!GameState.pendingColorChoice && !GameState.pendingDare) {
        nextTurn();
    }
    
    return true;
}

function handleCardAction(card, playerIndex) {
    switch (card.type) {
        case 'reverse':
            GameState.direction *= -1;
            updateDirectionIndicator();
            showToast("Direction reversed! ⇄");
            if (GameState.players.length === 2) {
                // In 2-player, reverse acts like skip
                // So current player goes again (skip handled by not advancing)
            }
            break;
            
        case 'skip':
            showToast(`${getNextPlayer().name} is skipped! ⊘`);
            advancePlayer(); // Skip the next player
            break;
            
        case 'dare':
            triggerDare(card);
            break;
            
        case 'wild-dare':
            GameState.pendingColorChoice = {
                card: card,
                afterColor: () => triggerDare(card)
            };
            showColorModal();
            break;
    }
}

function triggerDare(card) {
    const nextPlayer = getNextPlayer();
    GameState.pendingDare = {
        card: card,
        targetPlayerIndex: getNextPlayerIndex(),
        dareNumber: card.dareNumber
    };
    showDareModal(nextPlayer.name, card.dareNumber);
}

function getNextPlayerIndex() {
    let next = GameState.currentPlayerIndex + GameState.direction;
    if (next >= GameState.players.length) next = 0;
    if (next < 0) next = GameState.players.length - 1;
    return next;
}

function getNextPlayer() {
    return GameState.players[getNextPlayerIndex()];
}

function advancePlayer() {
    GameState.currentPlayerIndex += GameState.direction;
    if (GameState.currentPlayerIndex >= GameState.players.length) {
        GameState.currentPlayerIndex = 0;
    }
    if (GameState.currentPlayerIndex < 0) {
        GameState.currentPlayerIndex = GameState.players.length - 1;
    }
}

function nextTurn() {
    // Reset turn state
    GameState.hasDrawnThisTurn = false;
    GameState.players[GameState.currentPlayerIndex].forgotUno = false;
    
    // Reset UNO calls for new turn cycle
    // Actually, we only reset it when the player plays a card that brings them above 1
    
    // Advance to next player
    advancePlayer();
    
    // Reset current player's UNO flag if they have more than 1 card
    if (GameState.players[GameState.currentPlayerIndex].hand.length > 1) {
        GameState.playerSaidUno[GameState.currentPlayerIndex] = false;
    }
    
    // Update UI
    renderGame();
}

// ===========================================
// SCORING
// ===========================================
function calculateRoundScore() {
    let totalPoints = 0;
    
    GameState.players.forEach((player, index) => {
        if (index === GameState.currentPlayerIndex) return; // Winner doesn't add points
        
        player.hand.forEach(card => {
            if (card.type === 'number') {
                totalPoints += card.value;
            } else if (card.type === 'reverse' || card.type === 'skip' || card.type === 'dare') {
                totalPoints += 20;
            } else if (card.type === 'wild-dare') {
                totalPoints += 50;
            }
        });
    });
    
    return totalPoints;
}

function endRound(winnerIndex) {
    const winner = GameState.players[winnerIndex];
    const points = calculateRoundScore();
    
    GameState.scores[winnerIndex] += points;
    
    // Check for game winner
    if (GameState.scores[winnerIndex] >= GameState.WINNING_SCORE) {
        showGameOverModal(winnerIndex);
    } else {
        showRoundEndModal(winnerIndex, points);
    }
}

// ===========================================
// UI RENDERING
// ===========================================
function renderGame() {
    renderOpponents();
    renderDiscardPile();
    renderPlayerHand();
    renderCurrentPlayerBanner();
    updateActionButtons();
    updateDrawCount();
}

function renderOpponents() {
    DOM.opponentsArea.innerHTML = '';
    
    GameState.players.forEach((player, index) => {
        if (index === GameState.currentPlayerIndex && GameState.players.length > 1) {
            // Show current player differently or skip in opponents area
            // For hot-seat, we still show them
        }
        
        const slot = document.createElement('div');
        slot.className = 'opponent-slot';
        if (index === GameState.currentPlayerIndex) {
            slot.classList.add('active');
        }
        
        // Mini cards representation
        const cardCount = player.hand.length;
        const miniCardsHtml = cardCount <= 5 
            ? Array(cardCount).fill('<div class="mini-card"></div>').join('')
            : `<span class="opponent-card-count">${cardCount}</span>`;
        
        slot.innerHTML = `
            <div class="opponent-name">${player.name}</div>
            <div class="opponent-cards">${miniCardsHtml}</div>
            <div class="opponent-score">${GameState.scores[index]} pts</div>
        `;
        
        DOM.opponentsArea.appendChild(slot);
    });
}

function renderDiscardPile() {
    DOM.discardPile.innerHTML = '';
    const topCard = getTopCard();
    
    if (topCard) {
        const cardEl = createCardElement(topCard, false, true);
        cardEl.classList.remove('playable', 'not-playable');
        DOM.discardPile.appendChild(cardEl);
    }
}

function renderPlayerHand() {
    const currentPlayer = GameState.players[GameState.currentPlayerIndex];
    DOM.playerHand.innerHTML = '';
    DOM.handPlayerName.textContent = currentPlayer.name + "'s Hand";
    DOM.handCardCount.textContent = currentPlayer.hand.length;
    
    // Sort hand by color then value
    const sortedHand = [...currentPlayer.hand].sort((a, b) => {
        const colorOrder = { red: 0, yellow: 1, green: 2, blue: 3, wild: 4 };
        if (colorOrder[a.color] !== colorOrder[b.color]) {
            return colorOrder[a.color] - colorOrder[b.color];
        }
        if (a.type === 'number' && b.type === 'number') {
            return a.value - b.value;
        }
        return 0;
    });
    
    sortedHand.forEach(card => {
        const isPlayable = canPlayCard(card) && !GameState.pendingDare;
        const cardEl = createCardElement(card, isPlayable, true);
        
        if (isPlayable) {
            cardEl.addEventListener('click', () => handleCardClick(card));
        }
        
        DOM.playerHand.appendChild(cardEl);
    });
}

function renderCurrentPlayerBanner() {
    const player = GameState.players[GameState.currentPlayerIndex];
    DOM.currentPlayerName.textContent = player.name;
}

function updateDirectionIndicator() {
    if (GameState.direction === -1) {
        DOM.directionIndicator.classList.add('reversed');
    } else {
        DOM.directionIndicator.classList.remove('reversed');
    }
}

function updateActionButtons() {
    const hasPlayableCard = GameState.players[GameState.currentPlayerIndex].hand.some(c => canPlayCard(c));
    
    // Show draw button if hasn't drawn yet
    DOM.drawCardBtn.style.display = GameState.hasDrawnThisTurn ? 'none' : 'block';
    
    // Show pass button if has drawn and no playable cards (or choosing not to play)
    DOM.passBtn.style.display = GameState.hasDrawnThisTurn ? 'block' : 'none';
}

// ===========================================
// EVENT HANDLERS
// ===========================================
function handleCardClick(card) {
    if (!canPlayCard(card)) {
        showToast("Can't play that card!", "warning");
        return;
    }
    
    // Check if player needs to say UNO
    const player = GameState.players[GameState.currentPlayerIndex];
    if (player.hand.length === 2 && !GameState.playerSaidUno[GameState.currentPlayerIndex]) {
        // Playing second-to-last card without saying UNO
        player.forgotUno = true;
    }
    
    playCard(card, GameState.currentPlayerIndex);
    renderGame();
}

function handleDrawCard() {
    if (GameState.hasDrawnThisTurn) return;
    
    const cards = drawCard(1);
    if (cards.length > 0) {
        const player = GameState.players[GameState.currentPlayerIndex];
        player.hand.push(...cards);
        
        // Add animation class
        showToast(`${player.name} drew a card`);
        
        GameState.hasDrawnThisTurn = true;
        
        // Check if drawn card is playable
        const drawnCard = cards[0];
        if (canPlayCard(drawnCard)) {
            showToast("You can play the drawn card!", "success");
        }
        
        renderGame();
    }
}

function handlePassTurn() {
    if (!GameState.hasDrawnThisTurn) {
        showToast("You must draw a card first!", "warning");
        return;
    }
    
    showToast(`${GameState.players[GameState.currentPlayerIndex].name} passed`);
    nextTurn();
}

function handleUnoCall() {
    const currentPlayer = GameState.players[GameState.currentPlayerIndex];
    
    // If current player has 1 card and didn't say UNO
    if (currentPlayer.hand.length === 1 || currentPlayer.hand.length === 2) {
        GameState.playerSaidUno[GameState.currentPlayerIndex] = true;
        showToast(`${currentPlayer.name} called UNO! 🎉`, "success");
    }
    
    // Check if any opponent with 1 card forgot to say UNO
    GameState.players.forEach((player, index) => {
        if (index !== GameState.currentPlayerIndex && player.forgotUno && player.hand.length === 1) {
            // Penalty!
            const penaltyCards = drawCard(2);
            player.hand.push(...penaltyCards);
            player.forgotUno = false;
            showUnoPenaltyModal(player.name);
        }
    });
}

// ===========================================
// MODALS
// ===========================================
function showColorModal() {
    DOM.colorModal.classList.add('active');
}

function hideColorModal() {
    DOM.colorModal.classList.remove('active');
}

function handleColorChoice(color) {
    if (GameState.pendingColorChoice) {
        const card = GameState.pendingColorChoice.card;
        card.chosenColor = color;
        
        const afterColor = GameState.pendingColorChoice.afterColor;
        GameState.pendingColorChoice = null;
        hideColorModal();
        
        showToast(`Color changed to ${color.toUpperCase()}!`);
        renderGame();
        
        if (afterColor) {
            afterColor();
        } else {
            nextTurn();
        }
    }
}

function showDareModal(playerName, dareNumber) {
    DOM.darePlayerName.textContent = playerName;
    DOM.dareNumber.textContent = dareNumber;
    DOM.dareText.textContent = DARES[GameState.dareCategory][dareNumber - 1];
    DOM.dareResult.style.display = 'none';
    DOM.doDareBtn.style.display = 'block';
    DOM.skipDareBtn.style.display = 'block';
    DOM.dareModal.classList.add('active');
}

function hideDareModal() {
    DOM.dareModal.classList.remove('active');
}

function handleDoDare() {
    // Show completion buttons
    DOM.doDareBtn.style.display = 'none';
    DOM.skipDareBtn.style.display = 'none';
    DOM.dareResult.style.display = 'flex';
}

function handleSkipDare() {
    // Draw 2 cards for the target player
    const targetIndex = GameState.pendingDare.targetPlayerIndex;
    const cards = drawCard(2);
    GameState.players[targetIndex].hand.push(...cards);
    
    showToast(`${GameState.players[targetIndex].name} drew 2 cards!`);
    
    // Skip their turn
    GameState.pendingDare = null;
    hideDareModal();
    
    // Advance past the target player
    GameState.currentPlayerIndex = targetIndex;
    nextTurn();
}

function handleDareComplete() {
    const targetIndex = GameState.pendingDare.targetPlayerIndex;
    showToast(`${GameState.players[targetIndex].name} completed the dare! 🎉`, "success");
    
    GameState.pendingDare = null;
    hideDareModal();
    
    // Target player's turn is over, move to next
    GameState.currentPlayerIndex = targetIndex;
    nextTurn();
}

function handleDareFailed() {
    const targetIndex = GameState.pendingDare.targetPlayerIndex;
    
    // Draw 2 cards as penalty
    const cards = drawCard(2);
    GameState.players[targetIndex].hand.push(...cards);
    
    showToast(`${GameState.players[targetIndex].name} failed! Drew 2 cards.`, "error");
    
    GameState.pendingDare = null;
    hideDareModal();
    
    // Skip their turn
    GameState.currentPlayerIndex = targetIndex;
    nextTurn();
}

function showScoreboard() {
    DOM.scoreboardList.innerHTML = '';
    
    // Sort players by score
    const sorted = GameState.players
        .map((player, index) => ({ name: player.name, score: GameState.scores[index], index }))
        .sort((a, b) => b.score - a.score);
    
    sorted.forEach((player, rank) => {
        const row = document.createElement('div');
        row.className = 'scoreboard-row';
        if (rank === 0) row.classList.add('leading');
        
        row.innerHTML = `
            <span class="scoreboard-rank">${rank + 1}</span>
            <span class="scoreboard-name">${player.name}</span>
            <span class="scoreboard-points">${player.score}</span>
        `;
        
        DOM.scoreboardList.appendChild(row);
    });
    
    DOM.scoreboardModal.classList.add('active');
}

function hideScoreboard() {
    DOM.scoreboardModal.classList.remove('active');
}

function showRoundEndModal(winnerIndex, points) {
    const winner = GameState.players[winnerIndex];
    DOM.roundWinnerText.textContent = `${winner.name} wins the round!`;
    DOM.pointsEarned.textContent = points;
    
    // Show all scores
    DOM.roundScores.innerHTML = '';
    GameState.players.forEach((player, index) => {
        const row = document.createElement('div');
        row.className = 'scoreboard-row';
        if (index === winnerIndex) row.classList.add('leading');
        row.innerHTML = `
            <span class="scoreboard-name">${player.name}</span>
            <span class="scoreboard-points">${GameState.scores[index]}</span>
        `;
        DOM.roundScores.appendChild(row);
    });
    
    DOM.roundEndModal.classList.add('active');
}

function hideRoundEndModal() {
    DOM.roundEndModal.classList.remove('active');
}

function showGameOverModal(winnerIndex) {
    const winner = GameState.players[winnerIndex];
    DOM.gameWinnerText.textContent = `${winner.name} WINS!`;
    DOM.finalScore.textContent = GameState.scores[winnerIndex];
    
    // Final standings
    DOM.finalStandings.innerHTML = '';
    const sorted = GameState.players
        .map((player, index) => ({ name: player.name, score: GameState.scores[index] }))
        .sort((a, b) => b.score - a.score);
    
    sorted.forEach((player, rank) => {
        const row = document.createElement('div');
        row.className = 'scoreboard-row';
        if (rank === 0) row.classList.add('leading');
        row.innerHTML = `
            <span class="scoreboard-rank">${rank === 0 ? '🏆' : rank + 1}</span>
            <span class="scoreboard-name">${player.name}</span>
            <span class="scoreboard-points">${player.score}</span>
        `;
        DOM.finalStandings.appendChild(row);
    });
    
    DOM.gameOverModal.classList.add('active');
}

function showUnoPenaltyModal(playerName) {
    DOM.penaltyText.textContent = `${playerName} forgot to say UNO!`;
    DOM.unoPenaltyModal.classList.add('active');
}

function hideUnoPenaltyModal() {
    DOM.unoPenaltyModal.classList.remove('active');
    renderGame();
}

// ===========================================
// TOAST NOTIFICATIONS
// ===========================================
function showToast(message, type = 'info') {
    const toast = document.createElement('div');
    toast.className = `toast ${type}`;
    toast.textContent = message;
    
    DOM.toastContainer.appendChild(toast);
    
    setTimeout(() => {
        toast.remove();
    }, 3000);
}

// ===========================================
// SETUP
// ===========================================
function updatePlayerCount(change) {
    let count = parseInt(DOM.playerCount.textContent);
    count = Math.max(2, Math.min(10, count + change));
    DOM.playerCount.textContent = count;
    
    updatePlayerNameInputs(count);
}

function updatePlayerNameInputs(count) {
    const current = DOM.playerNames.children.length;
    
    if (count > current) {
        for (let i = current; i < count; i++) {
            const input = document.createElement('input');
            input.type = 'text';
            input.className = 'player-name-input';
            input.placeholder = `Player ${i + 1}`;
            input.dataset.player = i;
            DOM.playerNames.appendChild(input);
        }
    } else if (count < current) {
        for (let i = current - 1; i >= count; i--) {
            DOM.playerNames.children[i].remove();
        }
    }
}

function selectDareCategory(category) {
    document.querySelectorAll('.dare-category-btn').forEach(btn => {
        btn.classList.toggle('selected', btn.dataset.category === category);
    });
    GameState.dareCategory = category;
}

function startGame() {
    // Collect player names
    const inputs = DOM.playerNames.querySelectorAll('.player-name-input');
    GameState.players = [];
    GameState.scores = [];
    GameState.playerSaidUno = [];
    
    inputs.forEach((input, index) => {
        const name = input.value.trim() || `Player ${index + 1}`;
        GameState.players.push({ name, hand: [], forgotUno: false });
        GameState.scores.push(0);
        GameState.playerSaidUno.push(false);
    });
    
    // Initialize game
    startRound();
    
    // Switch screens
    DOM.setupScreen.classList.remove('active');
    DOM.gameScreen.classList.add('active');
}

function startRound() {
    // Create and shuffle deck
    GameState.deck = shuffleDeck(createDeck());
    GameState.discardPile = [];
    GameState.direction = 1;
    GameState.hasDrawnThisTurn = false;
    GameState.pendingDare = null;
    GameState.pendingColorChoice = null;
    
    // Reset hands
    GameState.players.forEach(player => {
        player.hand = [];
        player.forgotUno = false;
    });
    GameState.playerSaidUno = GameState.players.map(() => false);
    
    // Deal 7 cards to each player
    GameState.players.forEach(player => {
        player.hand = drawCard(7);
    });
    
    // Flip first card to discard (handle action cards)
    let firstCard = drawCard(1)[0];
    
    // Keep drawing if it's an action card (for simplicity)
    while (firstCard.type !== 'number') {
        GameState.deck.unshift(firstCard);
        GameState.deck = shuffleDeck(GameState.deck);
        firstCard = drawCard(1)[0];
    }
    
    GameState.discardPile.push(firstCard);
    
    // Update round number
    DOM.roundNumber.textContent = GameState.round;
    
    // Reset direction indicator
    updateDirectionIndicator();
    
    // Render
    renderGame();
}

function nextRound() {
    GameState.round++;
    hideRoundEndModal();
    startRound();
}

function newGame() {
    GameState.round = 1;
    GameState.scores = GameState.players.map(() => 0);
    DOM.gameOverModal.classList.remove('active');
    DOM.setupScreen.classList.add('active');
    DOM.gameScreen.classList.remove('active');
}

// ===========================================
// EVENT LISTENERS
// ===========================================
function initEventListeners() {
    // Setup
    document.querySelectorAll('.count-btn').forEach(btn => {
        btn.addEventListener('click', () => {
            updatePlayerCount(parseInt(btn.dataset.change));
        });
    });
    
    document.querySelectorAll('.dare-category-btn').forEach(btn => {
        btn.addEventListener('click', () => {
            selectDareCategory(btn.dataset.category);
        });
    });
    
    DOM.startGameBtn.addEventListener('click', startGame);
    
    // Game Actions
    DOM.drawCardBtn.addEventListener('click', handleDrawCard);
    DOM.passBtn.addEventListener('click', handlePassTurn);
    DOM.drawPile.addEventListener('click', handleDrawCard);
    DOM.unoCallBtn.addEventListener('click', handleUnoCall);
    DOM.scoreboardBtn.addEventListener('click', showScoreboard);
    
    // Color Modal
    document.querySelectorAll('.color-btn').forEach(btn => {
        btn.addEventListener('click', () => {
            handleColorChoice(btn.dataset.color);
        });
    });
    
    // Dare Modal
    DOM.doDareBtn.addEventListener('click', handleDoDare);
    DOM.skipDareBtn.addEventListener('click', handleSkipDare);
    DOM.dareCompleteBtn.addEventListener('click', handleDareComplete);
    DOM.dareFailedBtn.addEventListener('click', handleDareFailed);
    
    // Scoreboard Modal
    DOM.closeScoreboardBtn.addEventListener('click', hideScoreboard);
    
    // Round End Modal
    DOM.nextRoundBtn.addEventListener('click', nextRound);
    
    // Game Over Modal
    DOM.newGameBtn.addEventListener('click', newGame);
    
    // Penalty Modal
    DOM.acceptPenaltyBtn.addEventListener('click', hideUnoPenaltyModal);
    
    // Close modals on backdrop click
    [DOM.scoreboardModal].forEach(modal => {
        modal.addEventListener('click', (e) => {
            if (e.target === modal) {
                modal.classList.remove('active');
            }
        });
    });
}

// ===========================================
// INITIALIZE
// ===========================================
document.addEventListener('DOMContentLoaded', () => {
    initEventListeners();
    updatePlayerNameInputs(2);
});

