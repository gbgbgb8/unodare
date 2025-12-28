/**
 * UNO DARE! - P2P Multiplayer Game
 * Using PeerJS for WebRTC connections
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
// NETWORK STATE
// ===========================================
const Network = {
    peer: null,
    connections: [], // Host keeps all connections
    hostConnection: null, // Client keeps connection to host
    isHost: false,
    roomCode: null,
    myId: null,
    myName: null
};

// ===========================================
// GAME STATE (Host-authoritative)
// ===========================================
const GameState = {
    // Players
    players: [], // { id, name, hand, score, hasUno, isConnected }
    
    // Settings
    dareCategory: "Family",
    
    // Game
    deck: [],
    discardPile: [],
    currentPlayerIndex: 0,
    direction: 1,
    round: 1,
    gameStarted: false,
    
    // Turn state
    hasDrawnThisTurn: false,
    pendingDare: null, // { dareNumber, targetPlayerId, card }
    pendingColorChoice: null, // { playerId }
    
    // Constants
    WINNING_SCORE: 500
};

// Local player state (what the client knows)
const LocalState = {
    myHand: [],
    myPlayerId: null,
    isMyTurn: false
};

// ===========================================
// DOM ELEMENTS
// ===========================================
const DOM = {
    // Screens
    landingScreen: document.getElementById('landing-screen'),
    lobbyScreen: document.getElementById('lobby-screen'),
    gameScreen: document.getElementById('game-screen'),
    
    // Landing
    hostGameBtn: document.getElementById('host-game-btn'),
    joinGameBtn: document.getElementById('join-game-btn'),
    joinSection: document.getElementById('join-section'),
    hostSection: document.getElementById('host-section'),
    roomCodeInput: document.getElementById('room-code-input'),
    playerNameInput: document.getElementById('player-name-input'),
    hostNameInput: document.getElementById('host-name-input'),
    connectBtn: document.getElementById('connect-btn'),
    createRoomBtn: document.getElementById('create-room-btn'),
    backBtn: document.getElementById('back-btn'),
    hostBackBtn: document.getElementById('host-back-btn'),
    connectionStatus: document.getElementById('connection-status'),
    
    // Lobby
    roomCode: document.getElementById('room-code'),
    copyCodeBtn: document.getElementById('copy-code-btn'),
    copyLinkBtn: document.getElementById('copy-link-btn'),
    playersList: document.getElementById('players-list'),
    playerCountDisplay: document.getElementById('player-count-display'),
    hostControls: document.getElementById('host-controls'),
    playerControls: document.getElementById('player-controls'),
    startGameBtn: document.getElementById('start-game-btn'),
    startHint: document.getElementById('start-hint'),
    selectedCategoryDisplay: document.getElementById('selected-category-display'),
    
    // Game Header
    roundNumber: document.getElementById('round-number'),
    directionIndicator: document.getElementById('direction-indicator'),
    whoseTurn: document.getElementById('whose-turn'),
    scoreboardBtn: document.getElementById('scoreboard-btn'),
    unoCallBtn: document.getElementById('uno-call-btn'),
    
    // Play Area
    opponentsArea: document.getElementById('opponents-area'),
    drawPile: document.getElementById('draw-pile'),
    drawCount: document.getElementById('draw-count'),
    discardPile: document.getElementById('discard-pile'),
    gameMessage: document.getElementById('game-message'),
    
    // Hand Area
    handCardCount: document.getElementById('hand-card-count'),
    playerHand: document.getElementById('player-hand'),
    handArea: document.querySelector('.hand-area'),
    
    // Action Buttons
    drawCardBtn: document.getElementById('draw-card-btn'),
    passBtn: document.getElementById('pass-turn-btn'),
    
    // Modals
    colorModal: document.getElementById('color-modal'),
    dareModal: document.getElementById('dare-modal'),
    scoreboardModal: document.getElementById('scoreboard-modal'),
    roundEndModal: document.getElementById('round-end-modal'),
    gameOverModal: document.getElementById('game-over-modal'),
    unoCalledModal: document.getElementById('uno-called-modal'),
    unoPenaltyModal: document.getElementById('uno-penalty-modal'),
    disconnectModal: document.getElementById('disconnect-modal'),
    
    // Dare Modal elements
    darePlayerName: document.getElementById('dare-player-name'),
    dareNumber: document.getElementById('dare-number'),
    dareText: document.getElementById('dare-text'),
    dareChoices: document.getElementById('dare-choices'),
    dareWaiting: document.getElementById('dare-waiting'),
    dareWaitingName: document.getElementById('dare-waiting-name'),
    doDareBtn: document.getElementById('do-dare-btn'),
    skipDareBtn: document.getElementById('skip-dare-btn'),
    dareResult: document.getElementById('dare-result'),
    dareJudging: document.getElementById('dare-judging'),
    dareCompleteBtn: document.getElementById('dare-complete-btn'),
    dareFailedBtn: document.getElementById('dare-failed-btn'),
    
    // Other modals
    scoreboardList: document.getElementById('scoreboard-list'),
    closeScoreboardBtn: document.getElementById('close-scoreboard-btn'),
    roundWinnerText: document.getElementById('round-winner-text'),
    pointsEarned: document.getElementById('points-earned'),
    roundScores: document.getElementById('round-scores'),
    nextRoundBtn: document.getElementById('next-round-btn'),
    waitingNextRound: document.getElementById('waiting-next-round'),
    gameWinnerText: document.getElementById('game-winner-text'),
    finalScore: document.getElementById('final-score'),
    finalStandings: document.getElementById('final-standings'),
    newGameBtn: document.getElementById('new-game-btn'),
    backToLobbyBtn: document.getElementById('back-to-lobby-btn'),
    unoCalledText: document.getElementById('uno-called-text'),
    penaltyText: document.getElementById('penalty-text'),
    acceptPenaltyBtn: document.getElementById('accept-penalty-btn'),
    disconnectText: document.getElementById('disconnect-text'),
    reconnectBtn: document.getElementById('reconnect-btn'),
    
    // Toast
    toastContainer: document.getElementById('toast-container')
};

// ===========================================
// UTILITY FUNCTIONS
// ===========================================
function generateRoomCode() {
    const chars = 'ABCDEFGHJKLMNPQRSTUVWXYZ'; // No I, O to avoid confusion
    let code = '';
    for (let i = 0; i < 4; i++) {
        code += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    return code;
}

function showToast(message, type = 'info') {
    const toast = document.createElement('div');
    toast.className = `toast ${type}`;
    toast.textContent = message;
    DOM.toastContainer.appendChild(toast);
    setTimeout(() => toast.remove(), 3000);
}

function showScreen(screenId) {
    document.querySelectorAll('.screen').forEach(s => s.classList.remove('active'));
    document.getElementById(screenId).classList.add('active');
}

function setConnectionStatus(message, type = '') {
    DOM.connectionStatus.textContent = message;
    DOM.connectionStatus.className = 'connection-status ' + type;
}

function getPlayerEmoji(index) {
    const emojis = ['👤', '🎮', '🎲', '🃏', '🎯', '🎪', '🎨', '🎭', '🎤', '🎸'];
    return emojis[index % emojis.length];
}

// ===========================================
// PEERJS NETWORKING
// ===========================================
function initPeer(id = null) {
    return new Promise((resolve, reject) => {
        const options = {
            debug: 1,
            config: {
                iceServers: [
                    { urls: 'stun:stun.l.google.com:19302' },
                    { urls: 'stun:stun1.l.google.com:19302' }
                ]
            }
        };
        
        Network.peer = id ? new Peer(id, options) : new Peer(options);
        
        Network.peer.on('open', (peerId) => {
            Network.myId = peerId;
            console.log('Peer connected with ID:', peerId);
            resolve(peerId);
        });
        
        Network.peer.on('error', (err) => {
            console.error('Peer error:', err);
            if (err.type === 'unavailable-id') {
                reject(new Error('Room code already in use'));
            } else if (err.type === 'peer-unavailable') {
                reject(new Error('Room not found'));
            } else {
                reject(err);
            }
        });
        
        Network.peer.on('disconnected', () => {
            console.log('Peer disconnected');
            setConnectionStatus('Disconnected', 'error');
        });
    });
}

// HOST: Set up to receive connections
function hostSetupConnections() {
    Network.peer.on('connection', (conn) => {
        console.log('New connection from:', conn.peer);
        
        conn.on('open', () => {
            Network.connections.push(conn);
            setupConnectionHandlers(conn);
        });
        
        conn.on('close', () => {
            handlePlayerDisconnect(conn.peer);
        });
    });
}

// CLIENT: Connect to host
function connectToHost(roomCode) {
    return new Promise((resolve, reject) => {
        const conn = Network.peer.connect(roomCode, { reliable: true });
        
        conn.on('open', () => {
            Network.hostConnection = conn;
            setupConnectionHandlers(conn);
            resolve();
        });
        
        conn.on('error', (err) => {
            reject(err);
        });
        
        conn.on('close', () => {
            showDisconnectModal('Lost connection to host');
        });
        
        // Timeout
        setTimeout(() => {
            if (!Network.hostConnection) {
                reject(new Error('Connection timeout'));
            }
        }, 10000);
    });
}

function setupConnectionHandlers(conn) {
    conn.on('data', (data) => {
        handleMessage(data, conn);
    });
}

// ===========================================
// MESSAGE HANDLING
// ===========================================
const MessageTypes = {
    // Lobby
    JOIN_REQUEST: 'join_request',
    JOIN_ACCEPTED: 'join_accepted',
    JOIN_REJECTED: 'join_rejected',
    PLAYER_JOINED: 'player_joined',
    PLAYER_LEFT: 'player_left',
    LOBBY_UPDATE: 'lobby_update',
    SETTINGS_CHANGED: 'settings_changed',
    GAME_STARTING: 'game_starting',
    
    // Game
    GAME_STATE: 'game_state',
    PLAY_CARD: 'play_card',
    DRAW_CARD: 'draw_card',
    PASS_TURN: 'pass_turn',
    COLOR_CHOSEN: 'color_chosen',
    DARE_CHOICE: 'dare_choice',
    DARE_RESULT: 'dare_result',
    CALL_UNO: 'call_uno',
    CATCH_UNO: 'catch_uno',
    ROUND_END: 'round_end',
    NEXT_ROUND: 'next_round',
    GAME_OVER: 'game_over',
    
    // Misc
    CHAT: 'chat',
    ERROR: 'error'
};

function sendToHost(message) {
    if (Network.hostConnection && Network.hostConnection.open) {
        Network.hostConnection.send(message);
    }
}

function sendToPlayer(playerId, message) {
    const conn = Network.connections.find(c => c.peer === playerId);
    if (conn && conn.open) {
        conn.send(message);
    }
}

function broadcast(message, excludeId = null) {
    Network.connections.forEach(conn => {
        if (conn.open && conn.peer !== excludeId) {
            conn.send(message);
        }
    });
}

function handleMessage(data, conn) {
    console.log('Received message:', data.type, data);
    
    if (Network.isHost) {
        handleHostMessage(data, conn);
    } else {
        handleClientMessage(data);
    }
}

// HOST message handling
function handleHostMessage(data, conn) {
    switch (data.type) {
        case MessageTypes.JOIN_REQUEST:
            handleJoinRequest(data, conn);
            break;
        case MessageTypes.PLAY_CARD:
            handlePlayCardRequest(data, conn.peer);
            break;
        case MessageTypes.DRAW_CARD:
            handleDrawCardRequest(conn.peer);
            break;
        case MessageTypes.PASS_TURN:
            handlePassTurnRequest(conn.peer);
            break;
        case MessageTypes.COLOR_CHOSEN:
            handleColorChoice(data.color, conn.peer);
            break;
        case MessageTypes.DARE_CHOICE:
            handleDareChoice(data.choice, conn.peer);
            break;
        case MessageTypes.DARE_RESULT:
            handleDareResult(data.completed);
            break;
        case MessageTypes.CALL_UNO:
            handleUnoCall(conn.peer);
            break;
        case MessageTypes.CATCH_UNO:
            handleUnoCatch(data.targetId, conn.peer);
            break;
    }
}

// CLIENT message handling
function handleClientMessage(data) {
    switch (data.type) {
        case MessageTypes.JOIN_ACCEPTED:
            handleJoinAccepted(data);
            break;
        case MessageTypes.JOIN_REJECTED:
            showToast(data.reason, 'error');
            showScreen('landing-screen');
            break;
        case MessageTypes.LOBBY_UPDATE:
            updateLobbyUI(data.players, data.settings);
            break;
        case MessageTypes.SETTINGS_CHANGED:
            updateSettingsUI(data.settings);
            break;
        case MessageTypes.GAME_STARTING:
            handleGameStart(data);
            break;
        case MessageTypes.GAME_STATE:
            handleGameStateUpdate(data);
            break;
        case MessageTypes.ROUND_END:
            showRoundEndModal(data.winnerId, data.points, data.scores);
            break;
        case MessageTypes.NEXT_ROUND:
            hideRoundEndModal();
            break;
        case MessageTypes.GAME_OVER:
            showGameOverModal(data.winnerId, data.scores);
            break;
    }
}

// ===========================================
// LOBBY LOGIC
// ===========================================
async function createRoom() {
    const name = DOM.hostNameInput.value.trim() || 'Game Czar';
    Network.myName = name;
    Network.isHost = true;
    Network.roomCode = generateRoomCode();
    
    setConnectionStatus('Creating room...', 'connecting');
    
    try {
        await initPeer(Network.roomCode);
        hostSetupConnections();
        
        // Add host as first player
        GameState.players = [{
            id: Network.roomCode,
            name: name,
            hand: [],
            score: 0,
            hasUno: false,
            isConnected: true,
            isHost: true
        }];
        LocalState.myPlayerId = Network.roomCode;
        
        showLobby();
        updateLobbyUI(GameState.players, { dareCategory: GameState.dareCategory });
        setConnectionStatus('Room created!', 'connected');
        setTimeout(() => setConnectionStatus(''), 2000);
        
    } catch (err) {
        setConnectionStatus('Failed to create room: ' + err.message, 'error');
        if (err.message === 'Room code already in use') {
            // Try again with new code
            setTimeout(createRoom, 500);
        }
    }
}

async function joinRoom() {
    const roomCode = DOM.roomCodeInput.value.trim().toUpperCase();
    const name = DOM.playerNameInput.value.trim() || 'Player';
    
    if (roomCode.length !== 4) {
        showToast('Please enter a 4-letter room code', 'warning');
        return;
    }
    
    Network.myName = name;
    Network.roomCode = roomCode;
    Network.isHost = false;
    
    setConnectionStatus('Connecting...', 'connecting');
    
    try {
        await initPeer();
        await connectToHost(roomCode);
        
        // Send join request
        sendToHost({
            type: MessageTypes.JOIN_REQUEST,
            name: name,
            peerId: Network.myId
        });
        
    } catch (err) {
        setConnectionStatus('Failed to join: ' + err.message, 'error');
        showToast('Could not find room ' + roomCode, 'error');
    }
}

function handleJoinRequest(data, conn) {
    // Check if game already started
    if (GameState.gameStarted) {
        conn.send({ type: MessageTypes.JOIN_REJECTED, reason: 'Game already in progress' });
        return;
    }
    
    // Check max players
    if (GameState.players.length >= 10) {
        conn.send({ type: MessageTypes.JOIN_REJECTED, reason: 'Room is full' });
        return;
    }
    
    // Add player
    const newPlayer = {
        id: conn.peer,
        name: data.name,
        hand: [],
        score: 0,
        hasUno: false,
        isConnected: true,
        isHost: false
    };
    GameState.players.push(newPlayer);
    
    // Send acceptance
    conn.send({
        type: MessageTypes.JOIN_ACCEPTED,
        playerId: conn.peer,
        players: GameState.players.map(p => ({ id: p.id, name: p.name, isHost: p.isHost })),
        settings: { dareCategory: GameState.dareCategory }
    });
    
    // Broadcast to all players
    broadcastLobbyUpdate();
    showToast(`${data.name} joined!`, 'success');
    updateLobbyUI(GameState.players, { dareCategory: GameState.dareCategory });
}

function handleJoinAccepted(data) {
    LocalState.myPlayerId = data.playerId;
    setConnectionStatus('Connected!', 'connected');
    setTimeout(() => setConnectionStatus(''), 2000);
    
    showLobby();
    updateLobbyUI(data.players, data.settings);
}

function handlePlayerDisconnect(peerId) {
    const playerIndex = GameState.players.findIndex(p => p.id === peerId);
    if (playerIndex === -1) return;
    
    const player = GameState.players[playerIndex];
    showToast(`${player.name} disconnected`, 'warning');
    
    // Remove from connections
    Network.connections = Network.connections.filter(c => c.peer !== peerId);
    
    if (GameState.gameStarted) {
        // Mark as disconnected but keep in game
        player.isConnected = false;
        broadcastGameState();
    } else {
        // Remove from lobby
        GameState.players.splice(playerIndex, 1);
        broadcastLobbyUpdate();
        updateLobbyUI(GameState.players, { dareCategory: GameState.dareCategory });
    }
}

function broadcastLobbyUpdate() {
    broadcast({
        type: MessageTypes.LOBBY_UPDATE,
        players: GameState.players.map(p => ({ id: p.id, name: p.name, isHost: p.isHost })),
        settings: { dareCategory: GameState.dareCategory }
    });
}

function showLobby() {
    showScreen('lobby-screen');
    DOM.roomCode.textContent = Network.roomCode;
    
    // Show/hide host controls
    if (Network.isHost) {
        DOM.hostControls.style.display = 'block';
        DOM.playerControls.style.display = 'none';
    } else {
        DOM.hostControls.style.display = 'none';
        DOM.playerControls.style.display = 'block';
    }
}

function updateLobbyUI(players, settings) {
    // Update player list
    DOM.playersList.innerHTML = '';
    DOM.playerCountDisplay.textContent = `(${players.length}/10)`;
    
    players.forEach((player, index) => {
        const isMe = player.id === LocalState.myPlayerId;
        const row = document.createElement('div');
        row.className = 'player-row';
        if (player.isHost) row.classList.add('host');
        if (isMe) row.classList.add('you');
        
        row.innerHTML = `
            <div class="player-info">
                <div class="player-avatar">${getPlayerEmoji(index)}</div>
                <span class="player-name">${player.name}</span>
                ${player.isHost ? '<span class="player-badge">HOST</span>' : ''}
                ${isMe ? '<span class="player-badge you-badge">YOU</span>' : ''}
            </div>
        `;
        
        DOM.playersList.appendChild(row);
    });
    
    // Update settings display
    if (settings) {
        DOM.selectedCategoryDisplay.textContent = settings.dareCategory;
        GameState.dareCategory = settings.dareCategory;
        
        // Update selected button
        document.querySelectorAll('.dare-category-btn').forEach(btn => {
            btn.classList.toggle('selected', btn.dataset.category === settings.dareCategory);
        });
    }
    
    // Update start button
    if (Network.isHost) {
        const canStart = players.length >= 2;
        DOM.startGameBtn.disabled = !canStart;
        DOM.startHint.textContent = canStart ? 'Ready to start!' : 'Need at least 2 players to start';
    }
}

function updateSettingsUI(settings) {
    GameState.dareCategory = settings.dareCategory;
    DOM.selectedCategoryDisplay.textContent = settings.dareCategory;
}

function selectDareCategory(category) {
    if (!Network.isHost) return;
    
    GameState.dareCategory = category;
    document.querySelectorAll('.dare-category-btn').forEach(btn => {
        btn.classList.toggle('selected', btn.dataset.category === category);
    });
    
    broadcast({
        type: MessageTypes.SETTINGS_CHANGED,
        settings: { dareCategory: category }
    });
}

// ===========================================
// DECK MANAGEMENT (Host only)
// ===========================================
function createDeck() {
    const deck = [];
    const colors = ['red', 'yellow', 'green', 'blue'];
    let cardId = 0;
    
    colors.forEach(color => {
        deck.push({ id: cardId++, color, type: 'number', value: 0 });
        for (let num = 1; num <= 9; num++) {
            deck.push({ id: cardId++, color, type: 'number', value: num });
            deck.push({ id: cardId++, color, type: 'number', value: num });
        }
        deck.push({ id: cardId++, color, type: 'reverse', value: 'reverse' });
        deck.push({ id: cardId++, color, type: 'reverse', value: 'reverse' });
        deck.push({ id: cardId++, color, type: 'skip', value: 'skip' });
        deck.push({ id: cardId++, color, type: 'skip', value: 'skip' });
        
        const dareNum1 = Math.floor(Math.random() * 16) + 1;
        const dareNum2 = Math.floor(Math.random() * 16) + 1;
        deck.push({ id: cardId++, color, type: 'dare', value: 'dare', dareNumber: dareNum1 });
        deck.push({ id: cardId++, color, type: 'dare', value: 'dare', dareNumber: dareNum2 });
    });
    
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

function drawCards(count = 1) {
    const drawn = [];
    for (let i = 0; i < count; i++) {
        if (GameState.deck.length === 0) {
            if (GameState.discardPile.length > 1) {
                const topCard = GameState.discardPile.pop();
                GameState.deck = shuffleDeck(GameState.discardPile);
                GameState.deck.forEach(card => { card.chosenColor = null; });
                GameState.discardPile = [topCard];
            } else {
                break;
            }
        }
        if (GameState.deck.length > 0) {
            drawn.push(GameState.deck.pop());
        }
    }
    return drawn;
}

// ===========================================
// GAME LOGIC (Host-authoritative)
// ===========================================
function startGame() {
    if (!Network.isHost || GameState.players.length < 2) return;
    
    GameState.gameStarted = true;
    GameState.round = 1;
    GameState.direction = 1;
    
    startRound();
    
    // Broadcast game start
    broadcast({ type: MessageTypes.GAME_STARTING });
    showScreen('game-screen');
    renderGame();
}

function startRound() {
    GameState.deck = shuffleDeck(createDeck());
    GameState.discardPile = [];
    GameState.direction = 1;
    GameState.hasDrawnThisTurn = false;
    GameState.pendingDare = null;
    GameState.pendingColorChoice = null;
    GameState.currentPlayerIndex = 0;
    
    // Reset hands and UNO flags
    GameState.players.forEach(player => {
        player.hand = [];
        player.hasUno = false;
    });
    
    // Deal 7 cards to each player
    GameState.players.forEach(player => {
        player.hand = drawCards(7);
    });
    
    // Flip first card
    let firstCard = drawCards(1)[0];
    while (firstCard.type !== 'number') {
        GameState.deck.unshift(firstCard);
        GameState.deck = shuffleDeck(GameState.deck);
        firstCard = drawCards(1)[0];
    }
    GameState.discardPile.push(firstCard);
    
    broadcastGameState();
}

function handleGameStart(data) {
    showScreen('game-screen');
}

function broadcastGameState() {
    // Send personalized state to each player
    GameState.players.forEach(player => {
        const stateForPlayer = buildStateForPlayer(player.id);
        
        if (player.id === Network.roomCode) {
            // Host - update locally
            handleGameStateUpdate(stateForPlayer);
        } else {
            sendToPlayer(player.id, stateForPlayer);
        }
    });
}

function buildStateForPlayer(playerId) {
    const myPlayer = GameState.players.find(p => p.id === playerId);
    const currentPlayer = GameState.players[GameState.currentPlayerIndex];
    
    return {
        type: MessageTypes.GAME_STATE,
        myHand: myPlayer ? myPlayer.hand : [],
        myPlayerId: playerId,
        isMyTurn: currentPlayer && currentPlayer.id === playerId,
        currentPlayerId: currentPlayer ? currentPlayer.id : null,
        currentPlayerName: currentPlayer ? currentPlayer.name : '',
        players: GameState.players.map(p => ({
            id: p.id,
            name: p.name,
            cardCount: p.hand.length,
            score: p.score,
            hasUno: p.hasUno,
            isConnected: p.isConnected
        })),
        topCard: GameState.discardPile[GameState.discardPile.length - 1],
        deckCount: GameState.deck.length,
        direction: GameState.direction,
        round: GameState.round,
        hasDrawnThisTurn: currentPlayer && currentPlayer.id === playerId ? GameState.hasDrawnThisTurn : false,
        pendingDare: GameState.pendingDare,
        pendingColorChoice: GameState.pendingColorChoice
    };
}

function handleGameStateUpdate(state) {
    LocalState.myHand = state.myHand;
    LocalState.myPlayerId = state.myPlayerId;
    LocalState.isMyTurn = state.isMyTurn;
    
    // Store for rendering
    LocalState.currentState = state;
    
    renderGame();
    
    // Handle modals
    if (state.pendingColorChoice && state.pendingColorChoice.playerId === LocalState.myPlayerId) {
        showColorModal();
    } else {
        hideColorModal();
    }
    
    if (state.pendingDare) {
        showDareModalForState(state.pendingDare);
    } else {
        hideDareModal();
    }
}

// ===========================================
// CARD PLAY LOGIC
// ===========================================
function canPlayCard(card, topCard) {
    if (!topCard) return true;
    if (card.type === 'wild-dare') return true;
    
    const matchColor = topCard.chosenColor || topCard.color;
    if (card.color === matchColor) return true;
    if (card.type === 'number' && topCard.type === 'number' && card.value === topCard.value) return true;
    if (card.type === topCard.type && card.type !== 'number') return true;
    
    return false;
}

function handleCardClick(card) {
    if (!LocalState.isMyTurn) {
        showToast("Not your turn!", 'warning');
        return;
    }
    
    const state = LocalState.currentState;
    if (state.pendingDare || state.pendingColorChoice) {
        return;
    }
    
    if (!canPlayCard(card, state.topCard)) {
        showToast("Can't play that card!", 'warning');
        return;
    }
    
    // Send to host
    if (Network.isHost) {
        handlePlayCardRequest({ cardId: card.id }, LocalState.myPlayerId);
    } else {
        sendToHost({ type: MessageTypes.PLAY_CARD, cardId: card.id });
    }
}

function handlePlayCardRequest(data, playerId) {
    const player = GameState.players.find(p => p.id === playerId);
    const currentPlayer = GameState.players[GameState.currentPlayerIndex];
    
    if (!player || player.id !== currentPlayer.id) return;
    if (GameState.pendingDare || GameState.pendingColorChoice) return;
    
    const cardIndex = player.hand.findIndex(c => c.id === data.cardId);
    if (cardIndex === -1) return;
    
    const card = player.hand[cardIndex];
    const topCard = GameState.discardPile[GameState.discardPile.length - 1];
    
    if (!canPlayCard(card, topCard)) return;
    
    // Play the card
    player.hand.splice(cardIndex, 1);
    GameState.discardPile.push(card);
    
    // Check UNO status
    if (player.hand.length === 1) {
        // Player should call UNO
        player.hasUno = false; // Reset - they need to call it
    }
    
    // Check for win
    if (player.hand.length === 0) {
        endRound(playerId);
        return;
    }
    
    // Handle card action
    handleCardAction(card, playerId);
}

function handleCardAction(card, playerId) {
    switch (card.type) {
        case 'reverse':
            GameState.direction *= -1;
            if (GameState.players.length === 2) {
                advancePlayer();
            }
            nextTurn();
            break;
            
        case 'skip':
            advancePlayer();
            nextTurn();
            break;
            
        case 'dare':
            triggerDare(card);
            break;
            
        case 'wild-dare':
            GameState.pendingColorChoice = { playerId: playerId };
            broadcastGameState();
            break;
            
        default:
            nextTurn();
    }
}

function triggerDare(card) {
    advancePlayer();
    const targetPlayer = GameState.players[GameState.currentPlayerIndex];
    
    GameState.pendingDare = {
        dareNumber: card.dareNumber,
        targetPlayerId: targetPlayer.id,
        card: card,
        waitingForChoice: true,
        waitingForResult: false
    };
    
    broadcastGameState();
}

function handleDrawCardRequest(playerId) {
    const currentPlayer = GameState.players[GameState.currentPlayerIndex];
    if (!currentPlayer || currentPlayer.id !== playerId) return;
    if (GameState.hasDrawnThisTurn) return;
    if (GameState.pendingDare || GameState.pendingColorChoice) return;
    
    const cards = drawCards(1);
    currentPlayer.hand.push(...cards);
    GameState.hasDrawnThisTurn = true;
    
    broadcastGameState();
}

function handlePassTurnRequest(playerId) {
    const currentPlayer = GameState.players[GameState.currentPlayerIndex];
    if (!currentPlayer || currentPlayer.id !== playerId) return;
    if (!GameState.hasDrawnThisTurn) return;
    
    nextTurn();
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
    GameState.hasDrawnThisTurn = false;
    advancePlayer();
    
    // Reset UNO flag for new turn
    const currentPlayer = GameState.players[GameState.currentPlayerIndex];
    if (currentPlayer.hand.length > 1) {
        currentPlayer.hasUno = false;
    }
    
    broadcastGameState();
}

// ===========================================
// COLOR CHOICE
// ===========================================
function showColorModal() {
    DOM.colorModal.classList.add('active');
}

function hideColorModal() {
    DOM.colorModal.classList.remove('active');
}

function handleColorButtonClick(color) {
    if (Network.isHost) {
        handleColorChoice(color, LocalState.myPlayerId);
    } else {
        sendToHost({ type: MessageTypes.COLOR_CHOSEN, color: color });
    }
}

function handleColorChoice(color, playerId) {
    if (!GameState.pendingColorChoice || GameState.pendingColorChoice.playerId !== playerId) return;
    
    const topCard = GameState.discardPile[GameState.discardPile.length - 1];
    if (topCard) {
        topCard.chosenColor = color;
    }
    
    GameState.pendingColorChoice = null;
    
    // If it was a wild dare, trigger the dare
    if (topCard && topCard.type === 'wild-dare') {
        triggerDare(topCard);
    } else {
        nextTurn();
    }
}

// ===========================================
// DARE HANDLING
// ===========================================
function showDareModalForState(pendingDare) {
    const targetPlayer = LocalState.currentState.players.find(p => p.id === pendingDare.targetPlayerId);
    const isMyDare = pendingDare.targetPlayerId === LocalState.myPlayerId;
    
    DOM.darePlayerName.textContent = targetPlayer ? targetPlayer.name : 'Player';
    DOM.dareNumber.textContent = pendingDare.dareNumber;
    DOM.dareText.textContent = DARES[GameState.dareCategory][pendingDare.dareNumber - 1];
    
    // Show/hide appropriate buttons
    if (pendingDare.waitingForChoice) {
        if (isMyDare) {
            DOM.dareChoices.style.display = 'flex';
            DOM.dareWaiting.style.display = 'none';
        } else {
            DOM.dareChoices.style.display = 'none';
            DOM.dareWaiting.style.display = 'block';
            DOM.dareWaitingName.textContent = targetPlayer ? targetPlayer.name : 'Player';
        }
        DOM.dareResult.style.display = 'none';
        DOM.dareJudging.style.display = 'none';
    } else if (pendingDare.waitingForResult) {
        DOM.dareChoices.style.display = 'none';
        DOM.dareWaiting.style.display = 'none';
        if (Network.isHost) {
            DOM.dareResult.style.display = 'block';
            DOM.dareJudging.style.display = 'none';
        } else {
            DOM.dareResult.style.display = 'none';
            DOM.dareJudging.style.display = 'block';
        }
    }
    
    DOM.dareModal.classList.add('active');
}

function hideDareModal() {
    DOM.dareModal.classList.remove('active');
}

function handleDareButtonClick(choice) {
    if (Network.isHost) {
        handleDareChoice(choice, LocalState.myPlayerId);
    } else {
        sendToHost({ type: MessageTypes.DARE_CHOICE, choice: choice });
    }
}

function handleDareChoice(choice, playerId) {
    if (!GameState.pendingDare || GameState.pendingDare.targetPlayerId !== playerId) return;
    
    if (choice === 'skip') {
        // Draw 2 cards
        const player = GameState.players.find(p => p.id === playerId);
        if (player) {
            const cards = drawCards(2);
            player.hand.push(...cards);
        }
        GameState.pendingDare = null;
        nextTurn();
    } else {
        // Doing the dare - wait for host to judge
        GameState.pendingDare.waitingForChoice = false;
        GameState.pendingDare.waitingForResult = true;
        broadcastGameState();
    }
}

function handleDareResultClick(completed) {
    if (Network.isHost) {
        handleDareResult(completed);
    } else {
        sendToHost({ type: MessageTypes.DARE_RESULT, completed: completed });
    }
}

function handleDareResult(completed) {
    if (!GameState.pendingDare) return;
    
    const player = GameState.players.find(p => p.id === GameState.pendingDare.targetPlayerId);
    
    if (!completed && player) {
        // Failed - draw 2 cards
        const cards = drawCards(2);
        player.hand.push(...cards);
    }
    
    GameState.pendingDare = null;
    nextTurn();
}

// ===========================================
// UNO HANDLING
// ===========================================
function handleUnoButtonClick() {
    if (Network.isHost) {
        handleUnoCall(LocalState.myPlayerId);
    } else {
        sendToHost({ type: MessageTypes.CALL_UNO });
    }
}

function handleUnoCall(playerId) {
    const player = GameState.players.find(p => p.id === playerId);
    if (player && (player.hand.length === 1 || player.hand.length === 2)) {
        player.hasUno = true;
        broadcastUnoCall(player.name);
        broadcastGameState();
    }
    
    // Check if calling UNO on someone else (catching them)
    GameState.players.forEach(p => {
        if (p.id !== playerId && p.hand.length === 1 && !p.hasUno) {
            // Caught! Give penalty
            const cards = drawCards(2);
            p.hand.push(...cards);
            broadcastUnoPenalty(p.name);
            broadcastGameState();
        }
    });
}

function broadcastUnoCall(playerName) {
    // Show UNO called modal briefly
    DOM.unoCalledText.textContent = `${playerName} called UNO!`;
    DOM.unoCalledModal.classList.add('active');
    setTimeout(() => DOM.unoCalledModal.classList.remove('active'), 1500);
    
    broadcast({
        type: 'UNO_CALLED',
        playerName: playerName
    });
}

function broadcastUnoPenalty(playerName) {
    DOM.penaltyText.textContent = `${playerName} forgot to say UNO!`;
    DOM.unoPenaltyModal.classList.add('active');
}

// ===========================================
// ROUND/GAME END
// ===========================================
function endRound(winnerId) {
    const winner = GameState.players.find(p => p.id === winnerId);
    
    let points = 0;
    GameState.players.forEach(player => {
        if (player.id !== winnerId) {
            player.hand.forEach(card => {
                if (card.type === 'number') points += card.value;
                else if (card.type === 'reverse' || card.type === 'skip' || card.type === 'dare') points += 20;
                else if (card.type === 'wild-dare') points += 50;
            });
        }
    });
    
    if (winner) {
        winner.score += points;
    }
    
    const scores = GameState.players.map(p => ({ id: p.id, name: p.name, score: p.score }));
    
    // Check for game winner
    if (winner && winner.score >= GameState.WINNING_SCORE) {
        broadcast({
            type: MessageTypes.GAME_OVER,
            winnerId: winnerId,
            scores: scores
        });
        showGameOverModal(winnerId, scores);
    } else {
        broadcast({
            type: MessageTypes.ROUND_END,
            winnerId: winnerId,
            points: points,
            scores: scores
        });
        showRoundEndModal(winnerId, points, scores);
    }
}

function showRoundEndModal(winnerId, points, scores) {
    const winner = scores.find(s => s.id === winnerId);
    DOM.roundWinnerText.textContent = `${winner ? winner.name : 'Player'} wins the round!`;
    DOM.pointsEarned.textContent = points;
    
    DOM.roundScores.innerHTML = '';
    scores.sort((a, b) => b.score - a.score);
    scores.forEach((player, index) => {
        const row = document.createElement('div');
        row.className = 'scoreboard-row';
        if (player.id === winnerId) row.classList.add('leading');
        row.innerHTML = `
            <span class="scoreboard-rank">${index + 1}</span>
            <span class="scoreboard-name">${player.name}</span>
            <span class="scoreboard-points">${player.score}</span>
        `;
        DOM.roundScores.appendChild(row);
    });
    
    if (Network.isHost) {
        DOM.nextRoundBtn.style.display = 'block';
        DOM.waitingNextRound.style.display = 'none';
    } else {
        DOM.nextRoundBtn.style.display = 'none';
        DOM.waitingNextRound.style.display = 'block';
    }
    
    DOM.roundEndModal.classList.add('active');
}

function hideRoundEndModal() {
    DOM.roundEndModal.classList.remove('active');
}

function handleNextRound() {
    if (!Network.isHost) return;
    
    GameState.round++;
    startRound();
    broadcast({ type: MessageTypes.NEXT_ROUND });
    hideRoundEndModal();
}

function showGameOverModal(winnerId, scores) {
    const winner = scores.find(s => s.id === winnerId);
    DOM.gameWinnerText.textContent = `${winner ? winner.name : 'Player'} WINS!`;
    DOM.finalScore.textContent = winner ? winner.score : 0;
    
    DOM.finalStandings.innerHTML = '';
    scores.sort((a, b) => b.score - a.score);
    scores.forEach((player, index) => {
        const row = document.createElement('div');
        row.className = 'scoreboard-row';
        if (index === 0) row.classList.add('leading');
        row.innerHTML = `
            <span class="scoreboard-rank">${index === 0 ? '🏆' : index + 1}</span>
            <span class="scoreboard-name">${player.name}</span>
            <span class="scoreboard-points">${player.score}</span>
        `;
        DOM.finalStandings.appendChild(row);
    });
    
    DOM.gameOverModal.classList.add('active');
}

function showDisconnectModal(message) {
    DOM.disconnectText.textContent = message;
    DOM.disconnectModal.classList.add('active');
}

// ===========================================
// RENDERING
// ===========================================
function renderGame() {
    const state = LocalState.currentState;
    if (!state) return;
    
    renderOpponents(state);
    renderDiscardPile(state);
    renderPlayerHand(state);
    renderGameHeader(state);
    updateActionButtons(state);
}

function renderOpponents(state) {
    DOM.opponentsArea.innerHTML = '';
    
    state.players.forEach((player, index) => {
        if (player.id === LocalState.myPlayerId) return;
        
        const isActive = player.id === state.currentPlayerId;
        const slot = document.createElement('div');
        slot.className = 'opponent-slot';
        if (isActive) slot.classList.add('active-turn');
        if (player.cardCount === 1 && player.hasUno) slot.classList.add('has-uno');
        
        // Card fan
        const cardCount = Math.min(player.cardCount, 7);
        let cardsHtml = '';
        if (player.cardCount <= 7) {
            for (let i = 0; i < cardCount; i++) {
                cardsHtml += '<div class="mini-card-back"></div>';
            }
        } else {
            cardsHtml = `<span class="opponent-card-count">${player.cardCount}</span>`;
        }
        
        slot.innerHTML = `
            <div class="opponent-avatar">${getPlayerEmoji(index)}</div>
            <div class="opponent-name">${player.name}</div>
            <div class="opponent-cards-fan">${cardsHtml}</div>
            <div class="opponent-score">${player.score} pts</div>
        `;
        
        DOM.opponentsArea.appendChild(slot);
    });
}

function renderDiscardPile(state) {
    DOM.discardPile.innerHTML = '';
    DOM.drawCount.textContent = state.deckCount;
    
    if (state.topCard) {
        const cardEl = createCardElement(state.topCard);
        cardEl.classList.remove('playable', 'not-playable');
        DOM.discardPile.appendChild(cardEl);
    }
}

function renderPlayerHand(state) {
    DOM.playerHand.innerHTML = '';
    DOM.handCardCount.textContent = state.myHand.length;
    
    // Sort hand
    const sortedHand = [...state.myHand].sort((a, b) => {
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
        const isPlayable = state.isMyTurn && !state.pendingDare && !state.pendingColorChoice && canPlayCard(card, state.topCard);
        const cardEl = createCardElement(card, isPlayable);
        
        if (isPlayable) {
            cardEl.addEventListener('click', () => handleCardClick(card));
        }
        
        DOM.playerHand.appendChild(cardEl);
    });
    
    // Update hand area styling
    if (state.isMyTurn) {
        DOM.handArea.classList.remove('not-your-turn');
    } else {
        DOM.handArea.classList.add('not-your-turn');
    }
}

function renderGameHeader(state) {
    DOM.roundNumber.textContent = state.round;
    
    if (state.direction === -1) {
        DOM.directionIndicator.classList.add('reversed');
    } else {
        DOM.directionIndicator.classList.remove('reversed');
    }
    
    if (state.isMyTurn) {
        DOM.whoseTurn.textContent = 'Your Turn!';
        DOM.whoseTurn.classList.add('your-turn');
    } else {
        DOM.whoseTurn.textContent = `${state.currentPlayerName}'s turn`;
        DOM.whoseTurn.classList.remove('your-turn');
    }
}

function updateActionButtons(state) {
    const canDraw = state.isMyTurn && !state.hasDrawnThisTurn && !state.pendingDare && !state.pendingColorChoice;
    const canPass = state.isMyTurn && state.hasDrawnThisTurn;
    
    DOM.drawCardBtn.style.display = 'block';
    DOM.drawCardBtn.disabled = !canDraw;
    DOM.passBtn.style.display = canPass ? 'block' : 'none';
    
    DOM.drawPile.classList.toggle('disabled', !canDraw);
}

function createCardElement(card, isPlayable = false) {
    const cardEl = document.createElement('div');
    cardEl.className = `uno-card ${card.color}`;
    
    if (card.type !== 'number') {
        cardEl.classList.add(card.type);
    }
    
    if (card.type === 'wild-dare' && card.chosenColor) {
        cardEl.style.background = `var(--uno-${card.chosenColor})`;
    }
    
    if (card.type === 'number') {
        cardEl.setAttribute('data-value', card.value);
    }
    
    const cornerValue = card.type === 'number' ? card.value : 
                        card.type === 'skip' ? '⊘' :
                        card.type === 'reverse' ? '⇄' :
                        (card.type === 'dare' || card.type === 'wild-dare') ? '🎭' : '';
    
    cardEl.innerHTML = `
        <span class="card-corner top-left">${cornerValue}</span>
        <span class="card-corner bottom-right">${cornerValue}</span>
        <span class="colorblind-symbol"></span>
        ${(card.type === 'dare' || card.type === 'wild-dare') ? `<span class="dare-num">#${card.dareNumber}</span>` : ''}
    `;
    
    if (isPlayable) {
        cardEl.classList.add('playable');
    } else {
        cardEl.classList.add('not-playable');
    }
    
    cardEl.dataset.cardId = card.id;
    return cardEl;
}

// ===========================================
// SCOREBOARD
// ===========================================
function showScoreboard() {
    const state = LocalState.currentState;
    if (!state) return;
    
    DOM.scoreboardList.innerHTML = '';
    
    const sorted = [...state.players].sort((a, b) => b.score - a.score);
    sorted.forEach((player, rank) => {
        const row = document.createElement('div');
        row.className = 'scoreboard-row';
        if (rank === 0) row.classList.add('leading');
        
        row.innerHTML = `
            <span class="scoreboard-rank">${rank + 1}</span>
            <span class="scoreboard-name">${player.name}${player.id === LocalState.myPlayerId ? ' (You)' : ''}</span>
            <span class="scoreboard-points">${player.score}</span>
        `;
        
        DOM.scoreboardList.appendChild(row);
    });
    
    DOM.scoreboardModal.classList.add('active');
}

function hideScoreboard() {
    DOM.scoreboardModal.classList.remove('active');
}

// ===========================================
// EVENT LISTENERS
// ===========================================
function initEventListeners() {
    // Landing screen
    DOM.hostGameBtn.addEventListener('click', () => {
        DOM.landingOptions = document.querySelector('.landing-options');
        DOM.landingOptions.style.display = 'none';
        DOM.hostSection.style.display = 'block';
        DOM.joinSection.style.display = 'none';
    });
    
    DOM.joinGameBtn.addEventListener('click', () => {
        document.querySelector('.landing-options').style.display = 'none';
        DOM.joinSection.style.display = 'block';
        DOM.hostSection.style.display = 'none';
    });
    
    DOM.backBtn.addEventListener('click', () => {
        document.querySelector('.landing-options').style.display = 'flex';
        DOM.joinSection.style.display = 'none';
    });
    
    DOM.hostBackBtn.addEventListener('click', () => {
        document.querySelector('.landing-options').style.display = 'flex';
        DOM.hostSection.style.display = 'none';
    });
    
    DOM.createRoomBtn.addEventListener('click', createRoom);
    DOM.connectBtn.addEventListener('click', joinRoom);
    
    // Room code input formatting
    DOM.roomCodeInput.addEventListener('input', (e) => {
        e.target.value = e.target.value.toUpperCase().replace(/[^A-Z]/g, '').slice(0, 4);
    });
    
    // Lobby
    DOM.copyCodeBtn.addEventListener('click', () => {
        navigator.clipboard.writeText(Network.roomCode);
        showToast('Room code copied!', 'success');
    });
    
    DOM.copyLinkBtn.addEventListener('click', () => {
        const url = `${window.location.origin}${window.location.pathname}?room=${Network.roomCode}`;
        navigator.clipboard.writeText(url);
        showToast('Invite link copied!', 'success');
    });
    
    document.querySelectorAll('.dare-category-btn').forEach(btn => {
        btn.addEventListener('click', () => {
            if (Network.isHost) {
                selectDareCategory(btn.dataset.category);
            }
        });
    });
    
    DOM.startGameBtn.addEventListener('click', startGame);
    
    // Game actions
    DOM.drawCardBtn.addEventListener('click', () => {
        if (Network.isHost) {
            handleDrawCardRequest(LocalState.myPlayerId);
        } else {
            sendToHost({ type: MessageTypes.DRAW_CARD });
        }
    });
    
    DOM.drawPile.addEventListener('click', () => {
        if (!DOM.drawPile.classList.contains('disabled')) {
            if (Network.isHost) {
                handleDrawCardRequest(LocalState.myPlayerId);
            } else {
                sendToHost({ type: MessageTypes.DRAW_CARD });
            }
        }
    });
    
    DOM.passBtn.addEventListener('click', () => {
        if (Network.isHost) {
            handlePassTurnRequest(LocalState.myPlayerId);
        } else {
            sendToHost({ type: MessageTypes.PASS_TURN });
        }
    });
    
    DOM.unoCallBtn.addEventListener('click', handleUnoButtonClick);
    DOM.scoreboardBtn.addEventListener('click', showScoreboard);
    DOM.closeScoreboardBtn.addEventListener('click', hideScoreboard);
    
    // Color modal
    document.querySelectorAll('.color-btn').forEach(btn => {
        btn.addEventListener('click', () => handleColorButtonClick(btn.dataset.color));
    });
    
    // Dare modal
    DOM.doDareBtn.addEventListener('click', () => handleDareButtonClick('do'));
    DOM.skipDareBtn.addEventListener('click', () => handleDareButtonClick('skip'));
    DOM.dareCompleteBtn.addEventListener('click', () => handleDareResultClick(true));
    DOM.dareFailedBtn.addEventListener('click', () => handleDareResultClick(false));
    
    // Round end modal
    DOM.nextRoundBtn.addEventListener('click', handleNextRound);
    
    // Game over / disconnect
    DOM.backToLobbyBtn.addEventListener('click', () => {
        location.reload();
    });
    
    DOM.reconnectBtn.addEventListener('click', () => {
        location.reload();
    });
    
    DOM.acceptPenaltyBtn.addEventListener('click', () => {
        DOM.unoPenaltyModal.classList.remove('active');
    });
    
    // Close modals on backdrop
    DOM.scoreboardModal.addEventListener('click', (e) => {
        if (e.target === DOM.scoreboardModal) hideScoreboard();
    });
}

// ===========================================
// URL PARAMETER HANDLING
// ===========================================
function checkUrlParams() {
    const params = new URLSearchParams(window.location.search);
    const roomCode = params.get('room');
    
    if (roomCode && roomCode.length === 4) {
        DOM.roomCodeInput.value = roomCode.toUpperCase();
        document.querySelector('.landing-options').style.display = 'none';
        DOM.joinSection.style.display = 'block';
    }
}

// ===========================================
// INITIALIZE
// ===========================================
document.addEventListener('DOMContentLoaded', () => {
    initEventListeners();
    checkUrlParams();
});
